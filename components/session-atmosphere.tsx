"use client";

import { useEffect, useRef } from "react";

const vertexSource = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentSource = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 out_color;

uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_scroll;
uniform float u_time;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  local = local * local * (3.0 - 2.0 * local);
  return mix(
    mix(hash(cell), hash(cell + vec2(1.0, 0.0)), local.x),
    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0)), local.x),
    local.y
  );
}

float paper(vec2 point) {
  float grain = noise(point * 8.0);
  grain += noise(point * 19.0) * 0.35;
  grain += noise(point * 43.0) * 0.12;
  return grain / 1.47;
}

void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 point = (uv - 0.5) * aspect;
  vec2 pointer = (u_pointer - 0.5) * vec2(0.08, -0.06);
  float time = u_time * 0.055;

  float fold = sin(point.x * 4.0 - point.y * 2.2 + time) * 0.045;
  fold += sin(point.x * 1.7 + point.y * 3.1 - time * 0.7) * 0.03;
  vec2 warped = point + vec2(fold, fold * -0.55) + pointer;

  float left_pool = smoothstep(
    0.72,
    0.04,
    length(warped - vec2(-0.38 + u_scroll * 0.08, 0.08))
  );
  float right_pool = smoothstep(
    0.78,
    0.03,
    length(warped - vec2(0.46 - u_scroll * 0.06, -0.08))
  );
  float sun = smoothstep(
    0.26,
    0.02,
    length(warped - vec2(0.28, 0.31 - u_scroll * 0.07))
  );
  float contour = smoothstep(0.055, 0.0, abs(length(warped * vec2(0.8, 1.3)) - 0.48));

  vec3 ivory = vec3(0.965, 0.949, 0.902);
  vec3 sage = vec3(0.725, 0.775, 0.665);
  vec3 moss = vec3(0.205, 0.286, 0.247);
  vec3 peach = vec3(0.914, 0.722, 0.624);
  vec3 lilac = vec3(0.806, 0.770, 0.842);

  vec3 color = ivory;
  color = mix(color, sage, left_pool * 0.34);
  color = mix(color, moss, right_pool * 0.16);
  color = mix(color, peach, sun * 0.38);
  color = mix(color, lilac, contour * 0.12);

  vec2 light_position = vec2(0.68, 0.18) + (u_pointer - 0.5) * 0.12;
  float directional_light = smoothstep(0.92, 0.06, distance(uv, light_position));
  color += directional_light * vec3(0.035, 0.029, 0.018);

  float grain = paper(gl_FragCoord.xy / max(u_resolution.y, 1.0));
  color += (grain - 0.5) * 0.018;

  float edge_fade = smoothstep(0.0, 0.16, uv.y) * smoothstep(0.0, 0.13, 1.0 - uv.y);
  out_color = vec4(mix(ivory, color, 0.72 * edge_fade), 1.0);
}
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function SessionAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;
    const currentHost = currentCanvas.parentElement;
    if (!currentHost) return;
    const currentStage = currentHost.parentElement;
    if (!currentStage) return;
    const canvas = currentCanvas;
    const host = currentHost;
    const stage = currentStage;
    const shaderCanvas = document.createElement("canvas");
    const displayContext = canvas.getContext("2d", { alpha: false });
    (
      canvas as HTMLCanvasElement & { shaderCanvas?: HTMLCanvasElement }
    ).shaderCanvas = shaderCanvas;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let gl = displayContext
      ? shaderCanvas.getContext("webgl2", {
          alpha: false,
          antialias: false,
          depth: false,
          powerPreference: "low-power",
          premultipliedAlpha: false,
        })
      : null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let animationFrame = 0;
    let animateUntil = 0;
    let frameCount = 0;
    let lastDrawnAt = 0;
    let intersecting = false;
    let disposed = false;
    let startedAt = performance.now();
    let pointerTarget = { x: 0.68, y: 0.2 };
    let pointerCurrent = { ...pointerTarget };

    const shouldAnimate = () => !reducedMotion.matches && finePointer.matches;

    function setFallback(state = "fallback") {
      host.dataset.renderState = state;
      host.dataset.rendering = "paused";
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function initialize() {
      if (!gl) {
        setFallback();
        return false;
      }

      program = createProgram(gl);
      buffer = gl.createBuffer();
      if (!program || !buffer) {
        setFallback();
        return false;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.useProgram(program);
      const position = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      startedAt = performance.now();
      return true;
    }

    function resize() {
      if (!gl) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        shaderCanvas.width = width;
        shaderCanvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    }

    function sectionProgress() {
      const bounds = stage.getBoundingClientRect();
      return Math.min(
        1,
        Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)),
      );
    }

    function render(now: number) {
      if (disposed || !gl || !program) return;
      if (shouldAnimate() && now < animateUntil && now - lastDrawnAt < 32) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      lastDrawnAt = now;
      resize();
      if (shouldAnimate() && now >= animateUntil) {
        pointerCurrent = { ...pointerTarget };
      } else {
        pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.06;
        pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.06;
      }

      gl.useProgram(program);
      gl.uniform2f(
        gl.getUniformLocation(program, "u_resolution"),
        canvas.width,
        canvas.height,
      );
      gl.uniform2f(
        gl.getUniformLocation(program, "u_pointer"),
        pointerCurrent.x,
        pointerCurrent.y,
      );
      const scrollProgress = sectionProgress();
      gl.uniform1f(gl.getUniformLocation(program, "u_scroll"), scrollProgress);
      gl.uniform1f(
        gl.getUniformLocation(program, "u_time"),
        shouldAnimate() ? (now - startedAt) / 1000 : 0,
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      displayContext?.drawImage(shaderCanvas, 0, 0, canvas.width, canvas.height);

      frameCount += 1;
      host.dataset.frameCount = String(frameCount);
      host.dataset.pointerX = pointerCurrent.x.toFixed(3);
      host.dataset.pointerY = pointerCurrent.y.toFixed(3);
      host.dataset.scrollProgress = scrollProgress.toFixed(3);
      host.dataset.renderState = shouldAnimate() ? "ready" : "static";

      if (
        shouldAnimate() &&
        intersecting &&
        !document.hidden &&
        now < animateUntil
      ) {
        host.dataset.rendering = "active";
        animationFrame = requestAnimationFrame(render);
      } else {
        host.dataset.rendering = "paused";
        animationFrame = 0;
      }
    }

    function start(duration = 0) {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (!program) return;
      animateUntil = Math.max(animateUntil, performance.now() + duration);
      if (shouldAnimate() && intersecting && !document.hidden) {
        host.dataset.rendering = "active";
        animationFrame = requestAnimationFrame(render);
      } else {
        render(performance.now());
      }
    }

    function handlePointerMove(event: globalThis.PointerEvent) {
      if (!shouldAnimate()) return;
      const bounds = stage.getBoundingClientRect();
      pointerTarget = {
        x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
        y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
      };
      start(420);
    }

    function handlePointerLeave() {
      pointerTarget = { x: 0.68, y: 0.2 };
      start(520);
    }

    function handleMotionPreference() {
      pointerTarget = { x: 0.68, y: 0.2 };
      pointerCurrent = { ...pointerTarget };
      start(900);
    }

    function handleVisibility() {
      if (document.hidden) setFallback(host.dataset.renderState || "ready");
      else start(900);
    }

    function handleContextLost(event: Event) {
      event.preventDefault();
      program = null;
      buffer = null;
      setFallback("lost");
    }

    function handleContextRestored() {
      if (disposed) return;
      gl = shaderCanvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
        depth: false,
        powerPreference: "low-power",
        premultipliedAlpha: false,
      });
      if (initialize()) start(900);
    }

    function handleScroll() {
      if (intersecting) start(520);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (shouldAnimate()) start(600);
      else render(performance.now());
    });
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        start(entry.isIntersecting ? 1400 : 0);
      },
      { rootMargin: "18% 0px", threshold: 0.01 },
    );

    stage.addEventListener("pointermove", handlePointerMove, { passive: true });
    stage.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", handleScroll, { passive: true });
    shaderCanvas.addEventListener("webglcontextlost", handleContextLost);
    shaderCanvas.addEventListener("webglcontextrestored", handleContextRestored);
    reducedMotion.addEventListener("change", handleMotionPreference);
    finePointer.addEventListener("change", handleMotionPreference);
    resizeObserver.observe(canvas);
    intersectionObserver.observe(stage);

    if (initialize()) {
      resize();
      render(performance.now());
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
      shaderCanvas.removeEventListener("webglcontextlost", handleContextLost);
      shaderCanvas.removeEventListener("webglcontextrestored", handleContextRestored);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      finePointer.removeEventListener("change", handleMotionPreference);
      if (gl && buffer) gl.deleteBuffer(buffer);
      if (gl && program) gl.deleteProgram(program);
      delete (
        canvas as HTMLCanvasElement & { shaderCanvas?: HTMLCanvasElement }
      ).shaderCanvas;
    };
  }, []);

  return (
    <div
      className="session-atmosphere"
      data-render-state="fallback"
      data-rendering="paused"
      data-pointer-x="0.680"
      data-pointer-y="0.200"
      data-scroll-progress="0.500"
      data-testid="session-atmosphere"
      aria-hidden="true"
    >
      <span className="session-atmosphere-fallback" />
      <canvas ref={canvasRef} />
    </div>
  );
}

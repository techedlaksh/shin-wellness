import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { listVariants, restoreVariant } from "./design-variants.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const screenshotRoot = path.join(root, ".context/design-archive/screenshots");
const args = process.argv.slice(2);
const requestedPort = Number(args[args.indexOf("--port") + 1]);
const livePort = Number(process.env.CONDUCTOR_PORT || 3000);
const port = Number.isInteger(requestedPort) ? requestedPort : livePort + 1;
const variants = listVariants();

function html() {
  const cards = variants
    .map((variant) => {
      const id = String(variant.id).padStart(2, "0");
      const best = variant.score === 8.3 ? " best" : "";
      return `<article class="card${best}" data-id="${variant.id}">
        <button class="preview" data-preview="${id}" aria-label="View critic ${id} full size">
          <img src="/screenshots/critic-${id}.png" alt="Full website at critic ${id}" loading="lazy">
        </button>
        <div class="meta"><div><strong>Critic ${id}</strong><span>${variant.commit}</span></div><b>${variant.score.toFixed(1)}</b></div>
        <button class="restore" data-restore="${variant.id}">Use this design</button>
      </article>`;
    })
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Shin design archive</title><style>
  :root{color-scheme:light;--ink:#304d42;--paper:#f6f2e9;--line:#d9d9cb;--sage:#dfe6d8;--lilac:#ddd1ea}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.45 ui-sans-serif,system-ui,sans-serif}.shell{width:min(1500px,calc(100% - 40px));margin:auto;padding:42px 0 80px}header{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:30px}h1{margin:0;font:52px/1.02 Georgia,serif;font-weight:400;letter-spacing:-.035em}header p{max-width:590px;margin:0;color:#64756e}.toolbar{position:sticky;top:0;z-index:5;display:flex;gap:10px;align-items:center;padding:12px 0;background:color-mix(in srgb,var(--paper) 92%,transparent);backdrop-filter:blur(12px)}button,a{font:inherit}.toolbar button,.toolbar a,.restore{border:1px solid var(--ink);border-radius:999px;background:transparent;color:var(--ink);padding:10px 15px;text-decoration:none;cursor:pointer}.toolbar a,.restore{background:var(--ink);color:white}.status{margin-left:auto;font-size:13px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}.card{position:relative;border-top:1px solid var(--line);padding-top:12px}.card.best:before{content:'Highest score';position:absolute;z-index:2;top:22px;left:10px;padding:6px 9px;background:var(--lilac);border-radius:999px;font-size:11px;letter-spacing:.05em;text-transform:uppercase}.preview{display:block;width:100%;height:360px;padding:0;border:0;overflow:hidden;background:white;cursor:zoom-in;box-shadow:0 14px 34px #52645a20}.preview img{display:block;width:100%;height:auto}.meta{display:flex;align-items:center;justify-content:space-between;padding:12px 1px 10px}.meta div{display:grid}.meta span{font:10px ui-monospace,monospace;color:#819087}.meta b{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--sage);font:20px Georgia,serif}.restore{width:100%;border:0}.restore:disabled{opacity:.45;cursor:wait}dialog{width:min(1200px,calc(100% - 36px));height:calc(100% - 36px);padding:0;border:0;background:#252d29;box-shadow:0 30px 100px #0008}dialog::backdrop{background:#1a211dcc}dialog img{display:block;width:100%;height:auto}dialog button{position:fixed;top:28px;right:28px;width:44px;height:44px;border:0;border-radius:50%;background:white;color:var(--ink);font-size:22px;cursor:pointer}@media(max-width:1000px){.grid{grid-template-columns:repeat(3,1fr)}header{align-items:start;flex-direction:column}}@media(max-width:720px){.grid{grid-template-columns:repeat(2,1fr)}.preview{height:300px}h1{font-size:40px}.status{display:none}}@media(max-width:480px){.grid{grid-template-columns:1fr}.preview{height:460px}.shell{width:calc(100% - 24px)}}
  </style></head><body><main class="shell"><header><h1>48 ways Shin evolved.</h1><p>Every card is the full website captured at the exact source boundary reviewed by that critic. View any design, or restore its four design files into this workspace.</p></header><nav class="toolbar"><button id="current">Return to branch design</button><a href="http://127.0.0.1:${livePort}" target="_blank">Open live website ↗</a><span class="status" id="status">Ready</span></nav><section class="grid">${cards}</section></main><dialog id="viewer"><button aria-label="Close">×</button><img alt=""></dialog><script>
  const status=document.querySelector('#status');const viewer=document.querySelector('#viewer');
  document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.preview;viewer.querySelector('img').src='/screenshots/critic-'+id+'.png';viewer.querySelector('img').alt='Full website at critic '+id;viewer.showModal()}));viewer.querySelector('button').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
  async function restore(value,button){document.querySelectorAll('.restore,#current').forEach(item=>item.disabled=true);status.textContent='Restoring…';try{const response=await fetch('/api/restore',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({value})});const body=await response.json();if(!response.ok)throw new Error(body.error);status.textContent=body.message;}catch(error){status.textContent=error.message;alert(error.message)}finally{document.querySelectorAll('.restore,#current').forEach(item=>item.disabled=false)}}
  document.querySelectorAll('[data-restore]').forEach(button=>button.addEventListener('click',()=>restore(button.dataset.restore,button)));document.querySelector('#current').addEventListener('click',event=>restore('current',event.currentTarget));
  </script></body></html>`;
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
  if (request.method === "GET" && url.pathname === "/") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(html());
    return;
  }
  const image = url.pathname.match(/^\/screenshots\/(critic-\d{2}\.png)$/);
  if (request.method === "GET" && image) {
    const file = path.join(screenshotRoot, image[1]);
    if (!fs.existsSync(file)) {
      response.writeHead(404).end("Screenshot not rendered yet");
      return;
    }
    response.writeHead(200, { "content-type": "image/png", "cache-control": "no-cache" });
    fs.createReadStream(file).pipe(response);
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/restore") {
    let body = "";
    request.on("data", (chunk) => { body += chunk; });
    request.on("end", () => {
      try {
        const { value } = JSON.parse(body);
        const result = restoreVariant(String(value));
        const label = result.target === "current" ? "the branch design" : `critic ${String(result.target).padStart(2, "0")}`;
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ message: `Restored ${label}. The live website will refresh automatically.` }));
      } catch (error) {
        response.writeHead(409, { "content-type": "application/json" });
        response.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
      }
    });
    return;
  }
  response.writeHead(404).end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  const address = `http://127.0.0.1:${port}`;
  console.log(`Design gallery: ${address}`);
  if (args.includes("--open") && process.platform === "darwin") {
    spawn("open", [address], { detached: true, stdio: "ignore" }).unref();
  }
});

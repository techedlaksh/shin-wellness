const ORIGIN_PLACEHOLDER = "__SITE_ORIGIN__";

function withRuntimeOrigin(response, request) {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const origin = new URL(request.url).origin;

  return response.text().then((html) => {
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");

    return new Response(html.replaceAll(ORIGIN_PLACEHOLDER, origin), {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  });
}

export default {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) {
      return new Response("Static asset binding is unavailable.", { status: 500 });
    }

    let response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);

    if (response.status === 404 && !url.pathname.split("/").pop()?.includes(".")) {
      url.pathname = `${url.pathname.replace(/\/$/, "") || ""}/index.html`;
      response = await env.ASSETS.fetch(new Request(url, request));
    }

    return withRuntimeOrigin(response, request);
  },
};

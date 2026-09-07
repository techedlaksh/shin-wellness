import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { listVariants, restoreVariant } from "./design-variants.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const screenshotRoot = path.join(root, ".context/design-archive/screenshots");
const reviewPath = path.join(root, "design-archive/critic-reviews.json");
const args = process.argv.slice(2);
const requestedPort = Number(args[args.indexOf("--port") + 1]);
const livePort = Number(process.env.CONDUCTOR_PORT || 3000);
const port = Number.isInteger(requestedPort) ? requestedPort : livePort + 1;
const variants = listVariants();
const reviews = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
const reviewsForBrowser = JSON.stringify(
  Object.fromEntries(reviews.map((review) => [review.id, review])),
).replaceAll("<", "\\u003c");

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
        <div class="actions"><button class="restore" data-restore="${variant.id}">Use this design</button><button class="review-button" data-review="${variant.id}">Read critique</button></div>
      </article>`;
    })
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Shin design archive</title><style>
  :root{color-scheme:light;--ink:#304d42;--paper:#f6f2e9;--line:#d9d9cb;--sage:#dfe6d8;--lilac:#ddd1ea}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.45 ui-sans-serif,system-ui,sans-serif}.shell{width:min(1500px,calc(100% - 40px));margin:auto;padding:42px 0 80px}header{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:30px}h1{margin:0;font:52px/1.02 Georgia,serif;font-weight:400;letter-spacing:-.035em}header p{max-width:590px;margin:0;color:#64756e}.toolbar{position:sticky;top:0;z-index:5;display:flex;gap:10px;align-items:center;padding:12px 0;background:color-mix(in srgb,var(--paper) 92%,transparent);backdrop-filter:blur(12px)}button,a{font:inherit}.toolbar button,.toolbar a,.restore,.review-button{border:1px solid var(--ink);border-radius:999px;background:transparent;color:var(--ink);padding:10px 15px;text-decoration:none;cursor:pointer}.toolbar a,.restore{background:var(--ink);color:white}.status{margin-left:auto;font-size:13px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}.card{position:relative;border-top:1px solid var(--line);padding-top:12px}.card.best:before{content:'Highest score';position:absolute;z-index:2;top:22px;left:10px;padding:6px 9px;background:var(--lilac);border-radius:999px;font-size:11px;letter-spacing:.05em;text-transform:uppercase}.preview{display:block;width:100%;height:360px;padding:0;border:0;overflow:hidden;background:white;cursor:zoom-in;box-shadow:0 14px 34px #52645a20}.preview img{display:block;width:100%;height:auto}.meta{display:flex;align-items:center;justify-content:space-between;padding:12px 1px 10px}.meta div{display:grid}.meta span{font:10px ui-monospace,monospace;color:#819087}.meta b{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--sage);font:20px Georgia,serif}.actions{display:grid;grid-template-columns:1.1fr .9fr;gap:7px}.restore,.review-button{width:100%}.restore{border:0}.restore:disabled{opacity:.45;cursor:wait}dialog{padding:0;border:0;box-shadow:0 30px 100px #0008}dialog::backdrop{background:#1a211dcc}.image-viewer{width:calc(100% - 28px);max-width:1540px;height:calc(100% - 28px);max-height:none;background:#252d29;color:var(--ink);overflow:hidden}.image-comparison{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(380px,.85fr);height:100%}.image-pane{overflow:auto;background:#252d29}.image-pane img{display:block;width:100%;height:auto}.image-critique{overflow-y:auto;border-left:1px solid var(--line);background:var(--paper);padding:48px 42px 60px}.image-critique .review-heading{padding-right:32px}.image-critique .review-heading h2{font-size:34px}.dialog-close{position:absolute;z-index:3;top:14px;right:14px;width:44px;height:44px;border:1px solid var(--line);border-radius:50%;background:white;color:var(--ink);font-size:22px;cursor:pointer}.review-viewer{width:min(760px,calc(100% - 36px));max-height:calc(100% - 36px);background:var(--paper);color:var(--ink);border-radius:3px}.review-sheet{padding:48px 54px 58px}.review-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-right:42px}.review-heading h2{margin:0;font:38px/1.05 Georgia,serif;font-weight:400}.review-score{display:grid;place-items:center;flex:0 0 56px;width:56px;height:56px;border-radius:50%;background:var(--sage);font:22px Georgia,serif}.review-copy{margin:30px 0 0;white-space:pre-wrap;font:15px/1.65 ui-sans-serif,system-ui,sans-serif;color:#435e53}.review-viewer .dialog-close{position:absolute;top:14px;right:14px;border:1px solid var(--line)}@media(max-width:1000px){.grid{grid-template-columns:repeat(3,1fr)}header{align-items:start;flex-direction:column}.image-comparison{grid-template-columns:1fr;grid-template-rows:minmax(320px,52%) minmax(0,1fr)}.image-critique{border-top:1px solid var(--line);border-left:0;padding:34px 36px 48px}}@media(max-width:720px){.grid{grid-template-columns:repeat(2,1fr)}.preview{height:300px}h1{font-size:40px}.status{display:none}.review-sheet{padding:42px 30px}.image-viewer{width:calc(100% - 16px);height:calc(100% - 16px)}.image-critique{padding:30px 24px 42px}.image-critique .review-heading h2{font-size:30px}}@media(max-width:480px){.grid{grid-template-columns:1fr}.preview{height:460px}.shell{width:calc(100% - 24px)}.actions{grid-template-columns:1fr}}
  </style></head><body><main class="shell"><header><h1>48 ways Shin evolved.</h1><p>Every card is the full website captured at the exact source boundary reviewed by that critic. View any design, read its delivered critique, or restore it into this workspace.</p></header><nav class="toolbar"><button id="current">Return to branch design</button><a href="http://127.0.0.1:${livePort}" target="_blank">Open live website ↗</a><a href="/critic-reviews.json" download>Download critiques</a><span class="status" id="status">Ready</span></nav><section class="grid">${cards}</section></main><dialog class="image-viewer" id="viewer"><button class="dialog-close" aria-label="Close screenshot">×</button><div class="image-comparison"><div class="image-pane"><img alt=""></div><aside class="image-critique"><div class="review-heading"><h2></h2><span class="review-score"></span></div><div class="review-copy"></div></aside></div></dialog><dialog class="review-viewer" id="reviewer"><button class="dialog-close" aria-label="Close critique">×</button><article class="review-sheet"><div class="review-heading"><h2></h2><span class="review-score"></span></div><div class="review-copy"></div></article></dialog><script>
  const reviews=${reviewsForBrowser};const status=document.querySelector('#status');const viewer=document.querySelector('#viewer');const reviewer=document.querySelector('#reviewer');
  document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.preview;const review=reviews[Number(id)];viewer.querySelector('img').src='/screenshots/critic-'+id+'.png';viewer.querySelector('img').alt='Full website at critic '+id;viewer.querySelector('h2').textContent='Critic '+id+' analysis';viewer.querySelector('.review-score').textContent=review.score.toFixed(1);renderReview(viewer.querySelector('.review-copy'),review.analysis);viewer.showModal()}));viewer.querySelector('button').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
  function renderReview(target,text){target.replaceChildren();const lines=text.split(String.fromCharCode(10));if(lines[0].startsWith('Score:'))lines.shift();while(lines[0]==='')lines.shift();for(const line of lines){if(!line){target.append(document.createElement('br'));continue}const paragraph=document.createElement('p');paragraph.style.margin='0';let cursor=0;while(true){const start=line.indexOf('**',cursor);if(start<0)break;const end=line.indexOf('**',start+2);if(end<0)break;paragraph.append(document.createTextNode(line.slice(cursor,start)));const strong=document.createElement('strong');strong.textContent=line.slice(start+2,end);paragraph.append(strong);cursor=end+2}paragraph.append(document.createTextNode(line.slice(cursor)));target.append(paragraph)}}
  document.querySelectorAll('[data-review]').forEach(button=>button.addEventListener('click',()=>{const review=reviews[button.dataset.review];reviewer.querySelector('h2').textContent='Critic '+String(review.id).padStart(2,'0')+' analysis';reviewer.querySelector('.review-score').textContent=review.score.toFixed(1);renderReview(reviewer.querySelector('.review-copy'),review.analysis);reviewer.showModal()}));reviewer.querySelector('button').addEventListener('click',()=>reviewer.close());reviewer.addEventListener('click',event=>{if(event.target===reviewer)reviewer.close()});
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
  if (request.method === "GET" && url.pathname === "/critic-reviews.json") {
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": 'attachment; filename="shin-critic-reviews.json"',
    });
    fs.createReadStream(reviewPath).pipe(response);
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

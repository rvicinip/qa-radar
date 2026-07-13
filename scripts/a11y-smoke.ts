import { JSDOM } from "jsdom";
import axe from "axe-core";

const sampleHtml = `<!DOCTYPE html>
<html lang="en">
  <head><title>QA Radar a11y smoke</title></head>
  <body>
    <main>
      <h1>QA Radar</h1>
      <nav aria-label="Section navigation"><a href="/">Home</a></nav>
      <section aria-labelledby="signal-board-heading">
        <h2 id="signal-board-heading">Signal Board</h2>
        <div role="list" aria-label="Signal board columns">
          <div role="listitem"><p>New Signal</p></div>
        </div>
      </section>
      <label for="search-box" class="sr-only">Search</label>
      <input id="search-box" type="search" />
    </main>
  </body>
</html>`;

async function runSmoke(): Promise<void> {
  const dom = new JSDOM(sampleHtml);
  const { window } = dom;
  const { document } = window;

  // axe-core expects a full Document on the global
  (globalThis as unknown as { document: Document; window: Window }).document = document;
  (globalThis as unknown as { document: Document; window: Window }).window = window as unknown as Window;

  const results = await axe.run(document.body);

  if (results.violations.length > 0) {
    console.error("A11y smoke failed:");
    for (const violation of results.violations) {
      console.error(`- ${violation.id}: ${violation.help}`);
    }
    process.exit(1);
  }

  console.log("A11y smoke passed (axe-core, sample layout).");
}

runSmoke().catch((error) => {
  console.error(error);
  process.exit(1);
});

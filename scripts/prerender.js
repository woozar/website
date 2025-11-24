import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, "../dist");

// Routes to pre-render
const routes = [
  { path: "/", outputFile: "index.html" },
  {
    path: "/workshops/ai-low-hanging-fruits",
    outputFile: "workshops/ai-low-hanging-fruits/index.html",
  },
];

async function prerender() {
  console.log("Starting pre-rendering...\n");

  // Read the template HTML
  const templatePath = join(distPath, "index.html");
  const template = await readFile(templatePath, "utf-8");

  // Import the server entry point
  const { render } = await import("../dist-server/entry-server.js");

  for (const route of routes) {
    console.log(`Pre-rendering: ${route.path}`);

    try {
      // Render the app for this route
      const appHtml = render(route.path);

      // Inject the rendered HTML into the template
      const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Write the HTML file
      const outputPath = join(distPath, route.outputFile);
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html);

      console.log(`✓ Generated: ${route.outputFile}\n`);
    } catch (error) {
      console.error(`✗ Failed to render ${route.path}:`, error.message);
      console.error(error);
      process.exit(1);
    }
  }

  console.log("Pre-rendering complete!");
}

prerender().catch((error) => {
  console.error("Pre-rendering failed:", error);
  process.exit(1);
});

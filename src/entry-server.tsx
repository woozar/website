import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "./App";
import { AppProvider } from "./ThemedApp";

export function render(url: string) {
  const html = renderToString(
    <AppProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </AppProvider>
  );
  return html;
}

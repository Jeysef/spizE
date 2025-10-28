/* @refresh reload */
import "solid-devtools";
import "./index.css";
import "./env";
import "./client/client.gen";

import { Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./app";
import { routes } from "./routes";

// biome-ignore lint/style/noNonNullAssertion: <element is expected to exist. Non existence is handled>
const root = document.getElementById("root")!;

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => <Router root={(props) => <App>{props.children}</App>}>{routes}</Router>,
  root
);

import "./app.css";
import "unfonts.css";
import Navigator from "./Navigator.svelte";

const app = new Navigator({
  target: document.getElementById("app") as Element,
});

export default app;

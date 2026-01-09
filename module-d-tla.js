import { log } from "interactivity-api";

log("TLA module D (before await)", "tla");
await new Promise((r) => setTimeout(r, 1));
log("TLA module D (after await)", "tla");

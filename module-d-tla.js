import { log } from "interactivity-api";

log("TLA module D (before await)", "tla");
await Promise.resolve();
log("TLA module D (after await)", "tla");
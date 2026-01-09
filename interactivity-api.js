// Interactivity API module
// Exports logger and sets up timing listeners

const logContainer = document.getElementById("log");
let counter = 0;

export function log(message, type = "") {
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.textContent = `${String(++counter).padStart(2, "0")}. ${message}`;
  logContainer.appendChild(entry);
}

// Initialize
log("interactivity-api init", "sync");

document.addEventListener("DOMContentLoaded", () => {
  log("DOMContentLoaded", "dom-event");
});

setTimeout(() => log("setTimeout", "post-task"), 0);

const ch = new MessageChannel();
ch.port1.onmessage = () => log("MessageChannel", "post-task");
ch.port2.postMessage(null);

requestAnimationFrame(() => {
  log("requestAnimationFrame", "post-task");
});

if (typeof scheduler !== "undefined" && scheduler.postTask) {
  scheduler.postTask(() => {
    log("scheduler.postTask", "post-task");
  }, { priority: "user-blocking" });
}
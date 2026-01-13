// Interactivity API module - Async Load Version
// Uses Navigation Timing API to detect if DOMContentLoaded has already fired

const logContainer = document.getElementById("log");
let counter = 0;

export function log(message, type = "") {
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.textContent = `${String(++counter).padStart(2, "0")}. ${message}`;
  logContainer.appendChild(entry);
}

// Initialize
log("interactivity-api-async init", "sync");

// Get Navigation Timing data
const [navigation] = performance.getEntriesByType("navigation");
const dclStart = navigation?.domContentLoadedEventStart ?? 0;
const readyState = document.readyState;

log(`readyState: "${readyState}"`, "sync");
log(`domContentLoadedEventStart: ${dclStart.toFixed(2)} ms`, "sync");

// The init function that would trigger hydration
function init() {
  log("init() called - would start hydration here", "detection");

  // Schedule additional callbacks to show execution order
  setTimeout(() => log("setTimeout (from init)", "post-task"), 0);

  const ch = new MessageChannel();
  ch.port1.onmessage = () => log("MessageChannel (from init)", "post-task");
  ch.port2.postMessage(null);

  requestAnimationFrame(() => {
    log("requestAnimationFrame (from init)", "post-task");
  });

  if (typeof scheduler !== "undefined" && scheduler.postTask) {
    scheduler.postTask(() => {
      log("scheduler.postTask (from init)", "post-task");
    }, { priority: "user-blocking" });
  }
}

// THE SOLUTION: Use Navigation Timing API to detect DOMContentLoaded state
if (dclStart > 0) {
  // DOMContentLoaded has started or already completed
  log("DETECTED: DOMContentLoaded already started (dclStart > 0)", "detection");
  log("Calling init() immediately", "detection");
  init();
} else {
  // DOMContentLoaded hasn't started yet - wait for it
  log("DETECTED: DOMContentLoaded not yet started (dclStart === 0)", "detection");
  log("Adding DOMContentLoaded listener", "detection");
  document.addEventListener("DOMContentLoaded", () => {
    log("DOMContentLoaded event received", "dom-event");
    init();
  });
}

// Also add a listener to show if DOMContentLoaded fires after this module
// (it shouldn't if dclStart > 0)
document.addEventListener("DOMContentLoaded", () => {
  log("DOMContentLoaded (secondary listener)", "dom-event");
});

if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js",  { scope: './' })
        .then(() => console.log("Service Worker registered"))
        .catch(err => console.error("Service Worker failed:", err));

    }

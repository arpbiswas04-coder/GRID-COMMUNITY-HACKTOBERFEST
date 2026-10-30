// ==========================================================================
// TYPE.E — BACKEND STATIC SERVER
// Lightweight native Node.js HTTP server. Zero external dependencies.
// ==========================================================================

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");

const MIME_TYPES = {
  ".html": "text/html; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".js": "application/javascript; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf"
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Normalize root and shorthand routes
  if (pathname === "/" || pathname === "/home") {
    pathname = "/pages/home.html";
  } else if (pathname === "/race") {
    pathname = "/pages/race.html";
  } else if (pathname === "/analytics" || pathname === "/stats") {
    pathname = "/pages/analytics.html";
  } else if (pathname === "/practice") {
    pathname = "/pages/practice.html";
  }

  // Prevent path traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, "");
  let filePath = path.join(FRONTEND_DIR, safePath);

  // Check if target is a directory without index
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        // Fallback: check inside pages/
        const alternatePath = path.join(FRONTEND_DIR, "pages", path.basename(filePath));
        fs.readFile(alternatePath, (altErr, altContent) => {
          if (altErr) {
            res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
            res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:3rem;"><h1>404 — Page Not Found</h1><p><a href="/pages/home.html">Return to Type.e Home</a></p></body></html>`);
          } else {
            const ext = path.extname(alternatePath).toLowerCase();
            res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "text/plain" });
            res.end(altContent);
          }
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });
  });
});

function startServer(portToTry) {
  server.listen(portToTry, () => {
    console.log(`\n======================================================`);
    console.log(`  TYPE.E — Development Server Running`);
    console.log(`  Local URL: http://localhost:${portToTry}`);
    console.log(`  Document Root: ${FRONTEND_DIR}`);
    console.log(`======================================================\n`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${portToTry} in use, trying port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(PORT);

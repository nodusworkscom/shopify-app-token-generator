const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SHOP,
  SHOPIFY_SCOPES,
  PORT = 3000,
} = process.env;

if (!SHOPIFY_API_KEY || !SHOPIFY_API_SECRET || !SHOPIFY_SHOP) {
  console.error(
    "\n❌  Missing required env vars. Copy .env.example to .env and fill in your values.\n"
  );
  process.exit(1);
}

const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const scopes = SHOPIFY_SCOPES || "read_products";

const app = express();

app.get("/", (_req, res) => {
  const nonce = crypto.randomBytes(16).toString("hex");
  const url =
    `https://${SHOPIFY_SHOP}/admin/oauth/authorize` +
    `?client_id=${SHOPIFY_API_KEY}` +
    `&scope=${scopes}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&state=${nonce}`;

  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const { code, hmac } = req.query;

  if (!code) {
    return res.status(400).send("Missing authorization code.");
  }

  const params = { ...req.query };
  delete params.hmac;
  delete params.signature;

  const message = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const digest = crypto
    .createHmac("sha256", SHOPIFY_API_SECRET)
    .update(message)
    .digest("hex");

  if (digest !== hmac) {
    return res.status(403).send("HMAC validation failed.");
  }

  try {
    const { data } = await axios.post(
      `https://${SHOPIFY_SHOP}/admin/oauth/access_token`,
      {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code,
      }
    );

    const token = data.access_token;

    console.log("\n╔══════════════════════════════════════════════╗");
    console.log("║  ✅  ACCESS TOKEN RECEIVED                   ║");
    console.log("╠══════════════════════════════════════════════╣");
    console.log(`║  Token: ${token}`);
    console.log(`║  Scope: ${data.scope}`);
    console.log("╚══════════════════════════════════════════════╝\n");

    res.send(
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Token Retrieved</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:80px auto;text-align:center">
  <h2 style="color:#2e7d32">&#10003; Access Token Retrieved</h2>
  <pre style="background:#f5f5f5;padding:20px;border-radius:8px;word-break:break-all;font-size:14px">${token}</pre>
  <p style="color:#555">Scope: <code>${data.scope}</code></p>
  <p style="color:#999;font-size:13px">Token is also printed in terminal. You can stop the server now.</p>
  <hr style="margin:32px 0;border:none;border-top:1px solid #eee">
  <p style="font-size:12px;color:#aaa">Built by <a href="https://nodusworks.com" style="color:#888">nodusworks.com</a></p>
</body>
</html>`
    );
  } catch (err) {
    const detail = err.response?.data || err.message;
    console.error("Token exchange failed:", detail);
    res.status(500).send("Token exchange failed: " + JSON.stringify(detail));
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀  Server running at http://localhost:${PORT}`);
  console.log(`    Open this URL in your browser to start the OAuth flow.\n`);
});

const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

/*
  Helper function: verifies Shopify HMAC
  (logic only, not enforced yet)
*/
function verifyHmac(query) {
  const { hmac, ...rest } = query;

  const message = Object.keys(rest)
    .sort()
    .map(key => `${key}=${rest[key]}`)
    .join("&");

  const generatedHmac = crypto
    .createHmac("sha256", "API_SECRET") // placeholder
    .update(message)
    .digest("hex");

  return generatedHmac === hmac;
}

/*
  Root route (sanity check)
*/
app.get("/", (req, res) => {
  res.send("Shopify App Server Running");
});

/*
  Install route (OAuth start)
*/
app.get("/install", (req, res) => {
  const shop = req.query.shop;

  if (!shop) {
    return res.status(400).send("Missing shop parameter");
  }

  const apiKey = "YOUR_API_KEY";
  const scopes = "read_products";
  const redirectUri = "http://localhost:3000/callback";

  const installUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${apiKey}` +
    `&scope=${scopes}` +
    `&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
});

/*
  Callback route (OAuth return)
*/
app.get("/callback", (req, res) => {
  const { shop, code, hmac } = req.query;

  const isValid = verifyHmac(req.query);

  console.log("OAuth callback received:");
  console.log("Shop:", shop);
  console.log("Code:", code);
  console.log("HMAC valid:", isValid);

  res.send("OAuth callback received successfully");
});

/*
  Start server
*/
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
# Shopify App OAuth Starter

A minimal Shopify app backend demonstrating the OAuth 2.0 authorization flow using Node.js and Express.

## Purpose
This project demonstrates how a Shopify app:
- Initiates OAuth during app installation
- Redirects merchants to Shopify’s permission screen
- Receives the authorization callback
- Prepares for access token exchange

## OAuth Flow Overview
1. Merchant installs the app
2. `/install` route redirects to Shopify OAuth authorize URL
3. Merchant approves permissions
4. Shopify redirects to `/callback` with authorization code
5. App receives and validates callback (HMAC ready)
6. Access token exchange can be performed (not implemented here)

## Routes
- `/install` – Starts OAuth flow
- `/callback` – Handles Shopify OAuth callback

## Tech Stack
- Node.js
- Express.js

## How to Run Locally
```bash
npm install
node server.js

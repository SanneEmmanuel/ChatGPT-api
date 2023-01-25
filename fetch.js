"use strict";
/// <reference lib="dom" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
// Use `fetch` for node.js >= 18
// Use `fetch` for all other environments, including browsers
var fetch = globalThis.fetch;
exports.fetch = fetch;
if (typeof fetch !== 'function') {
    throw new Error('Invalid environment: global fetch not defined; `chatgpt` requires Node.js >= 18 at the moment due to Cloudflare protections');
}


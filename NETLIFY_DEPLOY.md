# Deploying to Netlify

This project is built for Lovable's Cloudflare Workers preset by default.
A separate Netlify build config is provided so you can self-host on Netlify
without breaking the Lovable preview.

## Files added for Netlify

- `vite.config.netlify.ts` — Vite config using TanStack Start + Nitro
- `netlify.toml` — Netlify build settings (build command, publish dir, Node 20)

The default `vite.config.ts` is left untouched so the Lovable editor preview
keeps working on Cloudflare.

## Deploy steps

1. **Export the project to GitHub** from Lovable (top-right → GitHub → Connect / Push).
2. **Create a new site on Netlify** → *Add new site* → *Import an existing project* → pick the GitHub repo.
3. Netlify reads `netlify.toml` automatically — no manual build config needed.
4. **Set environment variables** in *Site settings → Environment variables*. Copy any `VITE_*` and Lovable Cloud / Supabase keys you use locally. (Lovable Cloud bindings are not auto-provisioned outside Lovable hosting.)
5. Click **Deploy**.

## Why the previous attempt 404'd

TanStack Start no longer ships a `target: "netlify"` option — hosting is now handled by [Nitro](https://nitro.build/). Nitro detects Netlify automatically (via the `NETLIFY` env var Netlify sets at build time) and emits the right serverless functions plus the static `dist/` publish directory. The previous config produced no functions, so every URL hit Netlify's default 404.

## Local test

```bash
npm install
npx vite build --config vite.config.netlify.ts
npx netlify deploy --build
```

## Notes

- Future edits inside Lovable keep using the Cloudflare config. The Netlify
  files above are independent and won't be overwritten.
- Mirror any new env vars you add in Lovable Cloud into Netlify's
  environment variables panel.

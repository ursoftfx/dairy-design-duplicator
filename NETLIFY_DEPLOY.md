# Deploying to Netlify

This project is built for Lovable's Cloudflare Workers preset by default.
A separate Netlify build config is provided so you can self-host on Netlify
without breaking the Lovable preview.

## Files added for Netlify

- `vite.config.netlify.ts` — Vite config using TanStack Start's `netlify` target
- `netlify.toml` — Netlify build settings (build command, publish dir, Node 20)

The default `vite.config.ts` is left untouched so the Lovable editor preview
keeps working.

## Deploy steps

1. **Export the project to GitHub** from Lovable (top-right → GitHub → Connect / Push).
2. **Create a new site on Netlify** → *Add new site* → *Import an existing project* → pick the GitHub repo.
3. Netlify reads `netlify.toml` automatically. You don't need to fill the build command or publish dir manually.
4. **Set environment variables** in *Site settings → Environment variables*. Copy any `VITE_*` and Lovable Cloud / Supabase keys you use locally. (Lovable Cloud bindings are not auto-provisioned outside Lovable hosting.)
5. Click **Deploy**.

## Local test before deploying

```bash
npm install
npx vite build --config vite.config.netlify.ts
npx netlify deploy --build
```

## Notes

- Future edits inside Lovable will keep using the Cloudflare config. The
  Netlify config files above are independent and won't be overwritten.
- If you add new env vars in Lovable Cloud, remember to mirror them in
  Netlify's environment variables panel.
- If the Netlify build fails with "Cannot find module @tanstack/react-start/plugin/vite",
  run `npm install` once locally and commit the updated `package-lock.json`.

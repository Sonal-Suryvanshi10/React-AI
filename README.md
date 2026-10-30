# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Gemini API key

1. Open `.env` in the project root.
2. Replace `your_gemini_api_key_here` with your Gemini API key.
3. Restart the Vite development server.

`.env.local` is ignored by Git. Vite variables prefixed with `VITE_` are included in
the browser bundle, so this setup prevents accidental commits but does not keep the
key secret from people using the website. Use a backend proxy to protect the key in
a public deployment.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

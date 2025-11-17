# CSV Uploader App

Minimal Vite + React app that accepts only CSV files and triggers a GET request to a configured endpoint when a file is uploaded and parsed.

Commands (PowerShell):

```powershell
npm install
npm run dev
```

Open `http://localhost:5173` (Vite default) and try dropping a CSV file onto the uploader.

Notes:
- The app uses `papaparse` to parse CSV files in the browser.
- The app uses `papaparse` to parse CSV files in the browser.
- The app reads the webhook trigger URL from the environment variable `VITE_WEBHOOK_URL`.
	- Set this in development using a local `.env` file (ignored by git) or in your host (Render) environment variables.
	- Example: `VITE_WEBHOOK_URL=https://rtaisrini.app.n8n.cloud/webhook/3016ac02-e5d2-4f1d-a01f-32652ef1fa80`
	- Do NOT rely on the previously-committed localhost URL; the app now pulls the URL from `import.meta.env.VITE_WEBHOOK_URL` in `src/components/CSVUploader.jsx`.
- If your backend requires POST or CORS config, update the trigger function in `src/components/CSVUploader.jsx`.
 - The app parses CSV files with `papaparse` and Excel files (`.xls`/`.xlsx`) with `xlsx` (SheetJS).
 - When a workbook contains multiple sheets a sheet dropdown is shown so you can pick which sheet to preview.

Deployment/build notes:
- Do not commit the `dist/` build artifacts to the repository. `dist/` is ignored by `.gitignore` and should be built during deploy.
- To build locally and test production assets run:

```powershell
npm install
npm run build
```

If you have a local `dist/` folder for testing and want to remove it, delete it locally with:

```powershell
Remove-Item -Recurse -Force .\dist\
```

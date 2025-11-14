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
- The trigger URL defaults to `http://localhost:5678/form/f849b751-2b4e-4a88-93c1-a1b8b1270174`.
- If your backend requires POST or CORS config, update the trigger function in `src/components/CSVUploader.jsx`.
 - The app parses CSV files with `papaparse` and Excel files (`.xls`/`.xlsx`) with `xlsx` (SheetJS).
 - When a workbook contains multiple sheets a sheet dropdown is shown so you can pick which sheet to preview.

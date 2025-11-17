import React, { useState } from 'react'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import './CSVUploader.css'

export default function CSVUploader() {

    const TRIGGER_URL = import.meta.env.VITE_WEBHOOK_URL

    const [status, setStatus] = useState('No file uploaded')
    const [lastFiles, setLastFiles] = useState([])  // store multiple generated CSV files

    // Convert Excel → multiple CSV files
    const convertExcelToCSV = async (file) => {
        setStatus("Converting Excel to CSV...")

        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data)

        const csvFiles = []

        workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName]

            // Convert sheet to CSV text
            const csv = XLSX.utils.sheet_to_csv(worksheet)

            // Create CSV blob file
            const csvBlob = new Blob([csv], { type: "text/csv" })

            const csvFile = new File(
                [csvBlob],
                `${file.name.replace(/\.[^/.]+$/, "")}_${sheetName}.csv`,
                { type: "text/csv" }
            )

            csvFiles.push(csvFile)
        })

        setLastFiles(csvFiles)
        setStatus(`Converted ${csvFiles.length} sheet(s) to CSV`)

        return csvFiles
    }

    // Handle CSV only
    const handleCSV = (file) => {
        setStatus("CSV selected")
        setLastFiles([file])
    }

    const handleFile = async (file) => {
        if (!file) return

        const name = file.name.toLowerCase()

        // CSV file
        if (name.endsWith('.csv')) {
            handleCSV(file)
            return
        }

        // Excel file
        if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
            await convertExcelToCSV(file)
            return
        }

        setStatus("❌ Unsupported file type. Only CSV or Excel allowed.")
    }

    const onChange = (e) => handleFile(e.target.files[0])

    const onDrop = (e) => {
        e.preventDefault()
        handleFile(e.dataTransfer.files[0])
    }

    const onDragOver = (e) => e.preventDefault()

    // Upload ALL generated CSV files to webhook
    const uploadToWebhook = async () => {
        if (lastFiles.length === 0) {
            setStatus("No file to upload")
            return
        }

        setStatus("Uploading to n8n...")

        try {
            for (const csvFile of lastFiles) {
                const formData = new FormData()
                formData.append("data", csvFile)
                formData.append("filename", csvFile.name)

                await fetch(TRIGGER_URL, {
                    method: "POST",
                    body: formData
                })
            }

            setStatus("✔ All CSV files uploaded successfully")

        } catch (err) {
            setStatus("❌ Upload failed")
        }
    }

    return (
        <div className="uploader-container">

            <div
                className="drop-area"
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <p>Drop CSV or Excel here or click to upload.</p>
                <input type="file" accept=".csv,.xlsx,.xls" onChange={onChange} />
            </div>

            <div className="status"><strong>Status:</strong> {status}</div>

            <button className="upload-btn" onClick={uploadToWebhook} disabled={lastFiles.length === 0}>
                Upload to Webhook
            </button>

        </div>
    )
}

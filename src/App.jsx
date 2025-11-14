import React from 'react'
import CSVUploader from './components/CSVUploader'

export default function App() {
    return (
        <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
            {/* <h1>CSV Uploader</h1>
            <p>This app accepts only CSV files and triggers a GET to your endpoint when a file is uploaded.</p> */}
            <CSVUploader />
        </div>
    )
}

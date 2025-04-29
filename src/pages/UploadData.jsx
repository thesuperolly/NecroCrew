// src/pages/UploadData.jsx
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';

export default function UploadData() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        localStorage.setItem('uploadedData', JSON.stringify(data));
        alert("Data uploaded successfully!");
      } catch (error) {
        alert("Invalid JSON format. Please try again.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Upload Data</h2>
      
      <Card className="w-30rem mx-auto p-4">
        <div className="flex flex-column gap-3">
          <span className="p-float-label">
            <InputText id="fileName" value={fileName} disabled />
            <label htmlFor="fileName">Selected File</label>
          </span>

          <input type="file" accept=".json" onChange={handleFileChange} />

          <Button label="Upload Data" icon="pi pi-upload" className="p-button-info" onClick={handleUpload} />
        </div>
      </Card>
    </div>
  );
}

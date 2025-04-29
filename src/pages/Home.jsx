// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column align-items-center justify-content-center min-h-screen p-4 gap-4">
      <h1 className="text-3xl mb-4">Welcome to Necromunda Manager</h1>

      <div className="flex flex-wrap justify-content-center gap-4 w-full max-w-3xl">
        <Card title="Create New Gang" className="w-18rem text-center">
          <Button label="Create" icon="pi pi-plus" className="p-button-success w-full" onClick={() => navigate('/create-gang')} />
        </Card>

        <Card title="Manage Gangs" className="w-18rem text-center">
          <Button label="Manage" icon="pi pi-cog" className="p-button-primary w-full" onClick={() => navigate('/manage-gangs')} />
        </Card>

        <Card title="Upload / Update Data" className="w-18rem text-center">
          <Button label="Upload" icon="pi pi-upload" className="p-button-info w-full" onClick={() => navigate('/upload-data')} />
        </Card>
      </div>
    </div>
  );
}


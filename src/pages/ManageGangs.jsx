// src/pages/ManageGangs.jsx
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate

export default function ManageGangs() {
  const [gangs, setGangs] = useState([]);
  const navigate = useNavigate(); // Needed for programmatic navigation

  useEffect(() => {
    const storedGangs = JSON.parse(localStorage.getItem('gangs')) || [];
    setGangs(storedGangs);
  }, []);

  const deleteGang = (id) => {
    const updatedGangs = gangs.filter((gang) => gang.id !== id);
    setGangs(updatedGangs);
    localStorage.setItem('gangs', JSON.stringify(updatedGangs));
  };

  // ✨ Gang Name displayed as a clickable Link
  const nameTemplate = (rowData) => {
    return (
      <Link 
        to={`/gang/${rowData.id}`} 
        className="text-primary hover:underline"
      >
        {rowData.name}
      </Link>
    );
  };

  // ✨ Actions column with View and Delete buttons
  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-eye" 
          className="p-button-info p-button-sm" 
          onClick={() => navigate(`/gang/${rowData.id}`)}
          tooltip="View Gang"
          tooltipOptions={{ position: 'top' }}
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-danger p-button-sm" 
          onClick={() => deleteGang(rowData.id)}
          tooltip="Delete Gang"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Manage Your Gangs</h2>

      <DataTable 
        value={gangs} 
        paginator 
        rows={5} 
        responsiveLayout="scroll" 
        emptyMessage="No gangs created yet."
      >
        <Column field="name" header="Gang Name" body={nameTemplate} sortable />
        <Column field="faction" header="Faction" sortable />
        <Column field="credits" header="Credits" sortable />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </div>
  );
}

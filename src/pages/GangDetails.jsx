// src/pages/GangDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function GangDetails() {
  const { id } = useParams(); // get gang id from the URL
  const navigate = useNavigate();
  const [gang, setGang] = useState(null);

  useEffect(() => {
    const storedGangs = JSON.parse(localStorage.getItem('gangs')) || [];
    const foundGang = storedGangs.find(g => g.id === id);
  
    if (foundGang) {
      // Ensure fighters array exists
      if (!foundGang.fighters) {
        foundGang.fighters = [];
      }
      setGang(foundGang);
    }
  }, [id]);
  

  const addFighter = () => {
    // Navigate to Add Fighter Page (we'll create it soon)
    navigate(`/gang/${id}/add-fighter`);
  };

  const deleteFighter = (fighterId) => {
    const updatedGang = {
      ...gang,
      fighters: gang.fighters.filter(f => f.id !== fighterId),
    };
    updateGangInStorage(updatedGang);
  };

  const updateGangInStorage = (updatedGang) => {
    const storedGangs = JSON.parse(localStorage.getItem('gangs')) || [];
    const updatedGangs = storedGangs.map(g => g.id === updatedGang.id ? updatedGang : g);
    localStorage.setItem('gangs', JSON.stringify(updatedGangs));
    setGang(updatedGang);
  };

  if (!gang) return <p className="p-4">Loading gang data...</p>;

  return (
    <div className="p-4">
      <Button label="Back" icon="pi pi-arrow-left" className="p-button-secondary mb-4" onClick={() => navigate(-1)} />

      <h2 className="text-2xl mb-2">{gang.name}</h2>
      <p><strong>Faction:</strong> {gang.faction}</p>
      <p><strong>Credits:</strong> {gang.credits}</p>

      <div className="my-4">
        <Button label="Add Fighter" icon="pi pi-plus" className="p-button-success" onClick={addFighter} />
      </div>

      <h3 className="text-xl mb-2">Fighters</h3>

      <DataTable value={gang.fighters || []} emptyMessage="No fighters yet." responsiveLayout="scroll">
        <Column field="name" header="Name" />
        <Column field="role" header="Role" />
        <Column field="cost" header="Cost" />
        <Column body={(rowData) => (
          <Button 
            icon="pi pi-trash" 
            className="p-button-danger p-button-sm" 
            onClick={() => deleteFighter(rowData.id)}
          />
        )} header="Actions" />
      </DataTable>
    </div>
  );
}

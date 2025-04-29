// src/pages/AddFighter.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

export default function AddFighter() {
  const { id } = useParams(); // gang id
  const navigate = useNavigate();

  const [gang, setGang] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [cost, setCost] = useState('');

  const roles = [
    { label: 'Leader', value: 'Leader' },
    { label: 'Champion', value: 'Champion' },
    { label: 'Ganger', value: 'Ganger' },
    { label: 'Juve', value: 'Juve' },
    { label: 'Specialist', value: 'Specialist' },
  ];

  useEffect(() => {
    const storedGangs = JSON.parse(localStorage.getItem('gangs')) || [];
    const foundGang = storedGangs.find(g => g.id === id);
    setGang(foundGang);
  }, [id]);

  const saveFighter = () => {
    if (!name || !role || !cost) {
      alert('Please fill all fields');
      return;
    }

    const newFighter = {
      id: crypto.randomUUID(),
      name,
      role,
      cost: parseInt(cost),
    };

    const updatedGang = {
      ...gang,
      fighters: [...(gang.fighters || []), newFighter],
    };

    const storedGangs = JSON.parse(localStorage.getItem('gangs')) || [];
    const updatedGangs = storedGangs.map(g => g.id === updatedGang.id ? updatedGang : g);

    localStorage.setItem('gangs', JSON.stringify(updatedGangs));

    navigate(`/gang/${id}`); // Redirect back to gang page
  };

  if (!gang) return <p className="p-4">Loading gang data...</p>;

  return (
    <div className="p-4 flex flex-column gap-4">
      <Button label="Back" icon="pi pi-arrow-left" className="p-button-secondary" onClick={() => navigate(-1)} />

      <h2 className="text-2xl">Add Fighter to {gang.name}</h2>

      <div className="flex flex-column gap-2">
        <label>Name</label>
        <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter fighter name" />
      </div>

      <div className="flex flex-column gap-2">
        <label>Role</label>
        <Dropdown value={role} options={roles} onChange={(e) => setRole(e.value)} placeholder="Select role" />
      </div>

      <div className="flex flex-column gap-2">
        <label>Cost</label>
        <InputText value={cost} onChange={(e) => setCost(e.target.value)} keyfilter="int" placeholder="Enter cost (credits)" />
      </div>

      <Button label="Save Fighter" icon="pi pi-check" className="p-button-success" onClick={saveFighter} />
    </div>
  );
}

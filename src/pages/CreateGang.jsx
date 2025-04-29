// src/pages/CreateGang.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import useToast from '../components/ToastContext';

export default function CreateGang() {
  const [name, setName] = useState('');
  const [faction, setFaction] = useState('');
  const [credits, setCredits] = useState(1000);  // default to 1000 credits
  const navigate = useNavigate();
  const { showToast } = useToast(); // Using our Toast context!

  const factions = [
    { label: 'Goliath', value: 'Goliath' },
    { label: 'Escher', value: 'Escher' },
    { label: 'Orlock', value: 'Orlock' },
    { label: 'Van Saar', value: 'Van Saar' },
    { label: 'Cawdor', value: 'Cawdor' },
    { label: 'Delaque', value: 'Delaque' },
  ];

  const handleSubmit = () => {
    if (!name || !faction) {
      showToast('Please fill out all fields!', 'warn'); // Use Toast instead of alert
      return;
    }

    const newGang = {
      id: crypto.randomUUID(),
      name,
      faction,
      credits: parseInt(credits),
      fighters: [], // Always start with an empty fighters array
    };

    const storedGangs = JSON.parse(localStorage.getItem('gangs')) || [];
    storedGangs.push(newGang);
    localStorage.setItem('gangs', JSON.stringify(storedGangs));

    showToast('Gang created successfully!', 'success'); // 🎉 Success toast

    // Give a slight delay before navigating, so user can see the toast
    setTimeout(() => {
      navigate('/manage-gangs');
    }, 1000); // 1 second delay
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Create New Gang</h2>
      
      <Card className="w-30rem mx-auto p-4">
        <div className="flex flex-column gap-3">
          <span className="p-float-label">
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="name">Gang Name</label>
          </span>

          <span className="p-float-label">
            <Dropdown 
              id="faction" 
              value={faction} 
              options={factions} 
              onChange={(e) => setFaction(e.value)} 
              optionLabel="label" 
              placeholder="Select Faction" 
            />
            <label htmlFor="faction">Faction</label>
          </span>

          <span className="p-float-label">
            <InputText 
              id="credits" 
              value={credits} 
              onChange={(e) => setCredits(e.target.value)} 
              type="number" 
            />
            <label htmlFor="credits">Starting Credits</label>
          </span>

          <Button 
            label="Create Gang" 
            icon="pi pi-check" 
            className="p-button-success" 
            onClick={handleSubmit} 
          />
        </div>
      </Card>
    </div>
  );
}

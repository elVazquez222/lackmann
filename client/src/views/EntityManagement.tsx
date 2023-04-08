import React, { useEffect, useState } from 'react';
import EntityForm from '../components/EntityForm';
import EntityList from '../components/EntityList';

interface Property {
  id: string;
  description: string;
  type: string;
}

interface Entity {
  id: string;
  name: string;
  description: string;
  properties: Property[];
}

const EntityManagement: React.FC = () => {
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [entities, setEntities] = useState<Entity[]>([]);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    const response = await fetch('http://localhost:5000/entities');
    const data = await response.json();
    setEntities(data);
  };

  const handleCreateEntity = async (entity: { id: number; name: string; description: string; properties: Property[] }) => {
    const response = await fetch('http://localhost:5000/entities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    });

    if (response.ok) {
      const newEntity: Entity = await response.json() as Entity;
      setEntities([...entities, newEntity]);
      setShowModal(false);
    } else {
      console.error('Error creating entity');
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Create New Entity</button>
      {showModal && (
        <div>
          <EntityForm onSubmit={handleCreateEntity} />
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
      <EntityList entities={entities} />
    </div>
  );
};

export default EntityManagement;

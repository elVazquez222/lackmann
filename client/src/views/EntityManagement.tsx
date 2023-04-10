import React, { useEffect, useState } from 'react';
import EntityForm from '../components/EntityForm';
import EntityList from '../components/EntityList';
import { createEntity, getAllEntities } from '../services/entityService';
import { Property, Entity } from '../types/Entity';

const EntityManagement: React.FC = () => {
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [entities, setEntities] = useState<Entity[]>([]);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    const data = await getAllEntities();
    setEntities(data);
  };

  const handleCreateEntity = async (entity: { id: number; name: string; description: string; properties: Property[] }) => {
    const newEntity = await createEntity(entity);
    setEntities([...entities, newEntity]);
    setShowModal(false);
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

import React, { useEffect, useState } from 'react';
import EntityForm from '../components/EntityForm';
import EntityList from '../components/EntityList';
import { createEntity, getAllEntities } from '../services/entityService';
import { Entity, Property } from '../types/Entity';


const EntityManagement: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [entities, setEntities] = useState<Entity[]>([]);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    const data = await getAllEntities();
    setEntities(data);
  };

  const handleCreateEntity = async (entity: {
    id: number;
    name: string;
    description: string;
    properties: Property[];
  }) => {
    const newEntity = await createEntity(entity);
    setEntities([...entities, newEntity]);
    setShowModal(false);
  };

  return (
    <div className="entityManagement component">
      {!showModal && (
        <button onClick={() => setShowModal(true)}>Entität anlegen</button>
      )}
      {showModal && (
        <div className="modal">
          <button className="closeEntityFormBtn" onClick={() => setShowModal(false)}>X</button>
          <EntityForm onSubmit={handleCreateEntity} />
        </div>
      )}
      <EntityList entities={entities} />
    </div>
  );
};

export default EntityManagement;

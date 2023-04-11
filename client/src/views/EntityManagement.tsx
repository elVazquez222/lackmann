import React, { useEffect, useState } from 'react';
import EntityForm from '../components/EntityForm';
import EntityList from '../components/EntityList';
import { createEntity, getAllEntities } from '../services/entityService';
import { Entity, Property } from '../types/Entity';


const EntityManagement: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isNewEntity, setIsNewEntity] = useState<boolean>(false);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    const data = await getAllEntities();
    if (JSON.stringify(data) !== JSON.stringify(entities)) {
      setEntities(data);
    }
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
    setIsNewEntity(false);
  };

  return (
    <div className="entityManagement component">
      <h2>Entitäten:</h2>
      <div className="entityDropdown">
        <select onChange={(e) => setIsNewEntity(e.target.value === 'new')}>
          <option value="">-- vorhandene Entität auswählen --</option>
          {entities.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
          <option value="new">-- neue Entität anlegen --</option>
        </select>
        {isNewEntity && (
          <div className="modal">
            <button className="closeEntityFormBtn" onClick={() => setIsNewEntity(false)}>X</button>
            <EntityForm onSubmit={handleCreateEntity} />
          </div>
        )}
      </div>
      <EntityList entities={entities} />
    </div>
  );
};

export default EntityManagement;

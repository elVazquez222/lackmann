import React, { ChangeEvent, FormEvent, useState } from 'react';
import { EntityDataType, Property } from '../types/Entity';


interface EntityFormProps {
  onSubmit: (entity: { id: number; name: string; description: string; properties: Property[] }) => void;
  cancelAddEntity: () => void;
}

const EntityForm: React.FC<EntityFormProps> = ({ onSubmit, cancelAddEntity }) => {
  const [id, setId] = useState<number>(Math.random());
  const [name, setName] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ id, name, description, properties });
  };

  const handleAddProperty = () => {
    setProperties([...properties, { id: `id_${Math.random()}`, description: '', dataType: 'string' }]);
  };

  const handlePropertyChange = (index: number, key: keyof Property, value: EntityDataType) => {
    const newProperties = [...properties];
    newProperties[index][key] = value;
    setProperties(newProperties);
  };

  const handleRemoveProperty = (index: number) => {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  };

  return (
    <form className="entityForm">
        <span className="textButton" onClick={cancelAddEntity}>Abbrechen</span>
      <div>
        <label>ID:</label>
        <input value={id} type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => setId(Number(e.target.value))} />
      </div>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
      </div>
      <div>
        <label>Beschreibung:</label>
        <input value={description} onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
      </div>

      <div>
        <h3>Eigenschaften:</h3>
        {properties.map((property, index) => (
          <div key={index} className="propertyForm">
            <input
              value={property.id}
              style={{display: 'none'}}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handlePropertyChange(index, 'id', e.target.value as EntityDataType)}
            />

            <div>
              <label>Beschreibung:</label>
              <input
                value={property.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlePropertyChange(index, 'description', e.target.value as EntityDataType)}
              />
            </div>

            <div>
              <label>Typ:</label>
              <select
                value={property.dataType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePropertyChange(index, 'dataType', e.target.value as EntityDataType)}
              >
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="boolean">boolean</option>
                <option value="date">date</option>
                <option value="dateTime">dateTime</option>
                <option value="time">time</option>
              </select>
            </div>

            <span className="textButton" onClick={() => handleRemoveProperty(index)}>entfernen</span>
          </div>
        ))}
        <button type="button" onClick={handleAddProperty}>Eigenschaft +</button>
      </div>

      <span className="formSubmitButton" onClick={handleSubmit}>Erstellen</span>
    </form>
  );
};

export default EntityForm;

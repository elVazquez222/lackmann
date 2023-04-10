import React, { ChangeEvent, FormEvent, useState } from 'react';
import { EntityDataType, Property } from '../types/Entity'


interface EntityFormProps {
  onSubmit: (entity: { id: number; name: string; description: string; properties: Property[] }) => void;
}

const EntityForm: React.FC<EntityFormProps> = ({ onSubmit }) => {
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

  const handlePropertyChange = (index: number, key: keyof Property, value: string) => {
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
    <form onSubmit={handleSubmit}>
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
          <div key={index}>
            <label>ID:</label>
            <input value={property.id} onChange={(e: ChangeEvent<HTMLInputElement>) => handlePropertyChange(index, 'id', e.target.value)} />

            <label>Beschreibung:</label>
            <input value={property.description} onChange={(e: ChangeEvent<HTMLInputElement>) => handlePropertyChange(index, 'description', e.target.value)} />

            <label>Typ:</label>
            <select value={property.dataType} onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePropertyChange(index, 'dataType', e.target.value)}>
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="date">date</option>
              <option value="dateTime">dateTime</option>
              <option value="time">time</option>
              <option value="object">object</option>
              <option value="array">array</option>
            </select>

            <button type="button" onClick={() => handleRemoveProperty(index)}>entfernen</button>
          </div>
        ))}
        <button type="button" onClick={handleAddProperty}>Eigenschaft +</button>
      </div>

      <button type="submit">Erstellen</button>
    </form>
  );
};

export default EntityForm;

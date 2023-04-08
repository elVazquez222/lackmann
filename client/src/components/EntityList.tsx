import React from 'react';

type Property = {
  id: string;
  description: string;
  type: string;
};

type Entity = {
  id: string;
  name: string;
  description: string;
  properties: Property[];
};

type EntityListProps = {
  entities: Entity[];
};

const EntityList: React.FC<EntityListProps> = ({ entities }) => {
  return (
    <div>
      <h2>Entity List</h2>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>
            <strong>{entity.name}</strong> - {entity.description}
            <ul>
              {entity.properties.map((property) => (
                <li key={property.id}>
                  {property.id}: {property.description} ({property.type})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityList;

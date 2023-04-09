import React from 'react';
import { Entity } from '../types/Entity'

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
                  {property.id}: {property.description} ({property.dataType})
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

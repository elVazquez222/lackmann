import React from 'react';
import { Entity } from '../types/Entity';

type EntityListProps = {
  entities: Entity[];
};

const EntityList: React.FC<EntityListProps> = ({ entities }) => {
  return (
    <div className="entityList">
      <h2>Entitäten:</h2>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>
            <div className="entityInfo">
              <strong>{entity.name}</strong>
              <p>{entity.description}</p>
            </div>
            {entity.properties.length > 0 && (
              <ul className="propertyList">
                {entity.properties.map((property) => (
                  <li key={property.id}>
                    <div className="propertyInfo">
                      <p>{property.description}</p>
                    </div>
                    <div className="dataType">({property.dataType})</div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityList;

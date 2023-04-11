import * as entityService from '../services/entityService';

describe('entityService', () => {
  describe('createEntity', () => {
    it('should create a new entity', async () => {
      const entityData = {
        id: 1,
        name: 'Test Entity',
        description: 'This is a test entity',
        properties: [
          { id: 'id_1', description: 'Property 1', dataType: 'string' },
          { id: 'id_2', description: 'Property 2', dataType: 'number' },
        ],
      };

      const newEntity = await entityService.createEntity(entityData);

      expect(newEntity.id).toEqual(entityData.id);
      expect(newEntity.name).toEqual(entityData.name);
      expect(newEntity.description).toEqual(entityData.description);
      expect(newEntity.properties).toEqual(entityData.properties);
    });
  });

  describe('getAllEntities', () => {
    it('should return an array of entities', async () => {
      const entities = await entityService.getAllEntities();

      expect(entities).toBeInstanceOf(Array);
      expect(entities.length).toBeGreaterThan(0);
    });
  });
});

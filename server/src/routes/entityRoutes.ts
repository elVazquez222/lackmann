import { Router } from 'express';
import * as entityService from '../services/entityService';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const entityData = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      properties: req.body.properties,
      tenantId: req.body.tenantId,
    };

    const createdEntity = await entityService.createEntity(entityData);
    res.json(createdEntity);
  } catch (error) {
    res.status(500).json({ message: 'Error creating entity' });
  }
});

router.get('/', async (req, res) => {
  try {
    const entities = await entityService.getAllEntities();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all entities' });
  }
});

router.get('/:entityId', async (req, res) => {
  try {
    const entityId = req.params.entityId;
    const entity = await entityService.getEntityById(entityId);
    res.json(entity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entity' });
  }
});

router.put('/:entityId', async (req, res) => {
  try {
    const entityId = req.params.entityId;
    const entityData = req.body;
    const updatedEntity = await entityService.updateEntity(entityId, entityData);
    res.json(updatedEntity);
  } catch (error) {
    res.status(500).json({ message: 'Error updating entity' });
  }
});

router.delete('/:entityId', async (req, res) => {
  try {
    const entityId = req.params.entityId;
    const deletedEntity = await entityService.deleteEntity(entityId);
    res.json(deletedEntity);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting entity' });
  }
});

export default router;

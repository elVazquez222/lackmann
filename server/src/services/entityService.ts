import Entity from "../models/Entity";

export const createEntity = async (entityData: {
  id: string;
  name: string;
  description: string;
  properties: {
    id: string;
    description: string;
    dataType: string;
    formatPattern?: string;
    selectionSource?: string;
  }[];
  tenantId?: string;
}) => {
  const entity = new Entity(entityData);
  await entity.save();
  return entity.toObject();
};

export const getAllEntities = async () => {
  const entities = await Entity.find().lean();
  return entities;
};

export const getEntityById = async (entityId: string) => {
  const entity = await Entity.findById(entityId).lean();
  return entity;
};

export const updateEntity = async (
  entityId: string,
  entityData: {
    name?: string;
    description?: string;
    properties?: {
      id?: string;
      description?: string;
      dataType?: string;
      formatPattern?: string;
      selectionSource?: string;
    }[];
    tenantId?: string;
  }
) => {
  const updatedEntity = await Entity.findByIdAndUpdate(
    entityId,
    entityData,
    { new: true }
  ).lean();
  return updatedEntity;
};

export const deleteEntity = async (entityId: string) => {
  const deletedEntity = await Entity.findByIdAndDelete(entityId).lean();
  return deletedEntity;
};

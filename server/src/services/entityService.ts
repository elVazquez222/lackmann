import { EntityModel } from "../schemas/entities";

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
  const entity = new EntityModel(entityData);
  await entity.save();
  return entity.toObject();
};

export const readEntity = async (entityId: string) => {
  const entity = await EntityModel.findById(entityId).lean();
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
  const updatedEntity = await EntityModel.findByIdAndUpdate(
    entityId,
    entityData,
    { new: true }
  ).lean();
  return updatedEntity;
};

export const deleteEntity = async (entityId: string) => {
  const deletedEntity = await EntityModel.findByIdAndDelete(entityId).lean();
  return deletedEntity;
};

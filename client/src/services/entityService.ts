import { API_URL } from "./api-config";

export const createEntity = async (entityData: any): Promise<any> => {
  const response = await fetch(`${API_URL}/entities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entityData),
  });
  return response.json();
};

export const getAllEntities = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/entities`);
  return response.json();
};

export const getEntityById = async (entityId: string): Promise<any> => {
  const response = await fetch(`${API_URL}/entities/${entityId}`);
  return response.json();
};

export const updateEntity = async (
  entityId: string,
  entityData: any
): Promise<any> => {
  const response = await fetch(`${API_URL}/entities/${entityId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entityData),
  });
  return response.json();
};

export const deleteEntity = async (entityId: string): Promise<any> => {
  const response = await fetch(`${API_URL}/entities/${entityId}`, {
    method: 'DELETE',
  });
  return response.json();
};

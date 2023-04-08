import { Schema, model } from 'mongoose';

export interface Property {
  id: string;
  description: string;
  dataType: 'string' | 'number' | 'boolean' | 'date' | 'dateTime' | 'time' | 'object' | 'array';
  formattingPattern?: string;
  source?: string;
}

interface Entity {
  id: string;
  name: string;
  description: string;
  properties?: Property[];
  tenantId?: string;
}

const propertySchema = new Schema<Property>({
  id: { type: String, required: true },
  description: { type: String, required: true },
  dataType: { type: String, required: true },
  formattingPattern: { type: String },
  source: { type: String },
});

const entitySchema = new Schema<Entity>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  properties: { type: [propertySchema], required: true },
  tenantId: { type: String },
});

const EntityModel = model<Entity>('Entity', entitySchema);
export default EntityModel;
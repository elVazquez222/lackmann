export type EntityDataType = 'string' | 'number' | 'boolean' | 'date' | 'dateTime' | 'time';

export interface Property {
  id: string;
  description: string;
  dataType: EntityDataType;
  formattingPattern?: string;
  source?: string;
}

export interface Entity {
  id: string;
  name: string;
  description: string;
  properties: Property[];
  tenantId?: string;
}

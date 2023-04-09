export interface Property {
  id: string;
  description: string;
  dataType: 'string' | 'number' | 'boolean' | 'date' | 'dateTime' | 'time' | 'object' | 'array';
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

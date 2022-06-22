export interface MemoryRecord {
  id: number;
  code: string;
  content: string;
  creationDate: string;
}

export interface EquipmentRecord {
  uuid: string;
  imageBase64: string;
  parseString?: string;
}

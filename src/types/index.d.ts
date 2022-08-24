export interface MemoryRecord {
  id: number;
  code: string;
  content: string;
  creationDate: string;
}

export interface EquipmentRecord {
  imageBase64: string;
  parseString: string;
}

export interface CharacterRecord {
  url: string;
  name: string;
}

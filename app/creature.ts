export interface Creature {
  id: number;
  name: string;
  type: string;
  subtype?:string;
  
  strength: number;
  dexterity: number;
  hitPoints:number;
  maxHitPoints:number;
  attackSpeed:number;
  level:number;
  experienceIfKilled?:number;
}

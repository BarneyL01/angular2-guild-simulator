export interface Creature {
  id: number;
  name: string;
  
  strength: number;
  dexterity: number;
  hitPoints:number;
  maxHitPoints:number;
  attackSpeed:number;
  level:number;
  experienceIfKilled?:number;
  
}

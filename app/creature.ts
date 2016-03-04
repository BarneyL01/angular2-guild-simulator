export interface Creature {
  id: string;
  name: string;
  type: string;
  subtype?:string;
  
  armourClass: number;
  hitPoints:number;
  maxHitPoints:number;
  strength:number;
  dexterity: number;
  reflex: number;
  attackSpeed:number;
  weaponAttackAccuracy:number;
  damageRoll:number;
  damageModifier:number;
  level:number;
  experienceIfKilled?:number;
  
}

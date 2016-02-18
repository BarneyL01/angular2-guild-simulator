export interface Hit {
  attacker:string;
  defender:string;
  hitConnected:boolean;
  damage?:number;
  remainingHp?:number;
}

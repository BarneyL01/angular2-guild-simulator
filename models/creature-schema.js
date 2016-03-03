var mongoose = require('mongoose');

var CreatureSchema = new mongoose.Schema({
  name: String,
  type: String,
  subtype:String,
  
  strength: Number,
  dexterity: Number,
  hitPoints:Number,
  maxHitPoints:Number,
  attackSpeed:Number,
  level:Number,
  experienceIfKilled:Number
});

mongoose.model('Creature', CreatureSchema);
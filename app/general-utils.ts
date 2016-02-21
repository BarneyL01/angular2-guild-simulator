var GeneralUtils = {
    
    rollDice: function(diceSides:number, modifier:number):number{
        return Math.floor((Math.random() * diceSides) + modifier);
    },
    
    randomNumber: function (numOutOf:number){
        return Math.floor(Math.random()*numOutOf);
    }
    
}
export default GeneralUtils;
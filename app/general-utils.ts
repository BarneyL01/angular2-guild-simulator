var GeneralUtils = {
    
    rollDice: function(diceSides:number, modifier:number):number{
        return Math.floor((Math.random() * diceSides) + modifier);
    },
    
    randomNumber: function (numOutOf:number){
        return this.randomIntFromInterval(0, numOutOf);
    },
    
    randomIntFromInterval: function(min: number, max: number)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    },
    
    copyObject: function<T>(object:T): T {
        var objectCopy = <T>{};

        for (var key in object)
        {
            if (object.hasOwnProperty(key))
            {
                objectCopy[key] = object[key];
            }
        }

        return objectCopy;
    }
    
}
export default GeneralUtils;
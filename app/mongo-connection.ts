import mongodb = require('mongodb');

export class MongoConnection {
    runMongoClient() {
        var server = new mongodb.Server('localhost', 27017)
        var db = new mongodb.Db('mydb', server, { w: 1 });
        db.open(function() {});
        
        // mongodb.MongoClient.connect(`mongodb://ds017678.mlab.com:17678/guild-sim01`, 
        //     function(err, db) {
        //         // if(err) throw err;
        //         // var collection:mongodb.Collection = db.collection('heroes');
        //         // collection.find({}).toArray(
        //         //     function(err, results) {
        //         //         // console.dir(results);
        //         //         // Let's close the db
        //         //         db.close();
        //         //     });
        // });
    }
}


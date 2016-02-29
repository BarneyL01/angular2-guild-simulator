// /// <reference path='./_scripts/typings/mongodb/mongodb.d.ts' />

import mongodb = require('mongodb');
export class MongoConnection {
    runMongoClient() {
        var server = new mongodb.Server('mongodb://ds017678.mlab.com', 17678)
        var db = new mongodb.Db('guild-sim01', server);
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


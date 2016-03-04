var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Creature = mongoose.model('Creature');

/**
 * Creature Routes:
 */
router.get('/creatures', function(req, res, next) {
    
  Creature.find(function(err, creatures){
    if(err){ return next(err); }

    res.json(creatures);
  });
});

router.post('/creatures', function (req, res, next) {
    var creature = new Creature(req.body);

    creature.save(function (err, creature) {
        if (err) { return next(err); }

        res.json(creature);
    });
});

router.get('/creatures/:id', function(req, res, next) {
    var id = router.params.id;
    console.log('blah:', id);
  var query = Creature.findById(id);

  query.exec(function (err, creature){
    if (err) { return next(err); }
    if (!creature) { return next(new Error('can\'t find creature: ' + id)); }

    req.creature = creature;
    return next();
  });
});

router.param('creature', function (req, res, next, id) {
    var query = Creature.findById(id);
    console.log('single Creature:', id);

    query.exec(function (err, creature) {
        if (err) { return next(err); }
        if (!creature) { return next(new Error('can\'t find creature')); }

        req.creature = creature;
        return next();
    });
});


// router.get('/posts', function(req, res, next) {
//   Post.find(function(err, posts){
//     if(err){ return next(err); }

//     res.json(posts);
//   });
// });

// router.post('/posts', function(req, res, next) {
//   var post = new Post(req.body);

//   post.save(function(err, post){
//     if(err){ return next(err); }

//     res.json(post);
//   });
// });

// router.param('post', function(req, res, next, id) {
//   var query = Post.findById(id);

//   query.exec(function (err, post){
//     if (err) { return next(err); }
//     if (!post) { return next(new Error('can\'t find post')); }

//     req.post = post;
//     return next();
//   });
// });

// router.get('/posts/:post', function(req, res) {
//   res.json(req.post);
// });

module.exports = router;




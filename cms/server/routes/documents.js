var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');
var Document = require('../models/document');

router.get('/', function(req, res, next){
  Document.find({}).exec(function(err, documents){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: documents
    });
  });
});

router.post('/', function(req, res, next){
  var maxDocumentId = sequenceGenerator.nextId("maxDocumentsId");

  var document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  document.save(function(err, result){
    res.header('Content-Type', 'application/json');

    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Document was saved',
      obj: result
    });
  });
});

router.patch('/:id', function(req, res, next){
  Document.findOne({id: req.params.id}, function(err, document){

    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!document){
      return res.status(500).json({
        title: 'No document found',
        error: {message: 'Document not found'}
      });
    }
    document.name = req.body.name;
    document.url = req.body.url;
    document.id = req.body.id;

    document.save(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Document updated',
        obj: result
      });
    });
  });
});


router.delete('/:id', function(req, res, next){
  Document.findOne({id: req.params.id}, function(err, document){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!document){
      return res.status(500).json({
        title: 'No document found',
        error: {message: 'Document not found'}
      });
    }

    document.remove(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Document deleted',
        obj: result
      });
    });
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');
var Contact = require('../models/contact');

router.get('/', function(req, res, next){
  Contact.find().populate('group').exec(function(err, contacts){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: contacts
    });
  });
});


router.post('/', function(req, res, next){
  var maxContactId = sequenceGenerator.nextId("maxContactsId");

  var groupIds = [];
  var oneGroup = req.body.group;
  for(var i = 0; i < oneGroup.length; i++){
    var groupContact = oneGroup[i];
    groupIds[i] = groupContact.id;
  }

  Contact.find()
    .where('id')
    .in(groupIds)
    .exec(function(err, ids){

    if(err){
      return res.status(500).json({
        title: 'Invalid group - group not found',
        error: err
      });
    }

      if(!ids){
        return res.status(500).json({
          title: 'Invalid group - group not found',
          error: err
        });
      }

  var contact = new Contact({
    contactId: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: ids
  });
  contact.save(function(err, result){
    res.header('Content-Type', 'application/json');

    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Contact was saved',
      obj: result
    });
   });
  });
});

router.patch('/:id', function(req, res, next) {
  Contact.findOne({id: req.params.contactId}, function (err, contact) {
    console.log(req.params.id);
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No contact found',
        error: {message: 'Contact not found'}
      });
    }

    var groupIds = [];
    var oneGroup = req.body.group;
    for (var i = 0; i < oneGroup.length; i++) {
      var groupContact = oneGroup[i];
      groupIds[i] = groupContact.id;
    }

    Contact.find()
      .where('id')
      .in(groupIds)
      .exec(function (err, ids) {

        if (err) {
          return res.status(500).json({
            title: 'Invalid group - group not found',
            error: err
          });
        }

        if (!ids) {
          return res.status(500).json({
            title: 'Invalid group - group not found',
            error: err
          });
        }


        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.id = req.body.id;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = ids;


        contact.save(function (err, result) {
          if (err) {
            return res.status(500).json({
              title: 'An error occurred',
              error: err
            });
          }
          res.status(200).json({
            message: 'Contact updated',
            obj: result
          });
        });
      });
  });
});

router.delete('/:id', function(req, res, next){
  Contact.findOne({contactId: req.params.id}, function(err, contact){
    console.log(req.params.id);
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!contact){
      return res.status(500).json({
        title: 'No contact found',
        error: {message: 'Contact not found'}
      });
    }

    contact.remove(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Contact deleted',
        obj: result
      });
    });
  });
});

module.exports = router;

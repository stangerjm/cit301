var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');
var Message = require('../models/message');
var Contact = require('../models/contact');

router.get('/', function(req, res, next){
  Message.find().populate('sender').exec(function(err, message){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: message
    });
  });
});

router.post('/', function(req, res, next){
  var maxMessageId = sequenceGenerator.nextId("maxMessagesId");

  Contact.findOne({'id': req.body.sender.id}, {'_id': 1}, function(err, contactId){
    if(err){
      return res.status(500).json({
        title: 'Invalid sender - sender not found',
        error: err
      });
    }

    if(!contactId){
      return res.status(500).json({
        title: 'Invalid sender - sender not found',
        error: err
      });
    }


  var message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    text: req.body.text,
    sender: contactId
  });
  message.save(function(err, result){
    res.header('Content-Type', 'application/json');

    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
  });
 });
});



module.exports = router;

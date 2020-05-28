const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/signup', (req, res, next) => {
  // User signup API securing password of user using bcrypt
  // Using jwt for Authentication and Authorization

  User.find({ email: req.body.email }).exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(409).json({
          message: 'Mail exist'
        })
      } else {
        bcrypt.hash(req.body.pass, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err
            })
          } else {

            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              pass: hash
            });
            user.save()
              .then(result => {
                console.log(result);
                res.status(200).json({
                  result
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                })
              });

          }
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
})

router.post('/login', (req, res, next) => {
  // User Login API 

  User.find({ email: req.body.email }).exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Not Authorized'
        })
      }
      bcrypt.compare(req.body.pass, user[0].pass, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth fail'
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            'secret',
            {
              expiresIn: '1hr'
            }
          )
          return res.status(200).json({
            message: 'Auth Successfull',
            token: token
          })
        }
        res.status(500).json({
          message: 'Not Authorized'
        })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
})

router.delete('/:userId', (req, res, next) => {
  // API for deleting a user
  User.remove({ _id: req.params.userId }).exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'User Deleted'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
})


module.exports = router;
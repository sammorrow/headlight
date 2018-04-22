const express = require('express');
const app = express();
const path = require('path')
const $PORT = process.env.PORT || 8080
const secrets = require('../secrets')
const axios = require('axios');
let multer = require('multer');
const bodyParser = require('body-parser');
const base64 = require('base-64')

let upload = multer();
var FormData = require('form-data');
var fs = require('fs');
 
app.listen($PORT, () => {
  console.log(`server listening on ${$PORT}`)
})

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use('/lookup', upload.fields([{name: 'image_contents'}]), (req, res) => {
    const api_key = require('../secrets').API_KEY
      url = 'https://www.headlightlabs.com/api/gcpd_lookup',
      data = {
        api_key,
        image_contents: req.body.image_contents
      }
    axios({
      method: 'post',
      url,
      data,
      config: { headers: {'Content-Type' : 'application/x-www-form-urlencoded'}}
    })
    .then(res => res.data)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.status(501).send(err)
    })
  })
  .use('/report', upload.fields([{name: 'image_contents'}]), (req, res) => {
    const api_key = require('../secrets').API_KEY
      url = 'https://www.headlightlabs.com/api/gcpd_report',
      data = {
        api_key,
        image_contents: req.body.image_contents
      }
    axios({
      method: 'post',
      url,
      data,
      config: { headers: {'Content-Type' : 'application/x-www-form-urlencoded'}}
    })
    .then(res => res.data)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.status(501).send(err)
    })
  })
  .use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })
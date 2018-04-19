#!/usr/bin/env node

const assert = require('assert');
const express = require('express');
const app = express();


const Datastore = require('nedb');
var db = new Datastore({filename:'/home/pi/traces.db', autoload:true});


app.get('/all', function(req, res) {

	db.find({},function(err, docs) {
		res.send(docs);
	});
});

app.get('/add', function(req, res) {

	db.insert({timestamp:new Date(), score:req.query.score}, function(err, newDoc) {
		res.send(newDoc);
	});

});

app.listen(8080, function() {
	console.log('app started')
})

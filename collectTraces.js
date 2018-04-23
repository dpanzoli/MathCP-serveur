#!/usr/bin/env node

const assert = require('assert');
const express = require('express');
const app = express();

const Datastore = require('nedb');
var db = new Datastore({filename:'/home/pi/traces.db', autoload:true});


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/all', function(req, res) {

	db.find({},function(err, docs) {
		res.send(docs);
	});
});

app.get('/add', function(req, res) {


	if (req.query.login && req.query.nombre) {
		db.insert(
			{
				timestamp: new Date(),
				login: req.query.login, 
				nombre:req.query.nombre, 
				temps: req.query.temps
			}, function(err, newDoc) {
				res.send(newDoc);
			}
		);
	} else {
		res.send({error:1, message:"pas de score"});
	}

});

app.listen(8080, function() {
	console.log('app started')
})

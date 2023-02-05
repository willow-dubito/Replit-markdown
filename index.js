const express = require('express');
const marked = require('marked');
const fs = require('fs')

const app = express();
app.set('view engine', 'ejs');

app.get('/*', function(req, res) {
	requestedPath = req.originalUrl;
	
	if (requestedPath == '/') {
		requestedPath = '/index'
	}

	let path = __dirname + '/markdown' + requestedPath + '.md';
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			console.log(err);
		}
		let content = marked(data.toString())
		res.render('index', {
			'title': process.env.REPL_SLUG.split('-'),
			'marked': content
		});
	});
});

app.listen(3000, () => {
	console.log('server started');
});
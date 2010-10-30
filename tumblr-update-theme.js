
var http = require('http'),
	querystring = require('querystring'),
	fs = require('fs');

var argv = process.argv;
if (argv.length != 6) {
	console.log('usage: node tumblr-update-theme.js email password account theme_file');
	process.exit(1);
}
var email = argv[2], password = argv[3], account = argv[4], theme = argv[5];

var tumblr = http.createClient(80, 'www.tumblr.com');
var request = tumblr.request('POST', '/login', {
	'host'        : 'www.tumblr.com',
	'content-type': 'application/x-www-form-urlencoded'
});
request.end(querystring.stringify({
	'email'      : email,
	'password'   : password
}));
request.on('response', function(response) {
	console.log('login:', response.statusCode);
	if (response.statusCode != 200) return;

	var cookie = response.headers['set-cookie'].map(function(cookie) {
		return (/([^;]+);/.exec(cookie)[1]);
	}).join('; ');

	var request = tumblr.request('GET', '/customize/'+account, {
		'host'  : 'www.tumblr.com',
		'cookie': cookie
	});
	request.end();
	request.on('response', function(response) {
		console.log('get form_key:', response.statusCode);
		if (response.statusCode != 200) return;

		response.setEncoding('utf8');
		var body = [];
		response.on('data', function (chunk) {
			body.push(chunk);
		});
		response.on('end', function() {
			var form_key = (/name="form_key" value="([^"]+)"/.exec(body) || [])[1];
			console.log('form_key:', form_key);

			fs.readFile(theme, function(error, data) {
				if (error) throw error;

				var boundary = 'apply-theme';
				var request = tumblr.request('POST', '/customize/'+account, {
					'host'        : 'www.tumblr.com',
					'cookie'      : cookie,
					'content-type': 'multipart/form-data; boundary='+boundary
				});
				request.end([
					'--'+boundary,
					'Content-Disposition: form-data; name="form_key"',
					'',
					form_key,
					'--'+boundary,
					'Content-Disposition: form-data; name="edit_tumblelog[custom_theme]"',
					'',
					data
				].join('\r\n'));
				request.on('response', function(response) {
					console.log('apply:', response.statusCode);
				});
			});
		});
	});
});

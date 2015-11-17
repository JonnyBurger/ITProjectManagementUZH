var _ = require('underscore');

exports.mapTweets = function(func, callback) {
	var rl = require('readline').createInterface({
		input: require('fs').createReadStream('tweets.txt')
	});
	var results = [];
	var linenumber = 0;
	rl.on('line', function (line) {
		var parts = line.split('\t');
		linenumber++;
		results.push(func({
			date: parts[3],
			text: parts[2]
		}));
		if (linenumber % 100 == 0) {
			console.log('Mapping tweets... ' + linenumber + ' processed.');
		}
	});

	rl.on('close', function () {
		callback(results);
	});

}

exports.mapTweets(function (obj) {
	return new Date(obj.date).getDay();
}, function (results) {
	var counts = _.countBy(results, function(result) {
		if (result == 0) return "Monday";
		if (result == 1) return "Tuesday";
		if (result == 2) return "Wednesday";
		if (result == 3) return "Thursday";
		if (result == 4) return "Friday";
		if (result == 5) return "Saturday";
		if (result == 6) return "Sunday";
	});
	console.log('How many tweets on each weekday?', counts);
});
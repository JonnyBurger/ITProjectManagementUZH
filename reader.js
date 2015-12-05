var _ = require('underscore');

exports.mapTweets = function(map, reduce, callback) {
	var rl = require('readline').createInterface({
		input: require('fs').createReadStream('tweets.txt')
	});
	var results = {};
	var linenumber = 0;
	rl.on('line', function (line) {
		if (linenumber % 100000 == 0) {
			callback({
				type: 'progress',
				count: linenumber
			});
			console.log('Mapping tweets... ' + linenumber + ' processed.');
		}

		var parts = line.split('\t');
		linenumber++;
		var date = new Date(parts[3]);
		var text = parts[2];
		if (!_.isDate(date)) return;
		if (!_.isString(text)) return;
		map({
			date: date,
			text: text
		}, (key, val) => {
			if (!key || key == 'undefined') return;
			if (!results[key]) {
				results[key] = [];
			}
			results[key].push(val);
		});
	});

	rl.on('close', function () {
		var endResults = {};

		_.each(results, (value, key) => {
			endResults[key] = reduce(key, value);
		});
		var sortedEndResults = {};
		var keys = _.sortBy(_.keys(endResults), exports.keyValue);
		_.each(keys, key => sortedEndResults[key] = endResults[key]);
		callback({
			type: 'end',
			results: sortedEndResults
		});
	});

}

exports.keyValue = function (key) {
	if (key == 'Monday' || key == 'Mon') return 0;
	if (key == 'Tuesday' || key == 'Tue') return 1;
	if (key == 'Wednesday' || key == 'Wed') return 2;
	if (key == 'Thursday' || key == 'Thu') return 3;
	if (key == 'Friday' || key == 'Fri') return 4;
	if (key == 'Saturday' || key == 'Sat') return 5;
	if (key == 'Sunday' || key == 'Sun') return 6;
	return key;
}
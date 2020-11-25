const fetch = require('node-fetch');
const fs = require('fs');

async function parse() {
	const reports = await getData('https://api.smartcasa.org/reports');
	const reportNumbers = reports.map((obj) => obj.id);
	const latestReport = Math.max(...reportNumbers);
	const reportPairs = pairwise(reportNumbers);
	const paragraphs = await getData('https://api.smartcasa.org/paragraphs');
	const paragraphNumbers = paragraphs.map((obj) => parseInt(obj.paragraphNumber)).sort((a, b) => a - b);
	data = {};
	data.headers = [ '' ];
	const rows = [];
	for (const report of reports) {
		data.headers.push(report.id);
	}
	for (const paragraph of paragraphNumbers) {
		const url = `https://api.smartcasa.org/paragraphs/${paragraph}/compliances`;
		const paragraphCompliances = await getData(url);
		if (paragraphCompliances.length == latestReport - 1) {
			rows.push(calculateScore(reportNumbers, paragraphCompliances, paragraphs));
		}
	}
	data.data = rows;
	fs.writeFileSync('./data.json', JSON.stringify(data));
}

async function getData(url) {
	const res = await fetch(url);
	const data = await res.json();
	return data.data;
}

function pairwise(arr) {
	let pairs = [];
	for (var i = 0; i < arr.length - 1; i++) {
		pairs.push([ arr[i], arr[i + 1] ]);
	}
	return pairs;
}

parse();

function calculateScore(reports, compliances, paragraphs) {
	const paragraphTitle = paragraphs.find((o) => o.paragraphNumber === compliances[0].paragraphId).paragraphTitle;
	const row = [ `${compliances[0].paragraphId} - ${paragraphTitle}` ];
	for (const report of reports) {
		const compliance = compliances
			.filter((item) => report == item.reportId)
			.map((item) => {
				var score = 0;
				if (item.operationalCompliance == 'In Compliance') {
					score += 1;
				}
				if (item.secondaryCompliance == 'In Compliance') {
					score += 1;
				}
				if (item.primaryCompliance == 'In Compliance') {
					score += 1;
				}
				return {
					reportId: item.reportId,
					score: score,
					paragraphId: item.paragraphId
				};
			})
			.sort((a, b) => (a.reportId < b.reportId ? 1 : b.reportId > a.reportId ? -1 : 0))
			.map((item) => {
				var obj = {};
				obj.paragraphId = item.paragraphId;
				//obj.change = Math.sign(change)
				obj.score = item.score;
				return obj;
			})[0];
		row.push(compliance.score);
	}
	return row;
}

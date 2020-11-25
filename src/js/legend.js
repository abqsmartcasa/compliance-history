function toggleLegend(style) {
	const scoreLegendItems = document.querySelectorAll('.js-score-legend-item');
	const changeLegendItems = document.querySelectorAll('.js-change-legend-item');
	if (style == 'change') {
		for (const item of changeLegendItems) {
			item.classList.remove('legend-item--hidden');
		}
		for (const item of scoreLegendItems) {
			item.classList.add('legend-item--hidden');
		}
	} else if (style == 'score') {
		for (const item of scoreLegendItems) {
			item.classList.remove('legend-item--hidden');
		}
		for (const item of changeLegendItems) {
			item.classList.add('legend-item--hidden');
		}
	}
}

export default toggleLegend;

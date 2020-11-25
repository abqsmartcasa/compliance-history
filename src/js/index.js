import mitt from 'mitt';
import { TableDisplayRadio, Table } from './table';
import { ImrSelect, ComplianceFilterRadio, FilterButton, ClearButton } from './filters';

import toggleLegend from './legend';

(async () => {
	const emitter = mitt();

	const table = new Table(emitter);
	const imrSelect = new ImrSelect(emitter);
	const radios = document.querySelectorAll('.js-compliance-change-radio');
	const changeFilter = new ComplianceFilterRadio(emitter, radios[0]);
	const increaseFilter = new ComplianceFilterRadio(emitter, radios[1]);
	const decreaseFilter = new ComplianceFilterRadio(emitter, radios[2]);
	new ClearButton(emitter);
	const filterBtn = new FilterButton(emitter);

	const tableDisplayRadios = document.querySelectorAll('.js-table-display-radio');
	tableDisplayRadios.forEach((elem) => new TableDisplayRadio(emitter, elem));

	emitter.on('set-imr-value', filterBtn.setImr);
	emitter.on('set-filter', filterBtn.setComplianceChange);

	emitter.on('filter', table.filter);

	emitter.on('clear', filterBtn.clear);
	emitter.on('clear', increaseFilter.clear);
	emitter.on('clear', changeFilter.clear);
	emitter.on('clear', decreaseFilter.clear);
	emitter.on('clear', imrSelect.clear);
	emitter.on('clear', table.reset);

	emitter.on('set-table-style', table.setTableDisplay);
	emitter.on('set-table-style', toggleLegend);

	fetch('./data.json').then((res) => res.json()).then((data) => {
		table.buildTable(data);
		const reports = [ ...data.headers.slice(1) ];
		imrSelect.buildOptions(reports);
	});
})();

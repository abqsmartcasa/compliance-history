import mitt from 'mitt';
import { TableDisplayRadio, Table } from './table';
import { ImrSelect, ComplianceFilterRadio, FilterButton, ClearButton } from './filters';
import Tooltip from './tooltip';
import toggleLegend from './legend';
import SectionLink from './section-link';
import SectionBtn from './section-btn';

(async () => {
	const emitter = mitt();

	const table = new Table(emitter);
	const imrSelect = new ImrSelect(emitter);
	const radios = document.querySelectorAll('.js-compliance-change-radio');
	const changeFilter = new ComplianceFilterRadio(emitter, radios[0]);
	const increaseFilter = new ComplianceFilterRadio(emitter, radios[1]);
	const decreaseFilter = new ComplianceFilterRadio(emitter, radios[2]);
	new ClearButton(emitter);
	const tooltip = new Tooltip();
	const filterBtn = new FilterButton(emitter);

	new SectionBtn(emitter);

	const tableDisplayRadios = document.querySelectorAll('.js-table-display-radio');
	tableDisplayRadios.forEach((elem) => new TableDisplayRadio(emitter, elem));

	const main = document.querySelector('.main');
	const subHeader = document.querySelector('.js-header__sub');
	const sectionLinks = document.querySelectorAll('.js-section-link');
	for (const sectionLink of sectionLinks) {
		new SectionLink(sectionLink);
	}

	emitter.on('set-imr-value', filterBtn.setImr);
	emitter.on('set-filter', filterBtn.setComplianceChange);

	emitter.on('show-value', tooltip.show);
	emitter.on('remove-value', tooltip.hide);

	emitter.on('filter', table.filter);

	emitter.on('clear', filterBtn.clear);
	emitter.on('clear', increaseFilter.clear);
	emitter.on('clear', changeFilter.clear);
	emitter.on('clear', decreaseFilter.clear);
	emitter.on('clear', imrSelect.clear);
	emitter.on('clear', table.reset);

	emitter.on('section-menu-open', () => {
		main.classList.add('main--extended');
		subHeader.classList.remove('header__sub--hidden');
	});

	emitter.on('section-menu-close', () => {
		main.classList.remove('main--extended');
		subHeader.classList.add('header__sub--hidden');
	});

	emitter.on('set-table-style', table.setTableDisplay);
	emitter.on('set-table-style', toggleLegend);
	emitter.on('set-table-style', tooltip.setLookup);

	fetch('./data.json').then((res) => res.json()).then((data) => {
		table.buildTable(data);
		const reports = [ ...data.headers.slice(1)];
		imrSelect.buildOptions(reports);
	});
})();

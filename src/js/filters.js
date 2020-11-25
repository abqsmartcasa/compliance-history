class ClearButton {
	constructor(emitter) {
		this.emitter = emitter;
		this.elem = document.querySelector('.js-clear-btn');

		this.onClick = this.onClick.bind(this);
		this.addEventListeners = this.addEventListeners.bind(this);

		this.addEventListeners();
	}

	addEventListeners() {
		this.elem.addEventListener('click', this.onClick);
	}

	onClick() {
		this.emitter.emit('clear');
	}
}

class ComplianceFilterRadio {
	constructor(emitter, elem) {
		this.emitter = emitter;
		this.elem = elem;
		this.onClick = this.onClick.bind(this);
		this.clear = this.clear.bind(this);

		this.addEventListeners = this.addEventListeners.bind(this);

		this.addEventListeners();
	}

	addEventListeners() {
		this.elem.addEventListener('click', this.onClick);
	}

	onClick(e) {
		this.emitter.emit('set-filter', e.target.value);
	}

	clear() {
		if (this.elem.checked) {
			this.elem.checked = false;
		}
	}
}

class ImrSelect {
	constructor(emitter) {
		this.elem = document.querySelector('.js-imr-select');

		this.emitter = emitter;

		this.onChange = this.onChange.bind(this);
		this.clear = this.clear.bind(this);
		this.addEventListeners = this.addEventListeners.bind(this);

		this.addEventListeners();
	}

	buildOptions(reports) {
		const frag = document.createDocumentFragment();
		for (const report of reports) {
			const option = document.createElement('option');
			option.innerText = `IMR-${report}`;
			option.value = report;
			frag.appendChild(option);
		}
		this.elem.appendChild(frag);
	}

	addEventListeners() {
		this.elem.addEventListener('change', this.onChange);
	}

	onChange(e) {
		this.emitter.emit('set-imr-value', e.target.value);
	}

	clear() {
		this.elem.value = 'placeholder';
	}
}

class FilterButton {
	constructor(emitter) {
		this.elem = document.querySelector('.js-filter-btn');
		this.filters = {};
		this.emitter = emitter;
		this.active = false;

		this.onClick = this.onClick.bind(this);
		this.setImr = this.setImr.bind(this);
		this.setActive = this.setActive.bind(this);
		this.clear = this.clear.bind(this);
		this.checkFilters = this.checkFilters.bind(this);
		this.setComplianceChange = this.setComplianceChange.bind(this);
		this.addEventListeners = this.addEventListeners.bind(this);

		this.addEventListeners();
	}

	addEventListeners() {
		this.elem.addEventListener('click', this.onClick);
	}

	setImr(data) {
		this.filters.imr = data;
		this.checkFilters();
	}

	setComplianceChange(data) {
		this.filters.compliance = data;
		this.checkFilters();
	}

	checkFilters() {
		if (this.filters.hasOwnProperty('compliance') && this.filters.hasOwnProperty('imr')) {
			this.setActive(true);
		}
	}

	clear() {
		this.filters = {};
		this.setActive(false);
	}

	setActive(status) {
		this.active = status;
		if (this.active) {
			this.elem.classList.add('filter-btn--active');
			this.elem.disabled = false;
		} else {
			this.elem.classList.remove('filter-btn--active');
			this.elem.disabled = true;
		}
	}

	onClick() {
		this.emitter.emit('filter', this.filters);
	}
}

export { ImrSelect, ComplianceFilterRadio, FilterButton, ClearButton };

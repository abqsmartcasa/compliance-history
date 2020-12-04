import { complianceValues, changeValues } from './constants';

class Tooltip {
	constructor() {
		this.elem = document.querySelector('.js-tooltip');
		this.body = document.querySelector('.js-tooltip__body');
		this.lookup = complianceValues;
		this.timeout;

		this.setLookup = this.setLookup.bind(this);

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	setLookup(value) {
		this.lookup = value == 'change' ? changeValues : complianceValues;
	}

	show(data) {
		const w = window.innerWidth;
		this.elem.classList.remove('tooltip--hidden');
		const value = this.lookup == changeValues ? data.change : data.score;
		const compliance = this.lookup[value];
		this.body.innerText = compliance;
		const { height } = window.getComputedStyle(this.body);
		this.elem.style.right = `${w - data.pageX + 5}px`;
		this.elem.style.top = `${data.pageY - parseInt(height) - 10}px`;
	}

	hide() {
		this.elem.classList.add('tooltip--hidden');
	}
}

export default Tooltip;

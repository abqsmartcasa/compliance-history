// helper function to correct index due to missing report 7
function reportOffsetsCorrection(reportNumber) {
	let idx = reportNumber;
	if (reportNumber > 6) {
		idx = reportNumber - 1;
	}
	return idx;
}

class Table {
	constructor(emitter) {
		this.emitter = emitter;

		this.tableStyle = 'score';

		this.data;
		this.tableHead = document.querySelector('.table__head');
		this.dataRows = document.querySelectorAll('.data-row');
		this.categoryRows = document.querySelectorAll('.category-row');
		this.buildTable = this.buildTable.bind(this);
		this.filter = this.filter.bind(this);
		this.setTableDisplay = this.setTableDisplay.bind(this);
		this.hideCategoryRows = this.hideCategoryRows.bind(this);
		this.reset = this.reset.bind(this);
	}

	buildHead(data) {
		const headFrag = document.createDocumentFragment();
		for (const item of data.headers) {
			const th = document.createElement('th');
			th.innerText = `${item}`;
			headFrag.appendChild(th);
		}
		this.tableHead.querySelector('.top-row').children[1].setAttribute('colspan', data.headers.length - 1);
		this.tableHead.querySelector('.top-row').children[1].style.width = `${(data.headers.length - 1) * 25}px`;
		this.tableHead.querySelector('.labels').appendChild(headFrag);
	}

	buildTable(data) {
		this.data = Table.calculateChange(data);
		this.buildHead(this.data);
		const categoryRows = document.querySelectorAll('.category-row');
		[ ...categoryRows ].map((row) => row.children[0].setAttribute('colspan', this.data.data[0].length));
		for (let i = 0; i < this.data.data.length; i++) {
			const item = this.data.data[i];
			const tr = this.dataRows[i];
			const paragraph = item.shift();
			const paragraphNumber = paragraph.split(' - ')[0];
			const paragraphDescription = paragraph.split(' - ')[1];
			const span = document.createElement('span');
			span.innerText = ` - ${paragraphDescription}`;
			span.classList.add('paragraph-description');
			const td = document.createElement('td');
			td.classList.add('paragraph-title');
			td.innerText = paragraphNumber;
			td.appendChild(span);
			tr.appendChild(td);
			for (const score of item) {
				const td = document.createElement('td');
				td.setAttribute('data-score', score[0]);
				td.setAttribute('data-change', score[1]);
				td.classList.add(Table.setBackground(score[0]));
				new DataCell(td, this.emitter);
				tr.appendChild(td);
			}
		}
	}

	static calculateChange(data) {
		const processed = data.data.map((d) =>
			d.map((value, idx, arr) => {
				if (idx == 0) {
					return value;
				} else {
					if (idx == 1) {
						return [ value, 0 ];
					} else {
						return [ value, arr[idx] - arr[idx - 1] ];
					}
				}
			})
		);
		return {
			headers: data.headers,
			data: processed
		};
	}

	filter(filters) {
		this.reset();
		const reportPair = Table.setPair(filters.imr);
		const filtered = this.data.data.map((k) => k.filter((curr, index) => reportPair.indexOf(index) != -1));
		const changes = filtered.map((k) => k.reduce((a, b) => b[0] - a[0]));
		for (let i = 0; i < changes.length; i++) {
			if (filters.compliance == 'increase') {
				if (changes[i] < 1) {
					this.dataRows[i].classList.add('data-row--hidden');
				}
			}
			if (filters.compliance == 'decrease') {
				if (changes[i] >= 0) {
					this.dataRows[i].classList.add('data-row--hidden');
				}
			}
			if (filters.compliance == 'change') {
				if (changes[i] == 0) {
					this.dataRows[i].classList.add('data-row--hidden');
				}
			}
		}
		this.hideCategoryRows();
	}

	reset() {
		for (const row of this.dataRows) {
			row.classList.remove('data-row--hidden');
		}
		for (const row of this.categoryRows) {
			row.classList.remove('category-row--hidden');
		}
	}

	setTableDisplay(value) {
		if (value != this.tableStyle) {
			this.tableStyle = value;
			for (const row of this.dataRows) {
				for (let i = 1; i < row.children.length; i++) {
					const td = row.children[i];
					var classList = td.classList;
					while (classList.length > 0) {
						classList.remove(classList.item(0));
					}
					if (this.tableStyle == 'score') {
						const score = td.getAttribute('data-score');
						td.classList.add(Table.setChangeBackground(score));
					}
					if (this.tableStyle == 'change') {
						const change = td.getAttribute('data-change');
						td.classList.add(Table.setChangeBackground(change));
					}
				}
			}
		}
	}

	hideCategoryRows() {
		for (let i = 0; i < this.categoryRows.length; i++) {
			const categorySiblings = nextUntil(this.categoryRows[i], this.categoryRows[i + 1]);
			let visible = false;
			for (const sibling of categorySiblings) {
				if (!sibling.classList.contains('data-row--hidden')) {
					visible = true;
					break;
				}
			}
			if (!visible) {
				this.categoryRows[i].classList.add('category-row--hidden');
			}
		}
	}

	static setPair(reportNumber) {
		let pair = [];

		if (reportNumber >= 8) {
			pair = [ reportNumber - 3, reportNumber - 2 ];
		} else {
			pair = [ reportNumber - 2, reportNumber - 1 ];
		}
		return pair;
	}

	static setChangeBackground(score) {
		let className = 'no-change';
		if (score == 1) {
			className = 'increase-one';
		}
		if (score == 2) {
			className = 'increase-two';
		}
		if (score == 3) {
			className = 'increase-three';
		}
		if (score == -1) {
			className = 'decrease-one';
		}
		if (score == -2) {
			className = 'decrease-two';
		}
		if (score == -3) {
			className = 'decrease-three';
		}
		return className;
	}

	static setBackground(score) {
		let className = 'non-compliant';
		if (score == 1) {
			className = 'primary-compliance';
		}
		if (score == 2) {
			className = 'secondary-compliance';
		}
		if (score == 3) {
			className = 'operational-compliance';
		}
		return className;
	}
}

class TableDisplayRadio {
	constructor(emitter, elem) {
		this.emitter = emitter;
		this.elem = elem;
		this.onClick = this.onClick.bind(this);

		this.addEventListeners = this.addEventListeners.bind(this);

		this.addEventListeners();
	}

	addEventListeners() {
		this.elem.addEventListener('click', this.onClick);
	}

	onClick(e) {
		this.emitter.emit('set-table-style', e.target.value);
	}
}

class DataCell {
	constructor(elem, emitter) {
		this.elem = elem;
		this.emitter = emitter;
		this.score = this.elem.getAttribute('data-score');
		this.change = this.elem.getAttribute('data-change');

		this.showValue = this.showValue.bind(this);
		this.removeValue = this.removeValue.bind(this);
		this.mouserEnter = this.mouserEnter.bind(this);
		this.addEventListeners();
	}

	addEventListeners() {
		this.elem.addEventListener('mouseenter', this.mouserEnter);
		this.elem.addEventListener('mouseleave', this.removeValue);
	}

	mouserEnter() {
		this.elem.addEventListener('mousemove', this.showValue);
	}

	showValue(e) {
		const data = {
			pageX: e.pageX,
			pageY: e.pageY,
			score: this.score,
			change: this.change
		};
		this.emitter.emit('show-value', data);
	}

	removeValue() {
		this.emitter.emit('remove-value');
		this.elem.removeEventListener('mousemove', this.mouseMove);
	}
}

function nextUntil(elem, nextElem) {
	var siblings = [];
	elem = elem.nextElementSibling;

	while (elem) {
		if (elem == nextElem) break;
		siblings.push(elem);
		elem = elem.nextElementSibling;
	}
	return siblings;
}

export { Table, TableDisplayRadio };

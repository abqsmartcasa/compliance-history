class SectionBtn {

  constructor(emitter) {
    this.emitter = emitter;
    this.elem = document.querySelector('.js-sections-btn');
    this.icon = document.querySelector('.js-sections-btn__icon');


    this.open = false;

    this.onClick = this.onClick.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);


    this.addEventListeners();

  }

  addEventListeners() {
    this.elem.addEventListener('click', this.onClick);
  }

  onClick() {
    if (this.open) {
      this.emitter.emit('section-menu-close');
      this.icon.classList.add('sections-btn__icon--closed');
      this.icon.classList.remove('sections-btn__icon--open');
    } else {
      this.emitter.emit('section-menu-open');
      this.icon.classList.add('sections-btn__icon--open');
      this.icon.classList.remove('sections-btn__icon--closed');
    }
    this.open = !this.open;
  }

}

export default SectionBtn;
class SectionLink {
  constructor(elem) {
    this.elem = elem;

    this.onClick = this.onClick.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    this.elem.addEventListener('click', this.onClick)
  }

  onClick() {
    const sectionName = this.elem.getAttribute('data-section-name');
    const target = document.getElementById(sectionName);
    target.scrollIntoView({
      behavior: 'smooth'
    });
    this.elem.classList.add('section-link--click');
    setTimeout(() => {
      this.elem.classList.remove('section-link--click');
    }, 500);
  }
}

export default SectionLink;
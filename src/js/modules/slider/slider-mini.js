import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, prev, next, activeClass, animate, autoplay) {
    super(container, prev, next, activeClass, animate, autoplay);
  }

  decorizesSlides() {
    Array.from(this.slides).forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
        slide.querySelector('.card__title').style.opacity = '0.4';
      }
    });

    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
      this.slides[0].querySelector('.card__title').style.opacity = '1';
    }
  }

  nextSlide() {
    this.container.appendChild(this.slides[0]);
    this.decorizesSlides();
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());

    this.prev.addEventListener('click', () => {
          let active = this.slides[this.slides.length - 1];
          this.container.insertBefore(active, this.slides[0]);
          this.decorizesSlides();
    });
  }

  init() {
    this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;

    if (this.container.classList.contains('feed__slider-container')) {
      this.container.style.height = '430px';
    }

    this.bindTriggers();
    this.decorizesSlides();

    if (this.autoplay) {
      setInterval(() => this.nextSlide(), this.autoplay);
    }
  }
}
export default class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);
    this.slides = this.page.children;
    this.btns = document.querySelectorAll(btns);
    this.links = this.page.querySelectorAll('a');
    this.slideIndex = 1;
    this.block = document.querySelectorAll('.hanson');
    this.time = 3000;
  }

  showSlide(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    Array.from(this.slides).forEach(slide => {
      slide.style.display = 'none';
      slide.classList.add('animated');
    });

    this.slides[this.slideIndex - 1].classList.add('slideInUp');
    this.slides[this.slideIndex - 1].style.display = 'block';

    this.showBlock('.hanson', 3000);
  }

  plusSlide(n) {
    this.showSlide(this.slideIndex += n);
  }

  render() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlide(1);
      });
    });

    this.showSlide(this.slideIndex);

    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        if (link.id === 'logo') {
          this.slideIndex = 1;
          this.showSlide(this.slideIndex);
        }
      });
    });
  }

  showBlock(blockSelector, time) {
    try{
      this.block = document.querySelector(blockSelector);
    } catch (e) {}
    
    if (this.slideIndex === 3) {
      this.block.style.display = 'none';

      setTimeout(() => {
        this.block.classList.add('animated', 'slideInUp');
        this.block.style.display = 'block';
      }, time);
    } else {
      this.block.classList.remove('animated', 'slideInUp');
    }
  }
}
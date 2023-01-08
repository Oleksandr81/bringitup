/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  constructor(container, cards, btn) {
    this.container = document.querySelector(container);
    this.cards = this.container.querySelectorAll(cards);
    this.btn = this.container.querySelector(btn);
    this.count = 1;
  }
  showCards() {
    this.btn.addEventListener('click', () => {
      this.cards[this.count - 1].style.display = 'flex';
      this.cards[this.count - 1].classList.add('animated', 'fadeIn');
      if (this.count === 3) {
        this.cards[3].style.display = 'none';
      }
      this.count += 1;
    });
  }
  initBlocks() {
    this.cards.forEach(card => {
      card.style.display = 'none';
    });
    this.cards[this.cards.length - 1].style.display = 'flex';
    this.showCards();
  }
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Forms)
/* harmony export */ });
class Forms {
  constructor(forms, url) {
    this.path = url;
    this.forms = document.querySelectorAll(forms);
    this.input = document.querySelectorAll('input');
    this.messageStatus = {
      loading: 'Message loading...',
      sent: 'The message has been sent, we will contact you soon!',
      error: 'Oops, what happened... Message not sent. Sorry'
    };
  }
  async postData(data) {
    let res = await fetch(this.path, {
      method: 'POST',
      body: data
    });
    return await res.text();
  }
  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const statusBlock = document.createElement('div');
        statusBlock.style.cssText = `
          width: 100%;
          color: #fff;
          padding: 25px 0 25px 25px;
        `;
        statusBlock.textContent = this.messageStatus.loading;
        form.appendChild(statusBlock);
        const formData = new FormData(form);
        this.postData(formData).then(res => {
          console.log(res);
          statusBlock.textContent = this.messageStatus.sent;
        }).catch(() => {
          statusBlock.textContent = this.messageStatus.error;
        }).finally(() => {
          this.clearInput();
          setTimeout(() => {
            statusBlock.remove();
          }, 5000);
        });
      });
    });
  }
  clearInput() {
    this.input.forEach(input => {
      input.value = "";
    });
  }
}

/***/ }),

/***/ "./src/js/modules/player.js":
/*!**********************************!*\
  !*** ./src/js/modules/player.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
class Player {
  constructor(btntrigger, overlay) {
    this.btn = document.querySelector(btntrigger);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }
  bindTriggers() {
    this.btn.addEventListener('click', () => {
      if (this.player) {
        this.overlay.style.display = 'flex';
      } else {
        const path = this.btn.getAttribute('data-url');
        this.createPlayer(path);
      }
    });
  }
  bindClosePlayer() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`
    });
    this.overlay.style.display = 'flex';
  }
  initPlayer() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindTriggers();
    this.bindClosePlayer();
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(page, btns) {
    super(page, btns);
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
    this.links = this.container.querySelectorAll('#logo');
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlide(1);
      });
    });
    this.showSlide(this.slideIndex);
    this.links.forEach(link => {
      link.addEventListener('click', e => {
        if (link.id === 'logo') {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlide(this.slideIndex);
        }
      });
    });
  }
  showBlock(blockSelector, time) {
    try {
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

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor() {
    let {
      container = null,
      btns = null,
      prev = null,
      next = null,
      activeClass = "",
      animate,
      autoplay = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.container = document.querySelector(container);
    this.slides = this.container.children;
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/player */ "./src/js/modules/player.js");
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");





window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const forms = new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('.form', '../../assets/question.php');
  forms.init();
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.page',
    btns: '.next'
  });
  slider.render();
  const educationOld = new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officer__card-item', '.plus');
  educationOld.initBlocks();
  const educationNew = new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officernew', '.officer__card-item', '.plus');
  educationNew.initBlocks();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: 5000
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.feed__slider-container',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();
  const player = new _modules_player__WEBPACK_IMPORTED_MODULE_0__["default"]('.play', ".overlay");
  player.initPlayer();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map
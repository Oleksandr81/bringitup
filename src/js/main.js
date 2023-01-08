import Player from "./modules/player";
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import Difference from "./modules/difference";
import Forms from "./modules/forms";

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const forms = new Forms('.form', 'assets/question.php');
  forms.init();
  
  const slider = new MainSlider({container: '.page', btns: '.next'});
  slider.render();

  const educationOld = new Difference('.officerold', '.officer__card-item', '.plus');
  educationOld.initBlocks();

  const educationNew = new Difference('.officernew', '.officer__card-item', '.plus');
  educationNew.initBlocks();

  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider', 
    prev: '.showup__prev', 
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true});
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider', 
    prev: '.modules__info-btns .slick-prev', 
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: 5000});
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: '.feed__slider-container',
    prev: '.feed__slider .slick-prev', 
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'});
    feedSlider.init();

  const player = new Player('.play', ".overlay");
  player.initPlayer(); 
});

export default class Player {
  constructor(btntrigger, overlay) {
    this.btn = document.querySelector(btntrigger);
    this.overlay = document.querySelector(overlay);
  }

  play() {
    this.btn.addEventListener('click', () => {
      console.log('play video');
      
    });
  }
}
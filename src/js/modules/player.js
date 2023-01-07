export default class Player {
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
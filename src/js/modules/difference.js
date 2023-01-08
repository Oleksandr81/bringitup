export default class Difference {
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
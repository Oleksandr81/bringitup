export default class Forms {
  constructor(forms, url) {
    this.path = url;
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.messageStatus = {
      loading: 'Message loading...',
      success: 'The message has been sent, we will contact you soon!',
      error: 'Oops, what happened... Message not sent. Sorry'
    };
  }

  async postData(data) {
    let res = await fetch (this.path, {
      method: 'POST',
      body: data
    });

    return await res.text();
  }

  init() {
    this.initMask();
    this.checkMailInput();

    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusBlock = document.createElement('div');
        statusBlock.style.cssText = `
          width: 100%;
          color: #fff;
          background-color: #2546bc;
          margin: 25px 0;
          padding: 25px 25px;
        `;

        statusBlock.textContent = this.messageStatus.loading;
        form.appendChild(statusBlock);

        const formData = new FormData(form);

        this.postData(formData)
          .then(res=> {
            console.log(res);
            statusBlock.textContent = this.messageStatus.success;      
          })
          .catch(() => {
            statusBlock.textContent = this.messageStatus.error;
          })
          .finally(() => {
            this.clearInput();
            setTimeout(() => {
              statusBlock.remove();
            }, 5000);
          });
      });
    });
  }

  clearInput() {
    this.inputs.forEach(input => {
      input.value = "";
    });
  }

  checkMailInput() {
    const mailInput = document.querySelectorAll('[type="email"]');

    mailInput.forEach(item => {
      item.addEventListener('keypress', (e) => {
        if(e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };

    function createMask(event) {
      let matrix = '+1 (___) ___-____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i > val.length ? '' : a;
      });

      if (event.type === 'blur') {
        if(this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }
}
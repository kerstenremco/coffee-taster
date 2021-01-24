class Message {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
  }

  show(type, message) {
    const html = `<div class="alert alert-${type}">
    ${message}
    </div>`;
    this.remove();
    this.htmlElement.insertAdjacentHTML("afterbegin", html);
    setTimeout(this.remove.bind(this), 3000);
  }

  remove() {
    this.htmlElement.querySelector('.alert')?.remove();
  }
}


export default Message;
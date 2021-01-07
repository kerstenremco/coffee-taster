const show = function (message, style) {
  const html = `<div class="alert alert-${style}">
    ${message}
  </div>`;
  remove();
  document.body.insertAdjacentHTML('afterBegin', html);
  setTimeout(remove, 3000)
}

const remove = function () {
  document.querySelector('.alert')?.remove();
}

export default {show, remove}
const button = document.querySelector('.breakout-button');

if(button) {
  button.parentElement.setAttribute('data-interactive', '');
  button.removeAttribute('hidden');
  button.addEventListener('click', evt => {
    evt.preventDefault();

    alert('Oh hi there 👋');
  });
}
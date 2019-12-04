const deviceButton = document.getElementById('device');
const iframe = document.getElementById('iframe');

deviceButton.addEventListener('click', (event) => {
  const element = event.target;
  element.innerHTML = element.innerHTML === 'Mobile' ? 'Desctop' : 'Mobile';
  iframe.classList.toggle('iframe--mobile');
});
const container = document.getElementById('item-list');
const itemList = container.children;
const length = itemList.length;
let currentItem = 0;
let isEnabled = true;

const changeCurrentItem = (index) => {
  currentItem = (index + length) % length;
};

const hideItem = (direction) => {
  isEnabled = false;
  itemList[currentItem].classList.add(direction);
};

const showItem = (direction) => {
  itemList[currentItem].classList.add('carousel__item--next', direction);
}

const prevItem = (index) => {
  hideItem('to-right');
  
	changeCurrentItem(index - 1);
	showItem('from-left');
};

const nextItem = (index) => {
  hideItem('to-left');
	changeCurrentItem(index + 1);
  
  showItem('from-right');
};

const animationEndHandler = (event) => {
  const { target, animationName } = event;
  if (animationName === 'to-right' || animationName === 'to-left') {
    target.classList.remove('carousel__item--active', animationName);
  } else {
    target.classList.remove('carousel__item--next', animationName);
		target.classList.add('carousel__item--active');
		isEnabled = true;
  }
};

const controlLeft = document.getElementById('control-left');
const controlRight = document.getElementById('control-right');

controlLeft.addEventListener('click', () => {
  if (isEnabled) {
    prevItem(currentItem );
  }
});

controlRight.addEventListener('click', () => {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

container.addEventListener('animationend', animationEndHandler);

const swipedetect = (element) => {
  
	const surface = element;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

  let target = null;
	const threshold = 150;
	const restraint = 100;
	const allowedTime = 300;

  const swap = (distX) => {
    if (isEnabled) {
      if (distX > 0) {
        prevItem(currentItem);
      } else {
        nextItem(currentItem);
      }
    }
  };

  const startSwap = (event) => {
    const touchobj = event.changedTouches;
    target = event.target;
    startX = touchobj ? touchobj[0].pageX : event.pageX;
		startY = touchobj ? touchobj[0].pageY : event.pageY;
		startTime = new Date().getTime();
		event.preventDefault();
  };

  const endSwap = (event) => {
    const touchobj = event.changedTouches;
    const endX = touchobj ? touchobj[0].pageX : event.pageX;
    const endY = touchobj ? touchobj[0].pageY : event.pageY;
    distX = endX - startX;
		distY = endY - startY;
    elapsedTime = new Date().getTime() - startTime;
    const isSwap = elapsedTime <= allowedTime && 
      (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint);
    const isClick = target.nodeName === 'IMG' &&
      (Math.abs(distX) < 5 && Math.abs(distY) < 5);
		if (isSwap){
      swap(distX);
		} else if (isClick) {
      const { href } = target.parentNode;
      document.location.href = href;
    }
		event.preventDefault();
  };

	surface.addEventListener('mousedown', startSwap, false);
  surface.addEventListener('mouseup', endSwap, false);
  surface.addEventListener('click', (event) => {
    event.preventDefault();
  });

	surface.addEventListener('touchstart', startSwap, false);
	surface.addEventListener('touchend', endSwap, false);
}

const toggleDescription = (event) => {
	const element = event.target
  const isTargetElement = element.classList.contains('project__button');
  if (isTargetElement) {
    const description = element.parentNode.querySelector('.project__description');
    description.classList.toggle('project__description--show');
    element.innerHTML = element.innerHTML === 'Show description' ? 'Hide description' : 'Show description';
  }
};

swipedetect(container);

const educationControl = document.getElementById('education-control');
const educationList = document.querySelector('.education__list');
const icon = document.getElementById('icon');
educationControl.addEventListener('click', () => {
  educationList.classList.toggle('education__list--show');
  icon.classList.toggle('education__icon--rotate');
});

container.addEventListener('touchstart', toggleDescription);

container.addEventListener('click', toggleDescription);
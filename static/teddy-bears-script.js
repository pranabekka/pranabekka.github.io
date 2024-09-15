'use strict';

const small = 100;
const medium = 120;
const large = 150;
const sizes = [small, medium, large];

const animations = ['anim1', 'anim2', 'anim3'];

// size manually copied from teddy-bears-teddy.svg metadata
const baseWidth = 255;
const baseHeight = 313;
const ratio = baseWidth / baseHeight;
// baseWidth = baseHeight * ratio
// baseHeight = baseWidth / ratio
// small, medium, large are used for baseHeight (height)
// so width is baseWidth. i.e., baseHeight * ratio => height * ratio

function makeBear(centreX, centreY) {
  const height = sizes[
    Math.floor( Math.random() * sizes.length )
  ];
  const width = height * ratio;

  const jitterMax = 15;
  const jitter = () => Math.floor(Math.random() * jitterMax * 2) - (jitterMax);

  const startX = centreX - (width / 2) + jitter();
  const startY = centreY - (height / 2) + jitter();

  const bearInstance = document.createElement('img');
  bearInstance.src = 'teddy-bears-teddy.svg';

  let zIndex = 0;
  if (height === small) {
    // 200 to 300
    zIndex = 200 + Math.floor(Math.random() * 100);
  } else if (height === medium) {
    // 100 to 200
    zIndex = 100 + Math.floor(Math.random() * 100);
  } else {
    // 0 to 100
    zIndex = Math.floor(Math.random() * 100);
  };

  bearInstance.style = `
    height: ${height}px;
    position: absolute;
    left: ${startX}px;
    top: ${startY}px;
    z-index: ${zIndex};
  `;

  bearInstance.dataset.animation = animations[
    Math.floor(Math.random() * animations.length)
  ];

  document.body.appendChild(bearInstance);
}

for (
  let centreX = 0;
  centreX < window.innerWidth;
  centreX += small * ratio / 6 * 3
) {
  for (
    let centreY = 0;
    centreY < window.innerHeight;
    centreY += small / 5 * 3
  ) {
    makeBear(centreX, centreY);
  };
};

document.addEventListener('click', (e) => {
  if (e.target.nodeName === 'IMG') {
    e.target.src = 'teddy-bears-teddy-dead.svg';
    e.target.dataset.animation = 'dead';
    setTimeout(() => {
      e.target.remove()
    }, 1500);
  };
});

function drawMessage() {
  const msgBox = document.createElement('div');
  msgBox.style.zIndex = -1;
  const title = document.createElement('h1');
  title.textContent = 'Happy birthday!';
  const p1 = document.createElement('p');
  p1.innerHTML = 'and&nbsp;sorry for&nbsp;the&nbsp;lateness&nbsp;:p';
  p1.classList = 'de-emph';
  const p2 = document.createElement('p');
  p2.textContent = 'call?';
  msgBox.appendChild(title);
  msgBox.appendChild(p1);
  msgBox.appendChild(p2);
  document.body.appendChild(msgBox);
};

// can sometimes see flash of text.
// probably draws over or before bears
// while browser figures it all out
setTimeout(drawMessage, 2000);

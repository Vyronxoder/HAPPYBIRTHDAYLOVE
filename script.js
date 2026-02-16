/* =====================================================
   🎂 MYRA'S 21ST BIRTHDAY WEBSITE — INTERACTIVE JS
   ===================================================== */

// ===== ENTRANCE ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  const entrance = document.getElementById('entrance');
  const openBtn = document.getElementById('openEnvelope');

  openBtn.addEventListener('click', () => {
    entrance.classList.add('hidden');
    setTimeout(() => {
      launchConfetti(80);
      showPopup('🎂', 'Happy 21st Birthday Myra!', 'Welcome to your very own birthday world! 🥳💖 Explore your wishes, read your letter, play games, and meet your cute animal friends!');
    }, 500);
  });

  // Initialize all features
  createFloatingBubbles();
  createFloatingAnimals();
  initSparkleTrail();
  initMemoryGame();
  initNavHighlight();
});

// ===== FLOATING BACKGROUND BUBBLES =====
function createFloatingBubbles() {
  const container = document.getElementById('floatingBg');
  const colors = ['#ff7eb3', '#c9b1ff', '#a0e7e5', '#ffcba4', '#ffe66d', '#ff6b6b', '#ffb6d5'];

  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 80 + 30;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.animationDuration = (Math.random() * 15 + 10) + 's';
    bubble.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(bubble);
  }
}

// ===== FLOATING ANIMALS =====
function createFloatingAnimals() {
  const container = document.getElementById('floatingAnimals');
  const animals = ['🐰', '🐱', '🐶', '🐼', '🦊', '🐧', '🐣', '🦋', '🐨', '🦄', '🐸', '🐹'];

  for (let i = 0; i < 12; i++) {
    const animal = document.createElement('div');
    animal.classList.add('floating-animal');
    animal.textContent = animals[i % animals.length];
    animal.style.left = (Math.random() * 90 + 5) + '%';
    animal.style.top = (Math.random() * 85 + 5) + '%';
    animal.style.animationDuration = (Math.random() * 4 + 3) + 's';
    animal.style.animationDelay = (Math.random() * 3) + 's';
    animal.style.fontSize = (Math.random() * 1.2 + 1.5) + 'rem';
    container.appendChild(animal);
  }
}

// ===== SPARKLE CURSOR TRAIL =====
function initSparkleTrail() {
  const sparkles = ['✨', '💖', '⭐', '💫', '🌟', '💕', '✿'];
  let throttle = false;

  document.addEventListener('mousemove', (e) => {
    if (throttle) return;
    throttle = true;
    setTimeout(() => throttle = false, 100);

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  });
}

// ===== CONFETTI LAUNCHER =====
function launchConfetti(count = 50) {
  const colors = ['#ff7eb3', '#c9b1ff', '#a0e7e5', '#ffe66d', '#ffcba4', '#ff6b6b', '#ffb6d5'];
  const shapes = ['●', '■', '▲', '★', '♥', '🎉', '🎊', '✨'];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');
      confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

// ===== NAVIGATION HIGHLIGHT =====
function initNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ===== WISH CARD INTERACTION =====
function flipWishCard(card) {
  card.style.transform = 'scale(1.08) rotate(2deg)';
  launchConfetti(10);
  
  setTimeout(() => {
    card.style.transform = '';
  }, 500);
}

// ===== ANIMAL SPEAK =====
function animalSpeak(card, emoji, message) {
  showPopup(emoji, `${emoji} says:`, message);
  card.querySelector('.big-emoji').style.transform = 'scale(1.5) rotate(-15deg)';
  setTimeout(() => {
    card.querySelector('.big-emoji').style.transform = '';
  }, 400);
  launchConfetti(15);
}

// ===== POPUP SYSTEM =====
function showPopup(emoji, title, text) {
  const overlay = document.getElementById('popup');
  document.getElementById('popupEmoji').textContent = emoji;
  document.getElementById('popupTitle').textContent = title;
  document.getElementById('popupText').textContent = text;
  overlay.classList.add('active');
}

function closePopup() {
  document.getElementById('popup').classList.remove('active');
}

// ===== GAME TAB SWITCHING =====
function switchGame(game) {
  document.querySelectorAll('.game-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));

  document.getElementById('game-' + game).classList.add('active');
  event.target.classList.add('active');
}

// =====================================================
//  🎈 BALLOON POP GAME
// =====================================================
let balloonScore = 0;
let balloonTimer = null;
let balloonSpawner = null;
let balloonTimeLeft = 30;

function startBalloonGame() {
  balloonScore = 0;
  balloonTimeLeft = 30;
  document.getElementById('balloonScore').textContent = '🎈 Score: 0';
  document.getElementById('balloonTimer').textContent = '⏱️ Time: 30s';
  document.getElementById('balloonStartBtn').disabled = true;
  document.getElementById('balloonStartBtn').textContent = 'Popping! 🎈';

  const area = document.getElementById('balloonArea');
  area.innerHTML = '';

  // Spawn balloons
  balloonSpawner = setInterval(() => spawnBalloon(), 600);

  // Timer
  balloonTimer = setInterval(() => {
    balloonTimeLeft--;
    document.getElementById('balloonTimer').textContent = `⏱️ Time: ${balloonTimeLeft}s`;

    if (balloonTimeLeft <= 0) {
      endBalloonGame();
    }
  }, 1000);
}

function spawnBalloon() {
  const area = document.getElementById('balloonArea');
  const balloonEmojis = ['🎈', '🩷', '🎀', '💖', '🌸', '⭐', '🎁', '🧁'];
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
  balloon.style.left = (Math.random() * 85 + 5) + '%';
  balloon.style.bottom = '0';
  balloon.style.animationDuration = (Math.random() * 2 + 2.5) + 's';

  balloon.addEventListener('click', () => {
    if (balloon.classList.contains('popped')) return;
    balloon.classList.add('popped');
    balloonScore++;
    document.getElementById('balloonScore').textContent = `🎈 Score: ${balloonScore}`;

    // Create pop particles
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = balloon.style.left;
      particle.style.top = balloon.offsetTop + 'px';
      particle.style.fontSize = '0.8rem';
      particle.textContent = '✨';
      particle.style.pointerEvents = 'none';
      particle.style.animation = 'sparkleFade 0.6s ease-out forwards';
      particle.style.transform = `translate(${(Math.random()-0.5)*60}px, ${(Math.random()-0.5)*60}px)`;
      area.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }

    setTimeout(() => balloon.remove(), 300);
  });

  area.appendChild(balloon);

  // Auto-remove if not popped
  setTimeout(() => {
    if (!balloon.classList.contains('popped')) {
      balloon.remove();
    }
  }, 4500);
}

function endBalloonGame() {
  clearInterval(balloonTimer);
  clearInterval(balloonSpawner);
  document.getElementById('balloonStartBtn').disabled = false;
  document.getElementById('balloonStartBtn').textContent = 'Play Again! 🎉';

  let message = '';
  if (balloonScore >= 30) message = 'AMAZING! You\'re a balloon-popping queen! 👑🎈';
  else if (balloonScore >= 20) message = 'Fantastic job! So many pops! 🎉';
  else if (balloonScore >= 10) message = 'Great work! The balloons didn\'t stand a chance! 💖';
  else message = 'Nice try! Ready for another round? 🎀';

  launchConfetti(30);
  showPopup('🎈', `Score: ${balloonScore}!`, message);
}

// =====================================================
//  🧁 CUPCAKE CATCH GAME
// =====================================================
let catchScore = 0;
let catchTimer = null;
let catchSpawner = null;
let catchTimeLeft = 30;
let basketX = 50;

function startCatchGame() {
  catchScore = 0;
  catchTimeLeft = 30;
  document.getElementById('catchScore').textContent = '🧁 Score: 0';
  document.getElementById('catchTimer').textContent = '⏱️ Time: 30s';
  document.getElementById('catchStartBtn').disabled = true;
  document.getElementById('catchStartBtn').textContent = 'Catching! 🧁';

  const area = document.getElementById('catchArea');
  // Clear any existing falling items
  area.querySelectorAll('.falling-item').forEach(item => item.remove());
  
  const basket = document.getElementById('basket');
  basketX = 50;
  basket.style.left = basketX + '%';

  // Mouse/touch movement
  area.addEventListener('mousemove', moveBasket);
  area.addEventListener('touchmove', moveBasketTouch);

  // Spawn items
  catchSpawner = setInterval(() => spawnCatchItem(), 700);

  // Timer
  catchTimer = setInterval(() => {
    catchTimeLeft--;
    document.getElementById('catchTimer').textContent = `⏱️ Time: ${catchTimeLeft}s`;
    if (catchTimeLeft <= 0) endCatchGame();
  }, 1000);
}

function moveBasket(e) {
  const area = document.getElementById('catchArea');
  const rect = area.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const basket = document.getElementById('basket');
  basket.style.left = Math.max(5, Math.min(90, x)) + '%';
  basketX = parseFloat(basket.style.left);
}

function moveBasketTouch(e) {
  e.preventDefault();
  const area = document.getElementById('catchArea');
  const rect = area.getBoundingClientRect();
  const touch = e.touches[0];
  const x = ((touch.clientX - rect.left) / rect.width) * 100;
  const basket = document.getElementById('basket');
  basket.style.left = Math.max(5, Math.min(90, x)) + '%';
  basketX = parseFloat(basket.style.left);
}

function spawnCatchItem() {
  const area = document.getElementById('catchArea');
  const goods = ['🧁', '🍰', '🍩', '🍪', '🎂', '🍫', '🍬', '🍭'];
  const bads = ['🥦', '🧅', '🌶️'];
  const isGood = Math.random() > 0.25;
  const items = isGood ? goods : bads;

  const item = document.createElement('div');
  item.classList.add('falling-item');
  item.textContent = items[Math.floor(Math.random() * items.length)];
  item.dataset.good = isGood;
  item.style.left = (Math.random() * 85 + 5) + '%';
  item.style.animationDuration = (Math.random() * 1.5 + 2) + 's';

  area.appendChild(item);

  // Check catch
  const checkCatch = setInterval(() => {
    const itemRect = item.getBoundingClientRect();
    const basketEl = document.getElementById('basket');
    const basketRect = basketEl.getBoundingClientRect();

    if (
      itemRect.bottom >= basketRect.top &&
      itemRect.bottom <= basketRect.bottom + 20 &&
      itemRect.left < basketRect.right + 15 &&
      itemRect.right > basketRect.left - 15
    ) {
      clearInterval(checkCatch);
      item.remove();

      if (item.dataset.good === 'true') {
        catchScore += 1;
        document.getElementById('catchScore').textContent = `🧁 Score: ${catchScore}`;
      } else {
        catchScore = Math.max(0, catchScore - 2);
        document.getElementById('catchScore').textContent = `🧁 Score: ${catchScore}`;
        // Flash red
        area.style.boxShadow = 'inset 0 0 30px rgba(255,0,0,0.3)';
        setTimeout(() => area.style.boxShadow = '', 300);
      }
    }
  }, 50);

  // Auto-remove
  setTimeout(() => {
    clearInterval(checkCatch);
    item.remove();
  }, 4000);
}

function endCatchGame() {
  clearInterval(catchTimer);
  clearInterval(catchSpawner);
  document.getElementById('catchStartBtn').disabled = false;
  document.getElementById('catchStartBtn').textContent = 'Play Again! 🧁';

  const area = document.getElementById('catchArea');
  area.removeEventListener('mousemove', moveBasket);
  area.removeEventListener('touchmove', moveBasketTouch);

  let message = '';
  if (catchScore >= 25) message = 'You\'re a cupcake-catching superstar! 🌟👑';
  else if (catchScore >= 15) message = 'Yummy! You caught so many treats! 🍰';
  else if (catchScore >= 8) message = 'Sweet job! Those cupcakes love you! 🧁';
  else message = 'Try again! The cupcakes are waiting! 🎀';

  launchConfetti(25);
  showPopup('🧁', `Score: ${catchScore}!`, message);
}

// =====================================================
//  🐾 MEMORY MATCH GAME
// =====================================================
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let memoryLocked = false;

function initMemoryGame() {
  const animals = ['🐰', '🐱', '🐶', '🐼', '🦊', '🐧'];
  const pairs = [...animals, ...animals];
  memoryCards = shuffleArray(pairs);
  flippedCards = [];
  matchedPairs = 0;
  memoryMoves = 0;
  memoryLocked = false;

  document.getElementById('memoryScore').textContent = '⭐ Pairs: 0 / 6';
  document.getElementById('memoryMoves').textContent = 'Moves: 0';

  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = '';

  memoryCards.forEach((animal, index) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.animal = animal;
    card.dataset.index = index;

    const front = document.createElement('span');
    front.classList.add('card-front');
    front.textContent = animal;

    const back = document.createElement('span');
    back.classList.add('card-back');
    back.textContent = '❓';

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => flipMemoryCard(card));
    grid.appendChild(card);
  });
}

function flipMemoryCard(card) {
  if (memoryLocked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length >= 2) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    memoryMoves++;
    document.getElementById('memoryMoves').textContent = `Moves: ${memoryMoves}`;
    checkMemoryMatch();
  }
}

function checkMemoryMatch() {
  memoryLocked = true;
  const [card1, card2] = flippedCards;

  if (card1.dataset.animal === card2.dataset.animal) {
    // Match!
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    document.getElementById('memoryScore').textContent = `⭐ Pairs: ${matchedPairs} / 6`;
    flippedCards = [];
    memoryLocked = false;

    launchConfetti(8);

    if (matchedPairs === 6) {
      setTimeout(() => {
        launchConfetti(60);
        let rating = '';
        if (memoryMoves <= 8) rating = 'Perfect memory! You\'re a genius! 🧠✨';
        else if (memoryMoves <= 12) rating = 'Amazing memory skills! 🌟';
        else if (memoryMoves <= 18) rating = 'Great job finding all the cuties! 🐾';
        else rating = 'You found them all! So fun! 💖';
        showPopup('🏆', `Completed in ${memoryMoves} moves!`, rating);
      }, 500);
    }
  } else {
    // No match
    card1.classList.add('wrong');
    card2.classList.add('wrong');

    setTimeout(() => {
      card1.classList.remove('flipped', 'wrong');
      card2.classList.remove('flipped', 'wrong');
      flippedCards = [];
      memoryLocked = false;
    }, 800);
  }
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== MUSIC TOGGLE (Web Audio API birthday tune) =====
let musicPlaying = false;
let audioCtx = null;
let musicInterval = null;

function toggleMusic() {
  const btn = document.getElementById('musicToggle');

  if (!musicPlaying) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    playBirthdaySong();
    btn.classList.add('playing');
    btn.textContent = '🎶';
    musicPlaying = true;
  } else {
    if (musicInterval) clearTimeout(musicInterval);
    if (audioCtx) audioCtx.close();
    btn.classList.remove('playing');
    btn.textContent = '🎵';
    musicPlaying = false;
  }
}

function playBirthdaySong() {
  // Happy Birthday melody notes (frequency, duration)
  const notes = [
    [262, 0.3], [262, 0.3], [294, 0.6], [262, 0.6], [349, 0.6], [330, 1.0],
    [262, 0.3], [262, 0.3], [294, 0.6], [262, 0.6], [392, 0.6], [349, 1.0],
    [262, 0.3], [262, 0.3], [523, 0.6], [440, 0.6], [349, 0.6], [330, 0.6], [294, 1.0],
    [466, 0.3], [466, 0.3], [440, 0.6], [349, 0.6], [392, 0.6], [349, 1.0],
  ];

  let time = audioCtx.currentTime;

  notes.forEach(([freq, dur]) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + dur * 0.9);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + dur);
    time += dur;
  });

  // Loop the song
  const totalDuration = notes.reduce((sum, [, d]) => sum + d, 0) * 1000;
  musicInterval = setTimeout(() => {
    if (musicPlaying) playBirthdaySong();
  }, totalDuration + 500);
}

// ===== KEYBOARD SHORTCUT & EASTER EGGS =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  if (konamiCode.length > konamiSequence.length) konamiCode.shift();

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    launchConfetti(150);
    showPopup('🎉', 'Secret Unlocked!', 'You found the secret code! Myra, you\'re absolutely INCREDIBLE! 🌟💖🦄✨ The universe made you as a masterpiece!');
    konamiCode = [];
  }
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out both';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.wish-card, .animal-card, .letter-card, .game-panel').forEach(el => {
  observer.observe(el);
});

// ===== RANDOM BIRTHDAY FACT EVERY 30 SECONDS =====
const birthdayFacts = [
  'Fun fact: The "Happy Birthday" song is over 130 years old! 🎵',
  'Did you know? 21 is considered lucky in many cultures! 🍀',
  'The world\'s largest birthday cake weighed 128,238 pounds! 🎂',
  'Myra means "wonderful" — fits perfectly! ✨',
  'In some countries, your nose gets pulled on your birthday! 👃😄',
  'The most popular birthday month is September! 📅',
  'Queen Elizabeth II had two birthdays every year! 👑',
];

let factIndex = 0;
setInterval(() => {
  if (document.getElementById('entrance').classList.contains('hidden')) {
    console.log('🎂 Birthday Fun Fact: ' + birthdayFacts[factIndex % birthdayFacts.length]);
    factIndex++;
  }
}, 30000);

// ─── DATA ───────────────────────────────────────────────────────────────────
const EXERCISES = {
  7: [
    { id: '1', name: 'Ejercicio 1', desc: 'Teclas del hogar', text: 'asdf jklñ asdf jklñ asdfjklñ fdsajklñ asdf jklñ afsk djlñ' },
    { id: '2', name: 'Ejercicio 2', desc: 'Fila media completa', text: 'asdfghjklñ asdfghjklñ gfds hjkl asdf hjkl gfds jklñ asdfgh' },
    { id: '3', name: 'Ejercicio 3', desc: 'Palabras simples', text: 'sala falla dada jala kala nada masa lana faja fama sala dama' },
    { id: '4', name: 'Ejercicio 4', desc: 'Fila superior', text: 'qwert yuiop qwerty uiop trewq poiuy qwert yuiop rewq oiuyt' },
    { id: '5', name: 'Ejercicio 5', desc: 'Fila inferior', text: 'zxcvb nm zxcvbnm xcvb nm zxcv nm zxcvb mn zxcvbnm cvb nm' },
    { id: '6', name: 'Ejercicio 6', desc: 'Palabras comunes', text: 'mesa silla casa luna rosa pato gato loco poco solo mano dame' },
    { id: '7', name: 'Ejercicio 7', desc: 'Trabalenguas fácil', text: 'me trajo tajo, tres trajes, tres trajes me trajo tajo' },
  ],
  8: [
    { id: '1', name: 'Ejercicio 1', desc: 'Repaso hogar + números', text: 'a1s2d3f4 j5k6l7ñ8 1234 5678 asdf1234 jklñ5678 asd123 jkl456' },
    { id: '2', name: 'Ejercicio 2', desc: 'Palabras con mayúsculas', text: 'Ana Beto Carlos Diana Erika Felipe Gabriela Hector Ivan Julia' },
    { id: '3', name: 'Ejercicio 3', desc: 'Oraciones cortas', text: 'el gato come el raton come el queso el perro corre muy rapido' },
    { id: '4', name: 'Ejercicio 4', desc: 'Palabras de 5+ letras', text: 'escuela trabajo ciudad pueblo camino tiempo bonito clases amigo' },
    { id: '5', name: 'Ejercicio 5', desc: 'Signos y puntuación', text: 'hola mundo, adios sol. como estas? muy bien, gracias. hasta luego.' },
    { id: '6', name: 'Ejercicio 6', desc: 'Velocidad media', text: 'el estudiante practica mecanografia todos los dias en la escuela' },
    { id: '7', name: 'Ejercicio 7', desc: 'Trabalenguas medio', text: 'El amor es una locura, que ni el cura lo cura, que si el cura lo cura, ese cura es una locura' },

  ],
  9: [
    { id: '1', name: 'Ejercicio 1', desc: 'Texto fluido', text: 'la mecanografia es una habilidad muy importante en el mundo moderno' },
    { id: '2', name: 'Ejercicio 2', desc: 'Párrafo corto', text: 'aprender a teclear rapido te ayuda a hacer tareas mas eficientemente' },
    { id: '3', name: 'Ejercicio 3', desc: 'Números y símbolos', text: 'mi telefono es 8888-7777 el codigo es 1234 y el precio es 500 dolares' },
    { id: '4', name: 'Ejercicio 4', desc: 'Texto académico', text: 'los planetas del sistema solar son mercurio venus tierra marte jupiter' },
    { id: '5', name: 'Ejercicio 5', desc: 'Alta velocidad', text: 'con practica constante puedes alcanzar mas de cincuenta palabras por minuto' },
    { id: '6', name: 'Ejercicio 6', desc: 'Desafío avanzado', text: 'la tecnologia avanza cada dia y quienes dominan el teclado tienen ventaja' },
    { id: '7', name: 'Ejercicio 7', desc: 'Trabalenguas avanzado', text: 'Si mi gusto fuera de tu gusto te gustaria mi gusto que gusta de tu gusto, mi gusto gustaria del gusto que gusta tu gusto. Pero como mi gusto no gusta del gusto que gusta tu gusto, mi gusto no gusta del gusto que gusta tu gusto' },

  ]
};

// Finger map: key → [hand: L/R, finger: 0-4 (pinky→thumb / thumb→pinky)]
const FINGER_MAP = {
  'q':['L','pinky'],'a':['L','pinky'],'z':['L','pinky'],
  'w':['L','ring'],'s':['L','ring'],'x':['L','ring'],
  'e':['L','middle'],'d':['L','middle'],'c':['L','middle'],
  'r':['L','index'],'f':['L','index'],'v':['L','index'],
  't':['L','index'],'g':['L','index'],'b':['L','index'],

  'y':['R','index'],'h':['R','index'],'n':['R','index'],
  'u':['R','index'],'j':['R','index'],'m':['R','index'],
  'i':['R','middle'],'k':['R','middle'],',':['R','middle'],
  'o':['R','ring'],'l':['R','ring'],'.':['R','ring'],
  'p':['R','pinky'],'ñ':['R','pinky'],';':['R','pinky'],'-':['R','pinky'],

  ' ':['L','thumb'],

  'Shift':['L','pinky'],
  'ShiftR':['R','pinky'],
  'CapsLock':['L','pinky'],
};

const KEYBOARD_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'Shift'],
  ['Espacio'],
];

const HOME_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ñ'];

// ─── STATE ───────────────────────────────────────────────────────────────────
let currentGrade = 7;
let currentExIdx = 0;
let currentText = '';
let typedChars = [];
let errors = 0;
let totalTyped = 0;
let startTime = null;
let finished = false;
let streak = 0;
let bestStreak = 0;
let wpmInterval = null;

// ─── INIT ─────────────────────────────────────────────────────────────────
function init() {
  buildKeyboard();
  renderExerciseButtons();
  loadExercise(0);
  document.getElementById('typing-input').addEventListener('input', onInput);
  document.getElementById('typing-input').addEventListener('keydown', onKeydown);
  document.getElementById('typing-input').focus();
}

// ─── KEYBOARD ────────────────────────────────────────────────────────────────
function buildKeyboard() {
  const kb = document.getElementById('keyboard');
  kb.innerHTML = '';

  let shiftIndex = 0;

  KEYBOARD_ROWS.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'key-row';

    row.forEach(k => {
      const keyEl = document.createElement('div');
      keyEl.className = 'key';
      const kl = k.toLowerCase();

      if (k === 'Shift') {
        keyEl.classList.add('wide');
        keyEl.textContent = '⇧';

        if (shiftIndex === 0) {
          keyEl.id = 'key-shift-left';
        } else {
          keyEl.id = 'key-shift-right';
        }

        shiftIndex++;
      } else if (k === 'Espacio') {
        keyEl.classList.add('space');
        keyEl.textContent = 'Espacio';
        keyEl.id = 'key-espacio';
      } else {
        keyEl.textContent = k;
        keyEl.id = 'key-' + k.toLowerCase();
      }

      if (HOME_KEYS.includes(kl)) keyEl.classList.add('home-key');

      rowEl.appendChild(keyEl);
    });

    kb.appendChild(rowEl);
  });
}

function highlightKey(char) {
  document.querySelectorAll('.key.highlight').forEach(k => k.classList.remove('highlight'));
  if (!char) return;

  const isUppercase = char >= 'A' && char <= 'Z';
  const kl = char.toLowerCase();

  let shiftKey = null;

  if (isUppercase) {
    const letterMap = FINGER_MAP[kl];

    if (letterMap) {
      const [hand] = letterMap;
      shiftKey = hand === 'L' ? 'ShiftR' : 'Shift';
    }
  }

  //iluminar letra
  const id = kl === ' ' ? 'key-espacio' : ('key-' + kl);
  const el = document.getElementById(id);
  if (el) el.classList.add('highlight');

  //iluminar shift correcto
  if (shiftKey === 'Shift') {
    document.getElementById('key-shift-left')?.classList.add('highlight');
  } else if (shiftKey === 'ShiftR') {
    document.getElementById('key-shift-right')?.classList.add('highlight');
  }

  //dedos (los dos)
  if (shiftKey) {
    updateHandGuide([shiftKey, kl]);
  } else {
    updateHandGuide(kl);
  }
}

function flashKey(char, correct) {
  const kl = char.toLowerCase();
  const id = kl === ' ' ? 'key-espacio' : ('key-' + kl);

  const el = document.getElementById(id);
  if (el) {
    el.classList.add(correct ? 'correct-key' : 'wrong-key');
    setTimeout(() => el.classList.remove('correct-key', 'wrong-key'), 200);
  }

  if (char >= 'A' && char <= 'Z') {
    const shiftEl = document.getElementById('key-shift');
    if (shiftEl) {
      shiftEl.classList.add(correct ? 'correct-key' : 'wrong-key');
      setTimeout(() => shiftEl.classList.remove('correct-key', 'wrong-key'), 200);
    }
  }
}

function updateHandGuide(chars) {
  const fingerIds = {
        L: {
      pinky: 'lf4',
      ring: 'lf3',
      middle: 'lf2',
      index: 'lf1',
      thumb: 'lth'
    },
    R: {
      thumb: 'rth',
      index: 'rf1',
      middle: 'rf2',
      ring: 'rf3',
      pinky: 'rf4'
    }
  };

  ['lf1','lf2','lf3','lf4','lth','rf1','rf2','rf3','rf4','rth'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });

  if (!chars) return;

  const list = Array.isArray(chars) ? chars : [chars];

  list.forEach(char => {
    const map = FINGER_MAP[char];
    if (!map) return;

    const [hand, finger] = map;
    const id = fingerIds[hand][finger];

    document.getElementById(id)?.classList.add('active');
  });
}

// ─── EXERCISE ────────────────────────────────────────────────────────────────
function renderExerciseButtons() {
  const row = document.getElementById('exercise-row');
  row.innerHTML = '';
  EXERCISES[currentGrade].forEach((ex, i) => {
    const btn = document.createElement('button');
    btn.className = 'ex-btn' + (i === currentExIdx ? ' active' : '');
    btn.textContent = ex.name;
    btn.onclick = () => loadExercise(i);
    row.appendChild(btn);
  });
}

function loadExercise(idx) {
  currentExIdx = idx;
  const ex = EXERCISES[currentGrade][idx];
  currentText = ex.text;
  typedChars = [];
  errors = 0;
  totalTyped = 0;
  finished = false;
  startTime = null;
  clearInterval(wpmInterval);

  document.getElementById('ex-name').textContent = ex.name;
  document.getElementById('ex-desc').textContent = ex.desc;
  document.getElementById('typing-input').value = '';
  document.getElementById('typing-input').disabled = false;
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('result-card').classList.remove('show');
  document.getElementById('typing-card').style.display = '';

  renderText();
  renderExerciseButtons();
  highlightKey(currentText[0]);
  document.getElementById('typing-input').focus();
}

function renderText() {
  const display = document.getElementById('text-display');
  display.innerHTML = '';
  for (let i = 0; i < currentText.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    const ch = currentText[i] === ' ' ? '\u00A0' : currentText[i];
    span.textContent = ch;
    if (i < typedChars.length) {
      span.classList.add(typedChars[i] ? 'correct' : 'wrong');
    } else if (i === typedChars.length) {
      span.classList.add('cursor');
    } else {
      span.classList.add('pending');
    }
    display.appendChild(span);
  }
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
function onKeydown(e) {
  if (e.key === 'Enter') {
    if (finished) { nextExercise(); return; }
    loadExercise(currentExIdx);
    return;
  }
  if (e.key === 'Backspace') {
    if (typedChars.length > 0) {
      typedChars.pop();
      renderText();
      const nextChar = currentText[typedChars.length];
      highlightKey(nextChar || '');
      updateProgress();
    }
    e.preventDefault();
    return;
  }
}

function onInput(e) {
  if (finished) { e.target.value = ''; return; }

  const val = e.target.value;
  if (val.length === 0) return;

  // Start timer on first input
  if (!startTime) {
    startTime = Date.now();
    wpmInterval = setInterval(updateLiveWPM, 500);
  }

  const pos = typedChars.length;
  if (pos >= currentText.length) { e.target.value = ''; return; }

  const expected = currentText[pos];
  const typed = val[val.length - 1];
  const correct = typed === expected;

  typedChars.push(correct);
  totalTyped++;
  if (!correct) {
    errors++;
    streak = 0;
    flashKey(typed, false);
    shakeInput();
  } else {
    streak++;
    if (streak > bestStreak) bestStreak = streak;
    flashKey(typed, true);
  }

  e.target.value = '';
  renderText();
  updateProgress();
  document.getElementById('streak-display').textContent = streak;

  // Highlight next key
  const nextPos = typedChars.length;
  if (nextPos < currentText.length) {
    highlightKey(currentText[nextPos]);
  }

  // Check completion
  if (typedChars.length === currentText.length) {
    clearInterval(wpmInterval);
    finished = true;
    showResult();
  }
}

function shakeInput() {
  const input = document.getElementById('typing-input');
  input.classList.remove('shake');
  void input.offsetWidth;
  input.classList.add('shake');
  setTimeout(() => input.classList.remove('shake'), 300);
}

function updateProgress() {
  const pct = (typedChars.length / currentText.length) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
}

function updateLiveWPM() {
  if (!startTime) return;
  const elapsed = (Date.now() - startTime) / 1000 / 60;
  const correctChars = typedChars.filter(Boolean).length;
  const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
  const acc = totalTyped > 0 ? Math.round((typedChars.filter(Boolean).length / totalTyped) * 100) : 100;
  document.getElementById('wpm-display').textContent = wpm;
  document.getElementById('acc-display').textContent = acc;
}

//RESULT 
function showResult() {
  const elapsed = (Date.now() - startTime) / 1000;
  const elapsedMin = elapsed / 60;
  const correctChars = typedChars.filter(Boolean).length;
  const wpm = elapsedMin > 0 ? Math.round((correctChars / 5) / elapsedMin) : 0;
  const acc = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

  document.getElementById('r-wpm').textContent = wpm;
  document.getElementById('r-acc').textContent = acc + '%';
  document.getElementById('r-time').textContent = Math.round(elapsed) + 's';
  document.getElementById('r-errors').textContent = errors;

  // Stars
  let stars = '★★★', emoji = '🎉', msg = '¡Increíble!';
  if (acc < 70 || wpm < 10) { stars = '★☆☆'; emoji = '💪'; msg = '¡Sigue practicando!'; }
  else if (acc < 85 || wpm < 25) { stars = '★★☆'; emoji = '👍'; msg = '¡Buen trabajo!'; }
  document.getElementById('result-stars').textContent = stars;
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-msg').textContent = msg;

  document.getElementById('wpm-display').textContent = wpm;
  document.getElementById('acc-display').textContent = acc;

  document.getElementById('result-card').classList.add('show');
  document.getElementById('typing-card').style.display = 'none';

  if (acc >= 85) launchConfetti();
}

function nextExercise() {
  const next = (currentExIdx + 1) % EXERCISES[currentGrade].length;
  loadExercise(next);
}

function setGrade(g) {
  currentGrade = g;
  currentExIdx = 0;
  document.querySelectorAll('.grade-tab').forEach((t, i) => {
    t.classList.toggle('active', [7, 8, 9][i] === g);
  });
  renderExerciseButtons();
  loadExercise(0);
}

//CONFETTI 
function launchConfetti() {
  const colors = ['#7c3aed', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#fff'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -20px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 1.5}s;
      animation-duration: ${1.5 + Math.random() * 1.5}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

//START 
init();
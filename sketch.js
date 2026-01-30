let sp = [];
let brillo = [];

// Usamos el motor de audio nativo del navegador (más estable que p5.sound)
let musica = new Audio('BGM_PLAY.mp3'); 
musica.loop = true;
let musicaIniciada = false;

function setup() {
  // Esto asegura que el canvas se cree sin importar el audio
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 0, 0, 70); 

  // Iniciar música al primer movimiento o interacción
  if (!musicaIniciada && (mouseX > 0 || mouseY > 0)) {
    musica.play().catch(e => console.log("Esperando interacción..."));
    musicaIniciada = true;
  }

  // --- Lógica de tus partículas (se mantiene igual) ---
  for (let i = sp.length - 1; i >= 0; i--) {
    sp[i].update();
    sp[i].display();
    if (sp[i].estaMuerta) sp.splice(i, 1);
  }

  if (mouseX > 0 || mouseY > 0) {
    sp.push(new Particulas(mouseX, mouseY));
    if (frameCount % 4 == 0) {
      brillo.push(new Glow(mouseX, mouseY));
    }
  }

  for (let i = brillo.length - 1; i >= 0; i--) {
    brillo[i].update();
    brillo[i].display();
    if (brillo[i].estaMuerta) brillo.splice(i, 1);
  }
}

// Respaldo por si el navegador bloquea el movimiento del mouse
function mousePressed() {
  if (musica.paused) {
    musica.play();
    musicaIniciada = true;
  }
}


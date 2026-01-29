let sp = [];
let brillo = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 0, 0, 100); 

  // Partículas principales
  for (let i = sp.length - 1; i >= 0; i--) {
    sp[i].update();
    sp[i].display();
    if (sp[i].estaMuerta) sp.splice(i, 1);
  }

  // Generar partículas en el mouse
  if (mouseX > 0 || mouseY > 0) {
    sp.push(new Particulas(mouseX, mouseY));
    
    if (frameCount % 4 == 0) {
      brillo.push(new Glow(mouseX, mouseY));
    }
  }

  // Brillos (Rombos)
  for (let i = brillo.length - 1; i >= 0; i--) {
    brillo[i].update();
    brillo[i].display();
    if (brillo[i].estaMuerta) brillo.splice(i, 1);
  }
}


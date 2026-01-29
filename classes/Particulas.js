class Particulas {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = p5.Vector.random2D().mult(random(2, 5));
    this.tvida = random(30, 80);
    this.tvidaInicial = this.tvida;
    this.estaMuerta = false;
    this.diam = random(5, 15); 
    this.c = color(245, 190, 38, random(150, 255));
  }

  update() {
    this.pos.add(this.vel);
    
    if (random(1) > 0.95) {
        this.pos.x += random(-10, 10);
        this.diam = random(2, 25); 
    }

    this.tvida -= 1;
    if (this.tvida <= 0) this.estaMuerta = true;
}

  display() {
    let alpha = map(this.tvida, 0, this.tvidaInicial, 0, 255);
    fill(red(this.c), green(this.c), blue(this.c), alpha);
    noStroke();
    circle(this.pos.x, this.pos.y, this.diam);
  }
}

class Glow {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    

    this.vel = p5.Vector.random2D();
    this.vel.mult(random(4, 10)); 
    
    this.anguloRotacion = random(360);
    this.velocidadGiro = random(-8, 8); 
    

    this.tvida = random(40, 90); 
    this.tvidaInicial = this.tvida;
    
    this.tam = random(10, 20);
    this.estaMuerta = false;
    this.numLineas = 4; 
  }

  update() {
    this.pos.add(this.vel); 
    this.anguloRotacion += this.velocidadGiro; 
    
    this.vel.mult(0.98); 
    
    this.tvida -= 1;
    if (this.tvida <= 0) this.estaMuerta = true;
  }

  display() {
    let porcentajeVida = this.tvida / this.tvidaInicial;
    let alpha = map(porcentajeVida, 0, 1, 0, 255);
    
    let colorInicial = color(255); 
    let colorFinal = color(38, 183, 245);
    let c = lerpColor(colorFinal, colorInicial, porcentajeVida);
    
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.anguloRotacion);
    
    strokeWeight(2);
    stroke(red(c), green(c), blue(c), alpha); 
    
    for (let i = 0; i < this.numLineas; i++) {
      let angulo = map(i, 0, this.numLineas, 0, 360);
      line(0, 0, cos(angulo) * this.tam, sin(angulo) * this.tam);
    }
    pop();
  }
}
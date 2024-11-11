// assets/js/cursor-effect.js

const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Cursor position and particle settings
const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const particles = [];
const numParticles = 70; // Number of particles around the cursor
const maxDistance = 80; // Max distance for line connections
const cursorRadius = 800; // Radius around the cursor where particles are visible
const speed_rate = 0.9; // Speed of the particle movement

// Particle class
class Particle {
  constructor() {
    this.reset();
    this.size = 2 + Math.random() * 2; // Random size for variation
    this.speedX = (Math.random() * 2 - 1) * speed_rate; // Random horizontal speed
    this.speedY = (Math.random() * 2 - 1) * speed_rate; // Random vertical speed
  }

  // Reset particle position to be around the cursor
  reset() {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * cursorRadius;
    this.x = cursor.x + Math.cos(angle) * distance;
    this.y = cursor.y + Math.sin(angle) * distance;
  }

  // Draw the particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  }

  // Update particle position and reset if it leaves the cursor radius
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // If particle moves outside the radius, reset it to stay around the cursor
    const dx = this.x - cursor.x;
    const dy = this.y - cursor.y;
    const distanceFromCursor = Math.sqrt(dx * dx + dy * dy);

    if (distanceFromCursor > cursorRadius) {
      this.reset();
    }
  }
}

// Initialize particles around the cursor
function initParticles() {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

// Draw lines between nearby particles
function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance; // Fading effect for lines
        ctx.strokeStyle = `rgba(65, 65, 65, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update particles and draw them
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  // Draw connections between particles
  connectParticles();
  requestAnimationFrame(animate);
}

// Update cursor position on mouse move
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX;
  cursor.y = event.clientY;
});

// Initialize particles and start animation
initParticles();
animate();

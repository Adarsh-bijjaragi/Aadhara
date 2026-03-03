document.addEventListener('DOMContentLoaded', function() {
  const animatedBackground = document.querySelector('.animated-background');
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots');
  animatedBackground.appendChild(dotsContainer);
  
  // Create dots
  const numberOfDots = 30;
  for (let i = 0; i < numberOfDots; i++) {
    createDot();
  }
  
  // Create lines
  const numberOfLines = 15;
  for (let i = 0; i < numberOfLines; i++) {
    createLine();
  }
  
  function createDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    
    // Random size between 3px and 8px
    const size = Math.random() * 5 + 3;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    dot.style.left = `${posX}%`;
    dot.style.top = `${posY}%`;
    
    // Animation
    dot.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out, pulse ${Math.random() * 5 + 5}s infinite ease-in-out`;
    dot.style.animationDelay = `${Math.random() * 5}s`;
    
    dotsContainer.appendChild(dot);
  }
  
  function createLine() {
    const line = document.createElement('div');
    line.classList.add('line');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    line.style.left = `${posX}%`;
    line.style.top = `${posY}%`;
    
    // Random rotation
    const rotation = Math.random() * 360;
    line.style.transform = `rotate(${rotation}deg)`;
    
    // Animation
    line.style.animation = `float ${Math.random() * 15 + 15}s infinite ease-in-out`;
    line.style.animationDelay = `${Math.random() * 5}s`;
    
    dotsContainer.appendChild(line);
  }
});
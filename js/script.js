// Wait for the page to load
window.addEventListener("load", () => {
    // Animate clouds
    document.querySelector(".cloud-left").classList.add("animate-left");
    document.querySelector(".cloud-right").classList.add("animate-right");
    
    // Show quote after clouds move
    setTimeout(() => {
        document.querySelector(".quote-container").classList.add("show");
    }, 2000);
    
    // Create particle effect
    createParticles();
});

// Function to create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        
        // Set random size (smaller particles)
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Set random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Set random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Set random animation
        const duration = Math.random() * 10 + 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        
        // Random floating animation
        const keyframeX = Math.random() * 10 - 5;
        const keyframeY = Math.random() * 10 - 5;
        
        // Add keyframe animation dynamically
        const keyframes = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(${keyframeX}px, ${keyframeY}px); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
}

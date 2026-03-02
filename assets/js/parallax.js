// Professional Parallax System
class ParallaxSystem {
    constructor() {
        this.layers = document.querySelectorAll('[data-speed]');
        this.mouseLayers = document.querySelectorAll('[data-mouse-speed]');
        this.scrollPosition = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.rafId = null;
        
        this.init();
    }
    
    init() {
        // Bind methods
        this.handleScroll = this.handleScroll.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.animate = this.animate.bind(this);
        
        // Add listeners
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('mousemove', this.handleMouseMove);
        
        // Start animation loop
        this.animate();
    }
    
    handleScroll() {
        this.scrollPosition = window.scrollY;
    }
    
    handleMouseMove(e) {
        // Normalize mouse coordinates to -1 to 1 range
        this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        this.targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }
    
    animate() {
        // Smooth mouse follow
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
        
        // Update scroll-based parallax
        this.layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed);
            const yOffset = this.scrollPosition * speed;
            
            // Apply 3D transform for depth effect
            layer.style.transform = `translate3d(0, ${yOffset}px, 0) rotateX(${this.mouseY * 2}deg) rotateY(${this.mouseX * 2}deg)`;
        });
        
        // Update mouse-based parallax
        this.mouseLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.mouseSpeed);
            const xOffset = this.mouseX * 50 * speed;
            const yOffset = this.mouseY * 50 * speed;
            
            layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        });
        
        this.rafId = requestAnimationFrame(this.animate);
    }
    
    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxSystem();
});
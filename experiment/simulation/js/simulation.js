// Constants
const WATER_DENSITY = 998; // kg/m³
const WATER_VISCOSITY = 0.001; // Pa·s
const GRAVITY = 9.81; // m/s²

// Fluid properties
const FLUIDS = {
    water: { density: 998, viscosity: 0.001 },
    glycerin: { density: 1260, viscosity: 1.412 },
    oil: { density: 900, viscosity: 0.03 }
};

class PipeFlowSimulator {
    constructor() {
        this.canvas = document.getElementById('pipeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.headLossData = [];
        this.currentDiameter = 0.05;
        this.flowSpeed = 0;
        this.lastFrameTime = 0;
        
        // Initialize particles
        this.initializeParticles();
        
        // Initialize canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Setup inputs
        this.setupInputs();
        
        // Setup Chart.js
        this.setupChart();
        
        // Start animation
        requestAnimationFrame((timestamp) => this.animate(timestamp));
    }
    
    initializeParticles() {
        const particleCount = 200; // Increased particle count
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle(true));
        }
    }
    
    createParticle(randomX = false) {
        const pipeHeight = Math.min(60 * (this.currentDiameter / 0.05), this.canvas.height * 0.6);
        const maxOffset = (pipeHeight * 0.35); // Reduced vertical spread
        const x = randomX ? 
            Math.random() * (this.canvas.width - 150) + 70 : // Initial spread
            70; // Start at pipe entrance
        
        return {
            x: x,
            y: this.canvas.height/2 + (Math.random() * 2 - 1) * maxOffset,
            baseSpeed: 1 + Math.random() * 0.5, // Base speed multiplier
            size: 2 + Math.random(), // Smaller particles
            opacity: 0.8 + Math.random() * 0.2, // Higher opacity
            yOffset: Math.random() * Math.PI * 2 // For vertical oscillation
        };
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    setupInputs() {
        // Get input elements
        this.lengthInput = document.getElementById('pipeLength');
        this.diameterInput = document.getElementById('pipeDiameter');
        this.flowRateInput = document.getElementById('flowRate');
        this.fluidSelect = document.getElementById('fluid');
        this.flowRateValue = document.getElementById('flowRateValue');
        
        // Add event listeners
        const inputs = [this.lengthInput, this.diameterInput, this.flowRateInput, this.fluidSelect];
        inputs.forEach(input => input.addEventListener('input', () => this.updateSimulation()));
        
        // Update flow rate display and gradient
        this.flowRateInput.addEventListener('input', () => {
            const value = this.flowRateInput.value;
            this.flowRateValue.textContent = value;
            
            // Update range input gradient
            const percent = (value - this.flowRateInput.min) / (this.flowRateInput.max - this.flowRateInput.min) * 100;
            this.flowRateInput.style.setProperty('--value-percent', `${percent}%`);
        });

        // Set initial range input gradient
        const initialPercent = (this.flowRateInput.value - this.flowRateInput.min) / 
            (this.flowRateInput.max - this.flowRateInput.min) * 100;
        this.flowRateInput.style.setProperty('--value-percent', `${initialPercent}%`);
    }
    
    setupChart() {
        const ctx = document.getElementById('headLossGraph').getContext('2d');
        Chart.defaults.color = '#b0b0b0';
        Chart.defaults.borderColor = '#404040';
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Head Loss vs Flow Velocity',
                    data: [],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    borderWidth: 2,
                    fill: true,
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e0e0',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(45, 45, 45, 0.9)',
                        titleFont: {
                            family: "'Inter', sans-serif",
                            size: 14
                        },
                        bodyFont: {
                            family: "'JetBrains Mono', monospace",
                            size: 12
                        },
                        padding: 12,
                        borderColor: '#404040',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Flow Velocity (m/s)',
                            color: '#e0e0e0',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12,
                                weight: 500
                            }
                        },
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                family: "'JetBrains Mono', monospace",
                                size: 11
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Head Loss (m)',
                            color: '#e0e0e0',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12,
                                weight: 500
                            }
                        },
                        grid: {
                            color: '#404040'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                family: "'JetBrains Mono', monospace",
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    updateSimulation() {
        // Get current values
        const L = parseFloat(this.lengthInput.value);
        const D = parseFloat(this.diameterInput.value);
        this.currentDiameter = D;
        const Q = parseFloat(this.flowRateInput.value) / 1000; // Convert L/s to m³/s
        const fluid = FLUIDS[this.fluidSelect.value];
        
        // Calculate flow parameters
        const A = Math.PI * (D/2) ** 2;
        const v = Q / A;
        const Re = (fluid.density * v * D) / fluid.viscosity;
        
        let f;
        if (Re < 2300) {
            f = 64 / Re;
        } else {
            f = 0.316 * Re ** (-0.25);
        }
        
        const hf = f * (L/D) * (v**2) / (2 * GRAVITY);
        
        // Update displays with animation
        this.animateValue('velocity', v, 3);
        this.animateValue('headLoss', hf, 3);
        this.animateValue('frictionFactor', f, 4);
        
        // Update pressure readings with color coding
        const p1 = fluid.density * GRAVITY * hf;
        const p2 = 0;
        this.updatePressureGauge('pressure1', p1);
        this.updatePressureGauge('pressure2', p2);
        
        // Update particles
        this.updateParticles(v, 16);
        
        // Update graph
        this.updateGraph(v, hf);
    }
    
    animateValue(elementId, newValue, decimals = 2) {
        const element = document.getElementById(elementId);
        const oldValue = parseFloat(element.textContent);
        
        // Remove old animation class
        element.classList.remove('animate-value');
        
        // Trigger reflow
        void element.offsetWidth;
        
        // Add new animation class
        element.classList.add('animate-value');
        
        // Update value
        element.textContent = newValue.toFixed(decimals);
    }

    updatePressureGauge(gaugeId, pressure) {
        const gauge = document.getElementById(gaugeId);
        const valueSpan = gauge.querySelector('span');
        const oldValue = parseInt(valueSpan.textContent);
        
        // Update value with animation
        valueSpan.classList.remove('animate-value');
        void valueSpan.offsetWidth;
        valueSpan.classList.add('animate-value');
        valueSpan.textContent = Math.round(pressure);
        
        // Color code based on pressure difference
        if (gaugeId === 'pressure1') {
            if (pressure > 1000) {
                gauge.style.color = 'var(--danger-color)';
            } else if (pressure > 500) {
                gauge.style.color = 'var(--warning-color)';
            } else {
                gauge.style.color = 'var(--success-color)';
            }
        }
    }
    
    updateParticles(velocity, deltaTime) {
        const baseSpeed = velocity * 30; // Adjusted base speed
        
        this.particles.forEach(particle => {
            // Update particle position
            particle.x += baseSpeed * particle.baseSpeed * (deltaTime / 16); // Time-based movement
            
            // Add slight vertical oscillation
            particle.yOffset += deltaTime * 0.003;
            const oscillation = Math.sin(particle.yOffset) * 2;
            particle.y += oscillation * (velocity / 2);
            
            // Keep particles within pipe bounds
            const pipeHeight = Math.min(60 * (this.currentDiameter / 0.05), this.canvas.height * 0.6);
            const maxOffset = pipeHeight * 0.35;
            particle.y = Math.max(
                this.canvas.height/2 - maxOffset,
                Math.min(this.canvas.height/2 + maxOffset, particle.y)
            );
            
            // Reset particle if it goes off screen
            if (particle.x > this.canvas.width - 70) {
                const newParticle = this.createParticle(false);
                particle.x = newParticle.x;
                particle.y = newParticle.y;
                particle.baseSpeed = newParticle.baseSpeed;
                particle.yOffset = newParticle.yOffset;
            }
        });
    }
    
    updateGraph(velocity, headLoss) {
        // Add new data point
        this.headLossData.push({ v: velocity, h: headLoss });
        
        // Keep only last 50 points
        if (this.headLossData.length > 50) {
            this.headLossData.shift();
        }
        
        // Sort data by velocity
        this.headLossData.sort((a, b) => a.v - b.v);
        
        // Update chart
        this.chart.data.labels = this.headLossData.map(d => d.v.toFixed(2));
        this.chart.data.datasets[0].data = this.headLossData.map(d => d.h);
        this.chart.update();
    }
    
    drawPipe() {
        const ctx = this.ctx;
        const centerY = this.canvas.height/2;
        
        // Calculate pipe dimensions based on diameter
        const pipeHeight = 60 * (this.currentDiameter / 0.05); // Scale pipe height with diameter
        
        // Draw pipe background (darker interior)
        ctx.beginPath();
        ctx.rect(50, centerY - pipeHeight/2, this.canvas.width - 100, pipeHeight);
        ctx.fillStyle = '#1a1a1a';
        ctx.fill();

        // Create water gradient
        const waterGradient = ctx.createLinearGradient(0, centerY - pipeHeight/2, 0, centerY + pipeHeight/2);
        waterGradient.addColorStop(0, 'rgba(52, 152, 219, 0.2)');
        waterGradient.addColorStop(0.5, 'rgba(52, 152, 219, 0.4)');
        waterGradient.addColorStop(1, 'rgba(52, 152, 219, 0.2)');

        // Fill pipe with water gradient
        ctx.fillStyle = waterGradient;
        ctx.fill();
        
        // Draw pipe walls with gradient
        const wallThickness = 4;
        const gradient = ctx.createLinearGradient(0, centerY - pipeHeight/2 - wallThickness, 0, centerY + pipeHeight/2 + wallThickness);
        gradient.addColorStop(0, '#505050');
        gradient.addColorStop(0.5, '#2d2d2d');
        gradient.addColorStop(1, '#505050');
        
        // Top wall
        ctx.beginPath();
        ctx.rect(50, centerY - pipeHeight/2 - wallThickness, this.canvas.width - 100, wallThickness);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Bottom wall
        ctx.beginPath();
        ctx.rect(50, centerY + pipeHeight/2, this.canvas.width - 100, wallThickness);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw pipe ends (caps)
        ctx.beginPath();
        ctx.rect(50 - wallThickness, centerY - pipeHeight/2 - wallThickness, wallThickness, pipeHeight + wallThickness * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.rect(this.canvas.width - 50, centerY - pipeHeight/2 - wallThickness, wallThickness, pipeHeight + wallThickness * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw pressure taps
        this.drawPressureTap(150, centerY, pipeHeight);
        this.drawPressureTap(this.canvas.width - 150, centerY, pipeHeight);
    }
    
    drawPressureTap(x, centerY, pipeHeight) {
        const ctx = this.ctx;
        const tapHeight = 30;
        
        // Draw tap pipe
        ctx.beginPath();
        ctx.moveTo(x, centerY - pipeHeight/2);
        ctx.lineTo(x, centerY - pipeHeight/2 - tapHeight);
        ctx.strokeStyle = '#606060';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw tap circle
        ctx.beginPath();
        ctx.arc(x, centerY - pipeHeight/2 - tapHeight, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#606060';
        ctx.fill();
        
        // Draw connection point
        ctx.beginPath();
        ctx.arc(x, centerY - pipeHeight/2, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#3498db';
        ctx.fill();
    }
    
    drawParticles() {
        const ctx = this.ctx;
        const centerY = this.canvas.height/2;
        const pipeHeight = Math.min(60 * (this.currentDiameter / 0.05), this.canvas.height * 0.6);
        
        // Create clipping path for particles
        ctx.save();
        ctx.beginPath();
        ctx.rect(50, centerY - pipeHeight/2, this.canvas.width - 100, pipeHeight);
        ctx.clip();
        
        // Draw flow lines
        const velocity = parseFloat(this.flowRateInput.value);
        if (velocity > 0) {
            const lineCount = 10;
            const lineSpacing = pipeHeight / lineCount;
            ctx.strokeStyle = 'rgba(52, 152, 219, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < lineCount; i++) {
                const y = centerY - pipeHeight/2 + i * lineSpacing;
                ctx.beginPath();
                for (let x = 70; x < this.canvas.width - 70; x += 5) {
                    const offset = Math.sin((x + this.lastFrameTime * velocity * 0.1) * 0.05) * 2;
                    if (x === 70) {
                        ctx.moveTo(x, y + offset);
                    } else {
                        ctx.lineTo(x, y + offset);
                    }
                }
                ctx.stroke();
            }
        }
        
        // Draw particles with motion blur effect
        this.particles.forEach(particle => {
            const speed = Math.abs(particle.baseSpeed * velocity);
            const blurLength = Math.min(speed * 2, 15);
            
            // Draw motion blur
            const gradient = ctx.createLinearGradient(
                particle.x - blurLength, particle.y,
                particle.x + particle.size, particle.y
            );
            gradient.addColorStop(0, `rgba(52, 152, 219, 0)`);
            gradient.addColorStop(1, `rgba(52, 152, 219, ${particle.opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(particle.x - blurLength, particle.y);
            ctx.lineTo(particle.x + particle.size, particle.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = particle.size * 2;
            ctx.stroke();
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 152, 219, ${particle.opacity})`;
            ctx.fill();
        });
        
        ctx.restore();
    }
    
    animate(timestamp) {
        const deltaTime = this.lastFrameTime ? timestamp - this.lastFrameTime : 16;
        this.lastFrameTime = timestamp;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw pipe and particles
        this.drawPipe();
        
        // Update and draw particles
        const velocity = parseFloat(this.flowRateInput.value);
        this.updateParticles(velocity, deltaTime);
        this.drawParticles();
        
        // Request next frame
        requestAnimationFrame((timestamp) => this.animate(timestamp));
    }
}

// Initialize simulator when page loads
window.addEventListener('load', () => {
    const simulator = new PipeFlowSimulator();
    simulator.updateSimulation();
}); 
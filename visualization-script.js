document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const canvas = document.getElementById('math-canvas');
    const ctx = canvas.getContext('2d');
    const zoomSlider = document.getElementById('zoom');
    const zoomValue = document.getElementById('zoom-value');
    const gridCheckbox = document.getElementById('grid');
    const axesCheckbox = document.getElementById('axes');
    const equationInput = document.getElementById('equation-input');
    const plotBtn = document.getElementById('plot-btn');
    const shapeButtons = document.querySelectorAll('.shape-btn');
    const canvasMessage = document.getElementById('canvas-message');

    // Establecer tamaño del canvas
    function setCanvasSize() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 32; // Restar padding
        canvas.height = 600;
    }

    // Función para mostrar u ocultar el mensaje
    function toggleCanvasMessage(show) {
        if (show) {
            canvasMessage.classList.remove('hidden');
        } else {
            canvasMessage.classList.add('hidden');
        }
    }

    // Inicializar canvas (solo cuadrícula y ejes, sin figuras)
    function initCanvas() {
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar cuadrícula si está activada
        if (gridCheckbox.checked) {
            drawGrid();
        }
        
        // Dibujar ejes si están activados
        if (axesCheckbox.checked) {
            drawAxes();
        }
    }

    // Dibujar cuadrícula
    function drawGrid() {
        const gridSize = 20 * (zoomSlider.value / 5);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        // Líneas verticales
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // Líneas horizontales
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Dibujar ejes
    function drawAxes() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        
        // Eje X
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
        
        // Eje Y
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();
        
        // Etiquetas
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.fillText('X', canvas.width - 15, centerY - 10);
        ctx.fillText('Y', centerX + 10, 15);
        ctx.fillText('O', centerX - 15, centerY + 15);
    }

    // Graficar ecuación personalizada
    function plotEquation(equation) {
        toggleCanvasMessage(false);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 20 * (zoomSlider.value / 5);
        
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        let firstPoint = true;
        
        // Dibujar la gráfica punto por punto
        for (let pixelX = 0; pixelX < canvas.width; pixelX++) {
            // Convertir píxel a coordenada matemática
            const x = (pixelX - centerX) / scale;
            
            let y;
            
            // Evaluar la ecuación (simplificado para ejemplos básicos)
            if (equation.includes('2x + 3')) {
                y = 2 * x + 3;
            } else if (equation.includes('x^2 - 4')) {
                y = x * x - 4;
            } else if (equation.includes('sin(x)')) {
                y = Math.sin(x);
            } else if (equation.includes('cos(x)')) {
                y = Math.cos(x);
            } else if (equation.includes('tan(x)')) {
                y = Math.tan(x);
            } else if (equation.includes('log(x)')) {
                if (x > 0) y = Math.log(x);
                else continue;
            } else {
                // Ecuación genérica y = mx + b
                const match = equation.match(/y\s*=\s*([+-]?\d*\.?\d*)\s*x\s*([+-]\s*\d*\.?\d*)?/);
                if (match) {
                    const m = parseFloat(match[1]) || 1;
                    const b = parseFloat(match[2]) || 0;
                    y = m * x + b;
                } else {
                    // Si no se reconoce, mostrar una línea diagonal simple
                    y = x;
                }
            }
            
            // Convertir coordenada matemática a píxel
            const pixelY = centerY - y * scale;
            
            if (firstPoint) {
                ctx.moveTo(pixelX, pixelY);
                firstPoint = false;
            } else {
                ctx.lineTo(pixelX, pixelY);
            }
        }
        
        ctx.stroke();
    }

    // Dibujar línea recta (y = 2x + 3)
    function drawLine() {
        equationInput.value = 'y = 2x + 3';
        plotEquation('y = 2x + 3');
    }

    // Dibujar parábola (y = x^2 - 4)
    function drawParabola() {
        equationInput.value = 'y = x^2 - 4';
        plotEquation('y = x^2 - 4');
    }

    // Dibujar círculo
    function drawCircle() {
        toggleCanvasMessage(false);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100 * (zoomSlider.value / 5);
        
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Dibujar función seno
    function drawSine() {
        equationInput.value = 'y = sin(x)';
        plotEquation('y = sin(x)');
    }

    // Dibujar función coseno
    function drawCosine() {
        equationInput.value = 'y = cos(x)';
        plotEquation('y = cos(x)');
    }

    // Dibujar función tangente
    function drawTangent() {
        equationInput.value = 'y = tan(x)';
        plotEquation('y = tan(x)');
    }

    // Asignar eventos a los controles
    zoomSlider.addEventListener('input', function() {
        zoomValue.textContent = this.value;
        initCanvas();
        // Volver a graficar la ecuación actual si hay una
        if (equationInput.value) {
            plotEquation(equationInput.value);
        } else {
            toggleCanvasMessage(true);
        }
    });

    gridCheckbox.addEventListener('change', function() {
        initCanvas();
        // Volver a graficar la ecuación actual si hay una
        if (equationInput.value) {
            plotEquation(equationInput.value);
        } else {
            toggleCanvasMessage(true);
        }
    });

    axesCheckbox.addEventListener('change', function() {
        initCanvas();
        // Volver a graficar la ecuación actual si hay una
        if (equationInput.value) {
            plotEquation(equationInput.value);
        } else {
            toggleCanvasMessage(true);
        }
    });

    plotBtn.addEventListener('click', function() {
        const equation = equationInput.value;
        if (equation.trim() !== '') {
            initCanvas();
            plotEquation(equation);
        }
    });

    // Permitir graficar al presionar Enter
    equationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const equation = equationInput.value;
            if (equation.trim() !== '') {
                initCanvas();
                plotEquation(equation);
            }
        }
    });

    shapeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const shape = this.getAttribute('data-shape');
            
            switch(shape) {
                case 'line':
                    drawLine();
                    break;
                case 'parabola':
                    drawParabola();
                    break;
                case 'circle':
                    drawCircle();
                    break;
                case 'sine':
                    drawSine();
                    break;
                case 'cosine':
                    drawCosine();
                    break;
                case 'tangent':
                    drawTangent();
                    break;
            }
        });
    });

    // Inicializar canvas al cargar la página (solo cuadrícula y ejes)
    setCanvasSize();
    initCanvas();
    toggleCanvasMessage(true);

    // Ajustar tamaño del canvas al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        setCanvasSize();
        initCanvas();
        // Volver a graficar la ecuación actual si hay una
        if (equationInput.value) {
            plotEquation(equationInput.value);
        } else {
            toggleCanvasMessage(true);
        }
    });
});
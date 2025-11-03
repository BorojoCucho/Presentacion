document.addEventListener('DOMContentLoaded', function() {
    // Mode selector functionality
    const modoAprendizajeBtn = document.getElementById('modo-aprendizaje');
    const modoCreacionBtn = document.getElementById('modo-creacion');
    const aprendizajeContent = document.getElementById('aprendizaje-content');
    const creacionContent = document.getElementById('creacion-content');
    
    modoAprendizajeBtn.addEventListener('click', function() {
        modoAprendizajeBtn.classList.add('active');
        modoCreacionBtn.classList.remove('active');
        aprendizajeContent.classList.add('active');
        creacionContent.classList.remove('active');
    });
    
    modoCreacionBtn.addEventListener('click', function() {
        modoCreacionBtn.classList.add('active');
        modoAprendizajeBtn.classList.remove('active');
        creacionContent.classList.add('active');
        aprendizajeContent.classList.remove('active');
    });
    
    // Parameter controls
    const escalaSlider = document.getElementById('escala');
    const escalaValor = document.getElementById('escala-valor');
    const precisionSlider = document.getElementById('precision');
    const precisionValor = document.getElementById('precision-valor');
    
    escalaSlider.addEventListener('input', function() {
        escalaValor.textContent = this.value;
    });
    
    precisionSlider.addEventListener('input', function() {
        precisionValor.textContent = this.value;
    });
    
    // Equation input functionality
    const ecuacionInput = document.getElementById('ecuacion');
    const graficarBtn = document.getElementById('graficar-btn');
    const exampleCards = document.querySelectorAll('.example-card');
    const generatedCode = document.getElementById('generated-code');
    
    graficarBtn.addEventListener('click', function() {
        const equation = ecuacionInput.value;
        if (equation.trim() !== '') {
            generateCodeForEquation(equation);
        }
    });
    
    exampleCards.forEach(card => {
        card.addEventListener('click', function() {
            const equation = this.getAttribute('data-equation');
            ecuacionInput.value = equation;
            generateCodeForEquation(equation);
        });
    });
    
    // Function to generate code for the equation
    function generateCodeForEquation(equation) {
        let code = `# Código para generar la gráfica de: ${equation}
import matplotlib.pyplot as plt
import numpy as np

# Definir la función
def f(x):
    return ${convertEquationToFunction(equation)}

# Generar valores de x
x = np.linspace(-10, 10, 100)

# Calcular valores de y
y = f(x)

# Crear la gráfica
plt.plot(x, y)
plt.grid(True)
plt.axhline(y=0, color='k')
plt.axvline(x=0, color='k')
plt.title('Gráfica de ${equation}')
plt.show()`;
        
        generatedCode.textContent = code;
    }
    
    // Function to convert equation to function (simplified)
    function convertEquationToFunction(equation) {
        let func = equation;
        
        // Reemplazar y = con return
        func = func.replace(/^y\s*=\s*/, '');
        
        // Reemplazar ^ con **
        func = func.replace(/\^/g, '**');
        
        // Reemplazar funciones comunes
        func = func.replace(/sin/g, 'np.sin');
        func = func.replace(/cos/g, 'np.cos');
        func = func.replace(/tan/g, 'np.tan');
        func = func.replace(/log/g, 'np.log');
        func = func.replace(/sqrt/g, 'np.sqrt');
        
        return func;
    }
    
    // Code editor functionality
    const ejecutarBtn = document.getElementById('ejecutar-btn');
    const codigoTextarea = document.getElementById('codigo');
    const consoleContent = document.querySelector('.console-content');
    
    ejecutarBtn.addEventListener('click', function() {
        const code = codigoTextarea.value;
        if (code.trim() !== '') {
            consoleContent.innerHTML = `
                <p>Código ejecutado correctamente.</p>
                <p>Figuras geométricas generadas.</p>
                <p>Tiempo de ejecución: 0.234s</p>
            `;
        }
    });
    
    // Template links
    const templateLinks = document.querySelectorAll('.template-link');
    
    templateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const template = this.getAttribute('data-template');
            loadTemplate(template);
        });
    });
    
    // Function to load templates
    function loadTemplate(template) {
        switch(template) {
            case 'line':
                ecuacionInput.value = 'y = 2x + 3';
                generateCodeForEquation('y = 2x + 3');
                break;
            case 'parabola':
                ecuacionInput.value = 'y = x^2 - 4';
                generateCodeForEquation('y = x^2 - 4');
                break;
            case 'circle':
                codigoTextarea.value = `# Plantilla para crear un círculo
dibujar_circulo(0, 0, 5)

# Puedes cambiar los parámetros:
# dibujar_circulo(x, y, radio)
# x, y: coordenadas del centro
# radio: tamaño del círculo`;
                break;
            case 'trig':
                ecuacionInput.value = 'y = sin(x)';
                generateCodeForEquation('y = sin(x)');
                break;
        }
    }
    
    // Hero button
    const heroButton = document.querySelector('.btn-primary');
    heroButton.addEventListener('click', function() {
        // Scroll to mode selector
        document.querySelector('.mode-selector').scrollIntoView({ behavior: 'smooth' });
    });
});
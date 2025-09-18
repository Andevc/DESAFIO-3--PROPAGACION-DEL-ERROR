// Ejercicio 32: Datación por Carbono-14
function calculateCarbonAge() {
    const percentage = parseFloat(document.getElementById('carbon-percentage').value);

    if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
        alert('Por favor ingrese un porcentaje válido entre 0 y 100');
        return;
    }

    // Constante de desintegración del C-14
    const k = Math.log(2) / 5730; // k ≈ 1.209 × 10⁻⁴

    // Fracción actual
    const fraction = percentage / 100;

    // Cálculo: f(t) = f(0) × e^(-kt)
    // fraction = e^(-kt)
    // ln(fraction) = -kt
    // t = -ln(fraction) / k
    const age = -Math.log(fraction) / k;

    // Mostrar resultado
    document.getElementById('carbon-age').innerHTML = `
                <div class="highlight">Edad estimada: ${Math.round(age)} años</div>
            `;

    document.getElementById('carbon-steps').innerHTML = `
                <div class="step">
                    <strong>Paso 1:</strong> Identificar los datos<br>
                    • f(t)/f(0) = ${percentage}% = ${fraction.toFixed(4)}
                </div>
                <div class="step">
                    <strong>Paso 2:</strong> Calcular constante k<br>
                    • k = ln(2) / 5730 = ${k.toFixed(6)}
                </div>
                <div class="step">
                    <strong>Paso 3:</strong> Aplicar la fórmula<br>
                    • ${fraction.toFixed(4)} = e^(-${k.toFixed(6)} × t)
                </div>
                <div class="step">
                    <strong>Paso 4:</strong> Resolver para t<br>
                    • ln(${fraction.toFixed(4)}) = -${k.toFixed(6)} × t<br>
                    • t = -ln(${fraction.toFixed(4)}) / ${k.toFixed(6)}<br>
                    • t = ${age.toFixed(1)} años
                </div>
            `;

    document.getElementById('carbon-result').classList.add('show');
}

function clearCarbon() {
    document.getElementById('carbon-percentage').value = '77.45';
    document.getElementById('carbon-result').classList.remove('show');
}

// Ejercicio 36: Ley de Enfriamiento de Newton
function calculateDeathTime() {
    const Ts = parseFloat(document.getElementById('temp-ambient').value);
    const T0 = parseFloat(document.getElementById('temp-initial').value);
    const T1 = parseFloat(document.getElementById('temp-after').value);

    if (isNaN(Ts) || isNaN(T0) || isNaN(T1)) {
        alert('Por favor ingrese valores válidos para todas las temperaturas');
        return;
    }

    // Temperatura corporal normal: 98.6°F
    const normalBodyTemp = 98.6;

    // Paso 1: Encontrar k usando las temperaturas conocidas
    // T(1) = Ts + (T(0) - Ts) × e^(-k×1)
    // T1 = Ts + (T0 - Ts) × e^(-k)
    // (T1 - Ts) = (T0 - Ts) × e^(-k)
    // e^(-k) = (T1 - Ts) / (T0 - Ts)
    // k = -ln((T1 - Ts) / (T0 - Ts))

    const k = -Math.log((T1 - Ts) / (T0 - Ts));

    // Paso 2: Encontrar el tiempo cuando el cuerpo estaba a 98.6°F
    // normalBodyTemp = Ts + (T0 - Ts) × e^(-k×t_death)
    // (normalBodyTemp - Ts) = (T0 - Ts) × e^(-k×t_death)
    // e^(-k×t_death) = (normalBodyTemp - Ts) / (T0 - Ts)
    // -k×t_death = ln((normalBodyTemp - Ts) / (T0 - Ts))
    // t_death = -ln((normalBodyTemp - Ts) / (T0 - Ts)) / k

    const t_death = -Math.log((normalBodyTemp - Ts) / (T0 - Ts)) / k;

    // Calcular el tiempo de muerte (antes de las 9:18 PM)
    const deathTimeHours = t_death;
    const deathTimeMinutes = (deathTimeHours % 1) * 60;

    // Tiempo de muerte = 9:18 PM - t_death horas
    const discoveryTime = new Date();
    discoveryTime.setHours(21, 18, 0, 0); // 9:18 PM

    const deathTime = new Date(discoveryTime.getTime() - (deathTimeHours * 60 * 60 * 1000));

    document.getElementById('death-time').innerHTML = `
                <div class="highlight">Tiempo estimado de muerte: ${deathTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} (${deathTimeHours.toFixed(2)} horas antes del descubrimiento)</div>
            `;

    document.getElementById('newton-steps').innerHTML = `
                <div class="step">
                    <strong>Paso 1:</strong> Calcular constante k<br>
                    • Usando T(1) = ${T1}°F después de 1 hora<br>
                    • k = -ln((${T1} - ${Ts}) / (${T0} - ${Ts})) = ${k.toFixed(4)}
                </div>
                <div class="step">
                    <strong>Paso 2:</strong> Encontrar tiempo cuando T = 98.6°F<br>
                    • ${normalBodyTemp} = ${Ts} + (${T0} - ${Ts}) × e^(-${k.toFixed(4)} × t)
                </div>
                <div class="step">
                    <strong>Paso 3:</strong> Resolver para t<br>
                    • e^(-${k.toFixed(4)} × t) = (${normalBodyTemp} - ${Ts}) / (${T0} - ${Ts})<br>
                    • t = ${deathTimeHours.toFixed(2)} horas antes del descubrimiento
                </div>
                <div class="step">
                    <strong>Paso 4:</strong> Calcular hora exacta<br>
                    • Descubrimiento: 9:18 PM<br>
                    • Muerte: aproximadamente ${deathTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </div>
            `;

    document.getElementById('newton-result').classList.add('show');
}

function clearNewton() {
    document.getElementById('temp-ambient').value = '69';
    document.getElementById('temp-initial').value = '98.6';
    document.getElementById('temp-after').value = '78.0';
    document.getElementById('newton-result').classList.remove('show');
}

// Animaciones adicionales
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.exercise-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});
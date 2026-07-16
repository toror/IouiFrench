// ==========================================
// 1. CONTROL DE DESPLEGABLES (DROPDOWNS)
// ==========================================
const dropdowns = document.querySelectorAll('.dropdown-container');

// Solo ejecutamos la lógica si encontramos al menos un desplegable en la página
if (dropdowns.length > 0) {
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        const menu = dropdown.querySelector('.dropdown-menu');

        // Nos aseguramos de que el botón y el menú existan dentro del contenedor
        if (btn && menu) {
            btn.addEventListener('click', () => {
                // Buscamos si hay OTRO menú abierto en la página
                const currentlyOpenMenu = document.querySelector('.dropdown-menu.is-open');
                
                // Si hay uno abierto Y no es el mismo que estamos clickeando ahora...
                if (currentlyOpenMenu && currentlyOpenMenu !== menu) {
                    currentlyOpenMenu.classList.remove('is-open');
                }

                // Finalmente, abrimos o cerramos el menú actual
                menu.classList.toggle('is-open');
            });
        }
    });
}


// ==========================================
// 2. CONTROL DEL CALENDARIO (SCHEDULE)
// ==========================================
const calendarInput = document.getElementById('full-calendar');

if (calendarInput) {
    const ahora = new Date();
    const anio = ahora.getFullYear(); 
    const mesActual = ahora.getMonth(); 

    // 1. El límite mínimo será el primer día del mes actual
    const fechaMinima = new Date(anio, mesActual, 1);

    // 2. El límite máximo será el último día del mes siguiente
    const fechaMaxima = new Date(anio, mesActual + 2, 0);

    // Activamos Flatpickr con los ajustes corregidos
    flatpickr("#full-calendar", {
        inline: true,          // Se queda abierto fijo en pantalla (un solo mes)
        defaultDate: "today",  // ¡NUEVO! Selecciona inmediatamente el día actual en el mapa
        minDate: fechaMinima,  // Bloquea los meses anteriores de forma definitiva
        maxDate: fechaMaxima,  // Bloquea todo lo posterior al fin del próximo mes
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 30,
        locale: {
            firstDayOfWeek: 1  // La semana empieza en Lunes
        }
    });
}

// ==========================================
// 3. ENVÍO DE RESERVA POR WHATSAPP
// ==========================================
const whatsappBtn = document.getElementById('whatsapp-btn');

if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        // 1. Obtenemos los valores que el alumno escribió
        const fechaHora = document.getElementById('full-calendar').value;
        const email = document.getElementById('student-email').value.trim();
        const mensaje = document.getElementById('student-message').value.trim();

        // 2. Validación manual (reemplaza el 'required' de HTML)
        if (!email || !mensaje) {
            alert("Please, fill in both your email and your message before booking.");
            return;
        }

        // Validación básica de formato de correo (con punto incluido)
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address (including .com, .fr, etc.).");
            return;
        }

        // 3. Configura TU NÚMERO DE WHATSAPP aquí (sin el signo +)
        // Ej: Código de país + número. Si es España: 34600000000. Si es Colombia: 573000000000
        const tuNumeroTelefono = "+33746338561"; 

        // 4. Redactamos el texto que te va a llegar (puedes cambiarlo a tu gusto)
        const textoMensaje = `Bonjour iouiFrench! \n\n` +
                             `I would like to book a French class:\n` +
                             ` Date & Hour (GMT+1): ${fechaHora}\n` +
                             ` My Email: ${email}\n` +
                             ` My Notes: ${mensaje}`;

        // 5. Convertimos el texto a un formato que entienda internet (codificación URL)
        const textoCodificado = encodeURIComponent(textoMensaje);

        // 6. Creamos el enlace oficial de WhatsApp API
        const urlWhatsapp = `https://api.whatsapp.com/send?phone=${tuNumeroTelefono}&text=${textoCodificado}`;

        // 7. ¡Abrimos WhatsApp en una pestaña nueva!
        window.open(urlWhatsapp, '_blank');
    });
}
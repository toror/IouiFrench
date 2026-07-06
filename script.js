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
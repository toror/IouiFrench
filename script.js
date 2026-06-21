const dropdowns = document.querySelectorAll('.dropdown-container');

dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const menu = dropdown.querySelector('.dropdown-menu');

    btn.addEventListener('click', () => {
        // 1. Buscamos si hay OTRO menú abierto en la página
        const currentlyOpenMenu = document.querySelector('.dropdown-menu.is-open');
        
        // 2. Si hay uno abierto Y no es el mismo que estamos clickeando ahora...
        if (currentlyOpenMenu && currentlyOpenMenu !== menu) {
            // ...lo cerramos quitándole la clase 'is-open'
            currentlyOpenMenu.classList.remove('is-open');
        }

        // 3. Finalmente, abrimos o cerramos el menú actual
        menu.classList.toggle('is-open');
    });
});
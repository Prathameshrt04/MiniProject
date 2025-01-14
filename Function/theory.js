document.querySelectorAll('.algorithm-row').forEach(row => {
    const pages = row.querySelectorAll('.page');
    const buttons = row.querySelectorAll('.nav-button');

    // Initially show the theory page for each algorithm
    pages[0].classList.add('active');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Get the current active page
            const currentActive = row.querySelector('.page.active');


            // Hide current page and show the clicked page
            currentActive.classList.remove('active');
            pages[index].classList.add('active');
        });
    });
});

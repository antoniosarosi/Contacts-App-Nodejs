document.addEventListener('DOMContentLoaded', () => {

    // Don't show overflow on index page
    function removeOverflow() {
        document.body.style.overflow = 'hidden';
    }

    removeOverflow();
    window.addEventListener('resize', removeOverflow);
});
export function displayModalWindow (modal, display) {
    if (display) {
        modal.style.display = 'flex';
    }
    else if (!display) {
        modal.style.display = 'none';
    }
}
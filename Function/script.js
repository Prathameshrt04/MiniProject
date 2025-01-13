let currentIndex = 0;

function rotateCards() {
    const cards = document.querySelectorAll('.developer-card');
    const totalCards = cards.length;

    cards.forEach((card, index) => {
        card.classList.remove('highlighted');
        const position = (index - currentIndex + totalCards) % totalCards;

        // Update positioning for left, middle, and right
        switch (position) {
            case 0: // Leftmost card
                card.style.transform = 'translateX(-150%) scale(0.8)';
                card.style.opacity = '0.5';
                break;
            case 1: // Middle (highlighted) card
                card.style.transform = 'translateX(0) scale(1)';
                card.style.opacity = '1';
                card.classList.add('highlighted');
                break;
            case 2: // Rightmost card
                card.style.transform = 'translateX(150%) scale(0.8)';
                card.style.opacity = '0.5';
                break;
        }
    });

    currentIndex = (currentIndex + 1) % totalCards;
}

// Trigger rotation every 3 seconds
setInterval(rotateCards, 3000);

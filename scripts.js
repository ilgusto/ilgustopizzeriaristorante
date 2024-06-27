document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.photo-gallery img');
    let currentImageIndex = 0;

    function slideshow() {
        images[currentImageIndex].classList.remove('visible');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('visible');
    }

    setInterval(slideshow, 3000);
});

// Aggiungi evento scroll per le animazioni delle sezioni
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.cards');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
});

// Impedire il drag-and-drop delle immagini
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Funzione per creare scintille
document.addEventListener('pointerdown', (e) => {
    createSparks(e);
});

function createSparks(e) {
    const sparkContainer = document.getElementById('spark-container');
    const sparkCount = 30;
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        const deltaX = (Math.random() - 0.5) * 200;
        const deltaY = (Math.random() - 0.5) * 200;
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.setProperty('--x', `${deltaX}px`);
        spark.style.setProperty('--y', `${deltaY}px`);
        sparkContainer.appendChild(spark);

        // Rimuove la scintilla dopo l'animazione
        spark.addEventListener('animationend', () => {
            spark.remove();
        });
    }
}
document.getElementById('submitComment').addEventListener('click', function() {
  const author = document.getElementById('commentAuthor').value;
  const text = document.getElementById('commentText').value;

  if (author && text) {
    const commentSection = document.getElementById('comments');

    const comment = document.createElement('div');
    comment.className = 'comment';

    const content = document.createElement('div');
    content.className = 'comment-content';

    const authorEl = document.createElement('div');
    authorEl.className = 'comment-author';
    authorEl.textContent = author;

    const dateEl = document.createElement('div');
    dateEl.className = 'comment-date';
    dateEl.textContent = new Date().toLocaleString();

    const textEl = document.createElement('div');
    textEl.className = 'comment-text';
    textEl.textContent = text;

    content.appendChild(authorEl);
    content.appendChild(dateEl);
    content.appendChild(textEl);

    comment.appendChild(content);
    commentSection.appendChild(comment);

    // Reset form fields
    document.getElementById('commentAuthor').value = '';
    document.getElementById('commentText').value = '';
  }
});
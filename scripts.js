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
document.getElementById('submitComment').addEventListener('click', function(event) {
  event.preventDefault();

  const commentText = document.getElementById('commentText').value;
  const commentAuthor = document.getElementById('commentAuthor').value || 'Anonym';
  if (!commentText) return;

  // Filter for insults (example list, extend as needed)
  const insults = ['schlecht', 'dumm', 'idiot', 'blöd'];
  const filteredText = commentText.split(' ').map(word => insults.includes(word.toLowerCase()) ? '***' : word).join(' ');

  const comment = {
    text: filteredText,
    author: commentAuthor,
    date: new Date().toLocaleString(),
    avatar: 'https://via.placeholder.com/50'  // Placeholder avatar
  };

  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));

  displayComments();

  document.getElementById('commentText').value = '';
  document.getElementById('commentAuthor').value = '';
});

function displayComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const commentsDiv = document.getElementById('comments');
  commentsDiv.innerHTML = '';

  comments.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'comment-avatar';
    const avatarImg = document.createElement('img');
    avatarImg.src = comment.avatar;
    avatarDiv.appendChild(avatarImg);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'comment-content';

    const authorDiv = document.createElement('div');
    authorDiv.className = 'comment-author';
    authorDiv.textContent = comment.author;

    const dateDiv = document.createElement('div');
    dateDiv.className = 'comment-date';
    dateDiv.textContent = comment.date;

    const textDiv = document.createElement('div');
    textDiv.className = 'comment-text';
    textDiv.textContent = comment.text;

    contentDiv.appendChild(authorDiv);
    contentDiv.appendChild(dateDiv);
    contentDiv.appendChild(textDiv);

    commentDiv.appendChild(avatarDiv);
    commentDiv.appendChild(contentDiv);

    commentsDiv.appendChild(commentDiv);
  });
}

displayComments();
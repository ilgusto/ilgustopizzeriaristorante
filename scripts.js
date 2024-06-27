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
document.getElementById('commentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get the comment text
  const commentText = document.getElementById('commentText').value;
  if (!commentText) return;

  // Create a comment object with text, author, and date
  const comment = {
    text: commentText,
    author: 'Anonymous',
    date: new Date().toLocaleString()
  };
  
  // Get existing comments from local storage
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  
  // Add new comment
  comments.push(comment);
  
  // Save updated comments to local storage
  localStorage.setItem('comments', JSON.stringify(comments));
  
  // Display comments
  displayComments();
  
  // Clear the textarea
  document.getElementById('commentText').value = '';
});

function displayComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const commentsDiv = document.getElementById('comments');
  commentsDiv.innerHTML = '';
  
  comments.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';

    const authorSpan = document.createElement('span');
    authorSpan.className = 'comment-author';
    authorSpan.textContent = comment.author;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'comment-date';
    dateSpan.textContent = comment.date;

    const textP = document.createElement('p');
    textP.textContent = comment.text;

    commentDiv.appendChild(authorSpan);
    commentDiv.appendChild(dateSpan);
    commentDiv.appendChild(textP);

    commentsDiv.appendChild(commentDiv);
  });
}

// Initial display of comments
displayComments();

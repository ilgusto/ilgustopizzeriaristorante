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
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbE692jmqStyex5rFSiIJa4awebDYj1Kg",
  authDomain: "ilgusto-comments.firebaseapp.com",
  projectId: "ilgusto-comments",
  storageBucket: "ilgusto-comments.appspot.com",
  messagingSenderId: "598152029468",
  appId: "1:598152029468:web:a1e0eb6de8f0a3172b06d9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('submitComment').addEventListener('click', function() {
  const author = document.getElementById('commentAuthor').value;
  const text = document.getElementById('commentText').value;

  if (author && text) {
    db.collection('comments').add({
      author: author,
      text: text,
      date: new Date().toLocaleString()
    }).then(() => {
      document.getElementById('commentAuthor').value = '';
      document.getElementById('commentText').value = '';
      loadComments();
    }).catch((error) => {
      console.error("Error adding comment: ", error);
    });
  }
});

function loadComments() {
  db.collection('comments').orderBy('date', 'desc').get().then((querySnapshot) => {
    const comments = document.getElementById('comments');
    comments.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const comment = doc.data();
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
      commentElement.innerHTML = `
        <div class="comment-content">
          <div class="comment-author">${comment.author}</div>
          <div class="comment-date">${comment.date}</div>
          <div class="comment-text">${comment.text}</div>
        </div>
      `;
      comments.appendChild(commentElement);
    });
  }).catch((error) => {
    console.error("Error loading comments: ", error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadComments();
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
});

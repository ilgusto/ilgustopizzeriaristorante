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
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('issueForm');
    const issuesContainer = document.getElementById('issues');
    const repoOwner = 'ilgusto';
    const repoName = 'ilgustopizzeriaristorante';
    const token = 'YOUR_PERSONAL_ACCESS_TOKEN'; // Usa una soluzione di backend per proteggere il token

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(issue => {
            alert(`Issue created: ${issue.html_url}`);
            form.reset();
            loadIssues(); // Ricarica le issue dopo averne creata una nuova
        })
        .catch(error => {
            console.error('Error creating issue:', error);
            alert('Error creating issue');
        });
    });

    function loadIssues() {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`)
            .then(response => response.json())
            .then(issues => {
                issuesContainer.innerHTML = '';
                issues.forEach(issue => {
                    const issueElement = document.createElement('div');
                    issueElement.classList.add('issue');

                    const titleElement = document.createElement('div');
                    titleElement.classList.add('issue-title');
                    titleElement.innerHTML = `<a href="${issue.html_url}" target="_blank">${issue.title}</a>`;

                    const bodyElement = document.createElement('div');
                    bodyElement.classList.add('issue-body');
                    bodyElement.textContent = issue.body;

                    issueElement.appendChild(titleElement);
                    issueElement.appendChild(bodyElement);

                    // Carica i commenti per ogni issue
                    loadComments(issue.comments_url, issueElement);

                    issuesContainer.appendChild(issueElement);
                });
            })
            .catch(error => console.error('Error fetching issues:', error));
    }

    function loadComments(commentsUrl, issueElement) {
        fetch(commentsUrl)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');

                    const commentBody = document.createElement('div');
                    commentBody.textContent = comment.body;

                    commentElement.appendChild(commentBody);
                    issueElement.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Error fetching comments:', error));
    }

    // Carica le issue al caricamento della pagina
    loadIssues();
});




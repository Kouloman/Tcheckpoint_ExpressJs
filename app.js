const express = require('express');
const app = express();
const path = require('path');

// Middleware pour vérifier les heures de travail
function checkWorkingHours(req, res, next) {
    const currentDate = new Date();
    const day = currentDate.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
    const hour = currentDate.getHours(); // Heure actuelle (0-23)

    // Vérifie si la demande est faite du lundi au vendredi, entre 9h et 17h
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continuer si dans les heures de travail
    } else {
        res.status(403).send('Le site est uniquement disponible pendant les heures de travail (Lundi-Vendredi, 9h-17h).');
    }
}

// Middleware global pour les heures de travail
app.use(checkWorkingHours);

// Définir le moteur de template EJS
//app.set('view engine', 'ejs');
// Définir le moteur de template EJS pour les fichiers .html
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Page d\'accueil' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Nos services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Nous contacter' });
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});

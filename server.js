const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Servir les fichiers statiques si nécessaire
// app.use(express.static('public'));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

const express = require('express');
const path = require('path');








# 🌾 I'm From — Rice Skincare Shop

Landing page e-commerce complète pour 2 produits cosmétiques (Rice Toner & Rice Cream),
avec panier, checkout et intégration Google Sheets.

---

## 📁 Structure du projet

```
riceskin/
├── public/
│   ├── index.html
│   ├── *.jfif              ← Images produits
├── src/
│   ├── App.js              ← Composant principal, routing, état global
│   ├── Navbar.js           ← Navigation fixe avec panier
│   ├── Hero.js             ← Section hero animée
│   ├── Components.js       ← MarqueeStrip + ProductCard
│   ├── CartDrawer.js       ← Panier latéral coulissant
│   ├── Checkout.js         ← Page commande en 2 étapes
│   ├── Modals.js           ← Modal produit + page succès
│   ├── Sections.js         ← FeaturesSection, Testimonials, Footer
│   ├── Toast.js            ← Notifications
│   ├── data.js             ← Données produits + URL Google Sheet
│   └── index.css           ← Styles globaux + animations
├── google_apps_script.gs   ← Script pour Google Sheets
└── package.json
```

---

## 🚀 Installation & Lancement

### 1. Installer les dépendances
```bash
cd riceskin
npm install
```

### 2. Lancer le serveur de développement
```bash
npm start
```
→ Ouvre automatiquement http://localhost:3000

### 3. Build pour la production
```bash
npm run build
```
→ Crée le dossier `build/` prêt à déployer

---

## 🔗 Connexion Google Sheets (OBLIGATOIRE)

### Étape 1 — Créer le Google Sheet
1. Allez sur [sheets.google.com](https://sheets.google.com)
2. Créez un nouveau document (ex: "Commandes RiceSkin")

### Étape 2 — Créer le script
1. Dans le Sheet : **Extensions → Apps Script**
2. Supprimez tout le code existant
3. Copiez-collez **tout** le contenu de `google_apps_script.gs`
4. Sauvegardez (Ctrl+S)

### Étape 3 — Déployer le script
1. Cliquez **Déployer → Nouveau déploiement**
2. Cliquez l'icône ⚙️ → **Application Web**
3. Configurez :
   - **Description** : RiceSkin Orders API
   - **Exécuter en tant que** : Moi (votre compte Google)
   - **Qui peut accéder** : Tout le monde
4. Cliquez **Déployer**
5. Autorisez les permissions demandées
6. **Copiez l'URL** générée (ex: `https://script.google.com/macros/s/AKfycb.../exec`)

### Étape 4 — Configurer l'app
Ouvrez `src/data.js` et remplacez :
```js
export const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";
```
Par votre URL copiée à l'étape 3.

### Étape 5 — Initialiser la feuille
1. Retournez dans votre Google Sheet
2. Rafraîchissez la page
3. Un nouveau menu **🌾 RiceSkin** apparaît
4. Cliquez **🌾 RiceSkin → Initialiser les en-têtes**

✅ **C'est prêt !** Chaque commande passée apparaîtra automatiquement dans votre Sheet.

---

## 🛒 Fonctionnalités

### Landing Page
- Hero animé avec images produits
- Bande d'ingrédients défilante
- Grille de 2 produits avec survol interactif
- Galerie d'images par produit (clic pour changer)
- Section "Comment utiliser"
- Section avantages / philosophie
- Témoignages clients
- Bannière livraison gratuite
- Footer complet

### Panier
- Drawer latéral animé
- Ajouter / modifier quantités / supprimer
- Calcul total en temps réel
- Indicateur livraison gratuite (dès 60€)
- Toast de confirmation à l'ajout

### Modal Produit
- Galerie photos avec miniatures
- Onglets : Description / Utilisation / Ingrédients
- Sélecteur de quantité
- Ajout direct au panier

### Checkout (2 étapes)
**Étape 1 — Livraison :**
- Prénom, Nom, Email, Téléphone
- Adresse complète, Ville, Code postal, Pays
- Notes de commande

**Étape 2 — Paiement :**
- Carte bancaire (avec champs dédiés)
- PayPal
- Paiement à la livraison
- Virement bancaire

### Récapitulatif de commande
- Liste des produits avec photos
- Sous-total + livraison (gratuite si ≥ 60€)
- Total final
- Badges de confiance (sécurité, livraison, retours)

### Page Succès
- N° de commande affiché
- Email de confirmation mentionné
- Délais de livraison estimés
- Bouton retour boutique

### Google Sheets
- Colonnes : N° commande, Date, Client, Email, Téléphone, Adresse, Produits, Sous-total, Livraison, Total, Paiement, Notes, Statut
- Mise en forme automatique (couleurs alternées, en-têtes colorés)
- Menu personnalisé avec statistiques
- Email de notification (optionnel, à décommenter)

---

## 🎨 Design

- **Palette** : Crème, sable, écorce, sauge — tons naturels coréens
- **Typographie** : Playfair Display (serif élégant) + Jost (sans-serif moderne)
- **Style** : Luxury naturel / K-beauty haut de gamme
- **Animations** : Fade-up au chargement, hover sur produits, transitions de pages

---

## 🌐 Déploiement

### Vercel (recommandé, gratuit)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Glissez le dossier build/ sur netlify.com
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Dans package.json, ajoutez "homepage": "https://USERNAME.github.io/riceskin"
npm run build && gh-pages -d build
```

---

## ⚙️ Personnalisation

### Modifier les produits
Éditez `src/data.js` → objet `PRODUCTS`

### Modifier les prix
Éditez `price` et `originalPrice` dans `src/data.js`

### Modifier les images
Les images `.jfif` sont dans `/public`. Mettez à jour les chemins dans `IMAGES` dans `src/data.js`

### Activer les emails de notification
Dans `google_apps_script.gs`, décommentez la fonction `sendNotificationEmail()` et mettez votre email.

---

*Projet développé avec React 18 · Aucune dépendance externe UI*

# RAPPORT DES MODIFICATIONS — PinkGirl v1

## Date : 30 Avril 2026

---

## 1. CHANGEMENT DE THEME COMPLET

### Avant : Titelli (thème sombre bleu/noir/or)
### Après : PinkGirl (thème clair rose/bleu ciel/paillettes)

| Element | Avant | Après |
|---|---|---|
| Nom | Titelli | PinkGirl |
| Fond global | Noir #050505 | Rose pâle #FFF5F9 |
| Couleur primaire | Bleu #0047AB | Rose #FF69B4 |
| Couleur secondaire | Or #D4AF37 | Bleu ciel #87CEEB |
| Texte principal | Blanc | Gris foncé #2D2D2D |
| Font titres | Playfair Display / Montserrat | Dancing Script (logo) / Poppins (sections) |
| Font corps | Inter | Poppins |
| Boutons | Bleu roi, carrés | Rose gradient, arrondis (rounded-full) |
| Cards | Fond noir, bordure grise | Fond blanc, bordure rose, ombre rose |

---

## 2. PAGES MODIFIEES (30+ fichiers)

### Pages principales
| Page | Modifications |
|---|---|
| **HomePage** | Hero sans vidéo, paillettes animées, annonces en grille directe, produits sans sous-catégories, section Avantages refaite |
| **AuthPage** | Refaite complètement. Connexion Client/Entreprise uniquement (influenceur supprimé), thème rose |
| **EnterpriseRegistrationPage** | Formulaire simplifié (comme client), popup "Site web inclus" après inscription |
| **EnterprisePage** | Fond blanc, textes noirs, card-service blanc, indicateurs lisibles |
| **AdminDashboard** | Textes corrigés pour visibilité |
| **ClientDashboard** | Textes blanc → gris foncé |
| **EnterpriseDashboard** | Textes blanc → gris foncé |
| **CategoryEnterprisesPage** | Textes corrigés |
| **ProductsPage** | Textes corrigés |
| **ServicesPage** | Textes corrigés |
| **CartPage, OrdersPage, etc.** | Thème rose appliqué |

### Composants
| Composant | Modifications |
|---|---|
| **Header.js** | Navbar blanche glassmorphism, logo PinkGirl gradient, menu mobile rose |
| **SplashScreen.js** | Animation paillettes rose/bleu/or, logo gradient |
| **WelcomePopup.jsx** | Refait: gradient rose, 4 avantages PinkGirl |
| **EnterpriseCard.js** | Format vertical 3:4, téléphone + site web ajoutés |
| **Footer.js** | Thème clair |
| **ScrollingReviews.js** | Texte corrigé |
| **ProductCategoryCard.js** | Boutons roses |

---

## 3. FONCTIONNALITES AJOUTEES

### A. Popup "Site web inclus" (inscription entreprise)
- Après inscription entreprise → popup s'affiche
- Formulaire : couleur préférée (8 choix visuels), images/logo, description du site
- Données sauvées dans collection **`siteweb`** (MongoDB)
- Email notification envoyé à info@e-business-pay.com

### B. Endpoint API `/api/website-requests`
- POST : crée une demande de site web
- GET `/api/admin/website-requests` : liste admin de toutes les demandes

### C. Inscription Entreprise simplifiée
- Formulaire simple (comme client) + infos entreprise
- Note "250 CHF annuel" visible
- Plus de système d'activation/validation complexe
- Après soumission → popup site web → redirection login

### D. Suppression influenceur
- Plus d'option "influenceur" dans la connexion
- Seulement Client et Entreprise

### E. Avantages PinkGirl
- "Site web inclus créé par nos développeurs expérimentés"
- "Possibilité de vendre du contenu exclusif"
- "Gagne un bonus annuel sur le nombre de gains validés"
- "Grande visibilité sur le web"

### F. Cards annonces enrichies
- Téléphone affiché
- Lien site web affiché
- Format image vertical (3:4)
- Badge catégorie + coeur favori

---

## 4. SECTIONS SUPPRIMEES DE LA HOMEPAGE

- Vidéo hero (remplacée par gradient + paillettes)
- Section emplois
- Section formations
- Sous-catégories entreprises (remplacées par grille directe)
- Sous-catégories produits (affichage direct)

---

## 5. CSS GLOBAL (index.css)

- Variables couleurs : toutes changées (rose/bleu ciel)
- Scrollbar : dégradé rose→bleu
- `.card-service` : fond blanc au lieu de noir
- Animations ajoutées : shimmer, sparkle-twinkle, sparkle-float, gradient-flow, float, pulse-glow, btn-shine
- Classes utilitaires : `.gradient-text-pink`, `.glass-card`, `.card-hover`, `.btn-shine`

---

## 6. BACKEND (server.py)

- Endpoint `POST /api/website-requests` ajouté
- Endpoint `GET /api/admin/website-requests` ajouté
- Collection MongoDB `siteweb` utilisée
- Email notification via Resend pour chaque demande

---

## 7. FICHIERS DE DEPLOIEMENT

- **Frontend (build)** : `BUILD_PRODUCTION.zip` — REACT_APP_BACKEND_URL=https://api.titelli.ch
- **Backend** : `BACKEND_UPDATE.zip` — server.py avec endpoints website-requests

---

## 8. A FAIRE (PROCHAINES ETAPES)

- [ ] Bouton "Valider profil" dans dashboard entreprise → paiement 250 CHF/an
- [ ] Intégration PayPal (nécessite clé API)
- [ ] Intégration Twint (nécessite contrat commerçant)
- [ ] Générer un vrai logo PinkGirl (image)
- [ ] Adapter les dashboards (Client/Entreprise/Admin) au thème rose en profondeur

---

*Rapport généré le 30 avril 2026*

# RAPPORT DETAILLE DU PROJET TITELLI
## Plateforme Emergent — titelli.ch

---

## 1. INFORMATIONS GENERALES

| Element | Detail |
|---|---|
| **Projet** | Titelli — Social Commerce Suisse |
| **Premier commit** | 21 janvier 2026, 16h15 |
| **Dernier commit** | 25 avril 2026, 22h26 |
| **Duree calendrier** | 95 jours (3 mois et 4 jours) |
| **Jours actifs** | 44 jours |
| **Heures estimees** | ~481 heures |
| **Total commits** | 1'991 |
| **URL Production** | https://www.titelli.ch |
| **API Production** | https://api.titelli.ch |
| **Serveur** | VPS Hetzner (65.108.83.115) |

---

## 2. DOCUMENTS CDC FOURNIS PAR LE CLIENT

### Total : 14 documents PDF + 1 GeoJSON + 20+ images/mockups + 2 videos

| # | Document | Type | Taille |
|---|---|---|---|
| 1 | Brochure Titelli V.pdf | CDC principal / Brochure partenaires | 5.4 MB |
| 2 | Brochure corrigee 10.09.pdf | CDC revise (envoyee 2 fois) | 5.0 MB |
| 3 | Monetisation description-3.pdf | CDC monetisation (packs, pricing, services) | 135 KB |
| 4 | 01_Prospection_Telephonique_Titelli_REFINED.pdf | CDC commercial — script prospection | 26.6 KB |
| 5 | Prospect telephonique -2.pdf | CDC commercial — version 2 | 79.9 KB |
| 6 | Prospect telephonique -2 (1).pdf | CDC commercial — version 2 bis | 79.9 KB |
| 7 | Prospect telephonique -3.pdf | CDC commercial — version 3 | 79.9 KB |
| 8 | 02_Questionnaire_Formation_Titelli_REFINED.pdf | CDC formations | 26.4 KB |
| 9 | Questions formations.pdf | CDC formations — questionnaire | 21.6 KB |
| 10 | 03_Guide_RendezVous_Client_Titelli_REFINED.pdf | CDC rendez-vous client | 26.4 KB |
| 11 | Prospect rendez-vous client new.pdf | CDC RDV — version 1 | 73.1 KB |
| 12 | Prospect rendez-vous client neuve-2.pdf | CDC RDV — version 2 | 77.3 KB |
| 13 | Prospect rendez-vous client-3.pdf | CDC RDV — version 3 | 62 KB |
| 14 | Liste des commerces.pdf | Liste initiale entreprises a importer | 159.7 KB |
| 15 | export.geojson | Donnees geographiques commerces suisses | 508 KB |

### Fichiers visuels fournis : 20+ images (logos, mockups UI, photos)
### Videos fournies : 2 (video hero + video promotionnelle)

---

## 3. FONCTIONNALITES DU CDC INITIAL (Janvier 2026)

Le CDC initial (Brochure Titelli V) comprenait :
1. Marketplace prestataires de services Suisse romande
2. Listing d'entreprises avec categories
3. Inscription client
4. Inscription entreprise (activation)
5. Pages de detail entreprise
6. Recherche
7. Page d'accueil
8. Authentification
9. Dashboard entreprise basique
10. Dashboard client basique

---

## 4. FONCTIONNALITES AJOUTEES AU-DELA DU CDC INITIAL

### 76 sections fonctionnelles dans server.py + 25 routers

---

#### AUTHENTIFICATION & SECURITE
1. Login JWT (client, entreprise, admin, influenceur)
2. Inscription client
3. Inscription entreprise — activation existante
4. Inscription entreprise — nouvelle (en_attente)
5. Paiement inscription 250 CHF (Stripe + Cash)
6. Token SalonPro sync
7. Verification admin des utilisateurs

#### GESTION ENTREPRISES (18 endpoints)
8. CRUD complet entreprises
9. 15 categories principales avec sous-categories dynamiques
10. Systeme d'activation/validation (en_attente → active)
11. 8'286 entreprises importees et enrichies
12. Photos reelles scrapees pour chaque entreprise
13. Synchronisation webhooks SalonPro

#### SERVICES & PRODUITS
14. Marketplace services (17 services)
15. Marketplace produits (1'736 items)
16. 21 categories de produits avec videos de fond
17. Cartes produits (ProductCategoryCard)
18. Detail service/produit

#### COMMANDES & PAIEMENTS
19. Panier d'achat complet (CartContext)
20. Checkout Stripe (commandes)
21. Checkout Stripe (inscriptions)
22. Webhooks Stripe
23. Gestion cartes de paiement
24. Commandes permanentes
25. Historique transactions

#### CASHBACK (7 endpoints)
26. Cashback sur consommations
27. Solde et historique
28. Demande de retrait
29. Validation admin retraits

#### DASHBOARD ADMIN (16 onglets — 1'868 lignes)
30. Vue d'ensemble statistiques
31. Gestion utilisateurs
32. Validation inscriptions entreprises
33. Validation paiement cash
34. Gestion retraits cashback
35. Comptabilite / Export Excel et PDF
36. Gestion algorithmes
37. Gestion plans abonnement
38. Gestion commandes pub media
39. Gestion entreprises

#### DASHBOARD ENTREPRISE (42 sections — 4'629 lignes)
40. Profil et images
41. Gestion commandes
42. Gestion services/produits
43. Equipe / Personnel
44. Contacts clients
45. Documents entreprise
46. Facturation
47. Stocks et mouvements
48. Disponibilites et agenda
49. Campagnes marketing IA
50. Publicite boostee
51. Feed d'activite entreprise
52. Invitations clients
53. Certifications et labels

#### DASHBOARD CLIENT (53 sections — 4'560 lignes)
54. Profil client
55. Historique commandes
56. Documents personnels (CV)
57. Agenda personnel
58. Finances / Transactions
59. Investissements
60. Donations
61. Systeme d'amis / Reseau social
62. Feed d'activite (posts, likes)
63. Mode de vie (lifestyle)
64. Suggestions d'amis
65. Prestataires personnels
66. Wishlist / Favoris
67. Guests favoris
68. Premium client
69. Factures client
70. Offres courantes

#### EMPLOIS (11 offres)
71. Listing offres d'emploi
72. Filtres (CDI, CDD, Stage, Freelance)
73. Candidature en ligne avec CV
74. Dashboard recruteur

#### FORMATIONS (8 formations)
75. Catalogue formations
76. Achat via Stripe
77. Avis sur formations
78. Inscriptions formations

#### PUB IA — IMAGES (MediaPubPage — 1'634 lignes, 11 endpoints)
79. Generation images publicitaires (OpenAI)
80. Templates personnalisables
81. Paiement Stripe HD
82. 23 commandes en base

#### PUB IA — VIDEOS (VideoPubPage — 693 lignes, 9 endpoints)
83. Generation videos publicitaires (Sora 2)
84. Templates video
85. 7 commandes en base

#### NOTIFICATIONS (11 endpoints + WebSocket)
86. Notifications temps reel (WebSocket)
87. Preferences de notification
88. Centre de notifications
89. 313 notifications en base

#### RDV TITELLI (22 endpoints — 987 lignes)
90. Systeme rendez-vous complet
91. Chat en temps reel
92. Reservation en ligne
93. Agenda partage

#### TITELLI PRO (10 endpoints — 838 lignes)
94. Abonnements professionnels
95. Sports & activites
96. Matching sportif
97. Page sports dediee

#### INFLUENCEURS
98. Profil influenceur
99. Collaborations marques
100. Dashboard influenceur (930 lignes)

#### PARRAINAGE
101. Codes de parrainage
102. Points bonus
103. Emails automatiques parrain + filleul
104. Paliers bonus

#### CERTIFICATIONS & LABELS
105. Certification entreprise
106. Labels qualite
107. Demandes de certification

#### EXPERTS / SPECIALISTES (14 endpoints — 759 lignes)
108. Marketplace d'experts
109. Reservation d'experts
110. Optimisation entreprise

#### GAMIFICATION (12 endpoints)
111. Points utilisateur
112. Historique de points
113. Challenges

#### NEWSLETTER (5 endpoints)
114. Abonnement newsletter
115. Preferences email

#### EMAILS TRANSACTIONNELS (Resend — 7 templates)
116. Confirmation inscription (client)
117. Notification admin inscription
118. Confirmation paiement
119. Echec paiement
120. Notification parrainage
121. Bienvenue nouveau membre
122. Confirmation pub media

#### IMMOBILIER
123. Annonces immobilieres
124. Recherche biens

#### PUBLICITE BOOSTEE
125. Systeme de boost publicitaire
126. Ciblage clients base sur commandes

#### AUTRES
127. Page A propos
128. CGV (Conditions generales)
129. Mentions legales
130. Page flyer
131. Splash screen anime
132. Systeme online status (temps reel)
133. Upload images
134. Migration donnees

---

## 5. VOLUMETRIE

### Base de donnees MongoDB Atlas
| Collection | Documents |
|---|---|
| enterprises | 8'286 |
| services_products | 1'736 |
| notifications | 313 |
| products | 274 |
| users | 88 |
| payment_transactions | 32 |
| orders | 27 |
| registration_requests | 26 |
| activity_posts | 25 |
| pub_orders | 23 |
| profile_views | 23 |
| pending_subscriptions | 22 |
| lifestyle_subscriptions | 20 |
| reviews | 19 |
| cashback_transactions | 19 |
| ia_campaigns | 19 |
| wishlist | 19 |
| friendships | 18 |
| main_categories | 15 |
| messages | 14 |
| pro_subscriptions | 11 |
| jobs | 11 |
| agenda | 11 |
| trainings | 8 |
| **Total collections** | **90** |

---

## 6. CODE SOURCE — CHIFFRES

### Backend (Python — FastAPI)
| Element | Valeur |
|---|---|
| server.py | 11'189 lignes |
| 25 routers | 9'792 lignes |
| Services (email, etc.) | 715 lignes |
| Helpers (stripe, etc.) | 143 lignes |
| **Total backend** | **21'839 lignes** |
| Endpoints server.py | 267 (126 GET, 82 POST, 33 PUT, 26 DELETE) |
| Endpoints routers | 180 |
| **Total endpoints API** | **447** |
| Modeles Pydantic | 62 |

### Frontend (React + Tailwind CSS)
| Element | Valeur |
|---|---|
| 31 pages | 28'122 lignes |
| 12 composants | 2'550 lignes |
| Dashboard components | 2'054 lignes |
| Services/Context/Hooks | 1'227 lignes |
| **Total frontend** | **34'295 lignes** |

### Total projet
| Element | Valeur |
|---|---|
| **Total lignes de code** | **55'991 lignes** |
| **Fichiers modifies** | 100+ |

---

## 7. INTEGRATIONS TIERCES (7)

| # | Service | Usage |
|---|---|---|
| 1 | MongoDB Atlas | Base de donnees (90 collections) |
| 2 | Stripe | Paiements live (commandes, inscriptions, abonnements) |
| 3 | Resend | Emails transactionnels (domaine e-business-pay.com) |
| 4 | Cloudinary | Stockage et optimisation images |
| 5 | SalonPro/Titelli Management | Synchronisation webhooks bidirectionnelle |
| 6 | OpenAI (Emergent LLM) | Generation images publicitaires IA |
| 7 | Sora 2 (Emergent LLM) | Generation videos publicitaires IA |

---

## 8. TIMELINE DETAILLEE

| Date | Commits | Activite |
|---|---|---|
| 21 Jan | 63 | Setup initial, structure projet, auth JWT |
| 22 Jan | 113 | Dashboard entreprise, listing entreprises |
| 23 Jan | 358 | Scraping 820+ entreprises, enrichissement images, categories |
| 24 Jan | 145 | Services/produits, commandes, Stripe |
| 25 Jan | 100 | Dashboard client, profil, commandes |
| 26 Jan | 40 | Cashback, wishlist, favoris |
| 27-28 Jan | 26 | Notifications, WebSocket temps reel |
| 30 Jan | 30 | Emplois, candidatures |
| 1-2 Fev | 142 | Formations, avis, abonnements |
| 3-4 Fev | 63 | Amis, reseau social, feed activite |
| 5-7 Fev | 325 | Pub IA images, campagnes marketing, ciblage clients |
| 8-9 Fev | 84 | Publicite boostee, investments, donations |
| 10-12 Fev | 112 | Mode de vie, agenda client, finances |
| 14-16 Fev | 160 | Pub IA videos (Sora 2), parrainage, gamification |
| 17-19 Fev | 11 | Corrections, optimisations |
| 20-24 Fev | 109 | Influenceurs, RDV Titelli, experts, certifications |
| 27 Fev | 42 | Newsletter, promo codes |
| 2 Mar | 9 | Titelli Pro, sports |
| 4 Mar | 13 | Comptabilite, export Excel/PDF, facturation |
| 16-18 Mar | 21 | Email service Resend, templates email, brochure |
| 12-14 Avr | 17 | Refonte categories dynamiques, ProductCategoryCard, UI simplifiee |
| 17 Avr | 2 | Menu mobile blanc, icone panier navbar |
| 22 Avr | 6 | Paiement inscription 250 CHF (Stripe+Cash), emails inscription, admin validation paiement |
| 25 Avr | 1 | Rapport projet |

---

## 9. RESUME CHIFFRES CLES

| Metrique | Valeur |
|---|---|
| Duree totale | 95 jours (21 Jan → 25 Avr 2026) |
| Jours actifs | 44 jours |
| Heures estimees | ~481 heures |
| Commits | 1'991 |
| Lignes de code | 55'991 |
| Endpoints API | 447 |
| Pages frontend | 31 |
| Composants | 12 |
| Routers backend | 25 |
| Modeles Pydantic | 62 |
| Collections MongoDB | 90 |
| Entreprises en base | 8'286 |
| Produits/Services | 1'736 |
| Documents CDC fournis | 14 PDF + 1 GeoJSON |
| Images/mockups fournis | 20+ |
| Videos fournies | 2 |
| Integrations tierces | 7 |
| Fonctionnalites implementees | 134 |
| Sections fonctionnelles | 76 (server.py) |

---

*Rapport genere le 25 avril 2026*
*Projet Titelli — Plateforme Emergent*

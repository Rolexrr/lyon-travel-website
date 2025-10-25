# Lyon Travel - Contrats API & Plan d'Intégration Backend

## 🎯 Objectif
Intégrer le backend FastAPI avec MongoDB pour gérer:
1. Les demandes de réservation (CRUD)
2. Les promotions (CRUD Admin)
3. L'authentification admin
4. L'envoi d'emails via Gmail SMTP

---

## 📊 Données Mockées (à remplacer)

### Fichier: `/app/frontend/src/data/mock.js`

**1. Reservations**
```javascript
{
  id, name, email, phone, service, destination, date, message, status, createdAt
}
```

**2. Promotions**
```javascript
{
  id, serviceId, title, description, discount, validUntil, active
}
```

**3. Admin User**
```javascript
{
  email: 'lyontravel948@gmail.com',
  password: 'admin123'
}
```

---

## 🔌 API Endpoints à Implémenter

### 1. Réservations

#### **POST /api/reservations**
Créer une nouvelle demande de réservation
```json
Request Body:
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "service": "string",
  "destination": "string (optional)",
  "date": "string (optional)",
  "message": "string (optional)"
}

Response:
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "service": "string",
  "destination": "string",
  "date": "string",
  "message": "string",
  "status": "pending",
  "createdAt": "ISO datetime"
}
```

**Action après création:**
- Stocker en MongoDB
- Envoyer email à: lyontravel948@gmail.com avec détails de la demande

---

#### **GET /api/reservations**
Récupérer toutes les demandes (Admin uniquement)
```json
Response:
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "service": "string",
    "destination": "string",
    "date": "string",
    "message": "string",
    "status": "pending",
    "createdAt": "ISO datetime"
  }
]
```

---

#### **DELETE /api/reservations/{id}**
Supprimer une demande (Admin uniquement)
```json
Response:
{
  "message": "Reservation deleted successfully"
}
```

---

### 2. Promotions

#### **GET /api/promotions**
Récupérer toutes les promotions (Public)
```json
Response:
[
  {
    "id": "string",
    "serviceId": number,
    "title": "string",
    "description": "string",
    "discount": "string",
    "validUntil": "date string",
    "active": boolean
  }
]
```

---

#### **POST /api/promotions**
Créer une promotion (Admin uniquement)
```json
Request Body:
{
  "serviceId": number,
  "title": "string",
  "description": "string",
  "discount": "string",
  "validUntil": "date string",
  "active": boolean
}

Response:
{
  "id": "string",
  "serviceId": number,
  "title": "string",
  "description": "string",
  "discount": "string",
  "validUntil": "date string",
  "active": boolean
}
```

---

#### **PUT /api/promotions/{id}**
Modifier une promotion (Admin uniquement)
```json
Request Body:
{
  "serviceId": number,
  "title": "string",
  "description": "string",
  "discount": "string",
  "validUntil": "date string",
  "active": boolean
}

Response: Same as POST
```

---

#### **DELETE /api/promotions/{id}**
Supprimer une promotion (Admin uniquement)
```json
Response:
{
  "message": "Promotion deleted successfully"
}
```

---

### 3. Authentification Admin

#### **POST /api/auth/login**
Connexion admin
```json
Request Body:
{
  "email": "string",
  "password": "string"
}

Response Success:
{
  "token": "JWT token",
  "email": "string"
}

Response Error:
{
  "detail": "Invalid credentials"
}
```

**Credentials:**
- Email: lyontravel948@gmail.com
- Password: admin123 (à hasher avec bcrypt)

---

## 📧 Email Configuration (Gmail SMTP)

**Utiliser Gmail SMTP pour envoyer notifications:**

Configuration:
```python
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "lyontravel948@gmail.com"
SMTP_PASSWORD = "mot de passe d'application Gmail" (à demander au client)
```

**Email Template pour nouvelle réservation:**
```
Sujet: Nouvelle demande de réservation - Lyon Travel

Bonjour,

Une nouvelle demande de réservation a été reçue sur le site Lyon Travel.

Détails:
- Nom: {name}
- Email: {email}
- Téléphone: {phone}
- Service: {service}
- Destination: {destination}
- Date: {date}
- Message: {message}

Connectez-vous au panel admin pour gérer cette demande:
{admin_url}

Cordialement,
Système Lyon Travel
```

---

## 🗄️ Modèles MongoDB

### Collection: `reservations`
```python
{
  "_id": ObjectId,
  "name": str,
  "email": str,
  "phone": str,
  "service": str,
  "destination": str (optional),
  "date": str (optional),
  "message": str (optional),
  "status": str (default: "pending"),
  "createdAt": datetime
}
```

### Collection: `promotions`
```python
{
  "_id": ObjectId,
  "serviceId": int,
  "title": str,
  "description": str,
  "discount": str,
  "validUntil": str,
  "active": bool
}
```

### Collection: `admin_users`
```python
{
  "_id": ObjectId,
  "email": str,
  "password": str (hashed with bcrypt)
}
```

---

## 🔄 Plan d'Intégration Frontend

### Étape 1: Créer les services API
Fichier: `/app/frontend/src/services/api.js`
```javascript
const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

// Reservations
export const createReservation = (data) => axios.post(`${API_URL}/reservations`, data);
export const getReservations = (token) => axios.get(`${API_URL}/reservations`, { headers: { Authorization: `Bearer ${token}` }});
export const deleteReservation = (id, token) => axios.delete(`${API_URL}/reservations/${id}`, { headers: { Authorization: `Bearer ${token}` }});

// Promotions
export const getPromotions = () => axios.get(`${API_URL}/promotions`);
export const createPromotion = (data, token) => axios.post(`${API_URL}/promotions`, data, { headers: { Authorization: `Bearer ${token}` }});
export const updatePromotion = (id, data, token) => axios.put(`${API_URL}/promotions/${id}`, data, { headers: { Authorization: `Bearer ${token}` }});
export const deletePromotion = (id, token) => axios.delete(`${API_URL}/promotions/${id}`, { headers: { Authorization: `Bearer ${token}` }});

// Auth
export const login = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
```

### Étape 2: Remplacer les imports mock
Dans chaque page:
- Supprimer: `import { reservations, promotions } from '../data/mock'`
- Ajouter: `import { getReservations, getPromotions } from '../services/api'`
- Utiliser: `useEffect` pour fetch les données au chargement

### Étape 3: Ajouter JWT token management
- Stocker le token dans localStorage après login
- Ajouter le token dans headers pour toutes les requêtes admin

---

## ✅ Checklist Backend Implementation

- [ ] Créer modèles Pydantic pour Reservation, Promotion, AdminUser
- [ ] Implémenter endpoints CRUD pour Reservations
- [ ] Implémenter endpoints CRUD pour Promotions
- [ ] Implémenter authentification JWT
- [ ] Configurer Gmail SMTP
- [ ] Tester tous les endpoints avec curl/Postman
- [ ] Intégrer frontend avec backend
- [ ] Tester le flow complet (frontend → backend → email)

---

## 🔐 Sécurité

1. **JWT Token**: Expiration 24h
2. **Password Hashing**: bcrypt
3. **CORS**: Configuré pour le frontend URL
4. **Admin Routes**: Protégées par JWT middleware
5. **Email**: Utiliser mot de passe d'application Gmail (pas le mot de passe principal)

---

## 📝 Notes Importantes

1. **Pas de paiement en ligne** - Tout se fait en agence
2. **Pas de page Destinations** - Retiré comme demandé
3. **Admin reçoit email** pour chaque nouvelle demande
4. **WhatsApp** mentionné mais pas d'intégration API (contact manuel)


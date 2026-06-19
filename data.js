/* ============================================
   DATA.JS — Gestion centralisée localStorage
   Agence Immobilière Hamdaoui
   ============================================ */

const DB = {

  // ---- USERS ----
  defaultUsers: [
    { id: 1, email: "admin@hamdaoui.dz",   password: "Admin2024!", role: "admin",  name: "Admin Hamdaoui" },
    { id: 2, email: "client@hamdaoui.dz",  password: "Client123",  role: "client", name: "Client Test" }
  ],

  getUsers() {
    const stored = localStorage.getItem("hm_users");
    return stored ? JSON.parse(stored) : this.defaultUsers;
  },

  saveUsers(users) {
    localStorage.setItem("hm_users", JSON.stringify(users));
  },

  findUser(email, password) {
    return this.getUsers().find(u => u.email === email && u.password === password) || null;
  },

  addUser(user) {
    const users = this.getUsers();
    user.id = Date.now();
    users.push(user);
    this.saveUsers(users);
  },

  // ---- SESSION ----
  setSession(user) {
    localStorage.setItem("hm_session", JSON.stringify({ id: user.id, role: user.role, name: user.name, email: user.email }));
  },

  getSession() {
    const s = localStorage.getItem("hm_session");
    return s ? JSON.parse(s) : null;
  },

  clearSession() {
    localStorage.removeItem("hm_session");
  },

  requireAdmin() {
    const s = this.getSession();
    if (!s || s.role !== "admin") { window.location.href = "login.html"; }
    return s;
  },

  requireAuth() {
    const s = this.getSession();
    if (!s) { window.location.href = "login.html"; }
    return s;
  },

  // ---- PROPERTIES ----
  defaultProperties: [
    {
      id: 1, type: "f2", title: "F2 Centre Ville",
      location: "Centre Ville, Souk Ahras", price: "12 000 000",
      surface: "72", rooms: "1", bathrooms: "1",
      description: "Bel appartement F2 situé en plein cœur du centre-ville de Souk Ahras. Au 3ème étage, exposition lumineuse, balcon, cuisine aménagée.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      badge: "F2 · Vente", available: true,
      detailPage: "detail-f2.html"
    },
    {
      id: 2, type: "f3", title: "F3 Moderne",
      location: "Quartier El Amir, Souk Ahras", price: "18 000 000",
      surface: "95", rooms: "2", bathrooms: "2",
      description: "Superbe F3 entièrement rénové, quartier El Amir. Grand séjour, cuisine moderne, parking sous-sol inclus.",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      badge: "F3 · Vente", available: true,
      detailPage: "detail-f3.html"
    },
    {
      id: 3, type: "villa", title: "Villa Luxe",
      location: "Route de Tébessa, Souk Ahras", price: "45 000 000",
      surface: "280", rooms: "4", bathrooms: "3",
      description: "Villa d'exception sur 600 m² arboré. Finitions haut de gamme, jardin paysager, garage double, suite parentale.",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
      badge: "Villa · Vente", available: true,
      detailPage: "detail-villa.html"
    }
  ],

  getProperties() {
    const stored = localStorage.getItem("hm_properties");
    return stored ? JSON.parse(stored) : this.defaultProperties;
  },

  saveProperties(props) {
    localStorage.setItem("hm_properties", JSON.stringify(props));
  },

  addProperty(prop) {
    const props = this.getProperties();
    prop.id = Date.now();
    prop.available = true;
    prop.detailPage = "appartements.html";
    props.push(prop);
    this.saveProperties(props);
  },

  deleteProperty(id) {
    const props = this.getProperties().filter(p => p.id !== id);
    this.saveProperties(props);
  },

  // ---- REVIEWS ----
  defaultReviews: [
    { id: 1, name: "Karim Mansouri",   initials: "KM", context: "Achat F3 — Souk Ahras",       text: "Une agence sérieuse et professionnelle. Ils ont trouvé notre appartement en moins de deux semaines, exactement selon nos critères et notre budget. Je recommande vivement.", stars: 5, status: "approved", date: "2024-03-10" },
    { id: 2, name: "Samira Bensalem",  initials: "SB", context: "Vente villa — Route de Tébessa", text: "Excellent accompagnement du début à la fin. L'équipe est disponible, honnête et vraiment à l'écoute. Notre villa a été vendue au meilleur prix en un temps record. Bravo.",   stars: 5, status: "approved", date: "2024-04-02" },
    { id: 3, name: "Rachid Hadjadj",   initials: "RH", context: "Client fidèle depuis 2013",    text: "Trente ans de confiance dans la région, ça se voit. Hamdaoui connaît parfaitement le marché local. Je les consulte à chaque projet immobilier depuis plus de dix ans.",      stars: 5, status: "approved", date: "2024-05-18" }
  ],

  getReviews() {
    const stored = localStorage.getItem("hm_reviews");
    return stored ? JSON.parse(stored) : this.defaultReviews;
  },

  getApprovedReviews() {
    return this.getReviews().filter(r => r.status === "approved");
  },

  getPendingReviews() {
    return this.getReviews().filter(r => r.status === "pending");
  },

  saveReviews(reviews) {
    localStorage.setItem("hm_reviews", JSON.stringify(reviews));
  },

  addReview(review) {
    const reviews = this.getReviews();
    review.id = Date.now();
    review.status = "pending";
    review.date = new Date().toISOString().slice(0, 10);
    reviews.push(review);
    this.saveReviews(reviews);
  },

  approveReview(id) {
    const reviews = this.getReviews().map(r => r.id === id ? { ...r, status: "approved" } : r);
    this.saveReviews(reviews);
  },

  refuseReview(id) {
    const reviews = this.getReviews().map(r => r.id === id ? { ...r, status: "refused" } : r);
    this.saveReviews(reviews);
  },

  deleteReview(id) {
    this.saveReviews(this.getReviews().filter(r => r.id !== id));
  },

  // ---- HELPERS ----
  starsSVG(n) {
    const star = `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    return Array(n).fill(star).join('');
  },

  pinSVG() {
    return `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  }
};

// ============================================
// CLIENT PROPERTIES (biens confiés à l'agence)
// ============================================

DB.defaultClientProperties = [
  {
    id: 101,
    clientId: 2,
    title: "F3 Quartier El Amir",
    location: "Quartier El Amir, Souk Ahras",
    type: "f3",
    transaction: "Location",
    estimatedPrice: "18 000 000",
    status: "loue", // nouveau | en_recherche | visites | negociation | loue | vendu
    statusDate: "2024-06-01",
    recoveryAmount: "1 200 000",
    recoveryDate: "2024-07-01",
    receiptUrl: "", // URL ou base64 du PDF
    notes: "Bien loué à M. Karim — contrat 2 ans"
  },
  {
    id: 102,
    clientId: 2,
    title: "Studio Centre Ville",
    location: "Centre Ville, Souk Ahras",
    type: "studio",
    transaction: "Location",
    estimatedPrice: "8 000 000",
    status: "visites",
    statusDate: "2024-05-20",
    recoveryAmount: "",
    recoveryDate: "",
    receiptUrl: "",
    notes: "3 visites planifiées ce mois"
  }
];

DB.getClientProperties = function(clientId) {
  const stored = localStorage.getItem("hm_client_props");
  const all = stored ? JSON.parse(stored) : this.defaultClientProperties;
  return clientId ? all.filter(p => p.clientId === clientId) : all;
};

DB.getAllClientProperties = function() {
  const stored = localStorage.getItem("hm_client_props");
  return stored ? JSON.parse(stored) : this.defaultClientProperties;
};

DB.saveClientProperties = function(props) {
  localStorage.setItem("hm_client_props", JSON.stringify(props));
};

DB.addClientProperty = function(prop) {
  const props = this.getAllClientProperties();
  prop.id = Date.now();
  prop.statusDate = new Date().toISOString().slice(0,10);
  props.push(prop);
  this.saveClientProperties(props);
};

DB.updateClientProperty = function(id, updates) {
  const props = this.getAllClientProperties().map(p =>
    p.id === id ? { ...p, ...updates, statusDate: new Date().toISOString().slice(0,10) } : p
  );
  this.saveClientProperties(props);
};

DB.deleteClientProperty = function(id) {
  this.saveClientProperties(this.getAllClientProperties().filter(p => p.id !== id));
};

// ============================================
// BOOKINGS (réservations de visites)
// ============================================

DB.defaultBookings = [
  { id: 1, name: "Ahmed Bensaid",   phone: "0550000001", service: "Offre 1", date: "2024-06-10", time: "10:00", status: "confirmed" },
  { id: 2, name: "Fatima Zerrouki", phone: "0550000002", service: "Offre 2", date: "2024-06-12", time: "14:00", status: "pending"   },
  { id: 3, name: "Youcef Amirat",   phone: "0550000003", service: "Offre 3", date: "2024-06-15", time: "11:00", status: "pending"   }
];

DB.getBookings = function() {
  const stored = localStorage.getItem("hm_bookings");
  return stored ? JSON.parse(stored) : this.defaultBookings;
};

DB.saveBookings = function(bookings) {
  localStorage.setItem("hm_bookings", JSON.stringify(bookings));
};

DB.addBooking = function(booking) {
  const bookings = this.getBookings();
  booking.id = Date.now();
  booking.status = "pending";
  bookings.push(booking);
  this.saveBookings(bookings);
};

DB.confirmBooking = function(id) {
  this.saveBookings(this.getBookings().map(b => b.id===id ? {...b, status:"confirmed"} : b));
};

DB.cancelBooking = function(id) {
  this.saveBookings(this.getBookings().map(b => b.id===id ? {...b, status:"cancelled"} : b));
};

// ============================================
// STATS HELPERS
// ============================================

DB.getStats = function() {
  const props       = this.getProperties();
  const clientProps = this.getAllClientProperties();
  const reviews     = this.getReviews();
  const bookings    = this.getBookings();
  const users       = this.getUsers();

  const loued   = clientProps.filter(p => p.status === "loue"  ).length;
  const vendu   = clientProps.filter(p => p.status === "vendu" ).length;
  const total   = clientProps.length;
  const conv    = total > 0 ? Math.round(((loued + vendu) / total) * 100) : 0;

  return {
    totalProps:      props.length,
    approvedReviews: reviews.filter(r => r.status==="approved").length,
    pendingReviews:  reviews.filter(r => r.status==="pending" ).length,
    totalUsers:      users.length,
    totalBookings:   bookings.length,
    confirmedBookings: bookings.filter(b => b.status==="confirmed").length,
    pendingBookings:   bookings.filter(b => b.status==="pending"  ).length,
    loucedCount:     loued,
    conversionRate:  conv
  };
};

// Label lisible pour les statuts dossier
DB.statusLabel = function(s) {
  const map = {
    nouveau:      "Nouveau",
    en_recherche: "En recherche",
    visites:      "Visites",
    negociation:  "Négociation",
    loue:         "Loué ✓",
    vendu:        "Vendu ✓"
  };
  return map[s] || s;
};

DB.statusSteps = ["nouveau","en_recherche","visites","negociation","loue"];

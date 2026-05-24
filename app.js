/* ═══════════════════════════════════════════════════════
   MES RECETTES — app.js  v3
═══════════════════════════════════════════════════════ */

// ── CATÉGORIES PAR DÉFAUT ──────────────────────────────
const DEFAULT_CATS = [
  { id: 'plat',                 label: 'Plat',                 emoji: '🍽️', bg: '#F0FDF4', color: '#166534' },
  { id: 'entree',               label: 'Entrée',               emoji: '🥗',  bg: '#EFF6FF', color: '#1D4ED8' },
  { id: 'dessert',              label: 'Dessert',              emoji: '🍰',  bg: '#FDF4FF', color: '#7C3AED' },
  { id: 'apero',                label: 'Apéro',                emoji: '🥂',  bg: '#FFFBEB', color: '#B45309' },
  { id: 'finger-food',          label: 'Finger food',          emoji: '🤌',  bg: '#FFF0F9', color: '#9D174D' },
  { id: 'gouter',               label: 'Goûter',               emoji: '☕',  bg: '#FEF9EE', color: '#B45309' },
  { id: 'gouter-enfant',        label: 'Goûter enfant',        emoji: '🧒',  bg: '#ECFDF5', color: '#065F46' },
  { id: 'recette-salee-enfant', label: 'Recette salée enfant', emoji: '👶',  bg: '#F0FDFA', color: '#0F766E' },
];

const CUSTOM_CAT_COLORS = [
  { bg: '#FEF2F2', color: '#B91C1C' }, { bg: '#FFF7ED', color: '#C2410C' },
  { bg: '#FEFCE8', color: '#854D0E' }, { bg: '#F7FEE7', color: '#3F6212' },
  { bg: '#F0FDF4', color: '#166534' }, { bg: '#F0FDFA', color: '#0F766E' },
  { bg: '#EFF6FF', color: '#1D4ED8' }, { bg: '#F5F3FF', color: '#5B21B6' },
];

const AISLES = [
  { id: 'fruits-legumes',   label: 'Fruits & Légumes',   emoji: '🥦' },
  { id: 'viandes-poissons', label: 'Viandes & Poissons', emoji: '🥩' },
  { id: 'frais',            label: 'Produits Frais',      emoji: '🥛' },
  { id: 'epicerie-salee',   label: 'Épicerie Salée',      emoji: '🫙' },
  { id: 'epicerie-sucree',  label: 'Épicerie Sucrée',     emoji: '🍫' },
  { id: 'boulangerie',      label: 'Boulangerie',         emoji: '🥖' },
  { id: 'surgeles',         label: 'Surgelés',            emoji: '❄️' },
  { id: 'boissons',         label: 'Boissons',            emoji: '🍷' },
  { id: 'autre',            label: 'Autre',               emoji: '🛒' },
];

const AISLE_KW = {
  'fruits-legumes': ['tomate','oignon','ail','carotte','pomme','poire','banane','citron','orange','fraise','framboise','myrtille','raisin','courgette','aubergine','poivron','épinard','epinard','salade','laitue','basilic','persil','thym','romarin','ciboulette','échalote','echalote','poireau','champignon','brocoli','chou','concombre','avocat','pomme de terre','patate','cerise','abricot','pêche','peche','mangue','ananas','kiwi','melon','navet','betterave','fenouil','asperge','haricots verts','petits pois','maïs','mais','céleri','celeri','radis'],
  'viandes-poissons': ['poulet','boeuf','porc','veau','agneau','dinde','canard','lapin','saumon','thon','cabillaud','crevette','moule','coquille','jambon','lardons','bacon','steak','escalope','filet','côte','cote','merguez','chorizo','andouille','saucisse','boudin','foie','sardine','maquereau','lieu','sole','dorade','bar','homard','langoustine','viande'],
  'frais': ['lait','crème','creme','beurre','fromage','yaourt','yogourt','oeuf','œuf','ricotta','mascarpone','gruyère','gruyere','comté','comte','emmental','mozzarella','parmesan','camembert','brie','roquefort','chèvre','chevre','fromage blanc','crème fraîche','crème épaisse','st moret'],
  'epicerie-salee': ['farine','sel','poivre','huile','vinaigre','pâtes','pates','riz','lentilles','pois chiche','haricot rouge','haricot blanc','conserve','bouillon','moutarde','ketchup','mayonnaise','sauce soja','tabasco','pesto','tapenade','anchois','câpres','capres','cornichon','olive','tomate pelée','concentré de tomate','coulis','lait de coco','noix de coco','curry','cumin','coriandre','paprika','curcuma','cannelle','gingembre','muscade','cardamome','origan','laurier','herbes'],
  'epicerie-sucree': ['sucre','chocolat','cacao','levure','bicarbonate','fécule','fecule','maïzena','maizena','miel','sirop','confiture','nutella','vanille','amande','noisette','noix','pignon','raisin sec','figue sèche','datte','praline','caramel'],
  'boulangerie': ['pain','baguette','brioche','croissant','pâte brisée','pate brisee','pâte feuilletée','pate feuilletee','pâte sablée','chapelure','panko'],
  'surgeles': ['surgelé','surgele','congelé','congele','glace','sorbet'],
  'boissons': ['eau gazeuse','jus de','vin blanc','vin rouge','champagne','bière','biere','café','cafe','thé','the'],
};

const DAYS_FR   = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const MONTHS_FR = ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
const MEALS     = [{ id:'midi', label:'Déjeuner' }, { id:'soir', label:'Dîner' }];
const COURSES   = [{ id:'entree', label:'Entrée' }, { id:'plat', label:'Plat' }, { id:'dessert', label:'Dessert' }];

// ── FIREBASE ──────────────────────────────────────────
firebase.initializeApp({
  apiKey:            "AIzaSyB-vaVqrejkRAiW5q3sQvy9crl5RzDeIzc",
  authDomain:        "mes-recettes-bd049.firebaseapp.com",
  projectId:         "mes-recettes-bd049",
  storageBucket:     "mes-recettes-bd049.firebasestorage.app",
  messagingSenderId: "239169207922",
  appId:             "1:239169207922:web:1b3d67548cc7bbd8ad0ceb"
});
const db             = firebase.firestore();
const STORE          = db.collection('data').doc('main');
const PHOTOS         = db.collection('photos'); // chaque doc = { photo: "data:..." } pour un recipeId
const SETTINGS_STORE = db.collection('data').doc('settings');
const SHOP_STORE     = db.collection('data').doc('shop');
let _ownWrite      = false; // évite re-render inutile sur notre propre écriture
let _shopOwnWrite  = false;

// ── PARAMÈTRES EN MÉMOIRE (chargés depuis Firestore) ──
let _pin          = null;   // PIN de protection, null = aucun
let _notifEnabled = false;  // notifications activées
let _homePhoto    = '';     // URL photo page d'accueil
let _resetAt      = 0;      // horodatage force-sync

// ── SYSTÈME D'ACCÈS PAR PIN ────────────────────────────
// Par défaut, l'app est en lecture seule.
// Seul quelqu'un connaissant le PIN peut modifier.
// sessionStorage : déverrouillé jusqu'à fermeture de l'onglet.

function _isUnlocked() {
  if (!_pin) return true; // aucun PIN défini = proprio sur son appareil
  return sessionStorage.getItem('edit-unlocked') === '1';
}

// Déverrouiller avec le PIN
function unlockEdit() {
  if (!_pin) { sessionStorage.setItem('edit-unlocked', '1'); return true; }
  const entered = prompt('🔒 Code PIN pour modifier :');
  if (entered === null) return false;
  if (entered === _pin) {
    sessionStorage.setItem('edit-unlocked', '1');
    document.documentElement.classList.remove('lecture-mode');
    toast('✓ Mode édition activé', 'success');
    switchView(currentView);
    return true;
  } else {
    toast('Code PIN incorrect', 'error');
    return false;
  }
}

function lockEdit() {
  sessionStorage.removeItem('edit-unlocked');
  document.documentElement.classList.add('lecture-mode');
  switchView(currentView);
  toast('🔒 Mode lecture activé', 'success');
}

function setEditPin() {
  if (_pin && !_isUnlocked()) {
    toast('Déverrouillez d\'abord l\'app pour changer le PIN', 'error');
    return;
  }
  const newPin = prompt('Nouveau code PIN (4 chiffres) — laisser vide pour désactiver :');
  if (newPin === null) return;
  if (newPin === '') {
    _pin = null;
    SETTINGS_STORE.set({ pin: null, notifEnabled: _notifEnabled, homePhoto: _homePhoto }, { merge: true }).catch(() => {});
    sessionStorage.setItem('edit-unlocked', '1');
    toast('✓ Protection PIN désactivée', 'success');
  } else if (/^\d{4,8}$/.test(newPin)) {
    _pin = newPin;
    SETTINGS_STORE.set({ pin: _pin, notifEnabled: _notifEnabled, homePhoto: _homePhoto }, { merge: true }).catch(() => {});
    sessionStorage.setItem('edit-unlocked', '1');
    toast('✓ PIN enregistré — partagez l\'URL sans le PIN !', 'success');
  } else {
    toast('PIN invalide — utilisez 4 à 8 chiffres', 'error');
  }
  initSettingsView();
}

function copyReadOnlyLink() {
  const url = location.origin + location.pathname;
  navigator.clipboard.writeText(url).then(() => {
    toast('✓ Lien copié ! Sans le PIN, vos invités ne peuvent que consulter les recettes.', 'success');
  }).catch(() => {
    prompt('Copiez ce lien :', url);
  });
}

// ── MODE LECTURE ───────────────────────────────────────
// Lecture seule si un PIN est défini ET pas encore déverrouillé cette session
// LECTURE_MODE est une fonction dynamique (pas une constante)
function LECTURE_MODE() { return !_isUnlocked(); }
if (LECTURE_MODE()) document.documentElement.classList.add('lecture-mode');

// ── ÉTAT ──────────────────────────────────────────────
let recipes        = [];
let mealPlan       = {};
let customCats     = [];   // [{ id, label, emoji }]
let urlTodo        = [];   // [{ url, addedAt }] — URLs à importer plus tard
let shopItems        = [];   // [{ id, name, aisle, checked }] — liste de courses persistante
let _localModifiedAt = 0;  // timestamp dernière modif locale
let todoItems      = [];   // [{ id, title, assignee, done, createdAt }] — to-do partagée
let todoFilter     = 'all';
let todoAssignee   = 'nous';

let activeCat      = 'all';
let activeTag      = null;
let minRating      = 0;
let searchTerm     = '';
let cartSet        = new Set();
let currentView    = 'recipes';
let weekStart      = getMonday(new Date());
let currentDetailId = null;
let pickerSlot     = null;
let planAdderRecipeId = null;
let planAdderDate  = null;
let planAdderMeal  = 'midi';
let planAdderCourse = 'plat';

// ── PHOTO STORE (cache mémoire uniquement — Firestore est la source de vérité) ──
let _photoCache = null;

function loadPhotoStore() {
  if (!_photoCache) _photoCache = {};
  return _photoCache;
}
function savePhotoStore(map) {
  _photoCache = map;
}
// Fusionne les photos (cache mémoire) dans un tableau de recettes
function mergePhotos(arr) {
  const map = loadPhotoStore();
  return arr.map(r => (map[r.id] && !r.photo) ? {...r, photo: map[r.id]} : r);
}

// ── SYNC PHOTOS FIRESTORE ─────────────────────────────
// Sauvegarde une photo dans Firestore (collection photos/{recipeId})
// Accepte base64 ET URLs Cloudinary (https://res.cloudinary.com/...)
function savePhotoToCloud(recipeId, photoData) {
  if (!recipeId || !photoData) return;
  const isBase64 = photoData.startsWith('data:');
  const isCloudinary = photoData.includes('res.cloudinary.com');
  if (!isBase64 && !isCloudinary) return;
  PHOTOS.doc(String(recipeId)).set({ photo: photoData, updatedAt: Date.now() })
    .catch(e => console.warn('Photo cloud save:', e));
}
// Supprime une photo de Firestore
function deletePhotoFromCloud(recipeId) {
  if (!recipeId) return;
  PHOTOS.doc(String(recipeId)).delete().catch(() => {});
}
// Charge toutes les photos depuis Firestore → cache mémoire + render
async function loadPhotosFromCloud() {
  try {
    const snap = await PHOTOS.get();
    if (snap.empty) return;
    const map = loadPhotoStore();
    snap.forEach(doc => { if (doc.data().photo) map[doc.id] = doc.data().photo; });
    savePhotoStore(map);
    recipes = mergePhotos(recipes);
    render();
  } catch(e) { console.warn('Photo cloud load:', e); }
}

// ── PERSISTANCE ───────────────────────────────────────
function load() {
  // Migration unique depuis localStorage (si les données n'ont pas encore été poussées vers Firestore)
  const _lsRecipes    = (() => { try { return JSON.parse(localStorage.getItem('mes-recettes') || '[]'); } catch { return []; } })();
  const _lsMealPlan   = (() => { try { return JSON.parse(localStorage.getItem('mes-repas')    || '{}'); } catch { return {}; } })();
  const _lsCustomCats = (() => { try { return JSON.parse(localStorage.getItem('mes-categories-custom') || '[]'); } catch { return []; } })();
  const _lsModifiedAt = parseInt(localStorage.getItem('_modifiedAt') || '0');

  // Initialiser les syncs temps réel
  initSettingsSync();
  initShopSync();
  migrateMealPlan();
  loadTodoLists();
  initTodoSync();
  initUrlTodoSync();

  // Charger les photos depuis Firestore en arrière-plan
  loadPhotosFromCloud();

  // Synchronisation temps réel des recettes via Firebase
  STORE.onSnapshot(snap => {
    if (_ownWrite) { _ownWrite = false; return; }

    if (!snap.exists) {
      // Firebase vide : migration depuis localStorage si disponible
      const migratedRecs = _lsRecipes.filter(r => !String(r.id).startsWith('demo'));
      if (migratedRecs.length > 0) {
        toast(`Migration de ${migratedRecs.length} recettes vers le cloud…`, 'info');
        recipes    = migratedRecs;
        mealPlan   = _lsMealPlan;
        customCats = _lsCustomCats;
        _ownWrite  = true;
        STORE.set({ recipes: stripForCloud(recipes), mealPlan, customCats, lastModified: Date.now() })
          .then(() => {
            toast(`✓ ${recipes.length} recettes récupérées !`);
            renderSidebar(); renderTagCloud(); renderCatSelect(); render();
          })
          .catch(() => { _ownWrite = false; });
      }
      return;
    }

    const d          = snap.data();
    const fbRecs     = d.recipes || [];
    const fbModified = d.lastModified || d.modifiedAt || 0;
    // lcCount tient compte des recettes en mémoire ET d'un éventuel localStorage non encore migré
    const memCount   = recipes.filter(r => !String(r.id).startsWith('demo')).length;
    const lsCount    = _lsRecipes.filter(r => !String(r.id).startsWith('demo')).length;
    const lcCount    = Math.max(memCount, lsCount);

    // Force sync si Firebase a un signal resetAt plus récent
    const fbResetAt = d.resetAt || 0;
    if (fbResetAt > _resetAt) {
      _resetAt         = fbResetAt;
      recipes          = mergePhotos(fbRecs);
      mealPlan         = d.mealPlan   || {};
      customCats       = d.customCats || [];
      _localModifiedAt = fbModified;
      renderSidebar(); renderTagCloud(); renderCatSelect(); render();
      return;
    }

    const localTooMany = fbRecs.length > 10 && lcCount > fbRecs.length * 1.3;
    if (lcCount === 0 || localTooMany) {
      recipes          = mergePhotos(fbRecs);
      mealPlan         = d.mealPlan   || {};
      customCats       = d.customCats || [];
      _localModifiedAt = fbModified;
      renderSidebar(); renderTagCloud(); renderCatSelect(); render();
      return;
    }

    // localStorage gagne si : il a plus de recettes que Firebase (migration)
    // OU s'il a été modifié plus récemment (timestamp)
    const lsHasMore = lsCount > fbRecs.length;
    const lsWins    = lsCount > 0 && (lsHasMore || _lsModifiedAt > fbModified);
    const localWins = (_localModifiedAt > 0 && _localModifiedAt > fbModified) || lsWins;
    if (localWins) {
      // Charger le localStorage en mémoire si plus complet
      if (lsWins) {
        recipes    = _lsRecipes.filter(r => !String(r.id).startsWith('demo'));
        mealPlan   = _lsMealPlan;
        customCats = _lsCustomCats;
        toast(`Récupération de ${recipes.length} recettes depuis ce navigateur…`, 'info');
        renderSidebar(); renderTagCloud(); renderCatSelect(); render();
      }
      _ownWrite = true;
      STORE.set({ recipes: stripForCloud(recipes), mealPlan, customCats,
                  lastModified: Date.now(),
                  ...(_resetAt ? { resetAt: _resetAt } : {}) })
        .then(() => lsWins && toast(`✓ ${recipes.length} recettes synchronisées sur le cloud !`))
        .catch(() => { _ownWrite = false; });
    } else {
      recipes          = mergePhotos(fbRecs);
      mealPlan         = d.mealPlan   || {};
      customCats       = d.customCats || [];
      _localModifiedAt = fbModified;
      renderSidebar(); renderTagCloud(); renderCatSelect(); render();
    }
  }, err => console.warn('Firebase sync:', err));
}

// Supprime les photos base64 avant envoi Firebase (trop volumineuses, restent en local)
function stripForCloud(arr) {
  return arr.map(r => {
    if (r.photo && r.photo.startsWith('data:')) {
      const { photo, ...rest } = r;
      return rest;
    }
    return r;
  });
}

function save() {
  _localModifiedAt = Date.now();
  // Conserver _modifiedAt dans localStorage pour aider la migration multi-appareils
  try { localStorage.setItem('_modifiedAt', String(_localModifiedAt)); } catch(e) {}
  _ownWrite = true;
  STORE.set({ recipes: stripForCloud(recipes), mealPlan, customCats,
              lastModified: _localModifiedAt, ...(_resetAt ? { resetAt: _resetAt } : {}) })
    .catch(e => { _ownWrite = false; toast('⚠️ Erreur synchro cloud : ' + e.message, 'error'); console.warn('Firebase save:', e); });
}

// ── PARAMÈTRES FIRESTORE ──────────────────────────────
function saveSettings() {
  SETTINGS_STORE.set({ pin: _pin || null, notifEnabled: _notifEnabled, homePhoto: _homePhoto }, { merge: true })
    .catch(e => console.warn('settings save:', e));
}

function initSettingsSync() {
  SETTINGS_STORE.onSnapshot(snap => {
    if (!snap.exists) return;
    const d = snap.data();
    _pin          = d.pin || null;
    _notifEnabled = !!d.notifEnabled;
    _homePhoto    = d.homePhoto || '';
    if (LECTURE_MODE()) document.documentElement.classList.add('lecture-mode');
    else document.documentElement.classList.remove('lecture-mode');
    if (currentView === 'settings') initSettingsView();
    if (currentView === 'home') renderHomeView();
  }, () => {});
}

// ── COURSES FIRESTORE ─────────────────────────────────
function initShopSync() {
  SHOP_STORE.onSnapshot(snap => {
    if (_shopOwnWrite) { _shopOwnWrite = false; return; }
    if (!snap.exists) return;
    const d = snap.data();
    shopItems = d.items || [];
    cartSet   = new Set(d.cart || []);
    if (currentView === 'shop') renderShopView();
  }, () => {});
}

// ── CATÉGORIES ────────────────────────────────────────
function allCats() {
  const map = {};
  DEFAULT_CATS.forEach(c => { map[c.id] = c; });
  customCats.forEach((c, i) => {
    const palette = CUSTOM_CAT_COLORS[i % CUSTOM_CAT_COLORS.length];
    map[c.id] = { ...c, ...palette };
  });
  return map;
}

function catInfo(c) { return allCats()[c] || { label: c, emoji: '🍴', bg: '#F1F5F9', color: '#475569' }; }
function catLabel(c) { return catInfo(c).label; }
function catEmoji(c) { return catInfo(c).emoji; }

function catPillHtml(c) {
  const info = catInfo(c);
  return `<span class="cat-pill" style="background:${info.bg};color:${info.color}">${esc(info.emoji)} ${esc(info.label)}</span>`;
}

function renderCatSelect() {
  const cats = Object.values(allCats());

  // Select du formulaire recette
  const sel = document.getElementById('f-cat');
  const cur = sel.value;
  sel.innerHTML = '<option value="">— Choisir —</option>';
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.textContent = `${c.emoji} ${c.label}`;
    if (c.id === cur) opt.selected = true;
    sel.appendChild(opt);
  });

  // Select catégorie par défaut dans l'import URL
  const imp = document.getElementById('import-default-cat');
  if (imp) {
    const impCur = imp.value;
    imp.innerHTML = '<option value="">Garder celle détectée</option>';
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id; opt.textContent = `${c.emoji} ${c.label}`;
      if (c.id === impCur) opt.selected = true;
      imp.appendChild(opt);
    });
  }
}

// ── SIDEBAR ───────────────────────────────────────────
function renderSidebar() {
  const list = document.getElementById('cat-list');
  list.innerHTML = '';

  const all = { id: 'all', label: 'Toutes', emoji: '📚', bg: '#F8FAFC', color: '#475569' };
  const cats = [all, ...Object.values(allCats())];

  cats.forEach(c => {
    const count = c.id === 'all' ? recipes.length : recipes.filter(r => r.category === c.id).length;
    const li = document.createElement('li');
    li.className = 'filter-item' + (activeCat === c.id ? ' active' : '');
    li.dataset.cat = c.id;
    li.innerHTML = `<span>${c.emoji}</span><span class="fi-name">${esc(c.label)}</span><span class="fi-count">${count}</span>`;
    // Drag depuis la sidebar
    if (c.id !== 'all') {
      li.draggable = true;
      li.title = `Glisser sur une recette pour changer sa catégorie`;
      li.addEventListener('dragstart', e => {
        e.dataTransfer.setData('drop-cat-id', c.id);
        e.dataTransfer.effectAllowed = 'copy';
        li.classList.add('dragging-cat');
      });
      li.addEventListener('dragend', () => li.classList.remove('dragging-cat'));
    }
    list.appendChild(li);
  });

  list.querySelectorAll('.filter-item').forEach(el => {
    el.addEventListener('click', () => {
      activeCat = el.dataset.cat;
      render();
    });
  });
}

function renderTagCloud() {
  const allTags = [...new Set(recipes.flatMap(r => r.tags || []))].sort();
  const sec   = document.getElementById('tags-section');
  const cloud = document.getElementById('tag-cloud');
  if (!allTags.length) { sec.style.display = 'none'; return; }
  sec.style.display = '';
  cloud.innerHTML = allTags.map(t =>
    `<span class="tag-chip-filter${activeTag === t ? ' active' : ''}" data-tag="${esc(t)}">${esc(t)}</span>`
  ).join('');
  cloud.querySelectorAll('.tag-chip-filter').forEach(el => {
    el.addEventListener('click', () => {
      activeTag = activeTag === el.dataset.tag ? null : el.dataset.tag;
      render();
    });
  });
}

// ── CUSTOM CATEGORIES MANAGER ─────────────────────────
function openCategoryManager() {
  renderCatManagerList();
  openModal('ov-categories');
}

function renderCatManagerList() {
  const el = document.getElementById('cat-manager-list');
  const cats = allCats();
  el.innerHTML = Object.values(cats).map(c =>
    `<div class="cat-manager-item">
      <span style="font-size:18px;line-height:1">${esc(c.emoji)}</span>
      <span class="ci-label">${esc(c.label)}</span>
      ${DEFAULT_CATS.find(d => d.id === c.id)
        ? '<span class="ci-default">par défaut</span>'
        : `<button class="ci-del" onclick="deleteCustomCategory('${esc(c.id)}')" title="Supprimer">✕</button>`}
    </div>`
  ).join('');
}

function addCustomCategory() {
  const emoji = document.getElementById('new-cat-emoji').value.trim() || '🍲';
  const label = document.getElementById('new-cat-label').value.trim();
  if (!label) { toast('Saisissez un nom de catégorie.', 'error'); return; }
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (allCats()[id]) { toast('Cette catégorie existe déjà.', 'error'); return; }
  customCats.push({ id, label, emoji });
  save();
  document.getElementById('new-cat-emoji').value = '';
  document.getElementById('new-cat-label').value = '';
  renderCatManagerList();
  renderSidebar();
  renderCatSelect();
  toast(`Catégorie « ${label} » ajoutée ✓`);
}

function deleteCustomCategory(id) {
  customCats = customCats.filter(c => c.id !== id);
  save();
  renderCatManagerList();
  renderSidebar();
  renderCatSelect();
  toast('Catégorie supprimée', 'info');
}

// ── EMOJI PICKER ──────────────────────────────────────
const FOOD_EMOJIS = [
  '🍕','🍔','🌮','🌯','🥗','🍜','🍝','🍲','🥘','🍛',
  '🍣','🍱','🍙','🍚','🥩','🍗','🍖','🥚','🧀','🥞',
  '🥓','🥦','🥕','🧅','🌽','🍅','🥑','🍆','🥔','🍠',
  '🥜','🍞','🥐','🥖','🫓','🥨','🥯','🧆','🥙','🌭',
  '🍰','🎂','🧁','🍩','🍪','🍫','🍮','🍯','🧇','🧈',
  '🍦','🍧','🍨','🥧','🍡','🍋','🍊','🍇','🍓','🫐',
  '🍒','🍑','🥭','🍍','🥥','🍌','🍎','🍐','🍈','🫒',
  '🦞','🦐','🦑','🦀','🐟','☕','🫖','🍵','🥂','🍷',
  '🫕','🥗','🍤','🌶️','🧄','🫚','🧂','🫙','🍶','🥛',
];

function toggleEmojiPicker() {
  let picker = document.getElementById('emoji-picker-grid');
  if (picker) { picker.remove(); return; }

  picker = document.createElement('div');
  picker.id = 'emoji-picker-grid';
  picker.className = 'emoji-picker-grid';
  picker.innerHTML = FOOD_EMOJIS.map(e =>
    `<button type="button" class="emoji-pick-btn" onclick="pickEmoji('${e}')">${e}</button>`
  ).join('');

  const btn = document.getElementById('emoji-picker-btn');
  btn.parentNode.insertBefore(picker, btn.nextSibling);

  // Fermer si clic ailleurs
  setTimeout(() => document.addEventListener('click', function closePicker(ev) {
    if (!picker.contains(ev.target) && ev.target.id !== 'emoji-picker-btn') {
      picker.remove();
      document.removeEventListener('click', closePicker);
    }
  }), 0);
}

function pickEmoji(e) {
  document.getElementById('new-cat-emoji').value = e;
  const picker = document.getElementById('emoji-picker-grid');
  if (picker) picker.remove();
}

// ── UTILS ─────────────────────────────────────────────
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function starsHtml(n) {
  if (!n) return '';
  return Array.from({length: 5}, (_, i) =>
    `<span style="color:${i < n ? 'var(--gold)' : 'var(--border-2)'}">★</span>`
  ).join('');
}

function timeHtml(r) {
  const parts = [];
  if (r.prepTime) parts.push(`⏱ ${r.prepTime} min`);
  if (r.cookTime)  parts.push(`🔥 ${r.cookTime} min`);
  return parts.join('  ');
}

function guessAisle(name) {
  const lower = name.toLowerCase();
  for (const [aisle, kws] of Object.entries(AISLE_KW)) {
    if (kws.some(kw => lower.includes(kw))) return aisle;
  }
  return 'autre';
}

function parseQty(s) {
  const frac = /^(\d+)\/(\d+)$/.exec(String(s || '').trim());
  if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
  return parseFloat(String(s || '').replace(',', '.'));
}

function formatQty(n) {
  return Number.isInteger(n) ? String(n) : parseFloat(n.toFixed(2)).toString();
}

function getMonday(d) {
  const dt = new Date(d); dt.setHours(0,0,0,0);
  const day = dt.getDay();
  dt.setDate(dt.getDate() + (day === 0 ? -6 : 1 - day));
  return dt;
}
function dateKey(d) { return d.toISOString().slice(0, 10); }
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }

function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  document.getElementById('toasts').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ── URL TODO LIST ─────────────────────────────────────
const URL_TODO_STORE = db.collection('data').doc('url-todo');

function saveUrlTodo() {
  URL_TODO_STORE.set({ urls: urlTodo }).catch(e => console.warn('url-todo sync:', e));
}

function initUrlTodoSync() {
  URL_TODO_STORE.onSnapshot(snap => {
    if (!snap.exists) return;
    const remote = snap.data().urls || [];
    const merged = [...urlTodo];
    remote.forEach(r => {
      if (!merged.find(l => l.url === r.url)) merged.push(r);
    });
    if (merged.length !== urlTodo.length) {
      urlTodo = merged;
      renderUrlTodo();
    }
  }, () => {});
}

function addToUrlTodo() {
  const input = document.getElementById('todo-url-input');
  const raw = input.value.trim();
  if (!raw) return;
  const urls = raw.split('\n').map(u => u.trim()).filter(u => u.startsWith('http'));
  if (!urls.length) { toast('Aucune URL valide détectée.', 'error'); return; }
  let added = 0;
  urls.forEach(url => {
    if (!urlTodo.find(t => t.url === url)) {
      urlTodo.push({ url, addedAt: new Date().toISOString() });
      added++;
    }
  });
  saveUrlTodo();
  input.value = '';
  renderUrlTodo();
  toast(`${added} URL${added > 1 ? 's' : ''} ajoutée${added > 1 ? 's' : ''} à la liste`);
}

function removeFromUrlTodo(url) {
  urlTodo = urlTodo.filter(t => t.url !== url);
  saveUrlTodo();
  renderUrlTodo();
}

async function importFromUrlTodo(url) {
  const btn = document.querySelector(`[data-todo-url="${CSS.escape(url)}"] .todo-import-btn`);
  if (btn) { btn.disabled = true; btn.textContent = '⏳'; }
  try {
    const recipe = await importFromUrl(url);
    removeFromUrlTodo(url);
    closeModal('ov-import');
    openAddWithData(recipe);
    toast('Recette prête à enregistrer');
  } catch(e) {
    if (btn) { btn.disabled = false; btn.textContent = 'Importer'; }
    toast('Erreur : ' + e.message, 'error');
  }
}

function renderUrlTodo() {
  const el = document.getElementById('url-todo-list');
  if (!el) return;
  if (!urlTodo.length) {
    el.innerHTML = '<p class="todo-empty">Aucune URL enregistrée. Collez des URLs ci-dessus pour les importer plus tard.</p>';
    return;
  }
  el.innerHTML = urlTodo.map((t, i) => {
    const domain = (() => { try { return new URL(t.url).hostname.replace('www.',''); } catch { return t.url.slice(0,40); } })();
    const date = new Date(t.addedAt).toLocaleDateString('fr-FR', { day:'numeric', month:'short' });
    return `<div class="todo-item" data-todo-url="${esc(t.url)}">
      <div class="todo-item-info">
        <span class="todo-domain">${esc(domain)}</span>
        <span class="todo-date">${date}</span>
        <a href="${esc(t.url)}" target="_blank" class="todo-link" title="Voir la page">↗</a>
      </div>
      <div class="todo-item-actions">
        <button class="btn btn-primary btn-xs todo-import-btn" onclick="importFromUrlTodo('${esc(t.url)}')">Importer</button>
        <button class="btn btn-ghost btn-xs" onclick="removeFromUrlTodo('${esc(t.url)}')" title="Supprimer">✕</button>
      </div>
    </div>`;
  }).join('');
}

// ── URL IMPORT ────────────────────────────────────────
const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const _photoUrlCache = {}; // recipeId → url générée (in-memory only)

// ── IMPORT DEPUIS TEXTE LIBRE ─────────────────────────
function doTextImport() {
  const raw    = document.getElementById('import-text-input').value.trim();
  const status = document.getElementById('text-import-status');
  if (!raw) { status.innerHTML = '<div class="import-error">Collez d\'abord le texte d\'une recette.</div>'; return; }

  // Détecter URL en 1ère ligne
  const lines0 = raw.split('\n');
  let sourceUrl = '';
  let rawBody = raw;
  if (lines0[0] && /^https?:\/\//i.test(lines0[0].trim())) {
    sourceUrl = lines0[0].trim();
    rawBody = lines0.slice(1).join('\n').trim();
  }

  // Nettoyer les tirets/puces en début de ligne
  const cleanRaw = rawBody.split('\n').map(l => l.replace(/^[-–—•·*✓✗]\s*/, '')).join('\n');

  // Découper par paragraphes (lignes vides)
  const paragraphs = cleanRaw.split(/\n[ \t]*\n/).map(p => p.trim()).filter(p => p.length > 0);

  const ING_KW  = /^(ingrédients?|ingredients?|il vous faut|pour (cette|la) recette|pour \d)/i;
  const PREP_KW = /^(préparation|preparation|instructions?|étapes?|recette|méthode|réalisation|déroulé)/i;

  let name = '', ingLines = [], prepText = '';

  if (paragraphs.length >= 2 && !ING_KW.test(paragraphs[0]) && !ING_KW.test(paragraphs[1].split('\n')[0])) {
    // ── Nouveau format : titre / ingrédients / préparation ──
    name     = paragraphs[0].split('\n')[0].trim();
    ingLines = paragraphs[1].split('\n').map(l => l.trim()).filter(l => l.length > 1);
    prepText = paragraphs.slice(2).join('\n\n').trim();
  } else {
    // ── Ancien format avec mots-clés ──
    const lines = cleanRaw.split('\n').map(l => l.trim());
    name = lines.find(l => l.length > 2 && l.length < 120 && !ING_KW.test(l)) || 'Recette importée';

    let ingStart = -1, ingEnd = lines.length, prepStart = -1;
    for (let i = 0; i < lines.length; i++) {
      if (ingStart === -1 && ING_KW.test(lines[i]))  { ingStart = i + 1; continue; }
      if (ingStart !== -1 && PREP_KW.test(lines[i])) { ingEnd = i; prepStart = i + 1; break; }
    }
    ingLines = (ingStart !== -1
      ? lines.slice(ingStart, ingEnd)
      : lines.filter(l => /^\d|^[½⅓⅔¼¾]|\b\d+\s*(g|ml|cl|l|kg|cs|cc|cuillère|tasse|sachet|pincée)\b/i.test(l))
    ).filter(l => l.length > 1);
    prepText = prepStart !== -1 ? lines.slice(prepStart).filter(l => !PREP_KW.test(l)).join('\n').trim() : '';
  }

  name = name || 'Recette importée';
  const ingredients = ingLines.map(l => parseIngredientString(l)).filter(i => i.name && i.name.length > 1);

  if (!ingredients.length) {
    status.innerHTML = '<div class="import-error">Aucun ingrédient détecté. Séparez le titre, les ingrédients et la préparation par des <strong>lignes vides</strong>.</div>';
    return;
  }

  status.innerHTML = `<div class="url-import-success">✓ ${ingredients.length} ingrédients extraits — « ${esc(name)} »</div>`;
  setTimeout(() => {
    try {
      openAddWithData({ name, ingredients, instructions: prepText, sourceUrl });
      closeModal('ov-import');
      document.getElementById('import-text-input').value = '';
      status.innerHTML = '';
    } catch(e) {
      status.innerHTML = `<div class="import-error">Erreur : ${e.message}</div>`;
      console.error('doTextImport openAddWithData:', e);
    }
  }, 400);
}

async function doUrlImport() {
  const raw    = document.getElementById('import-url-input').value.trim();
  const status = document.getElementById('url-import-status');
  if (!raw) { status.innerHTML = '<div class="import-error">Collez au moins une URL.</div>'; return; }

  const urls = raw.split('\n').map(u => u.trim()).filter(u => u.startsWith('http'));
  if (!urls.length) { status.innerHTML = '<div class="import-error">Aucune URL valide détectée.</div>'; return; }

  const btn        = document.getElementById('import-url-btn');
  const defaultCat = document.getElementById('import-default-cat')?.value || '';
  const defaultTags = (document.getElementById('import-default-tags')?.value || '')
    .split(',').map(t => t.trim()).filter(Boolean);
  btn.disabled = true;

  // Applique catégorie et tags par défaut à une recette importée
  function applyDefaults(recipe) {
    if (defaultCat) recipe.category = defaultCat;
    if (defaultTags.length) {
      const existing = recipe.tags || [];
      recipe.tags = [...new Set([...existing, ...defaultTags])];
    }
    return recipe;
  }

  // Une seule URL → ouvre le formulaire pour vérification
  if (urls.length === 1) {
    status.innerHTML = '<div class="url-import-loading"><span class="spinner"></span>Récupération en cours…</div>';
    try {
      const recipe = applyDefaults(await importFromUrl(urls[0]));
      // Vérification doublon URL unique
      const dup = findDuplicate(recipe.name || '', urls[0], recipe.id);
      if (dup) {
        status.innerHTML = `<div class="import-error">⚠️ Cette recette semble déjà importée : « ${esc(dup.recipe.name)} ».<br>
          <button class="btn btn-sm btn-outline" style="margin-top:8px" onclick="(()=>{ closeModal('ov-import'); openAddWithData(${JSON.stringify(recipe).replace(/</g,'\\u003c')}); })()">Importer quand même</button></div>`;
        btn.disabled = false;
        return;
      }
      status.innerHTML = `<div class="url-import-success">✓ Recette extraite : <strong>${esc(recipe.name || 'Sans titre')}</strong></div>`;
      setTimeout(() => { closeModal('ov-import'); openAddWithData(recipe); }, 900);
    } catch(e) {
      status.innerHTML = `<div class="import-error">${esc(e.message)}</div>`;
    } finally { btn.disabled = false; }
    return;
  }

  // Plusieurs URLs → import en masse direct
  let ok = 0, fail = 0, skipped = 0;
  for (let i = 0; i < urls.length; i++) {
    status.innerHTML = `<div class="url-import-loading"><span class="spinner"></span>Import ${i + 1} / ${urls.length}…</div>`;
    try {
      const recipe = applyDefaults(await importFromUrl(urls[i]));
      recipe.id = 'r' + Date.now() + Math.random().toString(36).slice(2);
      // Vérification doublon en masse (par URL source)
      const dup = findDuplicate(recipe.name || '', urls[i], recipe.id);
      if (dup) { skipped++; continue; }
      recipes.push(recipe);
      if (recipe.photo) savePhotoToCloud(recipe.id, recipe.photo);
      save();
      ok++;
    } catch(e) {
      fail++;
    }
    if (i < urls.length - 1) await new Promise(r => setTimeout(r, 600));
  }

  render(); renderSidebar(); renderTagCloud();
  const msg = `✓ ${ok} recette${ok > 1 ? 's' : ''} importée${ok > 1 ? 's' : ''}` +
    (skipped ? ` · ${skipped} doublon${skipped > 1 ? 's' : ''} ignoré${skipped > 1 ? 's' : ''}` : '') +
    (fail    ? ` · ${fail} échec${fail > 1 ? 's' : ''}` : '');
  status.innerHTML = `<div class="url-import-success">${msg}</div>`;
  toast(msg);
  btn.disabled = false;
  document.getElementById('import-url-input').value = '';
}

async function importFromUrl(url) {
  const proxyUrl = CORS_PROXY + encodeURIComponent(url);
  let resp;
  try {
    resp = await fetch(proxyUrl);
  } catch(e) {
    throw new Error('Impossible de contacter le proxy. Vérifiez votre connexion internet.');
  }
  if (!resp.ok) throw new Error(`Erreur réseau (${resp.status})`);
  const data = await resp.json();
  const html = data.contents;
  if (!html) throw new Error('Page vide ou inaccessible.');

  const parser = new DOMParser();
  const doc    = parser.parseFromString(html, 'text/html');

  // 1) Try JSON-LD recipe schema
  const recipe = extractJsonLdRecipe(doc, url);
  if (recipe) return recipe;

  // 2) Fallback: og: tags (Instagram, TikTok, generic)
  return extractFromMeta(doc, url);
}

function extractJsonLdRecipe(doc, url) {
  const scripts = [...doc.querySelectorAll('script[type="application/ld+json"]')];
  for (const script of scripts) {
    try {
      const raw = JSON.parse(script.textContent);
      const list = Array.isArray(raw) ? raw : (raw['@graph'] ? raw['@graph'] : [raw]);
      for (const item of list) {
        if (item['@type'] === 'Recipe') return buildRecipeFromSchema(item, url);
      }
    } catch(e) {}
  }
  return null;
}

function buildRecipeFromSchema(schema, url) {
  let photo = '';
  if (schema.image) {
    if (typeof schema.image === 'string')       photo = schema.image;
    else if (schema.image.url)                  photo = schema.image.url;
    else if (Array.isArray(schema.image))       photo = schema.image[0]?.url || schema.image[0] || '';
  }

  const ingredients = (schema.recipeIngredient || []).map(str => {
    const p = parseIngredientString(str);
    return { ...p, aisle: guessAisle(p.name) };
  });

  let instructions = '';
  const raw = schema.recipeInstructions;
  if (typeof raw === 'string') {
    instructions = raw;
  } else if (Array.isArray(raw)) {
    instructions = raw.map((s, i) => `${i+1}. ${s.text || s}`).join('\n');
  }

  const tags = schema.keywords
    ? schema.keywords.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  return {
    id: uid(), name: schema.name || '',
    category: guessSchemaCategory(schema),
    prepTime: parseDuration(schema.prepTime),
    cookTime: parseDuration(schema.cookTime || schema.totalTime),
    portions: String(schema.recipeYield || ''),
    rating: 0, tags, photo,
    source: { type: detectSourceType(url), ref: url },
    ingredients, instructions, notes: '',
    dateAdded: new Date().toISOString(),
  };
}

function extractFromMeta(doc, url) {
  const meta = (prop) =>
    doc.querySelector(`meta[property="${prop}"]`)?.content ||
    doc.querySelector(`meta[name="${prop}"]`)?.content || '';

  const title = meta('og:title') || doc.title || '';
  const desc  = meta('og:description') || meta('description') || '';
  const image = meta('og:image') || '';
  const type  = detectSourceType(url);

  // For Instagram/TikTok the description IS the recipe caption
  const ingredients = parseIngredientsFromText(desc);

  return {
    id: uid(),
    name: cleanImportedTitle(title, type),
    category: '',
    prepTime: null, cookTime: null, portions: null, rating: 0, tags: [],
    photo: image,
    source: { type, ref: url },
    ingredients,
    instructions: desc,
    notes: ingredients.length ? '' : 'Vérifiez et complétez les ingrédients depuis la source.',
    dateAdded: new Date().toISOString(),
    _partial: true,
  };
}

// ISO 8601 duration → minutes (PT15M → 15, PT1H30M → 90)
function parseDuration(iso) {
  if (!iso) return null;
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso);
  if (!m) return null;
  const mins = (parseInt(m[1]||0) * 60) + parseInt(m[2]||0);
  return mins || null;
}

// Parse "200g de farine" → { qty:'200', unit:'g', name:'farine' }
function parseIngredientString(str) {
  str = str.trim();
  // Pattern: number + optional unit + name
  const m = str.match(
    /^([\d.,\/½¼¾]+)\s*(g|kg|cl|dl|ml|l|cc|cs|c\.à\.s\.?|c\.à\.c\.?|cuillères? à soupe|cuillères? à café|tasse[s]?|sachet[s]?|boîte[s]?|bûche[s]?|rouleau[x]?|tranche[s]?|feuille[s]?|botte[s]?|bouquet[s]?|pincée[s]?|poignée[s]?)?\s+(?:de\s+|d'|d')?(.*)/i
  );
  if (m) return { qty: m[1], unit: (m[2]||'').trim(), name: (m[3]||m[2]||str).trim() };
  const m2 = str.match(/^([\d.,\/½¼¾]+)\s+(.*)/);
  if (m2) return { qty: m2[1], unit: '', name: m2[2].trim() };
  return { qty: '', unit: '', name: str };
}

// Try to extract ingredient lines from a blob of text (Instagram caption)
function parseIngredientsFromText(text) {
  if (!text) return [];
  const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);
  // Heuristic: lines that start with a number or a bullet are likely ingredients
  return lines
    .filter(l => /^[\d½¼¾]|^[-•·*]/.test(l))
    .slice(0, 30)
    .map(l => {
      const clean = l.replace(/^[-•·*]\s*/, '');
      const p = parseIngredientString(clean);
      return { ...p, aisle: guessAisle(p.name) };
    });
}

function detectSourceType(url) {
  if (/instagram\.com/.test(url))  return 'instagram';
  if (/tiktok\.com/.test(url))     return 'tiktok';
  if (/youtu/.test(url))           return 'youtube';
  return 'url';
}

function cleanImportedTitle(title, type) {
  // Remove " - Instagram", "| TikTok" suffix noise
  return title.replace(/\s*[-|]\s*(Instagram|TikTok|YouTube|Facebook).*$/i, '').trim();
}

function guessSchemaCategory(schema) {
  const text = [
    schema.recipeCategory, schema.recipeCuisine, schema.name,
    ...(schema.recipeIngredient || []).slice(0, 5)
  ].join(' ').toLowerCase();

  if (/dessert|gâteau|cake|tarte|cookie|brownie|fondant|moelleux|crème/.test(text)) return 'dessert';
  if (/apéritif|apéro|amuse|verrines|finger|toast|dip/.test(text)) return 'apero';
  if (/entrée|salade|soupe|velouté|carpaccio|tartare/.test(text)) return 'entree';
  if (/goûter|biscuit|muffin|pancake|crêpe|smoothie/.test(text)) return 'gouter';
  return 'plat';
}

// Pre-fill the add form with extracted recipe data
function openAddWithData(recipe) {
  document.getElementById('edit-modal-title').textContent =
    recipe._partial ? 'Compléter la recette importée' : 'Vérifier et enregistrer';
  document.getElementById('edit-del-btn').style.display = 'none';
  renderCatSelect();

  document.getElementById('f-id').value          = '';
  document.getElementById('f-name').value         = recipe.name || '';
  document.getElementById('f-cat').value          = recipe.category || '';
  document.getElementById('f-preptime').value     = recipe.prepTime || '';
  document.getElementById('f-cooktime').value     = recipe.cookTime  || '';
  document.getElementById('f-portions').value     = recipe.portions  || '';
  document.getElementById('f-source-ref').value   = recipe.sourceUrl || recipe.source?.ref  || '';
  document.getElementById('f-instructions').value = recipe.instructions || '';
  document.getElementById('f-notes').value        = recipe.notes        || '';
  document.getElementById('f-photo-url').value    = (recipe.photo && !recipe.photo.startsWith('data:')) ? recipe.photo : '';

  setStarPicker(recipe.rating || 0);
  editTags = [...(recipe.tags || [])];
  renderTagChips();

  if (recipe.photo) showPhotoPreview(recipe.photo);
  else hidePhotoPreview();

  document.getElementById('ing-rows').innerHTML = '';
  (recipe.ingredients || []).forEach(ing => addIngRow(ing));
  if (!(recipe.ingredients?.length)) addIngRow();

  openModal('ov-edit');
}

// ── PHOTO PLACEHOLDER + REAL PHOTO FETCH ──────────────

// Category-specific real food photo URLs (Unsplash, curated + stable)
const CAT_FALLBACK_PHOTOS = {
  'plat':                 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop&q=80',
  'entree':               'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=260&fit=crop&q=80',
  'dessert':              'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=260&fit=crop&q=80',
  'apero':                'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=260&fit=crop&q=80',
  'finger-food':          'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=400&h=260&fit=crop&q=80',
  'gouter':               'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=260&fit=crop&q=80',
  'gouter-enfant':        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=260&fit=crop&q=80',
  'recette-salee-enfant': 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=400&h=260&fit=crop&q=80',
};

function generatePlaceholderSvg(recipe) {
  const palettes = {
    'plat':                 ['#D1FAE5','#059669'],
    'entree':               ['#DBEAFE','#2563EB'],
    'dessert':              ['#EDE9FE','#7C3AED'],
    'apero':                ['#FEF3C7','#D97706'],
    'finger-food':          ['#FCE7F3','#9D174D'],
    'gouter':               ['#FEF9C3','#CA8A04'],
    'gouter-enfant':        ['#D1FAE5','#065F46'],
    'recette-salee-enfant': ['#CCFBF1','#0F766E'],
  };
  const [c1, c2] = palettes[recipe.category] || ['#E2E8F0','#475569'];
  const emoji    = catInfo(recipe.category).emoji || '🍴';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260">
    <rect width="400" height="260" fill="${c1}"/>
    <circle cx="200" cy="120" r="72" fill="${c2}14"/>
    <circle cx="200" cy="120" r="50" fill="${c2}22"/>
    <text x="200" y="136" text-anchor="middle" dominant-baseline="middle" font-size="54" fill="${c2}">${emoji}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// Returns the photo to display — uses cached real photo or SVG placeholder
function getPhotoSrc(r) {
  if (r.photo) return r.photo;
  // Vérifier le cache Firestore (photos uploadées)
  if (_photoCache) {
    const stored = _photoCache[r.id] || _photoCache[String(r.id)];
    if (stored) return stored;
  }
  if (_photoUrlCache[r.id]) return _photoUrlCache[r.id];
  return generatePlaceholderSvg(r);
}

// ── DICTIONNAIRE FR → EN POUR RECHERCHE PHOTO ────────
const FR_TO_EN = {
  'poulet':'chicken','boeuf':'beef','veau':'veal','agneau':'lamb','porc':'pork',
  'saumon':'salmon','thon':'tuna','cabillaud':'cod','crevettes':'shrimp','crevette':'shrimp',
  'moules':'mussels','lardons':'bacon','jambon':'ham','saucisse':'sausage',
  'tomate':'tomato','tomates':'tomatoes','pomme':'apple','poire':'pear',
  'fraise':'strawberry','fraises':'strawberries','framboise':'raspberry','framboises':'raspberries',
  'citron':'lemon','orange':'orange','mangue':'mango','avocat':'avocado',
  'banane':'banana','cerise':'cherry','cerises':'cherries','peche':'peach','abricot':'apricot',
  'chocolat':'chocolate','vanille':'vanilla','caramel':'caramel','miel':'honey',
  'fromage':'cheese','beurre':'butter','creme':'cream','lait':'milk','oeuf':'egg','oeufs':'eggs',
  'tarte':'tart','gateau':'cake','gateaux':'cakes','soupe':'soup','salade':'salad',
  'pates':'pasta','riz':'rice','pain':'bread','brioche':'brioche','baguette':'baguette',
  'quiche':'quiche','crepe':'crepe','crepes':'crepes','galette':'galette','galettes':'galettes',
  'gratin':'gratin','fondue':'fondue','ratatouille':'ratatouille','couscous':'couscous',
  'courgette':'zucchini','aubergine':'eggplant','champignon':'mushroom','champignons':'mushrooms',
  'oignon':'onion','oignons':'onions','ail':'garlic','carotte':'carrot','carottes':'carrots',
  'poivron':'bell pepper','epinard':'spinach','brocoli':'broccoli','chou':'cabbage',
  'asperge':'asparagus','poireau':'leek','fenouil':'fennel','betterave':'beet',
  'risotto':'risotto','curry':'curry','tajine':'tagine','wok':'stir fry',
  'pancakes':'pancakes','muffin':'muffin','cookie':'cookie','brownie':'brownie',
  'tiramisu':'tiramisu','mousse':'mousse','flan':'flan','cheesecake':'cheesecake',
  'clafoutis':'clafoutis','eclair':'eclair','macaron':'macaron','croissant':'croissant',
  'burger':'burger','pizza':'pizza','wrap':'wrap','sandwich':'sandwich',
  'veloute':'velouté soup','bisque':'bisque','pot':'pot','rouleaux':'spring rolls',
  'fondant':'lava cake','moelleux':'soft cake','financier':'financier cake',
  'panna':'panna cotta','cotta':'panna cotta','creme brulee':'crème brûlée',
};

function titleToEnglishQuery(name) {
  const clean = name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
  const STOP = ['de','du','la','le','les','au','aux','et','a','en','un','une','des',
                'avec','pour','sur','sans','mon','ma','mes','notre','ses','faire',
                'recette','maison','facile','rapide','simple'];
  const words = clean.split(/\s+/).filter(w => w.length > 1 && !STOP.includes(w));
  const translated = words.map(w => FR_TO_EN[w] || w);
  return translated.slice(0, 4).join(' ');
}

// ── GÉNÉRER PHOTO POUR LE FORMULAIRE ─────────────────
async function generatePhotoForForm() {
  const name = document.getElementById('f-name').value.trim();
  const cat  = document.getElementById('f-cat').value;
  const btn  = document.getElementById('gen-photo-btn');
  if (!name) { toast('Saisissez d\'abord le nom de la recette', 'info'); return; }

  btn.disabled = true;
  btn.innerHTML = '<span style="opacity:.6">Recherche…</span>';

  const query = titleToEnglishQuery(name);
  let photoUrl = null;

  // Extrait le mot-clé alimentaire principal (premier mot traduit non vide)
  const mainWord = query.split(' ').find(w => w.length > 2) || query;

  // 1) TheMealDB — recherche par nom complet traduit
  try {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    const data = await resp.json();
    if (data.meals?.[0]?.strMealThumb) photoUrl = data.meals[0].strMealThumb + '/preview';
  } catch(e) {}

  // 2) TheMealDB — essaie chaque mot traduit comme ingrédient jusqu'à trouver
  if (!photoUrl) {
    const words = query.split(' ').filter(w => w.length > 2);
    for (const word of words) {
      try {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(word)}`);
        const data = await resp.json();
        if (data.meals?.length) {
          const pick = data.meals[Math.floor(Math.random() * Math.min(5, data.meals.length))];
          photoUrl = pick.strMealThumb + '/preview';
          break;
        }
      } catch(e) {}
    }
  }

  // 3) Pollinations.ai — génération IA basée sur le nom exact de la recette
  if (!photoUrl) {
    const aiPrompt = `professional food photography, ${name}, appetizing dish, white background, soft lighting, high quality`;
    photoUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(aiPrompt)}?width=400&height=300&nologo=true&seed=${Date.now() % 9999}`;
    btn.innerHTML = '<span style="opacity:.6">Génération IA…</span>';
  }

  // Mettre à jour champ et aperçu
  document.getElementById('f-photo-url').value = photoUrl;
  const wrap = document.getElementById('photo-preview-wrap');
  const prev = document.getElementById('photo-preview');
  prev.src = photoUrl;
  wrap.style.display = '';

  btn.disabled = false;
  btn.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="10" r="8"/><path d="M6 10c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"/><circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none"/></svg> Générer';
  const isAI = photoUrl.includes('pollinations.ai');
  toast(isAI ? '✨ Photo IA générée pour « '+name+' » — cliquez pour une autre' : 'Photo trouvée — cliquez pour une autre');
}

// ── CLOUDINARY UPLOAD ──────────────────────────────────
const CLOUDINARY_CLOUD = 'dorehsd97';
const CLOUDINARY_PRESET = 'mes-recettes';

async function uploadToCloudinary(file) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', CLOUDINARY_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
    method: 'POST', body: fd
  });
  if (!res.ok) throw new Error('Cloudinary ' + res.status);
  const data = await res.json();
  return data.secure_url;
}

// Async: try TheMealDB → category fallback → keep SVG
async function fetchAndSetRealPhoto(recipe, imgEl) {
  if (recipe.photo || _photoUrlCache[recipe.id]) return;
  try {
    // 1) TheMealDB search by recipe name
    const words  = recipe.name.trim().split(/\s+/).slice(0, 3).join(' ');
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(words)}`;
    const resp   = await fetch(apiUrl);
    const data   = await resp.json();
    if (data.meals?.[0]?.strMealThumb) {
      const url = data.meals[0].strMealThumb + '/preview';
      _photoUrlCache[recipe.id] = url;
      if (imgEl && imgEl.isConnected) imgEl.src = url;
      return;
    }
  } catch(e) {}

  // 2) Category fallback (Unsplash curated)
  const fallback = CAT_FALLBACK_PHOTOS[recipe.category] || CAT_FALLBACK_PHOTOS['plat'];
  _photoUrlCache[recipe.id] = fallback;
  if (imgEl && imgEl.isConnected) imgEl.src = fallback;
}

// ── FILTRES ───────────────────────────────────────────
function filtered() {
  const q = searchTerm.toLowerCase();
  return recipes.filter(r => {
    if (activeCat !== 'all' && r.category !== activeCat) return false;
    if (activeTag && !(r.tags || []).includes(activeTag)) return false;
    if (minRating > 0 && (r.rating || 0) < minRating) return false;
    if (q) {
      const inName = r.name.toLowerCase().includes(q);
      const inIng  = (r.ingredients || []).some(i => i.name.toLowerCase().includes(q));
      if (!inName && !inIng) return false;
    }
    return true;
  });
}

// ── RENDU GLOBAL ──────────────────────────────────────
function render() {
  renderSidebar();
  renderTagCloud();
  renderQuickFilter();
  if (currentView === 'recipes') renderGrid();
  else renderPlanner();
  renderCartBadge();
  updateFab();
}

// ── GRID ──────────────────────────────────────────────
function renderGrid() {
  const toTs = r => { const d = r.updatedAt || r.createdAt || r.dateAdded; return d ? (typeof d === 'number' ? d : new Date(d).getTime()) : 0; };
  const list = filtered().sort((a, b) => toTs(b) - toTs(a));
  const container = document.getElementById('grid');

  document.getElementById('page-title').textContent =
    activeCat === 'all' ? 'Toutes les recettes' : catLabel(activeCat);
  document.getElementById('results-info').textContent = searchTerm
    ? `${list.length} résultat${list.length !== 1 ? 's' : ''} pour « ${searchTerm} »`
    : `${list.length} recette${list.length !== 1 ? 's' : ''}`;

  container.innerHTML = '';
  if (!list.length) {
    const el = document.createElement('div');
    el.className = 'empty-state';
    el.innerHTML = searchTerm
      ? `<div class="empty-icon">🔍</div><h3>Aucun résultat</h3><p>Aucune recette ne contient « ${esc(searchTerm)} ».</p>`
      : `<div class="empty-icon">🍳</div><h3>Aucune recette ici</h3><p>Ajoutez votre première recette !</p><button class="btn btn-primary" onclick="openAdd()">+ Ajouter une recette</button>`;
    container.appendChild(el);
    return;
  }
  list.forEach(r => container.appendChild(makeCard(r)));
}

function makeCard(r) {
  const inCart = cartSet.has(r.id);
  const div    = document.createElement('div');
  div.className = 'card' + (inCart ? ' in-cart' : '');

  const time       = timeHtml(r);
  const ingPreview = (r.ingredients || []).slice(0, 4).map(i => i.name).join(', ')
                   + ((r.ingredients || []).length > 4 ? ` +${r.ingredients.length - 4}` : '');
  const tagsHtml   = (r.tags || []).slice(0, 3).map(t => `<span class="mini-tag">${esc(t)}</span>`).join('');
  const photoSrc   = getPhotoSrc(r);

  div.innerHTML = `
    <div class="card-photo-placeholder" style="background:none">
      <img src="${esc(photoSrc)}" alt="${esc(r.name)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">
      <div class="card-photo-cat">${catPillHtml(r.category)}</div>
      <button class="card-del-btn" onclick="event.stopPropagation();deleteRecipeById('${r.id}')" title="Supprimer">✕</button>
      <button class="card-plan-btn" onclick="event.stopPropagation();openPlanAdder('${r.id}')" title="Ajouter au planning">📅</button>
      <button class="card-cart-btn" onclick="event.stopPropagation();toggleCartById('${r.id}')"
        title="${inCart ? 'Retirer de la liste' : 'Ajouter à la liste'}">${inCart ? '🛒' : '＋'}</button>
    </div>
    <div class="card-body">
      <div class="card-name">${esc(r.name)}</div>
      <div class="card-meta">
        ${time ? `<span>${time}</span>` : ''}
        ${r.rating ? `<span class="card-stars">${starsHtml(r.rating)}</span>` : ''}
      </div>
      ${ingPreview ? `<div class="card-ings">${esc(ingPreview)}</div>` : ''}
      ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
    </div>`;

  div.addEventListener('click', () => openDetail(r.id));

  // Drop d'une catégorie sur la carte
  div.addEventListener('dragover', e => {
    if ([...e.dataTransfer.types].includes('drop-cat-id')) {
      e.preventDefault();
      div.classList.add('card-drop-target');
    }
  });
  div.addEventListener('dragleave', e => {
    if (!div.contains(e.relatedTarget)) div.classList.remove('card-drop-target');
  });
  div.addEventListener('drop', e => {
    e.preventDefault();
    div.classList.remove('card-drop-target');
    const catId = e.dataTransfer.getData('drop-cat-id');
    if (!catId) return;
    const rec = recipes.find(x => x.id === r.id);
    if (rec && rec.category !== catId) {
      rec.category = catId;
      save(); render(); renderSidebar();
      const label = allCats()[catId]?.label || catId;
      toast(`Catégorie → ${label}`);
    }
  });

  // Pas de génération auto — l'utilisateur clique sur le bouton photo pour en générer une

  return div;
}

// ── DELETE ON CARD ────────────────────────────────────
function deleteRecipeById(id) {
  const r = recipes.find(x => String(x.id) === String(id));
  if (!r) return;
  if (!confirm(`Supprimer « ${r.name} » définitivement ?`)) return;
  recipes = recipes.filter(x => String(x.id) !== String(id));
  cartSet.delete(id);
  saveCartSet();
  Object.keys(mealPlan).forEach(date => {
    MEALS.forEach(({ id: meal }) => {
      COURSES.forEach(({ id: course }) => {
        if (mealPlan[date]?.[meal]?.[course] === id) mealPlan[date][meal][course] = null;
      });
    });
    const dayEmpty = MEALS.every(({ id: m }) => COURSES.every(({ id: c }) => !mealPlan[date]?.[m]?.[c]));
    if (dayEmpty) delete mealPlan[date];
  });
  // Supprimer la photo du store local et de Firestore
  const photoMap = loadPhotoStore();
  if (photoMap[id]) { delete photoMap[id]; savePhotoStore(photoMap); }
  deletePhotoFromCloud(id);
  save(); render(); toast('Recette supprimée', 'info');
}

// ── CART ──────────────────────────────────────────────
function renderCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (cartSet.size > 0) { badge.textContent = cartSet.size; badge.classList.add('visible'); }
  else badge.classList.remove('visible');
}
function toggleCartById(id) {
  cartSet.has(id) ? cartSet.delete(id) : cartSet.add(id);
  saveCartSet();
  render();
}
function toggleCart() {
  if (!currentDetailId) return;
  toggleCartById(currentDetailId);
  updateDetailCartBtn();
}
function updateDetailCartBtn() {
  const btn = document.getElementById('d-cart-btn');
  if (btn) btn.textContent = cartSet.has(currentDetailId) ? '🛒 Dans la liste' : 'Ajouter à la liste';
}

// ── DÉTAIL ────────────────────────────────────────────
function openDetail(id) {
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  currentDetailId = id;

  const header = document.getElementById('d-photo-header');
  header.style.backgroundImage = `url('${esc(getPhotoSrc(r))}')`;

  document.getElementById('d-cat-pill').outerHTML; // force refresh below
  const pill = document.getElementById('d-cat-pill');
  pill.setAttribute('style', `background:${catInfo(r.category).bg};color:${catInfo(r.category).color}`);
  pill.innerHTML = esc(catInfo(r.category).emoji) + ' ' + esc(catLabel(r.category));
  pill.className = 'cat-pill';

  document.getElementById('d-name').textContent = r.name;
  document.getElementById('d-stars').innerHTML  = starsHtml(r.rating);

  let srcHtml = '';
  if (r.source?.ref) {
    const ref = r.source.ref.trim();
    const isUrl = ref.startsWith('http');
    srcHtml = isUrl
      ? `🔗 <a href="${esc(ref)}" target="_blank" rel="noopener">${esc(ref)}</a>`
      : `📖 ${esc(ref)}`;
  }
  document.getElementById('d-source').innerHTML = srcHtml;
  document.getElementById('d-times').textContent = [
    r.prepTime && `⏱ Prépa ${r.prepTime} min`,
    r.cookTime  && `🔥 Cuisson ${r.cookTime} min`
  ].filter(Boolean).join('  ');
  document.getElementById('d-portions').textContent = r.portions
    ? `👥 ${r.portions} portion${r.portions > 1 ? 's' : ''}` : '';

  document.getElementById('d-tags').innerHTML = (r.tags || []).map(t =>
    `<span class="mini-tag">${esc(t)}</span>`
  ).join('');

  document.getElementById('d-ing-list').innerHTML = (r.ingredients || []).map(ing => {
    const qty = [ing.qty, ing.unit].filter(Boolean).join('\u00a0');
    return `<li><span class="ing-qty-display">${esc(qty)}</span><span>${esc(ing.name)}</span></li>`;
  }).join('');

  document.getElementById('d-instructions').textContent = r.instructions || '';

  const ns = document.getElementById('d-notes-section');
  if (r.notes?.trim()) {
    document.getElementById('d-notes').textContent = r.notes;
    ns.style.display = '';
  } else {
    ns.style.display = 'none';
  }

  // Date de dernière mise à jour
  const upd = document.getElementById('d-updated');
  if (upd) {
    const ts = r.updatedAt || r.dateAdded;
    if (ts) {
      const d = new Date(ts);
      upd.textContent = `Mis à jour le ${d.toLocaleDateString('fr-FR')} à ${d.toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'})}`;
    } else { upd.textContent = ''; }
  }

  updateDetailCartBtn();
  openModal('ov-detail');
}

function editDetailRecipe() {
  closeModal('ov-detail');
  openEdit(currentDetailId);
}

// ── ADD / EDIT ────────────────────────────────────────
let editTags = [];

function openAdd() {
  if (LECTURE_MODE()) { unlockEdit(); return; }
  document.getElementById('edit-modal-title').textContent = 'Nouvelle recette';
  document.getElementById('edit-del-btn').style.display = 'none';
  renderCatSelect();
  clearForm();
  openModal('ov-edit');
}

function openEdit(id) {
  if (LECTURE_MODE()) { unlockEdit(); return; }
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  document.getElementById('edit-modal-title').textContent = 'Modifier la recette';
  document.getElementById('edit-del-btn').style.display = 'inline-flex';
  renderCatSelect();

  document.getElementById('f-id').value          = r.id;
  document.getElementById('f-name').value         = r.name;
  document.getElementById('f-cat').value          = r.category;
  document.getElementById('f-preptime').value     = r.prepTime || '';
  document.getElementById('f-cooktime').value     = r.cookTime  || '';
  document.getElementById('f-portions').value     = r.portions  || '';
  document.getElementById('f-source-ref').value   = r.source?.ref  || '';
  document.getElementById('f-instructions').value = r.instructions || '';
  document.getElementById('f-notes').value        = r.notes        || '';
  document.getElementById('f-photo-url').value    = (r.photo && !r.photo.startsWith('data:')) ? r.photo : '';

  setStarPicker(r.rating || 0);
  editTags = [...(r.tags || [])];
  renderTagChips();

  if (r.photo) showPhotoPreview(r.photo);
  else hidePhotoPreview();

  document.getElementById('ing-rows').innerHTML = '';
  (r.ingredients || []).forEach(ing => addIngRow(ing));
  if (!(r.ingredients?.length)) addIngRow();

  openModal('ov-edit');
}

function clearForm() {
  document.getElementById('f-id').value = '';
  ['f-name','f-preptime','f-cooktime','f-portions','f-source-ref','f-instructions','f-notes','f-photo-url'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-cat').value = '';
  document.getElementById('f-photo-file').value  = '';
  setStarPicker(0);
  editTags = [];
  renderTagChips();
  hidePhotoPreview();
  document.getElementById('ing-rows').innerHTML = '';
  addIngRow();
}

function addIngRow(ing = {}) {
  const row  = document.createElement('div');
  row.className = 'ing-row';
  const aisle = ing.aisle || (ing.name ? guessAisle(ing.name) : 'autre');
  const opts  = AISLES.map(a =>
    `<option value="${a.id}" ${aisle === a.id ? 'selected' : ''}>${a.emoji} ${a.label}</option>`
  ).join('');
  row.innerHTML = `
    <input type="text" placeholder="200"        value="${esc(ing.qty  || '')}" class="iq">
    <input type="text" placeholder="g"          value="${esc(ing.unit || '')}" class="iu">
    <input type="text" placeholder="Ingrédient" value="${esc(ing.name || '')}" class="in">
    <select class="ia">${opts}</select>
    <button type="button" class="ing-del" onclick="this.closest('.ing-row').remove()">✕</button>`;
  row.querySelector('.in').addEventListener('blur', () => {
    const v = row.querySelector('.in').value.trim();
    if (v && !ing.aisle) row.querySelector('.ia').value = guessAisle(v);
  });
  document.getElementById('ing-rows').appendChild(row);
  if (!ing.name) setTimeout(() => row.querySelector('.in').focus(), 10);
}

function gatherIngredients() {
  return [...document.querySelectorAll('#ing-rows .ing-row')].map(row => ({
    qty:   row.querySelector('.iq').value.trim(),
    unit:  row.querySelector('.iu').value.trim(),
    name:  row.querySelector('.in').value.trim(),
    aisle: row.querySelector('.ia').value,
  })).filter(i => i.name);
}

// ── DÉTECTION DOUBLONS ────────────────────────────────
function findDuplicate(name, sourceUrl, excludeId) {
  const norm = name.trim().toLowerCase().replace(/\s+/g, ' ');
  const url  = sourceUrl?.trim() || '';
  // Doublon = même nom ET même lien (les deux doivent correspondre)
  // Si l'un des deux n'a pas de lien, on compare par nom uniquement
  const dup = recipes.find(r => {
    if (r.id === excludeId) return false;
    const rName = r.name.trim().toLowerCase().replace(/\s+/g, ' ');
    const rUrl  = r.source?.ref?.trim() || '';
    if (rName !== norm) return false;            // noms différents → pas doublon
    if (!url || !rUrl) return true;              // pas de lien à comparer → nom seul suffit
    return url === rUrl;                         // même nom ET même lien
  });
  return dup ? { recipe: dup, reason: url && dup.source?.ref ? 'name+url' : 'name' } : null;
}

function saveRecipe() {
  const name = document.getElementById('f-name').value.trim();
  const cat  = document.getElementById('f-cat').value;
  if (!name) { toast('Le nom est requis.', 'error'); document.getElementById('f-name').focus(); return; }
  if (!cat)  {
    toast('Choisissez une catégorie.', 'error');
    const sel = document.getElementById('f-cat');
    sel.focus();
    sel.style.borderColor = '#ef4444';
    sel.style.boxShadow = '0 0 0 3px #fee2e2';
    setTimeout(() => { sel.style.borderColor = ''; sel.style.boxShadow = ''; }, 2500);
    sel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const id  = document.getElementById('f-id').value || uid();
  const idx = recipes.findIndex(r => r.id === id);

  const photoUrl     = document.getElementById('f-photo-url').value.trim();
  const previewSrc   = document.getElementById('photo-preview').src;
  const uploadedB64  = previewSrc && previewSrc.startsWith('data:') ? previewSrc : '';
  const existingPhoto = idx >= 0 ? recipes[idx].photo : '';
  const photo = uploadedB64 || photoUrl || existingPhoto || '';

  const recipe = {
    id, name, category: cat,
    prepTime:  parseInt(document.getElementById('f-preptime').value) || null,
    cookTime:  parseInt(document.getElementById('f-cooktime').value)  || null,
    portions:  document.getElementById('f-portions').value || null,
    rating:    parseInt(document.getElementById('f-rating').dataset.val) || 0,
    tags:      [...editTags],
    photo,
    source: {
      ref: document.getElementById('f-source-ref').value.trim(),
    },
    ingredients:  gatherIngredients(),
    instructions: document.getElementById('f-instructions').value.trim(),
    notes:        document.getElementById('f-notes').value.trim(),
    dateAdded:    idx >= 0 ? recipes[idx].dateAdded : new Date().toISOString(),
    updatedAt:    new Date().toISOString(),
  };

  // Vérification doublon uniquement pour les nouvelles recettes
  if (idx < 0) {
    const dup = findDuplicate(name, recipe.source.ref, id);
    if (dup) {
      const msg = dup.reason === 'url'
        ? `⚠️ Une recette avec cette même URL existe déjà :\n« ${dup.recipe.name} »\n\nAjouter quand même ?`
        : `⚠️ Une recette avec ce nom existe déjà :\n« ${dup.recipe.name} »\n\nAjouter quand même ?`;
      if (!confirm(msg)) return;
    }
  }

  if (idx >= 0) { recipes[idx] = recipe; toast('Recette mise à jour ✓'); }
  else          { recipes.unshift(recipe); toast('Recette ajoutée ✓'); }

  // Sauvegarder la photo dans Firestore séparément (base64 ou Cloudinary URL)
  if (photo) savePhotoToCloud(id, photo);

  save(); closeModal('ov-edit'); render();
}

function deleteCurrentRecipe() {
  const id = document.getElementById('f-id').value;
  if (!id) return;
  const r = recipes.find(x => String(x.id) === String(id));
  if (!r || !confirm(`Supprimer « ${r.name} » définitivement ?`)) return;
  recipes = recipes.filter(x => String(x.id) !== String(id));
  cartSet.delete(id);
  saveCartSet();
  Object.keys(mealPlan).forEach(date => {
    MEALS.forEach(({ id: meal }) => {
      COURSES.forEach(({ id: course }) => {
        if (mealPlan[date]?.[meal]?.[course] === id) mealPlan[date][meal][course] = null;
      });
    });
    const dayEmpty = MEALS.every(({ id: m }) => COURSES.every(({ id: c }) => !mealPlan[date]?.[m]?.[c]));
    if (dayEmpty) delete mealPlan[date];
  });
  save(); closeModal('ov-edit'); toast('Recette supprimée', 'info'); render();
}

// ── STAR PICKER ───────────────────────────────────────
function setStarPicker(val) {
  const picker = document.getElementById('f-rating');
  picker.dataset.val = val;
  picker.querySelectorAll('.sp-star').forEach(s =>
    s.classList.toggle('on', parseInt(s.dataset.v) <= val)
  );
}
function initStarPicker() {
  const picker = document.getElementById('f-rating');
  picker.querySelectorAll('.sp-star').forEach(star => {
    star.addEventListener('click', () => {
      const v = parseInt(star.dataset.v);
      setStarPicker(v === parseInt(picker.dataset.val) ? 0 : v);
    });
    star.addEventListener('mouseover', () =>
      picker.querySelectorAll('.sp-star').forEach(s =>
        s.classList.toggle('on', parseInt(s.dataset.v) <= parseInt(star.dataset.v))
      )
    );
    star.addEventListener('mouseout', () => setStarPicker(parseInt(picker.dataset.val)));
  });
}

// ── TAG CHIPS ─────────────────────────────────────────
function renderTagChips() {
  const container = document.getElementById('tag-chips');
  container.innerHTML = editTags.map((t, i) =>
    `<span class="tag-chip">${esc(t)}<button class="tag-chip-rm" data-i="${i}" type="button">✕</button></span>`
  ).join('');
  container.querySelectorAll('.tag-chip-rm').forEach(btn => {
    btn.addEventListener('click', () => {
      editTags.splice(parseInt(btn.dataset.i), 1);
      renderTagChips();
    });
  });
}
function initTagInput() {
  const input = document.getElementById('f-tag-input');
  document.getElementById('tag-input-wrap').addEventListener('click', () => input.focus());
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.value.trim().replace(/,/g, '');
      if (val && !editTags.includes(val)) { editTags.push(val); renderTagChips(); }
      input.value = '';
    }
    if (e.key === 'Backspace' && !input.value && editTags.length) {
      editTags.pop(); renderTagChips();
    }
  });
}

// ── PHOTO UPLOAD ──────────────────────────────────────
function showPhotoPreview(src) {
  document.getElementById('photo-preview').src = src;
  document.getElementById('photo-preview-wrap').style.display = '';
}
function hidePhotoPreview() {
  document.getElementById('photo-preview-wrap').style.display = 'none';
  document.getElementById('photo-preview').src = '';
}
function initPhotoInputs() {
  document.getElementById('f-photo-url').addEventListener('input', e => {
    const v = e.target.value.trim();
    if (v) showPhotoPreview(v); else hidePhotoPreview();
  });
  document.getElementById('f-photo-file').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const saveBtn = document.getElementById('save-recipe-btn');
    if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = '⬆️ Upload…'; }
    toast('⬆️ Upload en cours…', 'info');
    try {
      const url = await uploadToCloudinary(file);
      showPhotoPreview(url);
      document.getElementById('f-photo-url').value = url;
      toast('✅ Photo uploadée !');
    } catch(err) {
      toast('Erreur upload photo : ' + err.message, 'error');
    } finally {
      if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Enregistrer'; }
    }
  });
}

// ── MEAL PLAN MIGRATION ───────────────────────────────
function migrateMealPlan() {
  let changed = false;
  Object.keys(mealPlan).forEach(date => {
    MEALS.forEach(({ id: meal }) => {
      const val = mealPlan[date]?.[meal];
      if (typeof val === 'string' || val === null) {
        if (!mealPlan[date]) mealPlan[date] = {};
        mealPlan[date][meal] = { entree: null, plat: val || null, dessert: null };
        changed = true;
      }
    });
  });
  if (changed) save();
}

// ── SHOPPING LIST ─────────────────────────────────────
function openShopping() {
  showShopStep(1);
  renderShopPicker();
  openModal('ov-shop');
}
function showShopStep(n) {
  document.getElementById('shop-step-1').style.display       = n === 1 ? '' : 'none';
  document.getElementById('shop-step-2').style.display       = n === 2 ? '' : 'none';
  document.getElementById('shop-generate-btn').style.display = n === 1 ? '' : 'none';
}
function renderShopPicker() {
  document.getElementById('shop-picker').innerHTML = recipes.map(r =>
    `<div class="shop-recipe-row">
      <input type="checkbox" id="shk-${r.id}" ${cartSet.has(r.id) ? 'checked' : ''}>
      <label for="shk-${r.id}">${catPillHtml(r.category)} ${esc(r.name)}</label>
    </div>`
  ).join('');
}
function generateShoppingList() {
  const selected = [...document.querySelectorAll('#shop-picker input:checked')].map(cb => cb.id.replace('shk-',''));
  if (!selected.length) { toast('Sélectionnez au moins une recette.', 'error'); return; }
  cartSet = new Set(selected);
  saveCartSet();
  renderCartBadge();

  const merged = new Map();
  selected.forEach(id => {
    const r = recipes.find(x => x.id === id);
    if (!r) return;
    (r.ingredients || []).forEach(ing => {
      const key = ing.name.trim().toLowerCase() + '|||' + (ing.unit || '').toLowerCase().trim();
      if (!merged.has(key)) {
        merged.set(key, { name: ing.name.trim(), unit: ing.unit || '', aisle: ing.aisle || guessAisle(ing.name), totalQty: 0, hasNum: false, textParts: [] });
      }
      const e   = merged.get(key);
      const num = parseQty(ing.qty);
      if (!isNaN(num) && ing.qty) { e.totalQty += num; e.hasNum = true; }
      else if (ing.qty) { e.textParts.push(ing.qty); }
    });
  });

  const items = [...merged.values()].map(e => ({
    name: e.name, unit: e.unit, aisle: e.aisle,
    displayQty: e.hasNum
      ? formatQty(e.totalQty) + (e.unit ? '\u00a0' + e.unit : '')
      : (e.textParts.join(' + ') || ''),
  })).sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  const groups = {};
  AISLES.forEach(a => { groups[a.id] = []; });
  items.forEach(item => {
    const a = groups[item.aisle] ? item.aisle : 'autre';
    groups[a].push(item);
  });

  const container = document.getElementById('shop-aisle-list');
  container.innerHTML = '';
  AISLES.forEach((aisle, ai) => {
    const list = groups[aisle.id];
    if (!list.length) return;
    const group = document.createElement('div');
    group.className = 'aisle-group';
    group.innerHTML = `<div class="aisle-group-title">${aisle.emoji} ${aisle.label}</div>` +
      list.map((item, i) =>
        `<div class="shop-item" id="si-${ai}-${i}">
          <input type="checkbox" id="sic-${ai}-${i}">
          <label for="sic-${ai}-${i}">
            ${item.displayQty ? `<span class="shop-qty">${esc(item.displayQty)}</span>` : ''}
            ${esc(item.name)}
          </label>
        </div>`
      ).join('');
    group.querySelectorAll('.shop-item').forEach(row => {
      const cb = row.querySelector('input');
      cb.addEventListener('change', () => row.classList.toggle('done', cb.checked));
    });
    container.appendChild(group);
  });
  // Ajouter à la liste de courses persistante
  const added = [];
  items.forEach(item => {
    const name = item.displayQty ? `${item.displayQty} ${item.name}` : item.name;
    const exists = shopItems.some(x => x.name.toLowerCase() === name.toLowerCase());
    if (!exists) { shopItems.push({ id: String(Date.now() + Math.random()), name, checked: false }); added.push(name); }
  });
  saveShopItems();

  closeModal('ov-shop');
  switchView('shop');
  toast(`✓ ${added.length} article${added.length > 1 ? 's' : ''} ajouté${added.length > 1 ? 's' : ''} à la liste`);
}

// ── IMPORT ────────────────────────────────────────────
let importFileContent = null;

function openImport() { openImportTab('url'); }

function openImportTab(tab) {
  document.getElementById('import-error').textContent    = '';
  document.getElementById('fdz-filename').textContent    = '';
  document.getElementById('import-url-input').value      = '';
  document.getElementById('url-import-status').innerHTML = '';
  document.getElementById('import-text-input').value     = '';
  document.getElementById('text-import-status').innerHTML = '';
  document.getElementById('file-drop-zone').classList.remove('has-file');
  importFileContent = null;
  // Activer l'onglet demandé
  const activeTab = tab || 'url';
  document.querySelectorAll('.import-tab').forEach(b => b.classList.remove('active'));
  const tabBtn = document.querySelector(`.import-tab[data-tab="${activeTab}"]`);
  if (tabBtn) tabBtn.classList.add('active');
  document.getElementById('import-tab-url').style.display  = activeTab === 'url'  ? '' : 'none';
  document.getElementById('import-tab-file').style.display = activeTab === 'file' ? '' : 'none';
  document.getElementById('import-tab-text').style.display = activeTab === 'text' ? '' : 'none';
  document.getElementById('import-tab-todo').style.display = activeTab === 'todo' ? '' : 'none';
  renderUrlTodo();
  if (activeTab === 'todo') renderLastImportDate();
  openModal('ov-import');
}
function initImportTabs() {
  document.querySelectorAll('.import-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.import-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.getElementById('import-tab-url').style.display  = tab === 'url'  ? '' : 'none';
      document.getElementById('import-tab-file').style.display = tab === 'file' ? '' : 'none';
      document.getElementById('import-tab-text').style.display = tab === 'text' ? '' : 'none';
      document.getElementById('import-tab-todo').style.display = tab === 'todo' ? '' : 'none';
      if (tab === 'todo') { renderUrlTodo(); renderLastImportDate(); }
    });
  });
  const fileInput = document.getElementById('import-file-input');
  fileInput.addEventListener('change', e => { if (e.target.files[0]) handleImportFile(e.target.files[0]); });
  const zone = document.getElementById('file-drop-zone');
  zone.addEventListener('click', () => fileInput.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) handleImportFile(e.dataTransfer.files[0]);
  });
}
function handleImportFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    importFileContent = e.target.result;
    document.getElementById('fdz-filename').textContent = `✓ ${file.name} (${Math.round(file.size / 1024)} Ko)`;
    document.getElementById('file-drop-zone').classList.add('has-file');
    document.getElementById('import-error').textContent = '';
    toast(`Fichier prêt — cliquez sur "Importer le fichier JSON"`);
  };
  reader.readAsText(file);
}
function doImport() {
  const isFileTab = document.querySelector('.import-tab.active')?.dataset.tab === 'file';
  const raw = isFileTab ? (importFileContent || '') : '';
  const errEl = document.getElementById('import-error');
  errEl.textContent = '';
  if (!raw) {
    errEl.textContent = '⚠️ Sélectionnez d\'abord un fichier JSON en cliquant sur "Choisir un fichier".';
    return;
  }
  let data;
  try { data = JSON.parse(raw); } catch (e) { errEl.textContent = 'Fichier JSON invalide : ' + e.message; return; }
  const list = Array.isArray(data) ? data : [data];
  let added = 0, skipped = 0;
  list.forEach(item => {
    if (!item.name || !item.category) return;
    const sourceUrl = item.source?.ref || item.url || '';
    const r = {
      id:           item.id || uid(),
      name:         item.name,
      category:     item.category,
      prepTime:     item.prepTime  || item.prep_time  || null,
      cookTime:     item.cookTime  || item.cook_time  || null,
      portions:     item.portions  || item.servings   || null,
      rating:       item.rating    || 0,
      tags:         item.tags      || [],
      photo:        item.photo     || item.image      || '',
      source: {
        type: item.source?.type || (item.url ? 'url' : 'autre'),
        ref:  sourceUrl,
      },
      ingredients:  normalizeIngs(item.ingredients || []),
      instructions: item.instructions || item.preparation || '',
      notes:        item.notes || '',
      dateAdded:    item.dateAdded || new Date().toISOString(),
    };
    if (recipes.find(x => x.id === r.id)) r.id = uid();
    if (findDuplicate(r.name, sourceUrl, r.id)) { skipped++; return; }
    recipes.unshift(r);
    added++;
  });
  if (!added && !skipped) { errEl.textContent = 'Aucune recette valide (name + category requis).'; return; }
  const msg = `${added} recette${added > 1 ? 's' : ''} importée${added > 1 ? 's' : ''}` +
    (skipped ? ` · ${skipped} doublon${skipped > 1 ? 's' : ''} ignoré${skipped > 1 ? 's' : ''}` : '');
  save(); closeModal('ov-import'); toast(msg + ' ✓'); render();
}
function normalizeIngs(ings) {
  return ings.map(i => {
    if (typeof i === 'string') return { qty:'', unit:'', name:i, aisle: guessAisle(i) };
    const name = String(i.name || i.nom || i.ingredient || '');
    return {
      qty:   String(i.qty || i.quantity || i.quantite || i.quantité || ''),
      unit:  String(i.unit || i.unite || i.unité || ''),
      name,
      aisle: i.aisle || guessAisle(name),
    };
  }).filter(i => i.name);
}

// ── PLANNER ───────────────────────────────────────────
function renderPlanner() {
  const grid  = document.getElementById('planner-grid');
  const today = dateKey(new Date());
  const days  = Array.from({length: 7}, (_, i) => addDays(weekStart, i));
  const wS = days[0], wE = days[6];
  document.getElementById('planner-week-label').textContent =
    `${wS.getDate()} ${MONTHS_FR[wS.getMonth()]} — ${wE.getDate()} ${MONTHS_FR[wE.getMonth()]} ${wE.getFullYear()}`;

  grid.innerHTML = '';
  grid.appendChild(document.createElement('div')); // corner

  days.forEach((d, i) => {
    const cell = document.createElement('div');
    cell.className = 'planner-header-cell' + (dateKey(d) === today ? ' today' : '');
    cell.innerHTML = `<span class="day-date">${d.getDate()}</span>${DAYS_FR[i]}`;
    grid.appendChild(cell);
  });

  MEALS.forEach(({ id: meal, label: mealLabel }) => {
    const sep = document.createElement('div');
    sep.className = 'planner-meal-sep';
    sep.textContent = mealLabel;
    grid.appendChild(sep);

    COURSES.forEach(({ id: course, label: courseLabel }) => {
      const rowLabel = document.createElement('div');
      rowLabel.className = 'planner-row-label';
      rowLabel.textContent = courseLabel;
      grid.appendChild(rowLabel);

      days.forEach(d => {
        const key      = dateKey(d);
        const slot     = mealPlan[key]?.[meal];
        const recipeId = slot?.[course] ?? null;
        const recipe   = recipeId ? recipes.find(r => r.id === recipeId) : null;
        const cell     = document.createElement('div');
        cell.className = 'planner-cell' + (recipe ? ' filled' : '');

        if (recipe) {
          cell.innerHTML = `
            <div class="planner-recipe-card">
              <button class="planner-remove" onclick="removePlanSlot('${key}','${meal}','${course}')">✕</button>
              ${catPillHtml(recipe.category)}
              <div class="planner-recipe-name" onclick="openDetail('${recipeId}')" style="cursor:pointer">${esc(recipe.name)}</div>
            </div>`;
        } else {
          const btn = document.createElement('div');
          btn.className = 'add-slot';
          btn.innerHTML = '<span class="add-slot-icon">+</span>';
          btn.addEventListener('click', () => openPicker(key, meal, course));
          cell.appendChild(btn);
        }
        grid.appendChild(cell);
      });
    });
  });
}

function removePlanSlot(date, meal, course) {
  if (mealPlan[date]?.[meal]) {
    mealPlan[date][meal][course] = null;
    const dayEmpty = MEALS.every(({ id: m }) =>
      COURSES.every(({ id: c }) => !mealPlan[date]?.[m]?.[c])
    );
    if (dayEmpty) delete mealPlan[date];
  }
  save(); renderPlanner();
}

function openPicker(date, meal, course) {
  pickerSlot = { date, meal, course };
  document.getElementById('picker-search').value = '';
  renderPickerList('');
  openModal('ov-picker');
}
function renderPickerList(query) {
  const q    = query.toLowerCase();
  const list = recipes.filter(r => !q || r.name.toLowerCase().includes(q));
  const el   = document.getElementById('picker-list');
  el.innerHTML = '';
  list.forEach(r => {
    const item = document.createElement('div');
    item.className = 'picker-item';
    item.innerHTML = `${catPillHtml(r.category)} <span class="pi-name">${esc(r.name)}</span>`;
    item.addEventListener('click', () => {
      if (!mealPlan[pickerSlot.date]) mealPlan[pickerSlot.date] = {};
      if (!mealPlan[pickerSlot.date][pickerSlot.meal]) mealPlan[pickerSlot.date][pickerSlot.meal] = { entree: null, plat: null, dessert: null };
      mealPlan[pickerSlot.date][pickerSlot.meal][pickerSlot.course] = r.id;
      save(); closeModal('ov-picker'); renderPlanner();
    });
    el.appendChild(item);
  });
  if (!list.length) el.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-3)">Aucune recette trouvée</div>`;
}

// ── PLAN ADDER (depuis carte recette) ─────────────────
function openPlanAdder(recipeId) {
  planAdderRecipeId = recipeId;
  planAdderDate     = dateKey(new Date());
  planAdderMeal     = 'midi';
  planAdderCourse   = 'plat';
  const r = recipes.find(x => x.id === recipeId);
  document.getElementById('plan-adder-title').textContent = r ? r.name : '';

  const today = new Date();
  const container = document.getElementById('plan-adder-days');
  container.innerHTML = '';
  for (let i = 0; i < 14; i++) {
    const d = addDays(today, i);
    const key = dateKey(d);
    const btn = document.createElement('button');
    btn.className = 'plan-adder-day-btn' + (key === planAdderDate ? ' active' : '');
    btn.dataset.date = key;
    btn.innerHTML = `<span class="pad-day">${DAYS_FR[d.getDay() === 0 ? 6 : d.getDay()-1].slice(0,3)}</span><span class="pad-num">${d.getDate()}</span>`;
    btn.addEventListener('click', () => {
      planAdderDate = key;
      container.querySelectorAll('.plan-adder-day-btn').forEach(b => b.classList.toggle('active', b.dataset.date === key));
    });
    container.appendChild(btn);
  }

  document.querySelectorAll('[data-adder-meal]').forEach(b => b.classList.toggle('active', b.dataset.adderMeal === planAdderMeal));
  document.querySelectorAll('[data-adder-course]').forEach(b => b.classList.toggle('active', b.dataset.adderCourse === planAdderCourse));
  openModal('ov-plan-adder');
}

function confirmPlanAdder() {
  if (!planAdderRecipeId || !planAdderDate) return;
  if (!mealPlan[planAdderDate]) mealPlan[planAdderDate] = {};
  if (!mealPlan[planAdderDate][planAdderMeal]) mealPlan[planAdderDate][planAdderMeal] = { entree: null, plat: null, dessert: null };
  mealPlan[planAdderDate][planAdderMeal][planAdderCourse] = planAdderRecipeId;
  save();
  closeModal('ov-plan-adder');
  const courseLabel = COURSES.find(c => c.id === planAdderCourse)?.label || '';
  const mealLabel   = MEALS.find(m => m.id === planAdderMeal)?.label || '';
  toast(`✓ Ajouté au planning (${mealLabel} · ${courseLabel})`);
  if (currentView === 'planner') renderPlanner();
}

// ── SEARCH ────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('search-input');
  const clear = document.getElementById('search-clear');
  input.addEventListener('input', () => {
    searchTerm = input.value.trim();
    clear.style.display = searchTerm ? 'block' : 'none';
    if (currentView === 'recipes') renderGrid();
  });
  clear.addEventListener('click', () => {
    input.value = ''; searchTerm = ''; clear.style.display = 'none'; input.focus();
    if (currentView === 'recipes') renderGrid();
  });
  document.getElementById('picker-search').addEventListener('input', e => renderPickerList(e.target.value));
}

// ── NAVIGATION ────────────────────────────────────────
const ALL_VIEWS = ['recipes', 'planner', 'shop', 'todo', 'settings', 'maison'];

function switchView(view, pushHistory = true) {
  if (pushHistory) history.pushState({ view, roomId: null, todoId: null }, '', '');
  currentView = view;
  ALL_VIEWS.forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.style.display = v === view ? '' : 'none';
  });
  document.querySelectorAll('.nav-tab, .bnav-tab').forEach(b =>
    b.classList.toggle('active', b.dataset.view === view)
  );
  // Masquer la recherche sur les vues non-recettes
  const searchEl = document.querySelector('.header-search');
  if (searchEl) searchEl.style.display = view === 'recipes' ? '' : 'none';

  // Sur desktop, masquer la sidebar si on n'est pas sur recettes
  const sidebar = document.getElementById('sidebar');
  const appBody = document.querySelector('.app-body');
  if (sidebar && window.innerWidth > 768) {
    const show = view === 'recipes';
    sidebar.style.display = show ? '' : 'none';
    if (appBody) appBody.classList.toggle('sidebar-hidden', !show);
  }

  if (view !== 'recipes') resetPullToRefresh();
  updateFab();
  if (view === 'planner') renderPlanner();
  else if (view === 'shop')    renderShopView();
  else if (view === 'todo')    renderTodoView();
  else if (view === 'settings') initSettingsView();
  else if (view === 'maison')  renderMaisonView();
  else render();
}

function initNav() {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
  document.getElementById('planner-prev').addEventListener('click', () => { weekStart = addDays(weekStart, -7); renderPlanner(); });
  document.getElementById('planner-next').addEventListener('click', () => { weekStart = addDays(weekStart,  7); renderPlanner(); });
  document.getElementById('planner-today').addEventListener('click', () => { weekStart = getMonday(new Date()); renderPlanner(); });
}

function initBottomNav() {
  document.querySelectorAll('.bnav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
}

// ── QUICK FILTER CHIPS ────────────────────────────────
function renderQuickFilter() {
  const strip = document.getElementById('quick-filter-strip');
  if (!strip) return;
  const cats = [{ id: 'all', label: 'Toutes', emoji: '✨' }, ...Object.values(allCats())];
  strip.innerHTML = cats.map(c =>
    `<button class="qf-chip${activeCat === c.id ? ' active' : ''}" onclick="setQuickCat('${c.id}')">${c.emoji} ${esc(c.label)}</button>`
  ).join('');
}
function setQuickCat(catId) {
  activeCat = catId;
  render();
}

// ── FAB ───────────────────────────────────────────────
function updateFab() {
  const fab = document.getElementById('fab-add');
  if (!fab) return;
  fab.classList.toggle('hidden', currentView !== 'recipes');
}

// ── SWIPE NAVIGATION + RETOUR ARRIÈRE ────────────────
function initSwipe() {
  const TAB_VIEWS = ['recipes', 'planner', 'todo', 'shop', 'settings'];
  let startX = 0, startY = 0, blocked = false;

  function isBlockedTarget(el) {
    return !!el.closest('.quick-filter-strip, .planner-scroll, .import-tabs, select, .recipe-grid, .recipe-card, .sidebar')
        || el.tagName === 'TEXTAREA'
        || (el.tagName === 'INPUT' && el.type !== 'checkbox')
        || el.tagName === 'BUTTON'
        || el.tagName === 'A';
  }

  function handleSwipe(dx, dy, minDist) {
    if (Math.abs(dx) < minDist || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    if (dx < 0) {
      const openModal = document.querySelector('.overlay.open');
      if (openModal) { openModal.classList.remove('open'); return; }
      if (currentView === 'maison') {
        if (activeRoomId) { activeRoomId = null; renderMaisonView(); }
        else switchView('settings');
        return;
      }
      if (currentView === 'todo' && activeTodoListId) {
        activeTodoListId = null; renderTodoView(); return;
      }
      const idx = TAB_VIEWS.indexOf(currentView);
      if (idx >= 0 && idx < TAB_VIEWS.length - 1) switchView(TAB_VIEWS[idx + 1]);
    } else {
      const openModal = document.querySelector('.overlay.open');
      if (openModal) return;
      if (currentView === 'maison' || (currentView === 'todo' && activeTodoListId)) return;
      const idx = TAB_VIEWS.indexOf(currentView);
      if (idx > 0) switchView(TAB_VIEWS[idx - 1]);
    }
  }

  // ── Touch (mobile) ────────────────────────────────────
  document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    blocked = isBlockedTarget(e.target);
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (blocked) return;
    handleSwipe(
      e.changedTouches[0].clientX - startX,
      e.changedTouches[0].clientY - startY,
      55
    );
  }, { passive: true });

  // ── Mouse drag (desktop) ─────────────────────────────
  let mouseDown = false;
  document.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    startX = e.clientX; startY = e.clientY;
    mouseDown = true;
    blocked = isBlockedTarget(e.target);
  });
  document.addEventListener('mouseup', e => {
    if (!mouseDown) return;
    mouseDown = false;
    if (blocked) return;
    handleSwipe(e.clientX - startX, e.clientY - startY, 120);
  });
  document.addEventListener('mouseleave', () => { mouseDown = false; });

  // ── Trackpad Mac (wheel horizontal) ──────────────────
  let wheelTimer = null;
  let wheelAccX = 0, wheelAccY = 0;
  document.addEventListener('wheel', e => {
    if (isBlockedTarget(e.target)) return;
    wheelAccX += e.deltaX;
    wheelAccY += e.deltaY;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      // Geste principalement horizontal et assez ample
      if (Math.abs(wheelAccX) > 80 && Math.abs(wheelAccX) > Math.abs(wheelAccY) * 1.5) {
        handleSwipe(-wheelAccX, -wheelAccY, 0); // deltaX positif = doigt vers gauche = vue suivante
      }
      wheelAccX = 0; wheelAccY = 0;
    }, 80);
  }, { passive: true });
}

// ── PULL-TO-REFRESH ───────────────────────────────────
let _ptrActive = false;
let _ptrStartY = 0;
let _ptrIndicator = null;

function resetPullToRefresh() {
  _ptrActive = false;
  if (_ptrIndicator) {
    _ptrIndicator.style.transition = 'none';
    _ptrIndicator.style.opacity = '0';
    _ptrIndicator.style.transform = 'translateX(-50%) translateY(0)';
    _ptrIndicator.classList.remove('spinning');
  }
}

function initPullToRefresh() {
  _ptrIndicator = document.getElementById('ptr-indicator');
  const main = document.getElementById('main');

  main.addEventListener('touchstart', e => {
    if (currentView === 'recipes' && main.scrollTop === 0) {
      _ptrStartY = e.touches[0].clientY;
      _ptrActive = true;
    } else {
      resetPullToRefresh();
    }
  }, { passive: true });

  main.addEventListener('touchmove', e => {
    if (!_ptrActive || currentView !== 'recipes') { resetPullToRefresh(); return; }
    const dy = Math.min(e.touches[0].clientY - _ptrStartY, 80);
    if (dy > 0) {
      _ptrIndicator.style.transform = `translateX(-50%) translateY(${dy + 40}px)`;
      _ptrIndicator.style.opacity = String(Math.min(dy / 60, 1));
    }
  }, { passive: true });

  main.addEventListener('touchend', e => {
    if (!_ptrActive || currentView !== 'recipes') { resetPullToRefresh(); return; }
    const dy = e.changedTouches[0].clientY - _ptrStartY;
    _ptrActive = false;
    _ptrIndicator.style.transition = 'transform .3s, opacity .3s';
    _ptrIndicator.style.transform = 'translateX(-50%) translateY(0)';
    _ptrIndicator.style.opacity = '0';
    setTimeout(() => { if (_ptrIndicator) _ptrIndicator.style.transition = ''; }, 300);
    if (dy > 60) {
      _ptrIndicator.classList.add('spinning');
      forceLoadFromCloud();
      setTimeout(() => _ptrIndicator.classList.remove('spinning'), 1200);
    }
  }, { passive: true });
}

// ── SETTINGS VIEW ─────────────────────────────────────
function initSettingsView() {
  const pinLabel = document.getElementById('pin-label');
  const pinDesc  = document.getElementById('pin-desc');
  const lockBtn  = document.getElementById('lock-btn');
  if (pinLabel) pinLabel.textContent = _pin ? 'Modifier le code PIN' : 'Définir un code PIN';
  if (pinDesc)  pinDesc.textContent  = _pin
    ? (_isUnlocked() ? '✅ PIN activé — édition déverrouillée cette session' : '🔒 PIN activé — lecture seule')
    : 'Aucun PIN — définir un code pour protéger l\'édition';
  if (lockBtn)  lockBtn.style.display = (_isUnlocked() && _pin) ? '' : 'none';

  const toggle = document.getElementById('notif-toggle');
  const desc   = document.getElementById('notif-desc');
  if (!toggle) return;
  const perm = Notification.permission;
  toggle.checked = perm === 'granted' && _notifEnabled;
  if (perm === 'denied') {
    desc.textContent = 'Notifications bloquées dans les réglages du navigateur';
    toggle.disabled = true;
  } else if (perm === 'granted' && toggle.checked) {
    desc.textContent = 'Activées — rappels planning et to-do';
  } else {
    desc.textContent = 'Rappels planning et to-do';
  }
}

function copyReadOnlyLink() {
  const token = getOrCreateShareToken();
  const url = location.origin + location.pathname + '?v=' + token;
  navigator.clipboard.writeText(url).then(() => {
    toast('✓ Lien copié ! Ce lien unique ne permet que la lecture.', 'success');
  }).catch(() => {
    prompt('Copiez ce lien de partage :', url);
  });
}

async function toggleNotifications(enabled) {
  const desc = document.getElementById('notif-desc');
  if (!enabled) {
    _notifEnabled = false;
    saveSettings();
    if (desc) desc.textContent = 'Rappels planning et to-do';
    return;
  }
  if (!('Notification' in window)) {
    toast('Les notifications ne sont pas supportées par ce navigateur', 'error');
    document.getElementById('notif-toggle').checked = false;
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    _notifEnabled = true;
    saveSettings();
    if (desc) desc.textContent = 'Activées — rappels planning et to-do';
    toast('✓ Notifications activées !', 'success');
  } else {
    _notifEnabled = false;
    saveSettings();
    document.getElementById('notif-toggle').checked = false;
    if (desc) desc.textContent = 'Notifications refusées dans le navigateur';
    toast('Autorisez les notifications dans les réglages du navigateur', 'error');
  }
}

// ── SIDEBAR MOBILE ────────────────────────────────────
function closeSidebarFn() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('visible');
}

function initMobileSidebar() {
  const toggle  = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
  }
  toggle.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebarFn() : openSidebar());
  overlay.addEventListener('click', closeSidebarFn);

  // Navigation mobile via sidebar
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.mobile-nav-item').forEach(i => i.classList.toggle('active', i === item));
      switchView(item.dataset.mobileView);
      closeSidebarFn();
    });
  });
}

// ── SIDEBAR EVENTS ────────────────────────────────────
function initSidebarEvents() {
  document.getElementById('rating-filter').addEventListener('click', e => {
    const btn = e.target.closest('.rf-btn');
    if (!btn) return;
    minRating = parseInt(btn.dataset.min);
    document.querySelectorAll('.rf-btn').forEach(b => b.classList.toggle('active', b === btn));
    render();
  });
  document.getElementById('manage-cats-btn').addEventListener('click', openCategoryManager);
}

// ── EXPORT ────────────────────────────────────────────
function forceSyncToCloud() {
  const real = recipes.filter(r => !String(r.id).startsWith('demo'));
  if (!real.length) {
    toast('Aucune recette à synchroniser', 'info');
    return;
  }
  if (!confirm(`Envoyer ${real.length} recettes vers Firebase ?\n\nCela remplacera les données existantes sur tous vos appareils.`)) return;
  toast(`Envoi de ${real.length} recettes…`, 'info');
  STORE.set({ recipes: stripForCloud(real), mealPlan, customCats })
    .then(() => {
      recipes = real;
      render(); renderSidebar();
      toast(`✓ ${real.length} recettes synchronisées !`);
    })
    .catch(e => {
      alert('Erreur Firebase : ' + e.message);
      toast('Erreur de synchronisation', 'error');
    });
}

function forceLoadFromCloud() {
  toast('Chargement depuis Firebase…', 'info');
  STORE.get().then(snap => {
    if (!snap.exists) { toast('Aucune donnée dans Firebase', 'error'); return; }
    const d = snap.data();
    const fbRecipes = d.recipes || [];
    if (!fbRecipes.length) { toast('Firebase est vide', 'error'); return; }
    if (!confirm(`Charger ${fbRecipes.length} recettes depuis Firebase ?\n\nVos recettes en mémoire (${recipes.length}) seront remplacées.`)) return;
    recipes = mergePhotos(fbRecipes);
    mealPlan = d.mealPlan || {};
    customCats = d.customCats || [];
    render(); renderSidebar(); renderTagCloud(); renderCatSelect();
    toast(`✓ ${fbRecipes.length} recettes chargées depuis Firebase !`);
    loadPhotosFromCloud();
  }).catch(e => {
    alert('Erreur Firebase : ' + e.message);
    toast('Erreur de connexion', 'error');
  });
}

function exportRecipes() {
  if (!recipes.length) { toast('Aucune recette à exporter', 'info'); return; }
  const json = JSON.stringify(recipes, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href     = url;
  a.download = `mes-recettes-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast(`${recipes.length} recettes exportées ✓`);
}

function importBackup(event) {
  const file = event.target.files[0];
  event.target.value = ''; // reset pour permettre de re-sélectionner le même fichier
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    let data;
    try { data = JSON.parse(e.target.result); } catch { toast('Fichier JSON invalide', 'error'); return; }
    const list = Array.isArray(data) ? data : [data];
    if (!list.length) { toast('Fichier vide', 'error'); return; }

    // Fusionner : on ajoute uniquement les recettes absentes (par ID)
    const existingIds = new Set(recipes.map(r => String(r.id)));
    let added = 0;
    list.forEach(r => {
      if (!r.name) return; // recette invalide
      if (existingIds.has(String(r.id))) return; // déjà présente
      // Supprimer les photos base64 (trop lourdes pour Firestore)
      const safe = { ...r };
      if (safe.photo && safe.photo.startsWith('data:')) delete safe.photo;
      recipes.push(safe);
      existingIds.add(String(safe.id));
      added++;
    });

    if (!added) {
      toast(`Toutes les recettes sont déjà présentes (${list.length})`, 'info');
      return;
    }
    save();
    render(); renderSidebar(); renderTagCloud();
    toast(`✓ ${added} recette${added > 1 ? 's' : ''} restaurée${added > 1 ? 's' : ''} dans le cloud`);
  };
  reader.readAsText(file);
}

// ── MENU "···" ────────────────────────────────────────
function toggleMoreMenu() {
  const m = document.getElementById('hbtn-more-menu');
  m.classList.toggle('open');
}
function closeMoreMenu() {
  document.getElementById('hbtn-more-menu')?.classList.remove('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#hbtn-more-wrap')) closeMoreMenu();
});
function openShop() { openShopping(); }

// ── LISTE DE COURSES PERSISTANTE (Firestore) ──────────
function saveShopItems() {
  _shopOwnWrite = true;
  SHOP_STORE.set({ items: shopItems, cart: [...cartSet] })
    .catch(() => { _shopOwnWrite = false; });
}
function saveCartSet() { saveShopItems(); }
function initShopAisleSelect() {
  const sel = document.getElementById('shop-add-aisle');
  if (!sel || sel.children.length > 1) return;
  AISLES.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.id; opt.textContent = `${a.emoji} ${a.label}`;
    sel.appendChild(opt);
  });
}
function renderShopView() {
  initShopAisleSelect();
  const el = document.getElementById('shop-items-list');
  if (!el) return;
  if (!shopItems.length) {
    el.innerHTML = '<p class="shop-empty">Votre liste est vide.<br>Ajoutez des articles ou générez depuis vos recettes.</p>';
    return;
  }
  // Grouper par rayon
  const groups = {};
  AISLES.forEach(a => { groups[a.id] = []; });
  shopItems.filter(x => !x.checked).forEach(x => {
    const k = groups[x.aisle] ? x.aisle : 'autre';
    groups[k].push(x);
  });
  const checked = shopItems.filter(x => x.checked);
  const renderItem = item => `
    <div class="shop-item-row${item.checked ? ' done' : ''}">
      <input type="checkbox" id="shi-${item.id}" ${item.checked ? 'checked' : ''}
             onchange="toggleShopItem('${item.id}')">
      <label for="shi-${item.id}">${esc(item.name)}</label>
      <button class="btn-remove-shop" onclick="removeShopItem('${item.id}')">✕</button>
    </div>`;
  let html = '';
  AISLES.forEach(a => {
    const list = groups[a.id];
    if (!list.length) return;
    html += `<div class="shop-aisle-section">
      <div class="shop-aisle-title">${a.emoji} ${a.label} <span class="shop-aisle-count">${list.length}</span></div>
      ${list.map(renderItem).join('')}
    </div>`;
  });
  if (checked.length) {
    html += `<div class="shop-done-sep">— ${checked.length} article${checked.length>1?'s':''} dans le panier —</div>`;
    html += checked.map(renderItem).join('');
  }
  el.innerHTML = html;
  const inp = document.getElementById('shop-add-input');
  if (inp && !inp._bound) {
    inp._bound = true;
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') addShopItem(); });
  }
}
function addShopItem() {
  const inp = document.getElementById('shop-add-input');
  const name = inp?.value.trim();
  if (!name) return;
  const selAisle = document.getElementById('shop-add-aisle')?.value;
  const aisle = (selAisle === 'auto' || !selAisle) ? guessAisle(name) : selAisle;
  shopItems.push({ id: String(Date.now()), name, aisle, checked: false });
  saveShopItems(); renderShopView();
  inp.value = ''; inp.focus();
}
function toggleShopItem(id) {
  const item = shopItems.find(x => x.id === id);
  if (item) { item.checked = !item.checked; saveShopItems(); renderShopView(); }
}
function removeShopItem(id) {
  shopItems = shopItems.filter(x => x.id !== id);
  saveShopItems(); renderShopView();
}
function deleteCheckedShopItems() {
  const nb = shopItems.filter(x => x.checked).length;
  if (!nb) { toast('Aucun article coché.', 'error'); return; }
  shopItems = shopItems.filter(x => !x.checked);
  saveShopItems(); renderShopView();
  toast(`${nb} article${nb > 1 ? 's' : ''} supprimé${nb > 1 ? 's' : ''}`);
}

// ── TO-DO MULTI-LISTES ────────────────────────────────
const TODO_STORE = db.collection('data').doc('todos');

// Listes prédéfinies créées au premier lancement
const DEFAULT_TODO_LISTS = [
  { id: 'general', name: 'Général', emoji: '✅', categories: [], items: [] },
  {
    id: 'weekend-enfant', name: 'Week-end enfant', emoji: '👶',
    categories: [
      { id: 'vetements', name: 'Vêtements', emoji: '👕' },
      { id: 'repas',     name: 'Repas',     emoji: '🚀' },
      { id: 'nuit',      name: 'Nuit',      emoji: '🧸' },
      { id: 'autre',     name: 'Autre',     emoji: '🐝' },
      { id: 'sortie',    name: 'Sortie',    emoji: '🛴' },
    ],
    items: [
      {id:'we-1',title:'Body',             category:'vetements',done:false,assignee:'nous',createdAt:1},
      {id:'we-2',title:'Pantalon',          category:'vetements',done:false,assignee:'nous',createdAt:2},
      {id:'we-3',title:'T-shirt',           category:'vetements',done:false,assignee:'nous',createdAt:3},
      {id:'we-4',title:'Pull',              category:'vetements',done:false,assignee:'nous',createdAt:4},
      {id:'we-5',title:'Chaussettes',       category:'vetements',done:false,assignee:'nous',createdAt:5},
      {id:'we-6',title:'Pijama',            category:'vetements',done:false,assignee:'nous',createdAt:6},
      {id:'we-7',title:'Gourdes remplissable',category:'repas',  done:false,assignee:'nous',createdAt:7},
      {id:'we-8',title:'Cuillère',          category:'repas',   done:false,assignee:'nous',createdAt:8},
      {id:'we-9',title:'Vitamine',          category:'repas',   done:false,assignee:'nous',createdAt:9},
      {id:'we-10',title:'Biberons',         category:'repas',   done:false,assignee:'nous',createdAt:10},
      {id:'we-11',title:'Pot',              category:'repas',   done:false,assignee:'nous',createdAt:11},
      {id:'we-12',title:'Gourdes eau',      category:'repas',   done:false,assignee:'nous',createdAt:12},
      {id:'we-13',title:'Lait',             category:'repas',   done:false,assignee:'nous',createdAt:13},
      {id:'we-14',title:'Bavoir tissu',     category:'repas',   done:false,assignee:'nous',createdAt:14},
      {id:'we-15',title:'Bavoir plastique', category:'repas',   done:false,assignee:'nous',createdAt:15},
      {id:'we-16',title:'Piou piou',        category:'nuit',    done:false,assignee:'nous',createdAt:16},
      {id:'we-17',title:'Chargeur caméra',  category:'nuit',    done:false,assignee:'nous',createdAt:17},
      {id:'we-18',title:'Tétine',           category:'nuit',    done:false,assignee:'nous',createdAt:18},
      {id:'we-19',title:'Turbulette',       category:'nuit',    done:false,assignee:'nous',createdAt:19},
      {id:'we-20',title:'Crème',            category:'nuit',    done:false,assignee:'nous',createdAt:20},
      {id:'we-21',title:'Lit parapluie',    category:'nuit',    done:false,assignee:'nous',createdAt:21},
      {id:'we-22',title:'Dolodent',         category:'nuit',    done:false,assignee:'nous',createdAt:22},
      {id:'we-23',title:'Doliprane',        category:'nuit',    done:false,assignee:'nous',createdAt:23},
      {id:'we-24',title:'Caméra',           category:'nuit',    done:false,assignee:'nous',createdAt:24},
      {id:'we-25',title:'Doudou',           category:'nuit',    done:false,assignee:'nous',createdAt:25},
      {id:'we-26',title:'Ventoline + masque',category:'autre',  done:false,assignee:'nous',createdAt:26},
      {id:'we-27',title:'Éponge',           category:'autre',   done:false,assignee:'nous',createdAt:27},
      {id:'we-28',title:'Savon',            category:'autre',   done:false,assignee:'nous',createdAt:28},
      {id:'we-29',title:'Serviette',        category:'autre',   done:false,assignee:'nous',createdAt:29},
      {id:'we-30',title:'Jouets',           category:'autre',   done:false,assignee:'nous',createdAt:30},
      {id:'we-31',title:'Coton',            category:'autre',   done:false,assignee:'nous',createdAt:31},
      {id:'we-32',title:'Couches',          category:'autre',   done:false,assignee:'nous',createdAt:32},
      {id:'we-33',title:'Crème solaire',    category:'sortie',  done:false,assignee:'nous',createdAt:33},
      {id:'we-34',title:'Bob',              category:'sortie',  done:false,assignee:'nous',createdAt:34},
      {id:'we-35',title:'Porte bébé/poussette',category:'sortie',done:false,assignee:'nous',createdAt:35},
      {id:'we-36',title:'Manteau',          category:'sortie',  done:false,assignee:'nous',createdAt:36},
      {id:'we-37',title:'Gant',             category:'sortie',  done:false,assignee:'nous',createdAt:37},
      {id:'we-38',title:'Chaussures',       category:'sortie',  done:false,assignee:'nous',createdAt:38},
      {id:'we-39',title:'Pantalon jaune',   category:'sortie',  done:false,assignee:'nous',createdAt:39},
      {id:'we-40',title:'Bonnet',           category:'sortie',  done:false,assignee:'nous',createdAt:40},
      {id:'we-41',title:'Lunettes de soleil',category:'sortie', done:false,assignee:'nous',createdAt:41},
      {id:'we-42',title:'Plaid',            category:'sortie',  done:false,assignee:'nous',createdAt:42},
    ]
  }
];

let todoLists        = [];   // [{ id, name, emoji, categories, items }]
let activeTodoListId = null; // null = vue liste des listes
let todoListFilter   = 'all';
let todoListAssignee = 'nous';
let collapsedCats    = {};   // { "listId_catId": true }

const ASSIGNEES = {
  li:   { label: 'Li',   emoji: '💜', color: '#8b5cf6' },
  lou:  { label: 'Lou',  emoji: '💙', color: '#3b82f6' },
  nous: { label: 'Nous', emoji: '🤝', color: '#10b981' },
};
// ── Persistance ───────────────────────────────────────
function loadTodoLists() {
  todoLists = DEFAULT_TODO_LISTS.map(l => ({ ...l, items: [...l.items] }));
}
function saveTodoLists() {
  TODO_STORE.set({ lists: todoLists, v: 2 }).catch(e => console.warn('todo sync:', e));
}
function initTodoSync() {
  TODO_STORE.onSnapshot(snap => {
    if (!snap.exists) return;
    const d = snap.data();
    if (d.v === 2 && d.lists) {
      const remoteTotal = d.lists.reduce((s, l) => s + l.items.length, 0);
      const localTotal  = todoLists.reduce((s, l) => s + l.items.length, 0);
      if (remoteTotal >= localTotal) {
        if (remoteTotal > localTotal && Notification.permission === 'granted' && _notifEnabled) {
          const localIds = new Set(todoLists.flatMap(l => l.items.map(i => i.id)));
          const newItems = d.lists.flatMap(l => l.items).filter(i => !localIds.has(i.id));
          newItems.forEach(i => {
            const listName = d.lists.find(l => l.items.some(x => x.id === i.id))?.name || 'To-do';
            new Notification(`${listName}`, { body: i.title, icon: 'icon-192.png' });
          });
        }
        todoLists = d.lists;
        if (currentView === 'todo') renderTodoView();
      }
    }
  }, () => {});
}

// ── Rendu ─────────────────────────────────────────────
function renderTodoView() {
  const container = document.getElementById('todo-container');
  if (!container) return;
  if (activeTodoListId) renderTodoListDetail(container);
  else renderTodoListsHome(container);
}

function renderTodoListsHome(container) {
  const totalPending = l => l.items.filter(i => !i.done).length;
  container.innerHTML = `
    <div class="todo-lists-header">
      <h2>To-do</h2>
    </div>
    <div class="todo-list-cards">
      ${todoLists.map(l => `
        <button class="todo-list-card" onclick="openTodoList('${l.id}')">
          <span class="todo-list-card-emoji">${l.emoji}</span>
          <span class="todo-list-card-info">
            <span class="todo-list-card-name">${esc(l.name)}</span>
            <span class="todo-list-card-count">${totalPending(l)} en cours · ${l.items.length} articles</span>
          </span>
          <span class="todo-list-card-arrow">›</span>
        </button>
      `).join('')}
    </div>
    <div class="todo-new-list-form">
      <input class="todo-emoji-input" id="new-list-emoji" type="text" placeholder="📝" maxlength="2" value="">
      <input id="new-list-name" type="text" placeholder="Nouvelle liste…" autocomplete="off">
      <button class="btn btn-primary btn-sm" onclick="addTodoList()">Créer</button>
    </div>`;
  const nameInp = container.querySelector('#new-list-name');
  if (nameInp) nameInp.addEventListener('keydown', e => { if (e.key === 'Enter') addTodoList(); });
}

function renderTodoListDetail(container) {
  const list = todoLists.find(l => l.id === activeTodoListId);
  if (!list) { activeTodoListId = null; renderTodoListsHome(container); return; }

  const hasCats = list.categories && list.categories.length > 0;
  const filteredItems = todoListFilter === 'all' ? list.items : list.items.filter(i => i.assignee === todoListFilter);

  const catOptions = hasCats
    ? list.categories.map(c => `<option value="${c.id}">${c.emoji} ${esc(c.name)}</option>`).join('')
    : '';

  container.innerHTML = `
    <div class="todo-detail-header">
      <button class="todo-back-btn" onclick="closeTodoList()">‹ To-do</button>
      <span class="todo-detail-title">${list.emoji} ${esc(list.name)}</span>
      ${hasCats ? `<button class="todo-reset-btn" onclick="resetTodoList('${list.id}')">Remettre à zéro</button>` : ''}
    </div>
    <div class="todo-filter-row">
      ${['all','nous','li','lou'].map(f => {
        const a = f === 'all' ? {emoji:'', label:'Tout'} : ASSIGNEES[f];
        return `<button class="todo-filter${todoListFilter===f?' active':''}" onclick="setTodoFilter('${f}')">${a.emoji} ${a.label}</button>`;
      }).join('')}
    </div>
    <div class="todo-add-form">
      <input id="todo-item-input" type="text" placeholder="Ajouter…" autocomplete="off">
      ${hasCats ? `<select id="todo-item-cat">${catOptions}</select>` : ''}
      <div class="todo-assignee-btns">
        ${Object.entries(ASSIGNEES).map(([k,a]) =>
          `<button class="todo-assign-btn${todoListAssignee===k?' active':''}" onclick="setTodoAssignee('${k}')">${a.emoji}</button>`
        ).join('')}
      </div>
      <input id="todo-item-due" type="date" class="todo-due-input" title="Échéance (optionnel)">
      <button class="btn btn-primary btn-sm" onclick="addTodoListItem()">+</button>
    </div>
    <div id="todo-items-container">
      ${hasCats ? renderCatSections(list, filteredItems) : renderFlatItems(list, filteredItems)}
    </div>`;

  const inp = container.querySelector('#todo-item-input');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') addTodoListItem(); });
}

function renderCatSections(list, items) {
  return list.categories.map(cat => {
    const catItems = items.filter(i => i.category === cat.id);
    const key = list.id + '_' + cat.id;
    const collapsed = collapsedCats[key] ? ' collapsed' : '';
    const doneCount = catItems.filter(i => i.done).length;
    return `
      <div class="todo-cat-section${collapsed}" id="cats-${key}">
        <div class="todo-cat-header" onclick="toggleCat('${key}')">
          <span class="todo-cat-header-left">
            ${cat.emoji} ${esc(cat.name)}
            <span class="todo-cat-count">${catItems.length - doneCount}/${catItems.length}</span>
          </span>
          <span class="todo-cat-chevron">▾</span>
        </div>
        <div class="todo-cat-items">
          ${catItems.length ? catItems.map(i => renderTaskHtml(list.id, i)).join('') : '<div style="padding:10px 14px;color:var(--text-3);font-size:13px">Vide</div>'}
        </div>
      </div>`;
  }).join('');
}

function renderFlatItems(list, items) {
  const undone = items.filter(i => !i.done);
  const done   = items.filter(i =>  i.done);
  if (!undone.length && !done.length) return '<p class="shop-empty">Aucune tâche.<br>Ajoutez-en une ci-dessus !</p>';
  return `<div class="todo-tasks-flat">
    ${undone.map(i => renderTaskHtml(list.id, i)).join('')}
    ${done.length ? `<div class="todo-done-sep">— ${done.length} terminée${done.length>1?'s':''} —</div>` + done.map(i => renderTaskHtml(list.id, i)).join('') : ''}
  </div>`;
}

function renderTaskHtml(listId, item) {
  const a = ASSIGNEES[item.assignee] || ASSIGNEES.nous;
  let dueBadge = '';
  if (item.dueDate && !item.done) {
    const due = new Date(item.dueDate);
    const today = new Date(); today.setHours(0,0,0,0);
    const isOverdue = due < today;
    const isSoon = !isOverdue && (due - today) <= 2 * 86400000;
    const label = due.toLocaleDateString('fr-FR', { day:'numeric', month:'short' });
    dueBadge = `<span class="todo-due${isOverdue?' overdue':isSoon?' soon':''}">${isOverdue ? '⚠️ ' : '📅 '}${label}</span>`;
  }
  return `<div class="todo-task${item.done ? ' done' : ''}" style="--task-color:${a.color}">
    <input type="checkbox" id="ti-${item.id}" ${item.done ? 'checked' : ''} onchange="toggleTodoListItem('${listId}','${item.id}')">
    <label for="ti-${item.id}">${esc(item.title)}${dueBadge}</label>
    <button class="todo-task-del" onclick="removeTodoListItem('${listId}','${item.id}')">✕</button>
  </div>`;
}

// ── Actions ───────────────────────────────────────────
function openTodoList(id) { history.pushState({ view: 'todo', roomId: null, todoId: id }, '', ''); activeTodoListId = id; renderTodoView(); }
function closeTodoList()  { activeTodoListId = null; renderTodoView(); }

function setTodoFilter(f)   { todoListFilter = f;   renderTodoView(); }
function setTodoAssignee(a) { todoListAssignee = a; renderTodoView(); }

function toggleCat(key) {
  collapsedCats[key] = !collapsedCats[key];
  const el = document.getElementById('cats-' + key);
  if (el) el.classList.toggle('collapsed', !!collapsedCats[key]);
}

function addTodoList() {
  const nameInp  = document.getElementById('new-list-name');
  const emojiInp = document.getElementById('new-list-emoji');
  const name = nameInp?.value.trim();
  if (!name) return;
  const emoji = emojiInp?.value.trim() || '📝';
  todoLists.push({ id: 'list-' + Date.now(), name, emoji, categories: [], items: [] });
  saveTodoLists(); renderTodoView();
}

function addTodoListItem() {
  const inp   = document.getElementById('todo-item-input');
  const title = inp?.value.trim();
  if (!title) return;
  const list = todoLists.find(l => l.id === activeTodoListId);
  if (!list) return;
  const catEl = document.getElementById('todo-item-cat');
  const category = catEl?.value || '';
  const dueEl = document.getElementById('todo-item-due');
  const dueDate = dueEl?.value || null; // 'YYYY-MM-DD' ou null
  list.items.unshift({ id: String(Date.now()), title, category, assignee: todoListAssignee, done: false, createdAt: Date.now(), dueDate });
  saveTodoLists(); renderTodoView();
  document.getElementById('todo-item-input')?.focus();
}

function toggleTodoListItem(listId, itemId) {
  const list = todoLists.find(l => l.id === listId);
  const item = list?.items.find(i => i.id === itemId);
  if (item) { item.done = !item.done; saveTodoLists(); }
}

function removeTodoListItem(listId, itemId) {
  const list = todoLists.find(l => l.id === listId);
  if (list) { list.items = list.items.filter(i => i.id !== itemId); saveTodoLists(); renderTodoView(); }
}

function resetTodoList(listId) {
  const list = todoLists.find(l => l.id === listId);
  if (!list) return;
  if (!confirm(`Remettre à zéro "${list.name}" ? Toutes les cases seront décochées.`)) return;
  list.items.forEach(i => { i.done = false; });
  saveTodoLists(); renderTodoView();
}

function initTodoUI() { /* géré dynamiquement */ }

// ── DATE DERNIÈRE RECETTE IMPORTÉE ────────────────────
function renderLastImportDate() {
  const el = document.getElementById('last-import-date');
  if (!el || !recipes.length) return;
  const dates = recipes.map(r => r.dateAdded || r.updatedAt).filter(Boolean).map(d => new Date(d));
  const last = new Date(Math.max(...dates));
  if (isNaN(last)) return;
  el.textContent = `Dernière import : ${last.toLocaleDateString('fr-FR')} ${last.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}`;
}

// ── BUTTONS GLOBAUX ───────────────────────────────────
function initButtons() {
  document.getElementById('import-btn').addEventListener('click', openImport);
  document.getElementById('mobile-import-btn')?.addEventListener('click', () => { closeSidebarFn(); openImport(); });
  document.getElementById('mobile-export-btn')?.addEventListener('click', () => { closeSidebarFn(); exportRecipes(); });
  renderLastImportDate();

  document.querySelectorAll('.overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const open = [...document.querySelectorAll('.overlay.open')];
      if (open.length) open[open.length - 1].classList.remove('open');
    }
  });
}

// ── DÉMO ──────────────────────────────────────────────
function loadDemo() {
  if (recipes.length > 0) return;
  recipes = [
    {
      id: 'demo1', name: 'Fondant au chocolat', category: 'dessert',
      prepTime: 15, cookTime: 12, portions: '6', rating: 5,
      tags: ['facile', 'rapide'], photo: '',
      source: { type: 'url', ref: 'https://www.marmiton.org' },
      ingredients: [
        { qty:'200', unit:'g',  name:'Chocolat noir',  aisle:'epicerie-sucree' },
        { qty:'100', unit:'g',  name:'Beurre',         aisle:'frais'           },
        { qty:'3',   unit:'',   name:'Œufs',           aisle:'frais'           },
        { qty:'100', unit:'g',  name:'Sucre',          aisle:'epicerie-sucree' },
        { qty:'50',  unit:'g',  name:'Farine',         aisle:'epicerie-salee'  },
      ],
      instructions: '1. Faire fondre le chocolat et le beurre au bain-marie.\n2. Battre les œufs avec le sucre jusqu\'à blanchir.\n3. Incorporer le mélange chocolaté, puis la farine.\n4. Verser dans un moule beurré. Cuire 12 min à 180 °C.\n5. Sortir quand le cœur tremble encore.',
      notes: 'Peut se préparer la veille. Servir avec une crème anglaise.',
      dateAdded: new Date().toISOString(),
    },
    {
      id: 'demo2', name: 'Mini quiches apéro', category: 'apero',
      prepTime: 20, cookTime: 20, portions: '24', rating: 4,
      tags: ['batch cooking', 'à congeler'], photo: '',
      source: { type: 'instagram', ref: 'https://instagram.com' },
      ingredients: [
        { qty:'1',   unit:'rouleau', name:'Pâte brisée',   aisle:'boulangerie'      },
        { qty:'3',   unit:'',        name:'Œufs',           aisle:'frais'            },
        { qty:'20',  unit:'cl',      name:'Crème liquide',  aisle:'frais'            },
        { qty:'100', unit:'g',       name:'Lardons',        aisle:'viandes-poissons' },
        { qty:'80',  unit:'g',       name:'Gruyère râpé',   aisle:'frais'            },
      ],
      instructions: '1. Préchauffer le four à 180 °C.\n2. Découper des cercles dans la pâte, foncer les moules.\n3. Battre œufs + crème. Saler, poivrer.\n4. Répartir lardons et gruyère. Verser l\'appareil.\n5. Cuire 20 min jusqu\'à dorure.',
      notes: 'Se congèlent très bien. Réchauffer 5 min au four à 160 °C.',
      dateAdded: new Date().toISOString(),
    },
    {
      id: 'demo3', name: 'Pancakes moelleux', category: 'gouter-enfant',
      prepTime: 10, cookTime: 15, portions: '12', rating: 5,
      tags: ['enfants', 'rapide'], photo: '',
      source: { type: 'livre', ref: 'Les recettes de Mamie' },
      ingredients: [
        { qty:'200', unit:'g',     name:'Farine',          aisle:'epicerie-salee'  },
        { qty:'2',   unit:'c.à.c', name:'Levure chimique', aisle:'epicerie-sucree' },
        { qty:'2',   unit:'',      name:'Œufs',            aisle:'frais'           },
        { qty:'25',  unit:'cl',    name:'Lait',            aisle:'frais'           },
        { qty:'2',   unit:'c.à.s', name:'Sucre',           aisle:'epicerie-sucree' },
        { qty:'30',  unit:'g',     name:'Beurre fondu',    aisle:'frais'           },
      ],
      instructions: '1. Mélanger farine, levure, sucre.\n2. Ajouter œufs battus, lait, beurre fondu.\n3. Laisser reposer 10 min.\n4. Cuire des petits tas dans une poêle beurrée, 2 min par face.',
      notes: 'Accompagner de sirop d\'érable ou de nutella.',
      dateAdded: new Date().toISOString(),
    },
  ];
  save();
}

// ── HOME (BUREAU) ─────────────────────────────────────
function renderHomeView() {
  const container = document.getElementById('home-container');
  if (!container) return;
  const homePhoto = _homePhoto;
  const recipeCount = recipes.length;
  const pendingTodo = todoLists.reduce((s,l) => s + l.items.filter(i => !i.done).length, 0);
  container.innerHTML = `
    <div class="home-hero" id="home-hero" style="${homePhoto ? `background-image:url('${homePhoto}')` : ''}">
      <div class="home-hero-overlay">
        <h1 class="home-title">🍪 Mes Recettes</h1>
        <p class="home-subtitle">Bonne cuisine, bien organisée</p>
      </div>
      <label class="home-hero-change-btn" title="Changer la photo de fond">
        📷
        <input type="file" accept="image/*" style="display:none" onchange="changeHomePhoto(event)">
      </label>
    </div>
    <div class="home-cards">
      <button class="home-card" onclick="switchView('recipes')">
        <span class="home-card-icon">🍽️</span>
        <span class="home-card-label">Recettes</span>
        <span class="home-card-sub">${recipeCount} recette${recipeCount > 1 ? 's' : ''}</span>
      </button>
      <button class="home-card" onclick="switchView('planner')">
        <span class="home-card-icon">📅</span>
        <span class="home-card-label">Planning</span>
        <span class="home-card-sub">Semaine en cours</span>
      </button>
      <button class="home-card" onclick="switchView('todo')">
        <span class="home-card-icon">✅</span>
        <span class="home-card-label">To-do</span>
        <span class="home-card-sub">${pendingTodo} tâche${pendingTodo > 1 ? 's' : ''} en cours</span>
      </button>
      <button class="home-card" onclick="switchView('shop')">
        <span class="home-card-icon">🛒</span>
        <span class="home-card-label">Courses</span>
        <span class="home-card-sub">Liste de courses</span>
      </button>
      <button class="home-card" onclick="switchView('maison')">
        <span class="home-card-icon">🏡</span>
        <span class="home-card-label">Maison</span>
        <span class="home-card-sub">Inventaire</span>
      </button>
      <button class="home-card" onclick="switchView('settings')">
        <span class="home-card-icon">⚙️</span>
        <span class="home-card-label">Réglages</span>
        <span class="home-card-sub">Paramètres</span>
      </button>
    </div>
  `;
}

async function changeHomePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  toast('⏳ Upload…');
  try {
    const url = await uploadToCloudinary(file);
    _homePhoto = url;
    saveSettings();
    renderHomeView();
    toast('✓ Photo mise à jour !', 'success');
  } catch(e) {
    toast('Erreur upload : ' + e.message, 'error');
  }
}

// ── MAISON SECONDAIRE ─────────────────────────────────
const MAISON_STORE = db.collection('data').doc('maison');

const DEFAULT_ROOMS = [
  { id: 'chambre-enfants',  name: 'Chambre enfants',         emoji: '🧒' },
  { id: 'sdb-enfants',      name: 'Salle de bain enfants',   emoji: '🛁' },
  { id: 'chambre-parents',  name: 'Chambre parents',         emoji: '🛏️' },
  { id: 'sdb-parents',      name: 'Salle de bain parents',   emoji: '🚿' },
  { id: 'cuisine',          name: 'Cuisine',                 emoji: '🍳' },
];

let maisonRooms     = null;  // [{ id, name, emoji, photo, notes }]
let maisonLoaded    = false;

// IDs de toutes les anciennes versions de pièces par défaut (à remplacer)
const OLD_DEFAULT_IDS = new Set([
  'chambre', 'garde-manger', 'garde-robe', 'salle-bain', 'salon',
  'chambre-enfant', 'sdb-enfant', 'chambre-parents', 'sdb-parents', 'cuisine',
  'chambre-enfants', 'sdb-enfants'
]);
const NEW_DEFAULT_IDS = new Set(DEFAULT_ROOMS.map(r => r.id));

function migrateMaisonRooms(rooms) {
  // 1. Migration format photo : string → array
  rooms = rooms.map(r => ({
    ...r,
    photos: r.photos || (r.photo ? [{ url: r.photo, date: r.photoDate || Date.now() }] : [])
  }));

  // 2. Migration des pièces par défaut : garder uniquement les nouvelles IDs + les custom (room-*)
  const customRooms = rooms.filter(r => r.id.startsWith('room-'));
  const existingById = Object.fromEntries(rooms.map(r => [r.id, r]));

  // Construire la liste finale : nouvelles pièces par défaut (avec data existante si dispo) + custom
  const newRooms = DEFAULT_ROOMS.map(def => ({
    ...def,
    photos: existingById[def.id]?.photos || [],
    notes:  existingById[def.id]?.notes  || ''
  }));

  const changed = JSON.stringify(newRooms.map(r=>r.id)) !== JSON.stringify(rooms.filter(r=>!r.id.startsWith('room-')).map(r=>r.id))
               || rooms.some(r => !r.photos);

  return { rooms: [...newRooms, ...customRooms], changed };
}

function loadMaison() {
  MAISON_STORE.get().then(snap => {
    if (snap.exists) {
      const d = snap.data();
      const { rooms, changed } = migrateMaisonRooms(d.rooms || []);
      maisonRooms = rooms;
      if (changed) saveMaison(); // réécrire Firebase avec les nouvelles pièces
    } else {
      maisonRooms = DEFAULT_ROOMS.map(r => ({ ...r, photos: [], notes: '' }));
      saveMaison();
    }
    maisonLoaded = true;
    if (currentView === 'maison') renderMaisonView();
  }).catch(() => {
    maisonRooms = DEFAULT_ROOMS.map(r => ({ ...r, photos: [], notes: '' }));
    maisonLoaded = true;
    if (currentView === 'maison') renderMaisonView();
  });
}

function saveMaison() {
  if (!maisonRooms) return;
  MAISON_STORE.set({ rooms: maisonRooms, updatedAt: Date.now() })
    .catch(e => console.warn('maison save:', e));
}

let activeRoomId = null;  // null = liste des pièces, sinon id pièce

function renderMaisonView() {
  const container = document.getElementById('maison-container');
  if (!container) return;
  if (!maisonLoaded) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-3)">Chargement…</div>';
    loadMaison();
    return;
  }
  if (activeRoomId) renderMaisonRoomDetail(container);
  else renderMaisonHome(container);
}

function renderMaisonHome(container) {
  container.innerHTML = `
    <div class="maison-topbar">
      <button class="back-btn" onclick="switchView('settings')">‹ Réglages</button>
      <h2>Maison secondaire</h2>
    </div>
    <div class="maison-rooms">
      ${maisonRooms.map(r => {
        const thumb = r.photos && r.photos.length ? r.photos[r.photos.length - 1].url : null;
        return `
        <button class="maison-room-card" onclick="openMaisonRoom('${r.id}')">
          ${thumb
            ? `<img class="maison-room-thumb" src="${thumb}" alt="${r.name}" loading="lazy">`
            : `<div class="maison-room-placeholder">${r.emoji}</div>`
          }
          <div class="maison-room-info">
            <span class="maison-room-name">${r.emoji} ${r.name}</span>
            ${r.photos && r.photos.length
              ? `<span class="maison-room-preview">${r.photos.length} photo${r.photos.length > 1 ? 's' : ''} · ${new Date(r.photos[r.photos.length-1].date).toLocaleDateString('fr-FR')}</span>`
              : (r.notes ? `<span class="maison-room-preview">${r.notes.split('\n')[0].slice(0, 50)}</span>` : '<span class="maison-room-preview" style="color:var(--text-3)">Aucune photo</span>')
            }
          </div>
          <span style="color:var(--text-3);font-size:18px">›</span>
        </button>`;
      }).join('')}
      <button class="maison-add-room" onclick="addMaisonRoom()">
        <span style="font-size:22px">＋</span>
        <span>Ajouter une pièce</span>
      </button>
    </div>
  `;
}

function renderMaisonRoomDetail(container) {
  const room = maisonRooms.find(r => r.id === activeRoomId);
  if (!room) { activeRoomId = null; renderMaisonHome(container); return; }
  const photos = room.photos || [];
  container.innerHTML = `
    <div class="maison-topbar">
      <button class="back-btn" onclick="activeRoomId=null;renderMaisonView()">‹ Maison</button>
      <h2>${room.emoji} ${room.name}</h2>
      <button class="maison-delete-btn" onclick="deleteMaisonRoom('${room.id}')" title="Supprimer">🗑️</button>
    </div>
    <div class="maison-room-detail">

      <!-- Zone photos -->
      <div class="maison-photos-section">
        <div class="maison-photos-label">📷 Photos (${photos.length})</div>
        <div class="maison-photos-grid" id="maison-photos-grid-${room.id}">
          ${photos.length
            ? photos.map((p, i) => `
              <div class="maison-photo-item">
                <img src="${p.url}" loading="lazy" style="transform:rotate(${(p.rotation||0)}deg)" onclick="openMaisonPhotoFull('${p.url}',${(p.rotation||0)})">
                <div class="maison-photo-item-date">${new Date(p.date).toLocaleDateString('fr-FR')}</div>
                <div class="maison-photo-actions">
                  <button class="maison-photo-rotate" onclick="rotateMaisonPhoto('${room.id}',${i},-90)" title="Tourner gauche">↺</button>
                  <button class="maison-photo-rotate" onclick="rotateMaisonPhoto('${room.id}',${i},90)" title="Tourner droite">↻</button>
                  <button class="maison-photo-del" onclick="deleteMaisonPhoto('${room.id}',${i})" title="Supprimer">✕</button>
                </div>
              </div>`).join('')
            : `<div class="maison-photos-empty">${room.emoji}<br>Pas encore de photo</div>`
          }
        </div>
        <button type="button" class="maison-photo-btn" onclick="document.getElementById('maison-file-${room.id}').click()">
          📷 Ajouter une photo
        </button>
        <input type="file" id="maison-file-${room.id}" accept="image/*" style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none" onchange="uploadMaisonPhoto(event,'${room.id}')">
      </div>

      <!-- Notes / inventaire -->
      <div class="maison-notes-section">
        <div class="maison-notes-label">📝 Inventaire / notes</div>
        <textarea class="maison-notes-input" id="maison-notes-${room.id}" placeholder="Ex:\n- Pyjamas été (x2)\n- Pull marine\n- Riz, pâtes, boîtes de thon\n…">${room.notes || ''}</textarea>
        <button class="maison-save-notes-btn" onclick="saveMaisonNotes('${room.id}')">✓ Enregistrer</button>
      </div>
    </div>
  `;
  const ta = document.getElementById(`maison-notes-${room.id}`);
  if (ta) ta.addEventListener('blur', () => saveMaisonNotes(room.id));
}

function openMaisonPhotoFull(url, rotation) {
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
  ov.innerHTML = `<img src="${url}" style="max-width:95vw;max-height:95vh;border-radius:8px;object-fit:contain;transform:rotate(${rotation||0}deg)">`;
  ov.onclick = () => document.body.removeChild(ov);
  document.body.appendChild(ov);
}

function rotateMaisonPhoto(roomId, index, deg) {
  const room = maisonRooms.find(r => r.id === roomId);
  if (!room || !room.photos[index]) return;
  room.photos[index].rotation = ((room.photos[index].rotation || 0) + deg + 360) % 360;
  saveMaison();
  // Mise à jour visuelle immédiate sans re-render complet
  const img = document.querySelector(`#maison-photos-grid-${roomId} .maison-photo-item:nth-child(${index+1}) img`);
  if (img) img.style.transform = `rotate(${room.photos[index].rotation}deg)`;
}

function openMaisonRoom(roomId) {
  history.pushState({ view: 'maison', roomId, todoId: null }, '', '');
  activeRoomId = roomId;
  renderMaisonView();
}

async function uploadMaisonPhoto(event, roomId) {
  const file = event.target.files[0];
  if (!file) return;
  const room = maisonRooms.find(r => r.id === roomId);
  if (!room) return;
  toast('⏳ Upload en cours…');
  try {
    const url = await uploadToCloudinary(file);
    if (!room.photos) room.photos = [];
    room.photos.push({ url, date: Date.now() });
    saveMaison();
    renderMaisonView();
    toast('✓ Photo ajoutée !', 'success');
  } catch(e) {
    toast('Erreur upload : ' + e.message, 'error');
  }
}

function deleteMaisonPhoto(roomId, index) {
  const room = maisonRooms.find(r => r.id === roomId);
  if (!room || !room.photos) return;
  if (!confirm('Supprimer cette photo ?')) return;
  room.photos.splice(index, 1);
  saveMaison();
  renderMaisonView();
}

function saveMaisonNotes(roomId) {
  const room = maisonRooms.find(r => r.id === roomId);
  if (!room) return;
  const ta = document.getElementById(`maison-notes-${roomId}`);
  if (ta) room.notes = ta.value;
  saveMaison();
  toast('✓ Notes enregistrées', 'success');
}

function deleteMaisonRoom(roomId) {
  if (!confirm('Supprimer cette pièce ?')) return;
  maisonRooms = maisonRooms.filter(r => r.id !== roomId);
  activeRoomId = null;
  saveMaison();
  renderMaisonView();
}

function addMaisonRoom() {
  const name = prompt('Nom de la pièce :');
  if (!name || !name.trim()) return;
  const emoji = prompt('Emoji (optionnel) :', '🏠') || '🏠';
  const id = 'room-' + Date.now();
  maisonRooms.push({ id, name: name.trim(), emoji: emoji.trim(), photo: '', notes: '' });
  saveMaison();
  renderMaisonView();
}

// ── HISTORIQUE NAVIGATEUR ─────────────────────────────
window.addEventListener('popstate', e => {
  const state = e.state;
  if (!state) { switchView('recipes', false); return; }
  activeRoomId     = state.roomId || null;
  activeTodoListId = state.todoId  || null;
  switchView(state.view, false);
});

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  history.replaceState({ view: 'recipes', roomId: null, todoId: null }, '', '');
  load();
  loadDemo();
  initSearch();
  initNav();
  initBottomNav();
  initSwipe();
  initPullToRefresh();
  initSidebarEvents();
  initMobileSidebar();
  initButtons();
  initStarPicker();
  initTagInput();
  initPhotoInputs();
  initImportTabs();
  initTodoUI();
  renderCatSelect();
  loadMaison();
  render();
});

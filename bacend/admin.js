const backofficeStorageKey = 'zmiLmsBackoffice';
const backofficeSessionKey = 'zmiLmsBackofficeAuth';

const defaultBackoffice = {
  adminUsers: [
    { username: 'admin', password: '1234', role: 'admin' }
  ],
  heroTitle: 'Satu Dashboard untuk Seluruh Kebutuhan Mengajar',
  heroSubtitle: 'ZMI LMS memfasilitasi Guru dalam pengelolaan RPP, materi interaktif, ujian otomatis, hingga rekap nilai dalam satu ekosistem digital yang efisien.',
  featuresTitle: 'Ekosistem Pengajaran Digital Terpadu',
  featuresDescription: 'Kelola seluruh administrasi dan kegiatan belajar mengajar Bapak/Ibu Guru melalui satu pintu. Terintegrasi mulai dari perencanaan hingga pelaporan hasil belajar.',
  contactHeading: 'Butuh Demonstrasi Untuk Sekolah?',
  contactText: 'Tim support ZMI Development siap membantu Bapak/Ibu Guru untuk melakukan integrasi kurikulum ke dalam sistem LMS kami secara mendalam.',
  featureCards: [
    { title: 'Manajemen Topik & Materi', description: 'Unggah modul PDF, video, dan buat struktur bab pembelajaran yang sistematis.' },
    { title: 'Evaluasi Tugas & Ujian', description: 'Buat bank soal kuis dan kelola pengumpulan tugas siswa dengan penilaian otomatis.' },
    { title: 'Pengaturan Jadwal Belajar', description: 'Atur jadwal pertemuan kelas daring dan sinkronisasi tenggat waktu kegiatan akademik.' },
    { title: 'Rekap Nilai & Laporan', description: 'Pantau progres nilai siswa dan ekspor laporan hasil belajar secara instan.' }
  ],
  seoTitle: 'Learning Management System | ZMI LMS',
  seoDescription: 'ZMI LMS adalah ekosistem manajemen pembelajaran untuk guru dan sekolah yang menyediakan RPP, materi digital, ujian, dan laporan nilai.',
  socialLinks: {
    facebook: 'https://www.facebook.com/Zen-Multimedia-Indonesia',
    instagram: 'https://www.instagram.com/zenmultimediaindonesia',
    youtube: 'https://www.youtube.com/@zenmultimediaindonesia7712',
    whatsapp: 'https://wa.me/6285121045798'
  },
  images: {
    logo: '../asset/Copilot_20260406_103147.png',
    heroImage: '../asset/Copilot_20260401_082512.png',
    bannerImage: '../asset/Copilot_20260401_082512.png'
  },
  leads: []
};

function getBackofficeSettings() {
  const saved = localStorage.getItem(backofficeStorageKey);
  if (!saved) {
    localStorage.setItem(backofficeStorageKey, JSON.stringify(defaultBackoffice));
    return JSON.parse(JSON.stringify(defaultBackoffice));
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    localStorage.setItem(backofficeStorageKey, JSON.stringify(defaultBackoffice));
    return JSON.parse(JSON.stringify(defaultBackoffice));
  }
}

function saveBackofficeSettings(settings) {
  localStorage.setItem(backofficeStorageKey, JSON.stringify(settings));
}

function getAuthState() {
  return localStorage.getItem(backofficeSessionKey) === 'true';
}

function setAuthState(value) {
  localStorage.setItem(backofficeSessionKey, value ? 'true' : 'false');
}

function showPanel(panel) {
  document.querySelectorAll('.panel').forEach((article) => {
    article.classList.toggle('hidden', article.dataset.panel !== panel);
  });
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('bg-slate-100', btn.dataset.tab === panel);
    btn.classList.toggle('bg-white', btn.dataset.tab !== panel);
  });
}

function renderUserList(settings) {
  const container = document.getElementById('user-list');
  container.innerHTML = '';
  settings.adminUsers.forEach((user, index) => {
    const card = document.createElement('div');
    card.className = 'rounded-3xl border border-slate-200 p-4 flex items-center justify-between gap-4';
    card.innerHTML = `
      <div>
        <div class="font-semibold">${user.username}</div>
        <div class="text-sm text-slate-500">Role: ${user.role}</div>
      </div>
      <button data-index="${index}" class="remove-user-btn bg-red-500 text-white rounded-2xl px-4 py-2 hover:bg-red-600 transition">Hapus</button>
    `;
    container.appendChild(card);
  });
  container.querySelectorAll('.remove-user-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const settings = getBackofficeSettings();
      settings.adminUsers.splice(Number(button.dataset.index), 1);
      saveBackofficeSettings(settings);
      renderUserList(settings);
    });
  });
}

function renderLeads() {
  const settings = getBackofficeSettings();
  const container = document.getElementById('leads-table');
  if (!settings.leads.length) {
    container.innerHTML = '<div class="text-slate-500">Belum ada leads yang masuk.</div>';
    return;
  }
  const table = document.createElement('table');
  table.className = 'min-w-full divide-y divide-slate-200';
  table.innerHTML = `
    <thead class="bg-slate-50">
      <tr>
        <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700">Waktu</th>
        <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nama</th>
        <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
        <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700">Pesan</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200"></tbody>
  `;
  const tbody = table.querySelector('tbody');
  settings.leads.slice().reverse().forEach((lead) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-4 py-3 text-sm text-slate-600">${new Date(lead.createdAt).toLocaleString()}</td>
      <td class="px-4 py-3 text-sm text-slate-600">${lead.name}</td>
      <td class="px-4 py-3 text-sm text-slate-600">${lead.email}</td>
      <td class="px-4 py-3 text-sm text-slate-600">${lead.message}</td>
    `;
    tbody.appendChild(row);
  });
  container.innerHTML = '';
  container.appendChild(table);
}

function setInputValues(settings) {
  document.getElementById('hero-title-input').value = settings.heroTitle;
  document.getElementById('hero-subtitle-input').value = settings.heroSubtitle;
  document.getElementById('features-title-input').value = settings.featuresTitle;
  document.getElementById('features-description-input').value = settings.featuresDescription;
  document.getElementById('contact-heading-input').value = settings.contactHeading;
  document.getElementById('contact-text-input').value = settings.contactText;
  settings.featureCards.forEach((card, index) => {
    const titleInput = document.getElementById(`feature-${index + 1}-title`);
    const descInput = document.getElementById(`feature-${index + 1}-desc`);
    if (titleInput) titleInput.value = card.title;
    if (descInput) descInput.value = card.description;
  });
  document.getElementById('seo-title-input').value = settings.seoTitle;
  document.getElementById('seo-description-input').value = settings.seoDescription;
  document.getElementById('social-facebook-input').value = settings.socialLinks.facebook;
  document.getElementById('social-instagram-input').value = settings.socialLinks.instagram;
  document.getElementById('social-youtube-input').value = settings.socialLinks.youtube;
  document.getElementById('social-whatsapp-input').value = settings.socialLinks.whatsapp;
  document.getElementById('logo-preview').src = settings.images.logo;
  document.getElementById('hero-image-preview').src = settings.images.heroImage;
  document.getElementById('banner-preview').src = settings.images.bannerImage;
}

function handleFileUpload(inputId, previewId, imageKey) {
  const input = document.getElementById(inputId);
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const settings = getBackofficeSettings();
      settings.images[imageKey] = event.target.result;
      saveBackofficeSettings(settings);
      document.getElementById(previewId).src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function loginAdmin(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const settings = getBackofficeSettings();
  const user = settings.adminUsers.find((item) => item.username === username && item.password === password);
  if (user) {
    setAuthState(true);
    showAdminDashboard();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
  }
}

function showAdminDashboard() {
  document.getElementById('login-card').classList.add('hidden');
  document.getElementById('admin-dashboard').classList.remove('hidden');
  document.getElementById('logout-btn').classList.remove('hidden');
  showPanel('content');
  const settings = getBackofficeSettings();
  setInputValues(settings);
  renderUserList(settings);
  renderLeads();
}

function logoutAdmin() {
  setAuthState(false);
  document.getElementById('admin-dashboard').classList.add('hidden');
  document.getElementById('login-card').classList.remove('hidden');
  document.getElementById('logout-btn').classList.add('hidden');
}

function attachTabListeners() {
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click', () => showPanel(button.dataset.tab));
  });
}

function attachSaveListener() {
  document.getElementById('save-settings').addEventListener('click', () => {
    const settings = getBackofficeSettings();
    settings.heroTitle = document.getElementById('hero-title-input').value;
    settings.heroSubtitle = document.getElementById('hero-subtitle-input').value;
    settings.featuresTitle = document.getElementById('features-title-input').value;
    settings.featuresDescription = document.getElementById('features-description-input').value;
    settings.contactHeading = document.getElementById('contact-heading-input').value;
    settings.contactText = document.getElementById('contact-text-input').value;
    settings.featureCards = [
      { title: document.getElementById('feature-1-title').value, description: document.getElementById('feature-1-desc').value },
      { title: document.getElementById('feature-2-title').value, description: document.getElementById('feature-2-desc').value },
      { title: document.getElementById('feature-3-title').value, description: document.getElementById('feature-3-desc').value },
      { title: document.getElementById('feature-4-title').value, description: document.getElementById('feature-4-desc').value }
    ];
    settings.seoTitle = document.getElementById('seo-title-input').value;
    settings.seoDescription = document.getElementById('seo-description-input').value;
    settings.socialLinks.facebook = document.getElementById('social-facebook-input').value;
    settings.socialLinks.instagram = document.getElementById('social-instagram-input').value;
    settings.socialLinks.youtube = document.getElementById('social-youtube-input').value;
    settings.socialLinks.whatsapp = document.getElementById('social-whatsapp-input').value;
    saveBackofficeSettings(settings);
    alert('Perubahan berhasil disimpan. Muat ulang landing page untuk melihat hasilnya.');
  });
}

function attachAddUserListener() {
  document.getElementById('add-user-btn').addEventListener('click', () => {
    const username = document.getElementById('new-user-username').value.trim();
    const password = document.getElementById('new-user-password').value.trim();
    const role = document.getElementById('new-user-role').value;
    if (!username || !password) {
      alert('Masukkan username dan password.');
      return;
    }
    const settings = getBackofficeSettings();
    if (settings.adminUsers.some((item) => item.username === username)) {
      alert('Username sudah ada.');
      return;
    }
    settings.adminUsers.push({ username, password, role });
    saveBackofficeSettings(settings);
    renderUserList(settings);
    document.getElementById('new-user-username').value = '';
    document.getElementById('new-user-password').value = '';
  });
}

function initBackoffice() {
  attachTabListeners();
  attachSaveListener();
  attachAddUserListener();
  handleFileUpload('logo-upload', 'logo-preview', 'logo');
  handleFileUpload('hero-image-upload', 'hero-image-preview', 'heroImage');
  handleFileUpload('banner-upload', 'banner-preview', 'bannerImage');
  document.getElementById('admin-login-form').addEventListener('submit', loginAdmin);
  document.getElementById('logout-btn').addEventListener('click', logoutAdmin);

  if (getAuthState()) {
    showAdminDashboard();
  }
}

window.addEventListener('DOMContentLoaded', initBackoffice);

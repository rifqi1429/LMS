
// Feature Switcher
const featureData = {
  1: {
    image: "../asset/materi.png",
    title: "Manajemen Topik & Materi"
  },
  2: {
    image: "../asset/Ujian.png",
    title: "Evaluasi Tugas & Ujian"
  },
  3: {
    image: "../asset/jadwal.png",
    title: "Pengaturan Jadwal Belajar"
  },
  4: {
    image: "../asset/Nilai.png",
    title: "Pengaturan Jadwal Belajar"
  }
};

const backofficeStorageKey = 'zmiLmsBackoffice';
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
    bannerImage: 'https://copilot.microsoft.com/th/id/BCO.7239c462-6f49-478c-aabc-93c805f71db4.png'
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

function switchFeature(id) {
  // 1. Reset Semua Item
  document.querySelectorAll('.feature-item').forEach(item => {
    item.classList.remove('feature-active');
    item.classList.add('text-slate-700', 'hover:bg-gray-100');
    item.querySelector('.desc').classList.add('hidden');

    const iconWrap = item.querySelector('div');
    iconWrap.classList.remove('bg-white/20', 'shadow-inner');
    iconWrap.classList.add('bg-gray-200');

    const icon = item.querySelector('i');
    icon.classList.remove('text-white');
    icon.classList.add('text-green-600');
  });

  // 2. Aktifkan Item Terpilih
  const activeItem = document.getElementById(`feat-${id}`);
  activeItem.classList.add('feature-active');
  activeItem.classList.remove('text-slate-700', 'hover:bg-gray-100');
  activeItem.querySelector('.desc').classList.remove('hidden');

  const activeIconWrap = activeItem.querySelector('div');
  activeIconWrap.classList.add('bg-white/20', 'shadow-inner');
  activeIconWrap.classList.remove('bg-gray-200');

  const activeIcon = activeItem.querySelector('i');
  activeIcon.classList.add('text-white');
  activeIcon.classList.remove('text-green-600');

  // 3. Update Gambar dengan Animasi Smooth
  const imgDisplay = document.getElementById('display-image');
  imgDisplay.style.opacity = '0';
  imgDisplay.style.transform = 'translateY(10px)';

  setTimeout(() => {
    imgDisplay.src = featureData[id].image;
    imgDisplay.style.opacity = '1';
    imgDisplay.style.transform = 'translateY(0)';
  }, 300);
}

function applyLandingPageSettings() {
  const settings = getBackofficeSettings();
  document.title = settings.seoTitle || document.title;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = settings.seoDescription;

  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.textContent = settings.heroSubtitle;
  }
  if (heroTitle) {
    heroTitle.textContent = '';
    const fullText = settings.heroTitle || defaultBackoffice.heroTitle;
    let index = 0;
    function typeWriter() {
      if (index < fullText.length) {
        heroTitle.textContent += fullText.charAt(index);
        index++;
        setTimeout(typeWriter, 60);
      } else if (fullText.includes('Kebutuhan Mengajar')) {
        heroTitle.innerHTML = fullText.replace('Kebutuhan Mengajar', '<span class="text-green-400">Kebutuhan Mengajar</span>');
      }
    }
    typeWriter();
  }

  const featuresTitle = document.getElementById('features-title');
  const featuresDescription = document.getElementById('features-description');
  if (featuresTitle) featuresTitle.textContent = settings.featuresTitle;
  if (featuresDescription) featuresDescription.textContent = settings.featuresDescription;

  for (let i = 1; i <= 4; i++) {
    const titleEl = document.getElementById(`feature-title-${i}`);
    const descEl = document.getElementById(`feature-desc-${i}`);
    if (titleEl && settings.featureCards[i - 1]) titleEl.textContent = settings.featureCards[i - 1].title;
    if (descEl && settings.featureCards[i - 1]) descEl.textContent = settings.featureCards[i - 1].description;
  }

  const contactHeading = document.getElementById('contact-heading');
  const contactText = document.getElementById('contact-text');
  if (contactHeading) contactHeading.textContent = settings.contactHeading;
  if (contactText) contactText.textContent = settings.contactText;

  const heroImage = document.querySelector('img[alt="Hero Image - LMS Student"]');
  if (heroImage) heroImage.src = settings.images.heroImage;

  const sectionHome = document.getElementById('home');
  if (sectionHome && settings.images.bannerImage) {
    sectionHome.style.backgroundImage = `url('${settings.images.bannerImage}')`;
  }

  const navLogo = document.querySelector('nav .logo img');
  if (navLogo) navLogo.src = settings.images.logo;

  const socialFacebook = document.getElementById('social-facebook');
  const socialInstagram = document.getElementById('social-instagram');
  const socialYoutube = document.getElementById('social-youtube');
  const socialWhatsapp = document.getElementById('social-whatsapp');
  if (socialFacebook) socialFacebook.href = settings.socialLinks.facebook;
  if (socialInstagram) socialInstagram.href = settings.socialLinks.instagram;
  if (socialYoutube) socialYoutube.href = settings.socialLinks.youtube;
  if (socialWhatsapp) socialWhatsapp.href = settings.socialLinks.whatsapp;
}

function attachLeadForm() {
  const leadForm = document.getElementById('lead-form');
  if (!leadForm) return;

  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('lead-name').value.trim();
    const email = document.getElementById('lead-email').value.trim();
    const message = document.getElementById('lead-message').value.trim();
    if (!name || !email || !message) return;

    const settings = getBackofficeSettings();
    settings.leads.push({
      createdAt: new Date().toISOString(),
      name,
      email,
      message
    });
    saveBackofficeSettings(settings);
    alert('Terima kasih! Pesan Anda telah terkirim.');
    leadForm.reset();
  });
}

// Initialize AOS
window.addEventListener('load', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopButton.className = 'back-to-top';
  backToTopButton.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(backToTopButton);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  setTimeout(() => {
    openPopup();
  }, 5000);

  const popupOverlay = document.getElementById('popup-overlay');
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  }

  applyLandingPageSettings();
  attachLeadForm();
});

// Popup Management
function openPopup() {
  const popupOverlay = document.getElementById('popup-overlay');
  if (popupOverlay) {
    popupOverlay.classList.add('active');
  }
}

function closePopup() {
  const popupOverlay = document.getElementById('popup-overlay');
  if (popupOverlay) {
    popupOverlay.classList.remove('active');
  }
}


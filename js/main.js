// ==================== DATA ====================
const rooms = [
    {
        id: 'deluxe-king',
        name: 'Deluxe Room',
        description: 'Spacious room with a plush king bed, Features a separate living area and premium furnishings.',
        price: 95,
        images: [
            'img/Deluxe.png',
            'img/Deluxe_2.png',
            'img/livingspace.jpg',
            'img/Deluxe_3.jpg'
            
        ],
        guests: 2,
        size: '50 m²',
        features: ['King Bed', 'Living Area', 'Free WiFi', 'Mini Bar' ]
    },
    {
        id: 'ocean-suite',
        name: 'Standard Room',
        description: 'Breathtaking ocean views from your private balcony. city views, and modern amenities for a comfortable stay. ',
        price: 75,
        images: [
            'img/Standard_Room.png',
            'img/standard_2.jpg',
           
        ],
        guests: 2,
        size: '40 m²',
        features: ['Ocean View', 'Balcony',  'Work Desk', 'Fridge']
    },
    
    {
        id: 'cozy-twin',
        name: 'Sharing Room',
        description: 'Ideal for friends or colleagues with two comfortable twin beds and a functional workspace.',
        price: 89,
        images: [
            'img/IMG-sharedroom.jpg',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        ],
        guests: 2,
        size: '35 m²',
        features: ['2 Twin Beds', 'Work Desk', 'Free WiFi',]
    }
];

const amenities = [
    { name: 'Conference', icon: 'fa-hotel', desc: 'Conference hall for hosting events' },
    { name: 'Secure Parking', icon: 'fa-parking', desc: 'Valet or self parking' },
    { name: 'Fine Dining', icon: 'fa-utensils', desc: 'Award-winning restaurant' },
    { name: 'Fitness Center', icon: 'fa-dumbbell', desc: '24/7 state-of-the-art gym' },
    { name: 'Free WiFi', icon: 'fa-wifi', desc: 'High-speed internet everywhere' },
    { name: 'Airport Shuttle', icon: 'fa-bus', desc: 'Complimentary transfers' },
    { name: 'Room Service', icon: 'fa-bell', desc: '24-hour in-room dining' },
    { name: 'Concierge', icon: 'fa-user-tie', desc: 'Personalized travel assistance' }
];

const testimonials = [
    { name: 'Borboh', location: 'Tema, Ghana', text: 'This hotel is quiet, clean, 24 hours AC, fast wifi, good food, friendly staffs.', rating: 5, avatar: 'BB' },
    { name: 'Soriba Special', location: 'Toronto, Canada', text: 'Honestly from the receptionist to the house keeping department and total hospitality i will rate them 85 percent.', rating: 5, avatar: 'SS' },
    { name: 'Jeclbee', location: 'Netherland', text: 'I love the Leisure Lodge for its nice atmosphere and personal touch. I had a spacious room with balcony and seaview. The restaurant has very good fresh food all day long for competitive prices. The beach is a 10-minute walk away', rating: 5, avatar: 'JB' },
    { name: 'Michael Torres', location: 'Sydney, Australia', text: 'From the moment we arrived, we felt like royalty. The concierge arranged everything perfectly. Cannot recommend enough!', rating: 5, avatar: 'MT' },
    { name: 'Lisa Park', location: 'Seoul, South Korea', text: 'The attention to detail is incredible. Fresh flowers, artisan chocolates, and the most comfortable bed I have ever slept in.', rating: 5, avatar: 'LP' },
    { name: 'David Brown', location: 'Berlin, Germany', text: 'Business trip turned into a relaxing retreat. The workspace in the Cozy Twin room was perfect, and the gym is world-class.', rating: 4, avatar: 'DB' }
];

window.rooms = rooms;
window.amenities = amenities;

// ==================== DARK MODE ====================
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const html = document.documentElement;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function updateIcons() {
        const isDark = html.classList.contains('dark');
        if (sunIcon) sunIcon.classList.toggle('hidden', !isDark);
        if (moonIcon) moonIcon.classList.toggle('hidden', isDark);
    }

    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    }
    updateIcons();

    darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        updateIcons();
    });
}

// ==================== NAVBAR ====================
function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    const logoText = document.getElementById('nav-logo-text');
    const navLinks = nav.querySelectorAll('.nav-link');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.remove('bg-transparent');
            nav.classList.add('nav-glass', 'shadow-sm');
            if (logoText) {
                logoText.classList.remove('text-white');
                logoText.classList.add('text-gray-900', 'dark:text-white');
            }
            navLinks.forEach(a => {
                a.classList.remove('text-white/90', 'hover:text-white');
                a.classList.add('text-gray-700', 'hover:text-lodge-600', 'dark:text-gray-300', 'dark:hover:text-lodge-400');
            });
        } else {
            nav.classList.add('bg-transparent');
            nav.classList.remove('nav-glass', 'shadow-sm');
            if (logoText) {
                logoText.classList.add('text-white');
                logoText.classList.remove('text-gray-900', 'dark:text-white');
            }
            navLinks.forEach(a => {
                a.classList.add('text-white/90', 'hover:text-white');
                a.classList.remove('text-gray-700', 'hover:text-lodge-600', 'dark:text-gray-300', 'dark:hover:text-lodge-400');
            });
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        });
    }

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenu || !mobileMenuBtn) return;
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add('visible');
        observer.observe(el);
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });
}

// ==================== COOKIE BANNER ====================
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner || localStorage.getItem('cookies')) return;

    setTimeout(() => banner.classList.add('show'), 2000);
}

function acceptCookies() {
    localStorage.setItem('cookies', 'accepted');
    document.getElementById('cookie-banner').classList.remove('show');
}

function declineCookies() {
    localStorage.setItem('cookies', 'essential');
    document.getElementById('cookie-banner').classList.remove('show');
}

// ==================== TOAST ====================
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

// ==================== FAQ ACCORDION ====================
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => toggleFaq(q));
        q.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq(q);
            }
        });
    });
}

function toggleFaq(question) {
    const item = question.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
    }
}

// ==================== TESTIMONIAL CAROUSEL ====================
let currentSlide = 0;
let totalSlides = 0;
let slidesPerView = 1;
let carouselInterval;

function initTestimonials() {
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track || !dotsContainer) return;

    slidesPerView = window.innerWidth >= 768 ? 3 : 1;
    totalSlides = Math.ceil(testimonials.length / slidesPerView);

    track.innerHTML = testimonials.map(t => `
        <div class="testimonial-slide">
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div class="flex gap-1 mb-4">
                    ${Array(5).fill(0).map((_, i) => `
                        <svg class="w-5 h-5 ${i < t.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    `).join('')}
                </div>
                <p class="text-gray-600 dark:text-gray-400 italic mb-6 leading-relaxed">"${t.text}"</p>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-lodge-100 dark:bg-lodge-900/30 rounded-full flex items-center justify-center text-lodge-700 dark:text-lodge-400 font-bold">${t.avatar}</div>
                    <div>
                        <div class="font-semibold text-gray-900 dark:text-white">${t.name}</div>
                        <div class="text-gray-500 dark:text-gray-400 text-sm">${t.location}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    dotsContainer.innerHTML = Array(totalSlides).fill(0).map((_, i) => `
        <button class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})" aria-label="Go to slide ${i + 1}"></button>
    `).join('');

    // Auto-rotate
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 5000);
}

function goToSlide(index) {
    currentSlide = index;
    const track = document.getElementById('testimonial-track');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!track) return;

    const slideWidth = 100 / slidesPerView;
    track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

// ==================== ROOM GALLERY LIGHTBOX ====================
let currentRoomId = null;
let currentGalleryIndex = 0;

function openRoomGallery(roomId, startIndex = 0) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    currentRoomId = roomId;
    currentGalleryIndex = startIndex;
    updateRoomGallery();

    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function updateRoomGallery() {
    const room = rooms.find(r => r.id === currentRoomId);
    if (!room) return;

    const lbImg = document.getElementById('lightbox-img');
    const lbCurrent = document.getElementById('lb-current');
    const lbTotal = document.getElementById('lb-total');

    if (lbImg) {
        lbImg.src = room.images[currentGalleryIndex];
        lbImg.alt = `${room.name} - Photo ${currentGalleryIndex + 1}`;
    }
    if (lbCurrent) lbCurrent.textContent = currentGalleryIndex + 1;
    if (lbTotal) lbTotal.textContent = room.images.length;
}

function nextLightboxImage() {
    if (!currentRoomId) return;
    const room = rooms.find(r => r.id === currentRoomId);
    if (!room) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % room.images.length;
    updateRoomGallery();
}

function prevLightboxImage() {
    if (!currentRoomId) return;
    const room = rooms.find(r => r.id === currentRoomId);
    if (!room) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + room.images.length) % room.images.length;
    updateRoomGallery();
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
    document.body.style.overflow = '';
    currentRoomId = null;
    currentGalleryIndex = 0;
}

// Lightbox keyboard navigation
document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
});

// ==================== BOOKING MODAL ====================
function openBookingModal(roomId = '') {
    const modal = document.getElementById('booking-modal');
    const select = document.getElementById('room-select');
    if (!modal || !select) return;

    select.innerHTML = '<option value="">Choose a room...</option>' + 
        rooms.map(r => `<option value="${r.id}" ${r.id === roomId ? 'selected' : ''}>${r.name} - $${r.price}/night</option>`).join('');

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkinEl = document.getElementById('checkin');
    const checkoutEl = document.getElementById('checkout');
    if (checkinEl) {
        checkinEl.value = today.toISOString().split('T')[0];
        checkinEl.min = today.toISOString().split('T')[0];
    }
    if (checkoutEl) checkoutEl.value = tomorrow.toISOString().split('T')[0];

    updateRoomPreview();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) focusable[0].focus();
    }, 100);
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';

    const form = document.getElementById('booking-form');
    if (form) form.reset();

    const formContent = document.getElementById('booking-form-content');
    const success = document.getElementById('booking-success');
    if (formContent) formContent.classList.remove('hidden');
    if (success) success.classList.add('hidden');

    document.querySelectorAll('[id$="-error"]').forEach(el => el.classList.add('hidden'));
}

function updateRoomPreview() {
    const select = document.getElementById('room-select');
    const info = document.getElementById('selected-room-info');
    if (!select || !info) return;

    const roomId = select.value;
    if (roomId) {
        const room = rooms.find(r => r.id === roomId);
        const modalImg = document.getElementById('modal-room-img');
        const modalName = document.getElementById('modal-room-name');
        const modalPrice = document.getElementById('modal-room-price');
        if (modalImg) { modalImg.src = room.image; modalImg.alt = room.name; }
        if (modalName) modalName.textContent = room.name;
        if (modalPrice) modalPrice.textContent = `$${room.price}/night`;
        info.classList.remove('hidden');
    } else {
        info.classList.add('hidden');
    }
    updateSummary();
}

function updateSummary() {
    const roomId = document.getElementById('room-select').value;
    const checkin = new Date(document.getElementById('checkin').value);
    const checkout = new Date(document.getElementById('checkout').value);
    const summaryNights = document.getElementById('summary-nights');
    const summaryPrice = document.getElementById('summary-price');
    const summaryTotal = document.getElementById('summary-total');

    if (roomId && checkin && checkout && checkout > checkin && summaryNights && summaryPrice && summaryTotal) {
        const room = rooms.find(r => r.id === roomId);
        const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
        const total = nights * room.price;
        summaryNights.textContent = nights;
        summaryPrice.textContent = `$${room.price}`;
        summaryTotal.textContent = `$${total}`;
    } else {
        if (summaryNights) summaryNights.textContent = '0';
        if (summaryPrice) summaryPrice.textContent = '$0';
        if (summaryTotal) summaryTotal.textContent = '$0';
    }
}

function validateDates() {
    const checkin = new Date(document.getElementById('checkin').value);
    const checkout = new Date(document.getElementById('checkout').value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let valid = true;

    const checkinError = document.getElementById('checkin-error');
    const checkoutError = document.getElementById('checkout-error');
    if (checkinError) checkinError.classList.add('hidden');
    if (checkoutError) checkoutError.classList.add('hidden');

    if (checkin < today && checkinError) {
        checkinError.textContent = 'Check-in cannot be in the past';
        checkinError.classList.remove('hidden');
        valid = false;
    }
    if (checkout <= checkin && checkoutError) {
        checkoutError.classList.remove('hidden');
        valid = false;
    }
    return valid;
}

function scrollToBooking() {
    const rooms = document.getElementById('rooms');
    if (rooms) rooms.scrollIntoView({ behavior: 'smooth' });
}

function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const roomId = document.getElementById('room-select').value;
        const roomError = document.getElementById('room-error');
        if (roomError) roomError.classList.toggle('hidden', !!roomId);

        if (!roomId) {
            showToast('Please select a room first');
            return;
        }
        if (!validateDates()) return;

        const room = rooms.find(r => r.id === roomId);
        const name = document.getElementById('guest-name').value;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const guests = document.getElementById('guests').value;
        const total = document.getElementById('summary-total').textContent;

        const successName = document.getElementById('success-name');
        const successRoom = document.getElementById('success-room');
        const successCheckin = document.getElementById('success-checkin');
        const successCheckout = document.getElementById('success-checkout');
        const successGuests = document.getElementById('success-guests');
        const successTotal = document.getElementById('success-total');

        if (successName) successName.textContent = name;
        if (successRoom) successRoom.textContent = room.name;
        if (successCheckin) successCheckin.textContent = new Date(checkin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (successCheckout) successCheckout.textContent = new Date(checkout).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (successGuests) successGuests.textContent = guests + ' Guest' + (guests > 1 ? 's' : '');
        if (successTotal) successTotal.textContent = total;

        const formContent = document.getElementById('booking-form-content');
        const successDiv = document.getElementById('booking-success');
        if (formContent) formContent.classList.add('hidden');
        if (successDiv) successDiv.classList.remove('hidden');

        localStorage.setItem('bookingDraft', JSON.stringify({ roomId, checkin, checkout, guests, name }));
    });

    const checkinEl = document.getElementById('checkin');
    const checkoutEl = document.getElementById('checkout');
    if (checkinEl) checkinEl.addEventListener('change', () => { validateDates(); updateSummary(); });
    if (checkoutEl) checkoutEl.addEventListener('change', () => { validateDates(); updateSummary(); });
}

// Booking modal focus trap & escape
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('booking-modal');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeBookingModal();

    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

// ==================== CONTACT FORM ====================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Message sent successfully! We will get back to you soon.');
        this.reset();
    });
}

// ==================== RENDER FUNCTIONS ====================
function renderRooms() {
    const grid = document.getElementById('rooms-grid');
    if (!grid) return;

    grid.innerHTML = rooms.map((room, i) => `
        <div class="room-card bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 scroll-reveal" style="transition-delay:${i * 0.1}s">
            <div class="relative overflow-hidden h-56">
                <img src="${room.images[0]}" alt="${room.name}" loading="lazy" class="room-img w-full h-full object-cover transition-transform duration-500" onerror="this.src='img/Deluxe.jpg'">
                <div class="absolute top-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800 dark:text-white">${room.size}</div>
                <div class="absolute bottom-4 left-4 bg-lodge-500 text-white rounded-full px-3 py-1 text-sm font-semibold">$${room.price}/night</div>
            </div>
            <div class="p-6">
                <div class="flex items-center gap-2 mb-2">
                    <svg class="w-4 h-4 text-ocean-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Up to ${room.guests} guests</span>
                </div>
                <h3 class="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">${room.name}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">${room.description}</p>

                <!-- Thumbnail Gallery -->
                <div class="grid grid-cols-4 gap-2 mb-5">
                    ${room.images.map((img, idx) => `
                        <div class="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition group" onclick="openRoomGallery('${room.id}', ${idx})">
                            <img src="${img}" alt="${room.name} - view ${idx + 1}" class="w-full h-16 object-cover" loading="lazy">
                            ${idx === 3 ? `<div class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-semibold">+${room.images.length - 3}</div>` : ''}
                        </div>
                    `).join('')}
                </div>

                <div class="flex flex-wrap gap-2 mb-5">
                    ${room.features.map(f => `<span class="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full">${f}</span>`).join('')}
                </div>
                <div class="flex gap-2">
                    <a href="room-detail.html?room=${room.id}" class="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white py-3 rounded-xl font-semibold transition text-center text-sm">
                        View Details
                    </a>
                    <button onclick="openBookingModal('${room.id}')" class="flex-1 bg-lodge-500 hover:bg-lodge-600 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm">
                            <i class="fa-solid fa-calendar-days text-base"></i>
                        Book
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAmenities() {
    const grid = document.getElementById('amenities-grid');
    if (!grid) return;

    grid.innerHTML = amenities.map((a, i) => `
        <div class="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 hover:bg-white dark:hover:bg-slate-700 hover:shadow-xl transition-all duration-300 group scroll-reveal" style="transition-delay:${i * 0.05}s">
            <div class="w-14 h-14 bg-ocean-100 dark:bg-ocean-900/30 group-hover:bg-ocean-500 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                <i class="fa-solid ${a.icon} text-ocean-600 dark:text-ocean-400 group-hover:text-white transition-colors duration-300 text-2xl"></i>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">${a.name}</h4>
            <p class="text-gray-500 dark:text-gray-400 text-sm">${a.desc}</p>
        </div>
    `).join('');
}

function initWeatherWidget() {
    const tempEl = document.getElementById('weather-temp');
    const conditionEl = document.getElementById('weather-condition');
    const windEl = document.getElementById('weather-wind');
    const humidityEl = document.getElementById('weather-humidity');
    const waterEl = document.getElementById('weather-water');
    const iconEl = document.getElementById('weather-icon');

    if (!tempEl || !conditionEl || !windEl || !humidityEl || !waterEl || !iconEl) return;

    const weatherCodeMap = {
        0: { icon: 'fa-sun', label: 'Clear' },
        1: { icon: 'fa-cloud-sun', label: 'Mainly Clear' },
        2: { icon: 'fa-cloud-sun', label: 'Partly Cloudy' },
        3: { icon: 'fa-cloud', label: 'Cloudy' },
        45: { icon: 'fa-smog', label: 'Foggy' },
        48: { icon: 'fa-smog', label: 'Rime Fog' },
        51: { icon: 'fa-cloud-rain', label: 'Light Drizzle' },
        53: { icon: 'fa-cloud-rain', label: 'Drizzle' },
        55: { icon: 'fa-cloud-showers-heavy', label: 'Heavy Drizzle' },
        61: { icon: 'fa-cloud-rain', label: 'Light Rain' },
        63: { icon: 'fa-cloud-rain', label: 'Rain' },
        65: { icon: 'fa-cloud-showers-heavy', label: 'Heavy Rain' },
        71: { icon: 'fa-snowflake', label: 'Light Snow' },
        73: { icon: 'fa-snowflake', label: 'Snow' },
        75: { icon: 'fa-snowflake', label: 'Heavy Snow' },
        80: { icon: 'fa-cloud-showers-heavy', label: 'Showers' },
        81: { icon: 'fa-cloud-showers-heavy', label: 'Rain Showers' },
        82: { icon: 'fa-cloud-showers-heavy', label: 'Heavy Showers' },
        95: { icon: 'fa-cloud-bolt', label: 'Thunderstorm' },
        96: { icon: 'fa-cloud-bolt', label: 'Thunderstorm' },
        99: { icon: 'fa-cloud-bolt', label: 'Severe Thunderstorm' }
    };

    const weatherApi = 'https://api.open-meteo.com/v1/forecast?latitude=8.484&longitude=-13.2299&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto';
    const marineApi = 'https://marine-api.open-meteo.com/v1/marine?latitude=8.484&longitude=-13.2299&current=sea_surface_temperature&timezone=auto';

    Promise.all([
        fetch(weatherApi).then(response => {
            if (!response.ok) throw new Error('Weather API failed');
            return response.json();
        }),
        fetch(marineApi).then(response => {
            if (!response.ok) throw new Error('Marine API failed');
            return response.json();
        })
    ])
    .then(([weatherData, marineData]) => {
        const current = weatherData.current;
        const condition = weatherCodeMap[current?.weather_code] || { icon: 'fa-cloud-sun', label: 'Cloudy' };
        const temperatureC = Math.round(current.temperature_2m);
        const windMph = Math.round(current.wind_speed_10m * 2.23694);
        const humidity = Math.round(current.relative_humidity_2m);
        const waterTempC = marineData.current?.sea_surface_temperature === undefined
            ? null
            : Math.round(marineData.current.sea_surface_temperature);

        iconEl.innerHTML = `<i class="fa-solid ${condition.icon} fa-2x"></i>`;
        tempEl.textContent = `${temperatureC}°C`;
        conditionEl.textContent = condition.label;
        windEl.textContent = `${windMph} mph`;
        humidityEl.textContent = `${humidity}%`;
        waterEl.textContent = waterTempC === null ? '—' : `${waterTempC}°C`;
    })
    .catch(() => {
        // Keep the existing hardcoded values if the live lookup fails.
    });
}

// ==================== INITIALIZATION ====================
function initializeApp() {
    initDarkMode();
    initNavbar();
    initSmoothScroll();
    initBackToTop();
    initCookieBanner();
    initFAQ();
    initTestimonials();
    initBookingForm();
    initContactForm();
    initWeatherWidget();
    renderRooms();
    renderAmenities();

    requestAnimationFrame(() => {
        initScrollReveal();
        setTimeout(initScrollReveal, 150);
    });

    // Re-init testimonials on resize
    window.addEventListener('resize', () => {
        const newPerView = window.innerWidth >= 768 ? 3 : 1;
        if (newPerView !== slidesPerView) {
            slidesPerView = newPerView;
            totalSlides = Math.ceil(testimonials.length / slidesPerView);
            currentSlide = 0;
            initTestimonials();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

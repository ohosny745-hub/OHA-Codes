// ==========================================
// THREE.JS EARTH
// ==========================================
const canvas = document.getElementById("earthCanvas");
const scene = new THREE.Scene();
 
const camera = new THREE.PerspectiveCamera(
    42,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
);
camera.position.z = 4.6;
 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
 
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
 
const textureLoader = new THREE.TextureLoader();
const earthDayTexture = textureLoader.load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg");
const normalTexture = textureLoader.load("https://threejs.org/examples/textures/planets/earth_normal_2048.jpg");
 
const geometry = new THREE.SphereGeometry(1.8, 128, 128);
const material = new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    normalMap: normalTexture
});
 
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);
 
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);
 
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);
 
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.0035;
    renderer.render(scene, camera);
}
animate();
 
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (canvas) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        }
    }, 150);
});
 
// ==========================================
// MOBILE MENU
// ==========================================
function openMenu() {
    document.getElementById("navbar").classList.add("open");
    document.getElementById("navOverlay").classList.add("show");
    document.querySelector(".menu-toggle").classList.add("hide-toggle"); // بيضيف كلاس الإخفاء للموبايل
    document.body.style.overflow = "hidden";
}
 
function closeMenu() {
    document.getElementById("navbar").classList.remove("open");
    document.getElementById("navOverlay").classList.remove("show");
    document.querySelector(".menu-toggle").classList.remove("hide-toggle"); // بيشيل كلاس الإخفاء للموبايل
    document.body.style.overflow = "";
}
 
document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});
 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});
 
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });
}
 
// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
 
// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbar a');
 
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
 
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
 
// ==========================================
// STARS CANVAS
// ==========================================
const starsCanvas = document.getElementById('stars-canvas');
if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    let width, height;
    const stars = [];
 
    function initStars() {
        width = starsCanvas.width = starsCanvas.offsetWidth;
        height = starsCanvas.height = starsCanvas.offsetHeight;
        stars.length = 0;
 
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random()
            });
        }
    }
 
    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
 
            star.y += star.speed;
            if (star.y > height) {
                star.y = 0;
                star.x = Math.random() * width;
            }
        });
        requestAnimationFrame(drawStars);
    }
 
    initStars();
    drawStars();
    window.addEventListener('resize', initStars);
}
 
// ==========================================
// WHATSAPP SUBMIT HANDLER
// ==========================================
function sendWhatsApp(packageName, price) {
    const phoneNumber = "201228170422"; 
    const message = `مرحباً عمر، \nأود الاشتراك في باقة: *${packageName}*\nالسعر المحدد: *${price} EGP*\nبرجاء التواصل معي لتأكيد تفاصيل العمل وبدء المشروع.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ==========================================
// DOWNLOAD DROPDOWN HANDLER
// ==========================================
// دالة فتح المودال
function openDownloadModal() {
    const modal = document.getElementById("downloadModal");
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // منع الاسكرول عند الفتح
    }
}

// دالة إغلاق المودال
function closeDownloadModal() {
    const modal = document.getElementById("downloadModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = ""; // إرجاع الاسكرول طبيعي
    }
}

// إغلاق المودال عند الضغط في الخلفية الخارجية
window.addEventListener("click", function(event) {
    const modal = document.getElementById("downloadModal");
    if (event.target === modal) {
        closeDownloadModal();
    }
});


document.addEventListener('DOMContentLoaded', function() {

    // Typing effect for "Blockchain Developer"
    new Typed('.typing', {
        strings: ['Blockchain Developer'],
        typeSpeed: 100,
        loop: false
    });

    // New "Starfield" Particle Background
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 160,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#9E47FF"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            }
        },
        "retina_detect": true
    });


    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    menuBtn.addEventListener('click', () => { navLinks.classList.toggle('active'); });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); } }); }, { threshold: 0.1 });
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
    const style = document.createElement('style');
    style.innerHTML = `section { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; } section.show { opacity: 1; transform: translateY(0); }`;
    document.head.appendChild(style);
    
    // Modal Logic
    const modal = document.getElementById("contactModal");
    const openBtn = document.getElementById("contactBtn");
    const closeBtn = document.querySelector(".close-btn");
    openBtn.onclick = function() { modal.style.display = "flex"; }
    closeBtn.onclick = function() { modal.style.display = "none"; }
    window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }
    
    // Form Submission Logic
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.btn-submit');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // IMPORTANT: Remember to replace with your Google Apps Script URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbx8aBhMH9oh4sl2jKWqwDhoZuMJriOaBiaQ2sKoF4FFsrG1gDuvEovGSth6N1J7DHeB/exec'; 
        const formData = new FormData(form);
        
        submitButton.disabled = true;
        submitButton.innerHTML = 'Submitting...';

        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                if(response.ok) {
                    submitButton.innerHTML = 'Submitted <i class="fas fa-check"></i>';
                    submitButton.classList.add('success');
                    
                    setTimeout(() => {
                        form.reset();
                        modal.style.display = "none";
                        submitButton.classList.remove('success');
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'Submit <i class="fas fa-paper-plane"></i>';
                    }, 2000);

                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                submitButton.innerHTML = 'Error!';
                submitButton.classList.add('error');

                 setTimeout(() => {
                    submitButton.classList.remove('error');
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Submit <i class="fas fa-paper-plane"></i>';
                }, 3000);
            });
    });
});
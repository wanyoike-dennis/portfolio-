/* ==========================================
   Scroll Reveal Animation
========================================== */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    const windowHeight = window.innerHeight;

    reveals.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if (sectionTop < windowHeight - revealPoint) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

window.addEventListener("load", revealSections);

/* ==========================================
   Animated Statistics Counter
========================================== */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function animateCounters() {

    const statsSection = document.querySelector(".stats");

    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100 && !counterStarted) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.ceil(target / 80);

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    current = target;

                }

                if (target === 100) {

                    counter.textContent = current + "%";

                } else {

                    counter.textContent = current + "+";

                }

                if (current < target) {

                    requestAnimationFrame(updateCounter);

                }

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", animateCounters);

window.addEventListener("load", animateCounters);
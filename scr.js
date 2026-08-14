/* ==========================================
   Portfolio JavaScript
========================================== */

console.log("Portfolio JavaScript loaded successfully");

/* ==========================================
   Back To Top
========================================== */

const backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ==========================================
   Project Filtering
========================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Get selected category */

        const filter = button.dataset.filter;


        /* Remove active class from all buttons */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Add active class to clicked button */

        button.classList.add("active");


        /* Filter projects */

        projectCards.forEach(card => {

            const category = card.dataset.category;


       if(filter === "all" || category === filter){

    card.style.display = "block";

    setTimeout(() => {

        card.classList.remove("hide");

    }, 10);

}else{

    card.classList.add("hide");

    setTimeout(() => {

        card.style.display = "none";

    }, 350);

}

        });

    });

});


/* ==========================================
   Contact Form
========================================== */

const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", async (event) => {

    /* Prevent normal form submission */

    event.preventDefault();


    /* Get form values */

    const name = document.querySelector("#name").value.trim();

    const email = document.querySelector("#email").value.trim();

    const subject = document.querySelector("#subject").value.trim();

    const message = document.querySelector("#message").value.trim();


    /* Check name */

    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    /* Check email */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;

    }


    /* Check subject */

    if (subject === "") {

        alert("Please enter a subject.");

        return;

    }


    /* Check message */

    if (message === "") {

        alert("Please enter your message.");

        return;

    }


    /* Disable button while sending */

    const submitButton =
        contactForm.querySelector("button[type='submit']");

    submitButton.disabled = true;

    submitButton.textContent = "Sending...";


    try {

        /* Send form to Formspree */

        const response = await fetch(
            contactForm.action,
            {
                method: "POST",

                body: new FormData(contactForm),

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (response.ok) {

            alert(
                "Thank you! Your message has been sent successfully."
            );

            contactForm.reset();

        } else {

            alert(
                "Something went wrong. Please try again."
            );

        }

    } catch (error) {

        alert(
            "Unable to send your message. Please check your internet connection."
        );

    }


    /* Enable button again */

    submitButton.disabled = false;

    submitButton.textContent = "Send Message";

});


/* ==========================================
   Mobile Navigation
========================================== */

const menuToggle = document.querySelector("#menuToggle");

const navLinks = document.querySelector("#navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

/* Close mobile menu after clicking a link */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


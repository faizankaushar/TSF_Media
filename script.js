// Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');

    // If the contact modal is not present (e.g., on other pages), skip initialization
    if (!modal || !closeModal || !contactForm) {
        return;
    }

    // Show modal after a brief delay
    setTimeout(() => {
        modal.classList.add('active');
    }, 500);

    // Open modal on click
    const contactTriggers = document.querySelectorAll('.contact-trigger');
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    });

    // Close modal functionality
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close if clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Form submission with Formspree
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';

        const formData = new FormData(contactForm);

        fetch("https://formspree.io/f/mzddpwkb", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    alert('Message Sent Successfully!');
                    modal.classList.remove('active');
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! There was a problem submitting your form. Please check your spam folder or verify your Formspree account.");
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error);
                alert('There was a technical error. Please check your internet connection or try again later.');
            })
            .finally(() => {
                btn.innerText = originalText;
            });
    });
});

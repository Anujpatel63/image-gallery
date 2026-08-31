const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const filterButtons = document.querySelectorAll(".filter-btn");

let visibleItems = [];
let currentIndex = 0;

/* Update visible images */
function updateVisibleItems() {
    visibleItems = [...document.querySelectorAll(".gallery-item")]
        .filter(item => item.style.display !== "none");
}

/* Open lightbox */
function openLightbox(index) {
    updateVisibleItems();

    currentIndex = index;

    const img = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    lightbox.classList.add("show");
}

/* Close lightbox */
function closeLightbox() {
    lightbox.classList.remove("show");
}

/* Next image */
function showNext() {
    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    const img = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

/* Previous image */
function showPrevious() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    const img = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

/* Gallery click */
galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        updateVisibleItems();

        const index = visibleItems.indexOf(item);

        openLightbox(index);
    });
});

/* Buttons */
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrevious);

/* Close when clicking outside image */
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

/* Keyboard navigation */
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNext();
    }

    if (event.key === "ArrowLeft") {
        showPrevious();
    }
});

/* Category filtering */
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });

        updateVisibleItems();
    });

});
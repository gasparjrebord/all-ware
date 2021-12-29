/**
 * @challenge: Desafío: Segunda entrega proyecto final
 * 
 * @version: v1.0.0
 * @author:
*/
class Author {
    constructor(firstName, lastName, age, location) {
        this.Nombre = firstName;
        this.Apellido = lastName;
        this.Edad = age;
        this.Localidad = location;
    }
}

let gaspar = new Author("Gaspar", "Rebord", 19, "Argentina");
console.log(gaspar);
/** 
 * @fecha: 28/12/2021
 *
 * History:
 *  - v1.0.0 – Primera entrega
*/


const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.productHero');

const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');

const overlay = document.querySelector('.overlay');
const lightbox = document.querySelector('.lightbox');



let lightboxGallery;
let lightboxHero;


gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});

btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);

heroImg.addEventListener('click', onHeroImgClick);



function onThumbClick(event) {
    gallery.forEach(img => {
        img.classList.remove('active');
    });

    event.target.parentElement.classList.add('active');

    heroImg.src = event.target.src.replace('thumb-', '');
}

function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setHeroImage(imageIndex) {
    heroImg.src = `../assets/images/image-product-${imageIndex}.jpg`;

    gallery.forEach(img => {
        img.classList.remove('active');
    });

    gallery[imageIndex - 1].classList.add('active');
}



function onHeroImgClick() {
    if (window.innerWidth >= 1440) {
        if (overlay.childElementCount == 1) {
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose);

            lightboxGallery = overlay.querySelectorAll('.pic');
            lightboxHero = overlay.querySelector('.productHero');
            lightboxGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLightbox);
            });

            const btnOverlayNext = overlay.querySelector('.next');
            const btnOverlayPrevious = overlay.querySelector('.previous');
            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
            btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
        }
        overlay.classList.remove('hidden');
    }
}

function onBtnOverlayClose() {
    overlay.classList.add('hidden');
}

function onThumbClickLightbox(event) {
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    event.target.parentElement.classList.add('active');
    lightboxHero.src = event.target.src.replace('image-product-', '');
}


function handleBtnClickNextOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
}

function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
}

function getOverlayCurrentImageIndex() {
    const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setOverlayHeroImage(imageIndex) {
    lightboxHero.src = `../assets/images/image-product-${imageIndex}.jpg`;

    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });

    lightboxGallery[imageIndex - 1].classList.add('active');
}
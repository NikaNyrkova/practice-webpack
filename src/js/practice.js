import images from '../data/gallery'
console.log(images);

const galleryListRef = document.querySelector('.js-gallery');
const galleryModalRef = document.querySelector('.js-lightbox');
const galleryImgRef = document.querySelector('.lightbox__image');
const overlayRef = document.querySelector('.lightbox__overlay');
const btnCloseRef = document.querySelector('.lightbox__button');
let currentIndex = 0;

galleryListRef.addEventListener('click', onOpenModal);
btnCloseRef.addEventListener('click', onCloseModal);

const galleryMarkup = createGalleryItemMarkup(images);
galleryListRef.insertAdjacentHTML('beforeend', galleryMarkup.join(''))

function createGalleryItemMarkup (images) {
    return images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
            </a>
        </li>`
    })
}

function onOpenModal(e) {
    if (e.target.localName !== 'img') {
        return
    }

    e.preventDefault();
    galleryModalRef.classList.add('is-open');
    galleryImgRef.src = e.target.dataset.source;

    for (let i = 0; i < galleryMarkup.length; i += 1) {
        if (galleryMarkup[i].includes(e.target.src)) {
            currentIndex = i;
            console.log(currentIndex);
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            onCloseModal()
        }
    })

    window.addEventListener('keydown', onArrowLeftClick);
    window.addEventListener('keydown', onArrowRightClick)

    overlayRef.addEventListener('click', () => {
        onCloseModal()
    })
}

function onCloseModal() {
    galleryModalRef.classList.remove('is-open');    
}

function onArrowLeftClick (e) {
    if (e.key === 'ArrowLeft') {
        if (currentIndex === 0) {
            currentIndex = images.length - 1;
            galleryImgRef.src = images[currentIndex].original;
            return;
        }
        currentIndex -= 1;
        galleryImgRef.src = images[currentIndex].original;
    }
}

function onArrowRightClick (e) {
    if (e.key === 'ArrowRight') {
        if (currentIndex === images.length - 1) {
            currentIndex = 0;
            galleryImgRef.src = images[currentIndex].original;
            return;
        }
        currentIndex += 1;
        galleryImgRef.src = images[currentIndex].original;
    }
}
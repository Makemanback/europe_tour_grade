// подмена почты

let mail = document.querySelector(".contacts__mail");
let changeMail = () => {
    if (window.innerWidth < 768) {
        mail.textContent = "Почта";
    } else {
        mail.textContent = "puteshestviemechta@gmail.ru";
    }
}

changeMail();
window.addEventListener("resize", changeMail);

// открытие меню
let openButton = document.querySelector(".header__menu-button");
let closeIcon = document.querySelector(".header__menu-close");
let openIcon = document.querySelector(".header__menu-open");

let menu = document.querySelector(".header__menu");

// блок путешествий
let trip = document.querySelector(".trip");

closeIcon.classList.add("visually-hidden");

let changeMenu = () => {
    if (window.innerWidth < 1200) {
        menu.classList.add("visually-hidden");
        openButton.classList.remove("visually-hidden");
    } else {
        menu.classList.remove("visually-hidden");
        openButton.classList.add("visually-hidden")
    }
}

let openMenu = () => {
    menu.classList.toggle("visually-hidden");
    openIcon.classList.toggle("visually-hidden");
    closeIcon.classList.toggle("visually-hidden");
    openButton.classList.toggle("header__menu-button-close");
    trip.classList.toggle("trip--js")
}

window.addEventListener("resize", changeMenu);

openButton.addEventListener("click", openMenu);

// открытие модального окна
let modalOrder = document.querySelector(".modal");
let buyButtons = document.querySelectorAll(".card__order");
let closeButton = document.querySelector(".modal__close");
let submitOrder = document.querySelector(".modal__submit");
let priceButtons = document.querySelectorAll(".price-block__order");

let numberModal = document.querySelector(".modal__number");
let mailModal = document.querySelector(".modal__mail");

let openModal = () => {
    modalOrder.classList.remove("visually-hidden")
    numberModal.focus();
}
let closeModal = () => {
    modalOrder.classList.add("visually-hidden");
}


buyButtons.forEach((button) => {
    button.addEventListener("click", openModal);
})
    
closeButton.addEventListener("click", closeModal);
document.addEventListener("esc", closeModal);

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        closeModal();
    }
});

submitOrder.addEventListener("submit", function(evt) {
    evt.preventDefault();
    if (!mailModal.value) {
        mailModal.setAttribute("style", "border-color: #FE7865; border-width: 1px");
        return
    }

    if (!numberModal.value) {
        numberModal.setAttribute("style", "border-color: #FE7865; border-width: 1px");
        return
    }

    modalOrder.classList.add("visually-hidden");
});

priceButtons.forEach((button) => {
    button.addEventListener("click", openModal)
})

// карточки посещений
let anchors = document.querySelectorAll(".places-description__anchor");
let cards = document.querySelectorAll(".card");

anchors.forEach((anchor) => {
    anchor.addEventListener("click", function(evt) {
        evt.preventDefault();
        cards.forEach((card) => {
            if (!(card.classList.contains("visually-hidden"))) {
                card.classList.add("visually-hidden")
            }
        });
        cards.forEach((card) => {
            if (card.children[0].children[0].textContent === evt.target.textContent) {
                card.classList.remove("visually-hidden");
            }
        })
    })
});

// обратная связь
let feedbackSubmit = document.querySelector(".feedback__submit");
let modalSuccess = document.querySelector(".success");
let successClose = document.querySelector(".success__close");

let closeSuccess = () => {
    modalSuccess.classList.add("visually-hidden")
};

feedbackSubmit.addEventListener("submit", function(evt) {
    evt.preventDefault();
    modalSuccess.classList.remove("visually-hidden");
});

successClose.addEventListener("click", closeSuccess);

// табы по карточкам с масками
let cardsMasks = document.querySelectorAll(".places__list-item");

cardsMasks.forEach((mask) => {
    mask.addEventListener("click", function(evt) {
        evt.preventDefault();
        cards.forEach((card) => {
            if (!(card.classList.contains("visually-hidden"))) {
                card.classList.add("visually-hidden")
            }
        });
        cards.forEach((card) => {
            if (card.children[0].children[0].textContent === evt.target.dataset.title) {
                card.classList.remove("visually-hidden");
            }
        })
    })
});
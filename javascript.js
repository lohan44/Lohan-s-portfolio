const formulaire = document.getElementById("formConnexion");
const champEmail = document.getElementById("email");
const champMdp = document.getElementById("mdp");
const erreurEmail = document.getElementById("erreurEmail");
const erreurMdp = document.getElementById("erreurMdp");
const messageSucces = document.getElementById("messageSucces");

function verifierEmail() {
    const email = champEmail.value.trim();
    const aArobase = email.includes("@");
    const aPointCom = email.includes(".com");

    if (email === "") {
        erreurEmail.textContent = "Veuillez entrer votre adresse mail.";
        champEmail.classList.add("invalide");
        return false;
    }

    if (!aArobase && !aPointCom) {
        erreurEmail.textContent = "Il manque le @ et le .com dans votre adresse mail.";
        champEmail.classList.add("invalide");
        return false;
    }

    if (!aArobase) {
        erreurEmail.textContent = "Il manque le @ dans votre adresse mail.";
        champEmail.classList.add("invalide");
        return false;
    }

    if (!aPointCom) {
        erreurEmail.textContent = "Il manque le .com dans votre adresse mail.";
        champEmail.classList.add("invalide");
        return false;
    }

    erreurEmail.textContent = "";
    champEmail.classList.remove("invalide");
    return true;
}

function verifierMdp() {
    if (champMdp.value === "") {
        erreurMdp.textContent = "Veuillez entrer votre mot de passe.";
        champMdp.classList.add("invalide");
        return false;
    }

    erreurMdp.textContent = "";
    champMdp.classList.remove("invalide");
    return true;
}

champEmail.addEventListener("input", function () {
    messageSucces.textContent = "";
    verifierEmail();
});

champMdp.addEventListener("input", function () {
    messageSucces.textContent = "";
    verifierMdp();
});

formulaire.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailValide = verifierEmail();
    const mdpValide = verifierMdp();

    if (emailValide && mdpValide) {
        messageSucces.textContent = "Connexion réussie !";
    } else {
        messageSucces.textContent = "";
    }
});

(function carrousel() {
    const zone = document.querySelector(".carrousel");
    const piste = document.querySelector(".piste");
    const slides = document.querySelectorAll(".slide");
    const conteneurPoints = document.querySelector(".points");
    const flecheGauche = document.querySelector(".fleche-gauche");
    const flecheDroite = document.querySelector(".fleche-droite");

    if (!zone || !piste || slides.length === 0) return;

    let index = 0;

    function aller(i) {
        index = (i + slides.length) % slides.length;
        piste.style.transform = "translateX(-" + index * 100 + "%)";
        conteneurPoints.querySelectorAll(".point").forEach(function (p, n) {
            p.classList.toggle("actif", n === index);
        });
    }

    slides.forEach(function (slide, i) {
        const point = document.createElement("button");
        point.type = "button";
        point.className = "point";
        point.setAttribute("aria-label", "Aller au projet " + (i + 1));
        point.addEventListener("click", function () {
            aller(i);
        });
        conteneurPoints.appendChild(point);
    });

    flecheGauche.addEventListener("click", function () {
        aller(index - 1);
    });

    flecheDroite.addEventListener("click", function () {
        aller(index + 1);
    });

    document.addEventListener("keydown", function (e) {
        const cible = e.target.tagName;
        if (cible === "INPUT" || cible === "TEXTAREA") return;
        if (e.key === "ArrowLeft") aller(index - 1);
        if (e.key === "ArrowRight") aller(index + 1);
    });

    let departX = 0;

    zone.addEventListener("touchstart", function (e) {
        departX = e.touches[0].clientX;
    });

    zone.addEventListener("touchend", function (e) {
        const ecart = e.changedTouches[0].clientX - departX;
        if (Math.abs(ecart) > 50) aller(ecart > 0 ? index - 1 : index + 1);
    });

    aller(0);
})();
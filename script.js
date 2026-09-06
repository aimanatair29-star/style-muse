/* =========================================
   STYLE MUSE
   INTERACTIVE FASHION STYLIST
========================================= */

const steps = [
    {
        key: "style",
        title: "Choose your style",
        description: "What kind of fashion mood are you feeling?",
        options: [
            ["✦", "Vintage", "Timeless & romantic"],
            ["◈", "Classic", "Elegant & polished"],
            ["♡", "Minimal", "Clean & effortless"],
            ["✺", "Boho", "Free & artistic"],
            ["✧", "Glam", "Bold & luxurious"],
            ["❀", "Soft Feminine", "Delicate & dreamy"]
        ]
    },

    {
        key: "colour",
        title: "Choose your colour palette",
        description: "Pick the colours that match your mood.",
        options: [
            ["☁", "Warm Neutrals", "Cream · beige · brown"],
            ["❀", "Soft Pastels", "Blush · lavender · blue"],
            ["◆", "Jewel Tones", "Emerald · ruby · sapphire"],
            ["◐", "Monochrome", "Black · white · grey"],
            ["❧", "Earthy", "Olive · rust · sand"],
            ["✦", "Rose & Gold", "Blush · rose · champagne"]
        ]
    },

    {
        key: "outfit",
        title: "Choose your outfit",
        description: "What do you want to wear?",
        options: [
            ["◌", "Saree", "Graceful & timeless"],
            ["✦", "Lehenga", "Festive & statement"],
            ["❀", "Anarkali", "Elegant & flowy"],
            ["◇", "Salwar Suit", "Classic & versatile"],
            ["♡", "Pakistani Suit", "Effortless & refined"],
            ["✧", "Kurta Set", "Modern ethnic"]
        ]
    },

    {
        key: "jewelry",
        title: "Choose your jewelry",
        description: "Complete the look with your signature pieces.",
        options: [
            ["✦", "Jhumkas", "Traditional statement"],
            ["◈", "Pearl Jewelry", "Soft & elegant"],
            ["◆", "Gold Jewelry", "Warm & luxurious"],
            ["♡", "Silver Jewelry", "Cool & delicate"],
            ["✺", "Statement Set", "Bold & glamorous"],
            ["○", "Minimal Jewelry", "Simple & refined"]
        ]
    },

    {
        key: "beauty",
        title: "Choose hair & makeup",
        description: "Pick the beauty mood for your look.",
        options: [
            ["❀", "Soft Glam", "Glowy & romantic"],
            ["✦", "Classic Bun", "Elegant & timeless"],
            ["♡", "Soft Waves", "Effortless & feminine"],
            ["◈", "Sleek Hair", "Modern & polished"],
            ["✺", "Bold Glam", "Defined & dramatic"],
            ["○", "Natural", "Fresh & effortless"]
        ]
    },

    {
        key: "occasion",
        title: "Choose your occasion",
        description: "Where are you wearing this look?",
        options: [
            ["✦", "College", "Comfortable & stylish"],
            ["❀", "Festive", "Traditional celebration"],
            ["◇", "Wedding", "Elegant occasion"],
            ["✺", "Party", "Statement evening"],
            ["♡", "Dinner", "Chic & sophisticated"],
            ["○", "Casual", "Easy everyday style"]
        ]
    }
];


/* =========================================
   APP STATE
========================================= */

let currentStep = 0;

let selections = {
    style: "",
    colour: "",
    outfit: "",
    jewelry: "",
    beauty: "",
    occasion: ""
};


/* =========================================
   ELEMENTS
========================================= */

const home = document.getElementById("home");
const stylist = document.getElementById("stylist");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const navCreate = document.getElementById("navCreate");

const optionsContainer = document.getElementById("options");

const stepNumber = document.getElementById("stepNumber");
const stepTitle = document.getElementById("stepTitle");
const stepDescription = document.getElementById("stepDescription");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

const restartBtn = document.getElementById("restartBtn");


/* =========================================
   START STYLIST
========================================= */

function startStylist() {

    home.style.display = "none";

    result.classList.remove("active");

    stylist.classList.add("active");

    currentStep = 0;

    renderStep();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   RENDER CURRENT STEP
========================================= */

function renderStep() {

    const step = steps[currentStep];

    stepNumber.textContent =
        `STEP ${String(currentStep + 1).padStart(2, "0")}`;

    stepTitle.textContent = step.title;

    stepDescription.textContent = step.description;

    optionsContainer.innerHTML = "";

    step.options.forEach((option, index) => {

        const card = document.createElement("div");

        card.className = "option";

        if (selections[step.key] === option[1]) {
            card.classList.add("selected");
        }

        card.innerHTML = `
            <div class="check">✓</div>

            <div class="option-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="option-icon">
                ${option[0]}
            </div>

            <h3>${option[1]}</h3>

            <p>${option[2]}</p>
        `;

        card.addEventListener("click", () => {

            selections[step.key] = option[1];

            document
                .querySelectorAll(".option")
                .forEach(item => {
                    item.classList.remove("selected");
                });

            card.classList.add("selected");

        });

        optionsContainer.appendChild(card);
    });

    updateProgress();

    if (currentStep === steps.length - 1) {

        nextBtn.textContent = "GENERATE MY LOOK ✦";

    } else {

        nextBtn.textContent = "CONTINUE →";

    }

}


/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

    const progressItems =
        document.querySelectorAll(".progress-item");

    progressItems.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index <= currentStep
        );

    });

}


/* =========================================
   NEXT
========================================= */

function nextStep() {

    const currentKey = steps[currentStep].key;

    if (!selections[currentKey]) {

        alert("Please choose an option first ✦");

        return;
    }

    if (currentStep < steps.length - 1) {

        currentStep++;

        renderStep();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        generateLook();

    }
}


/* =========================================
   BACK
========================================= */

function previousStep() {

    if (currentStep > 0) {

        currentStep--;

        renderStep();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        stylist.classList.remove("active");

        home.style.display = "grid";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
}


/* =========================================
   GENERATE LOOK
========================================= */

function generateLook() {

    stylist.classList.remove("active");

    result.classList.add("active");

    document.getElementById("resultStyle").textContent =
        selections.style;

    document.getElementById("resultColour").textContent =
        selections.colour;

    document.getElementById("resultOutfit").textContent =
        selections.outfit;

    document.getElementById("resultJewelry").textContent =
        selections.jewelry;

    document.getElementById("resultBeauty").textContent =
        selections.beauty;

    document.getElementById("resultOccasion").textContent =
        selections.occasion;

    document.getElementById("resultTitle").textContent =
        getResultTitle();

    document.getElementById("resultDescription").textContent =
        getResultDescription();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   RESULT TITLE
========================================= */

function getResultTitle() {

    const titles = {

        "Vintage": "The Vintage Muse",

        "Classic": "The Timeless Edit",

        "Minimal": "The Minimal Muse",

        "Boho": "The Bohemian Muse",

        "Glam": "The Glam Edit",

        "Soft Feminine": "The Romantic Muse"

    };

    return titles[selections.style] ||
        "Your Curated Look";
}


/* =========================================
   RESULT DESCRIPTION
========================================= */

function getResultDescription() {

    const style = selections.style;
    const colour = selections.colour;
    const outfit = selections.outfit;
    const jewelry = selections.jewelry;
    const beauty = selections.beauty;
    const occasion = selections.occasion;

    return `${style} styling meets ${colour} tones with a ${outfit} silhouette, ${jewelry}, and ${beauty}. This look is curated for a ${occasion} moment, keeping the overall mood elegant, personal and effortlessly you.`;
}


/* =========================================
   RESTART
========================================= */

function restart() {

    selections = {
        style: "",
        colour: "",
        outfit: "",
        jewelry: "",
        beauty: "",
        occasion: ""
    };

    currentStep = 0;

    result.classList.remove("active");

    stylist.classList.add("active");

    renderStep();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   BUTTON EVENTS
========================================= */

startBtn.addEventListener("click", startStylist);

navCreate.addEventListener("click", startStylist);

nextBtn.addEventListener("click", nextStep);

backBtn.addEventListener("click", previousStep);

restartBtn.addEventListener("click", restart);


/* =========================================
   INITIAL LOAD
========================================= */

renderStep();

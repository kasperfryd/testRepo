// State management
let currentAnswer = "";
let currentClueIndex = 0;
let currentCorrectAnswer = "";

// DOM elements
const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const submitButton = document.getElementById("submitButton");
const clueCard = document.getElementById("clueCard");
const title = document.getElementById("title");
const clueText = document.getElementById("clueText");
const badge = document.getElementById("badge");

const clues = [
  {
    clue: "Det første sted vi mødtes?",
    answer: "susan",
    title: "Skattejagten begynder",
    location: "Vesterbro",
  },
  {
    clue: "Det første sted vi spiste sammen i solen?",
    answer: "anlægget",
    title: "",
    location: "Østre Anlæg",
  },
  {
    clue: "Det sted vi spiste sammen i kulden",
    answer: "skanseparken",
    title: "",
    location: "Skanseparken",
  },
];

// Handle form submission
answerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userAnswer = answerInput.value.toLowerCase().trim();

  if (userAnswer === currentCorrectAnswer.toLowerCase()) {
    // Correct answer
    handleCorrectAnswer();
  } else {
    // Wrong answer
    handleWrongAnswer();
  }
});

// Handle correct answer
function handleCorrectAnswer() {
  // Update button text
  submitButton.textContent = "Korrekt!";

  // Add bounce animation
  clueCard.classList.add("bounce");

  // Reset after 2 seconds
  setTimeout(() => {
    submitButton.textContent = "Indtast svar";
    clueCard.classList.remove("bounce");
    answerInput.value = "";
    currentClueIndex++;
    if (currentClueIndex >= 3) {
      winGame();
    } else updateClue(clues[currentClueIndex].clue, clues[currentClueIndex].answer);
  }, 2000);
}

// Handle wrong answer
function handleWrongAnswer() {
  // Add shake animation
  clueCard.classList.add("shake");

  // Remove shake animation after 500ms
  setTimeout(() => {
    clueCard.classList.remove("shake");
  }, 500);
}

// Optional: Update clue dynamically
function updateClue(newClue, newAnswer) {
  badge.textContent = `location`;
  clueText.textContent = `"${newClue}"`;
  submitButton.textContent = "Indtast svar";
  title.textContent = clues[currentClueIndex].title;
  badge.textContent = clues[currentClueIndex].location;
  currentCorrectAnswer = newAnswer;
  answerInput.value = "";
}

function winGame() {
  clueText.textContent = `"Tillykke! Hvor er du god! Du har fundet alle mindestederne og løst fødselsdags skattejagten. Jeg glæder mig til at skulle på eventyr med dig - De kærligste hilsner. Din Kasper"`;
  badge.textContent = `Færdig`;
  submitButton.setAttribute("disabled", true);
  answerForm.style.display = "none";
}

updateClue(clues[currentClueIndex].clue, clues[currentClueIndex].answer);

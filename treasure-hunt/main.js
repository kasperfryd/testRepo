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
    clue: `
    <h3>Ledetråd:</h3>
    <i>    En efterårsdag i det forrige år, hvor solen på himmelen så flot den står. 
    <br/>  Blandt buske og træer, søer og svaner, fik to gode folk lidt godt til deres ganer. 
    <br/>  Der sad de på noget af træ, med udsigt til fugle og kræ. 
    <br/>  Bag tre symbolske og store sten, der finder du noget ved træets ben.
    <br/>
    </i>
    <br/>
    <br/>
    <p>   I en fin lille flaske er jeg gemt, ved et mindested jeg ikke har glemt.
    <br/> Der ligger en overraskelse til dig. 
    <br/> Hvis du altså kan finde mig?
    </p>`,
    answer: "dansemusen",
    title: "Skattejagten begynder",
    location: "57.04473711426327, 9.941844200336886",
  },
  {
    clue: `
    <h3>Ledetråd:</h3>
    <i>    En sensommer dag hvor fuglene sang, mødtes de to for første gang. 
    <br/>  En kold i øl i solen var den bedste menu, når to gode folk søger hjerte ly. 
    <br/>  Der fandt de hinanden, de skulle ses igen, for den dag fandt de begge en hjerte ven.
    <br/>. Bag denne cafe skal du kigge dig for, måske jeg er gemt under et potte skår.
    </i>
    <br/>
    <br/>
    <p>   I en fin lille flaske er jeg gemt, ved et mindested jeg ikke har glemt.
    <br/> Der ligger en overraskelse til dig. 
    <br/> Hvis du altså kan finde mig?
    </p>`,
    answer: "springålen",
    title: "Eventyret fortsætter",
    location: "57.048979086168195, 9.91583864897912",
  },
  {
    clue: `
    <h3>Ledetråd:</h3>
    <i>    En vinterdag hvor sneen dækkede landet, fik de en idé der ikke lignede alt andet. 
    <br/>  Med trangia i sækken og vadende ben, besteg de fluks et bjerg uden sten. 
    <br/>  Der lavede de mad i de hyggeligste kår, en skøn begyndelse på det nye år.
    <br/>  Et træ blandt mange er kæmpestor, ved foden af dette findes et nøgleord.
    </i>
    <br/>
    <br/>
    <p>   I en fin lille flaske er jeg gemt, ved et mindested jeg ikke har glemt.
    <br/> Der ligger en overraskelse til dig. 
    <br/> Hvis du altså kan finde mig?
    </p>`,
    answer: "babysælen",
    title: "Den store finale",
    location: "57.062756008414034, 9.927630464759659",
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
  clueText.innerHTML = newClue;
  submitButton.textContent = "Indtast svar";
  title.textContent = clues[currentClueIndex].title;
  badge.textContent = clues[currentClueIndex].location;
  currentCorrectAnswer = newAnswer;
  answerInput.value = "";
}

function winGame() {
  clueText.innerHTML = `<h3>Tillykke!</h3> <p>Hvor er du god! Du har fundet alle mindestederne og løst fødselsdags skattejagten.<br/> Jeg glæder mig til at skulle på eventyr med dig <br/> De kærligste hilsner <br/> Din Kasper"`;
  badge.textContent = `Færdig`;
  submitButton.setAttribute("disabled", true);
  answerForm.style.display = "none";
}

updateClue(clues[currentClueIndex].clue, clues[currentClueIndex].answer);

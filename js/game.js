let currentQuestion = 0;
let score = 0;
let questionNumber = document.getElementById("question-number");
let scoreDisplay = document.getElementById("score");
let questionText = document.getElementById("question-text");
let optionsContainer = document.getElementById("options");
let feedbackElement = document.getElementById("feedback");
let nextButton = document.getElementById("next-btn");

function initGame() {
  showQuestion(currentQuestion);
  nextButton.style.display = "none";
}

// Display the current question
function showQuestion(index) {
  questionNumber.textContent = `Question ${index + 1}/10`;
  questionText.textContent = questions[index].question;

  optionsContainer.innerHTML = "";

  questions[index].options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(option));
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selected) {
  const correct = selected === questions[currentQuestion].correctAnswer;

  if (correct) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    feedbackElement.textContent = "Correct!";
    feedbackElement.className = "feedback correct";
  } else {
    feedbackElement.textContent =
      "Wrong! The correct answer is " +
      questions[currentQuestion].correctAnswer;
    feedbackElement.className = "feedback incorrect";
  }

  // Disable all option buttons
  Array.from(optionsContainer.children).forEach((button) => {
    button.disabled = true;
    if (button.textContent === questions[currentQuestion].correctAnswer) {
      button.classList.add("correct-answer");
    } else if (button.textContent === selected && !correct) {
      button.classList.add("wrong-answer");
    }
  });

  nextButton.style.display = "block";
}

// Go to next question or end game
nextButton.addEventListener("click", () => {
  feedbackElement.textContent = "";
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
    nextButton.style.display = "none";
  } else {
    // Game over, redirect based on score
    if (score >= 7) {
      localStorage.setItem("finalScore", score);
      window.location.href = "win.html";
    } else {
      localStorage.setItem("finalScore", score);
      window.location.href = "lose.html";
    }
  }
});

// Start the game when page loads
window.addEventListener("load", initGame);

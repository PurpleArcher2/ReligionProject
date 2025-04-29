let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 12; // Changed from 10 to 12 seconds
let questionNumber = document.getElementById("question-number");
let scoreDisplay = document.getElementById("score");
let questionText = document.getElementById("question-text");
let optionsContainer = document.getElementById("options");
let feedbackElement = document.getElementById("feedback");
let nextButton = document.getElementById("next-btn");
let timerDisplay = document.getElementById("timer");
let timerBar = document.getElementById("timer-bar");

// Sound effects for timer
const tickSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"
);
const timeUpSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/557/557-preview.mp3"
);

function initGame() {
  // Create container for timer if it doesn't exist
  if (!document.getElementById("timer-container")) {
    const timerContainer = document.createElement("div");
    timerContainer.id = "timer-container";

    const timerBarElement = document.createElement("div");
    timerBarElement.id = "timer-bar";

    const timerDisplayElement = document.createElement("div");
    timerDisplayElement.id = "timer";
    timerDisplayElement.textContent = "12s";

    timerContainer.appendChild(timerBarElement);
    timerContainer.appendChild(timerDisplayElement);

    // We'll handle this differently - no longer inserting after question number
    // Instead we'll reorganize the stats container in HTML
  }

  showQuestion(currentQuestion);
  nextButton.style.display = "none";
  scoreDisplay.textContent = `Score: ${score}`;
}

// Display the current question
function showQuestion(index) {
  questionNumber.textContent = `Question ${index + 1}/10`;
  questionText.textContent = questions[index].question;

  // Reset timer for new question
  timeLeft = 12; // Changed from 10 to 12
  timerDisplay.textContent = `Time: ${timeLeft}`;
  startTimer();

  optionsContainer.innerHTML = "";

  questions[index].options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(option));
    optionsContainer.appendChild(button);
  });
}

function startTimer() {
  // Clear any existing timer
  clearInterval(timer);

  // Reset timer bar
  timerBar.style.width = "100%";
  timerBar.style.backgroundColor = "#4CAF50";
  timerDisplay.style.fontSize = "1em";
  timerDisplay.style.color = "#000";
  timerDisplay.style.textShadow = "none";

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;

    // Update timer bar
    const percentLeft = (timeLeft / 12) * 100; // Changed from 10 to 12
    timerBar.style.width = `${percentLeft}%`;

    // Make countdown more intense as time decreases
    if (timeLeft <= 6) {
      // Changed from 5 to 6 (half of 12)
      // Change color to yellow at 6 seconds
      timerBar.style.backgroundColor = "#FFC107";

      // Play tick sound
      tickSound.play();

      // Make text more visible
      timerDisplay.style.fontWeight = "bold";
    }

    if (timeLeft <= 5) {
      // Change color to red at 3 seconds
      timerBar.style.backgroundColor = "#F44336";W

      // Make text larger and white with text shadow for better visibility
      timerDisplay.style.fontSize = "1.3em";
      timerDisplay.style.color = "#D70040";
      timerDisplay.style.textShadow = "0 0 3px #D70040";

      // Add pulse animation
      timerDisplay.style.animation = "pulse 0.5s infinite";
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      timeUpSound.play();
      timeOut();
      timerDisplay.style.color = "#D70040";
    }
  }, 1000);
}

function timeOut() {
  // Handle when time runs out
  feedbackElement.textContent = `TIME'S UP! The correct answer was ${questions[currentQuestion].correctAnswer}`;
  feedbackElement.className = "feedback incorrect";

  // Reset timer display animation
  timerDisplay.style.animation = "none";
  timerDisplay.style.fontSize = "1em";
  timerDisplay.style.color = "#000";

  // Highlight the correct answer
  Array.from(optionsContainer.children).forEach((button) => {
    button.disabled = true;
    if (button.textContent === questions[currentQuestion].correctAnswer) {
      button.classList.add("correct-answer");
    }
  });

  nextButton.style.display = "block";
}

function selectAnswer(selected) {
  // Stop the timer when an answer is selected
  clearInterval(timer);

  // Reset timer display animation
  timerDisplay.style.animation = "none";
  timerDisplay.style.fontSize = "1em";
  timerDisplay.style.color = "#000";

  const correct = selected === questions[currentQuestion].correctAnswer;

  if (correct) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    feedbackElement.textContent = "Correct!";
    feedbackElement.className = "feedback correct";
    // Play correct answer sound
    new Audio(
      "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3"
    ).play();
  } else {
    feedbackElement.textContent =
      "Wrong! The correct answer is " +
      questions[currentQuestion].correctAnswer;
    feedbackElement.className = "feedback incorrect";
    // Play incorrect answer sound
    new Audio(
      "https://assets.mixkit.co/active_storage/sfx/240/240-preview.mp3"
    ).play();
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

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

#timer-container {
  position: relative;
  width: 100%;
  height: 30px;
  margin: 10px 0;
}

#timer {
  position: relative;
  z-index: 2;
  text-align: center;
  font-weight: bold;
  transition: color 0.3s, font-size 0.3s, text-shadow 0.3s;
  padding: 5px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

#timer-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #4CAF50;
  transition: width 1s linear, background-color 0.5s;
  z-index: 1;
  border-radius: 4px;
}

.option-btn {
  transition: transform 0.2s;
}

.option-btn:hover {
  transform: scale(1.05);
}

.correct-answer {
  animation: pulse 0.5s;
}

.wrong-answer {
  animation: shake 0.5s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

/* New styles for the rearranged stats layout */
.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
}

.stats > * {
  flex: 1;
  text-align: center;
}

.stats > *:first-child {
  text-align: left;
}

.stats > *:last-child {
  text-align: right;
}
`;
document.head.appendChild(style);

window.addEventListener("load", () => {
  const statsContainer = document.querySelector(".stats");
  if (statsContainer) {
    statsContainer.innerHTML = "";

    const questionNumberElement = document.createElement("span");
    questionNumberElement.id = "question-number";
    questionNumberElement.textContent = "Question 1/10";

    const scoreElement = document.createElement("span");
    scoreElement.id = "score";
    scoreElement.textContent = "Score: 0";

    const timerContainer = document.createElement("div");
    timerContainer.id = "timer-container";

    const timerBarElement = document.createElement("div");
    timerBarElement.id = "timer-bar";

    const timerDisplayElement = document.createElement("div");
    timerDisplayElement.id = "timer";
    timerDisplayElement.textContent = "12s";

    timerContainer.appendChild(timerBarElement);
    timerContainer.appendChild(timerDisplayElement);

    statsContainer.appendChild(questionNumberElement);
    statsContainer.appendChild(scoreElement);
    statsContainer.appendChild(timerContainer);

    questionNumber = document.getElementById("question-number");
    scoreDisplay = document.getElementById("score");
    timerDisplay = document.getElementById("timer");
    timerBar = document.getElementById("timer-bar");
  }

  initGame();
});

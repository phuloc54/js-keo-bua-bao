const VALUES = [
  { id: "scissors", value: "✌" },
  { id: "rock", value: "✊" },
  { id: "paper", value: "✋" },
];

let i = 0;

function changeInComputer() {
  const computer = document.querySelector(".computer");
  if (!computer) return;

  if (i === VALUES.length) {
    i = 0;
  } else {
    computer.textContent = VALUES[i].value;
    computer.dataset.selection = VALUES[i].id;
    i++;
  }
}

let intervalId = setInterval(changeInComputer, 100);

function addEventForCellPlayer() {
  const btnPlayerList = document.querySelectorAll(".btn.user");
  if (!btnPlayerList) return;

  for (const btn of btnPlayerList) {
    btn.addEventListener("click", () => {
      clearInterval(intervalId);
      checkWin(btn);
    });
  }
}

function checkWin(btn) {
  if (!btn) return;

  btn.classList.add("active");

  // Has 1 cell is clicked -> cannot clicked any other cells
  document.querySelectorAll(".btn.user").forEach((item) => (item.style.pointerEvents = "none"));

  const userSelection = btn.id;

  const computer = document.querySelector(".computer");
  if (!computer) return;

  const computerSelection = computer.dataset.selection;

  const flagUserWin = compare(userSelection, computerSelection);

  // show play again button
  showButtonPlayAgain();

  // btn show result of game
  const notificationElement = document.querySelector(".notification");
  notificationElement.classList.remove("d-none");
  const alertElement = notificationElement.querySelector(".alert");

  if (flagUserWin === 1) {
    alertElement.classList.add("alert-success");
    alertElement.textContent = "You win!!!";
  } else if (flagUserWin === -1) {
    alertElement.classList.add("alert-danger");
    alertElement.textContent = "You lose...";
  } else {
    alertElement.classList.add("alert-dark");
    alertElement.textContent = "You draw...";
  }
}

function showButtonPlayAgain() {
  const btnPlayAgain = document.querySelector(".play-again");
  if (btnPlayAgain) {
    btnPlayAgain.classList.remove("d-none");
  }
}

function hideButtonPlayAgain() {
  const btnPlayAgain = document.querySelector(".play-again");
  if (btnPlayAgain) {
    btnPlayAgain.classList.add("d-none");
  }
}

function compare(userSelection, computerSelection) {
  // 1: win, 0: hoa, -1: lose

  switch (userSelection) {
    case "scissors": {
      if (computerSelection === "paper") return 1;
      if (computerSelection === "rock") return -1;
      return 0;
    }
    case "paper": {
      if (computerSelection === "rock") return 1;
      if (computerSelection === "scissors") return -1;
      return 0;
    }

    case "rock": {
      if (computerSelection === "scissors") return 1;
      if (computerSelection === "paper") return -1;
      return 0;
    }

    default:
      throw new Error("Invalid selection of user!");
  }
}

function addEventForPlayAgainButton() {
  const btnPlayAgain = document.querySelector(".play-again");
  if (!btnPlayAgain) return;
  btnPlayAgain.addEventListener("click", resetGame);
}

function resetGame() {
  // Re-start setInterval
  intervalId = setInterval(changeInComputer, 100);

  // Reset DOM
  // 1. Remove class btn user active
  removeClassActiveBtn();
  // 2. hide play again button
  hideButtonPlayAgain();
  // 3. hide alert status of game
  resetAlertStatusOfGame();

  // 4. Allow click on cell
  document.querySelectorAll(".btn.user").forEach((item) => (item.style.pointerEvents = ""));
}

function removeClassActiveBtn() {
  const btnActive = document.querySelector(".btn.user.active");
  if (btnActive) btnActive.classList.remove("active");
}

function resetAlertStatusOfGame() {
  const notificationElement = document.querySelector(".notification");
  if (notificationElement) notificationElement.classList.remove("d-none");

  const alertElement = notificationElement.querySelector(".alert");
  if (alertElement) {
    alertElement.classList.remove("alert-success", "alert-dark", "alert-danger");
    alertElement.textContent = "";
  }
}

// Main
(() => {
  addEventForCellPlayer();
  addEventForPlayAgainButton();
})();

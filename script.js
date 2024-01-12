// Define variables to store current input and results
let currentInput = "0";
let previousInput = "0";
let operator = null;
let answered = false;
let historyList = [];

// Function to update the display
function updateDisplay() {
  document.getElementById("display").innerText = currentInput;
}

function endsWithOperator() {
  const operators = ["+", "-", "*", "/"];
  const trimmedExpression = fullExpression.trim();

  for (const operator of operators) {
    if (trimmedExpression.endsWith(operator)) {
      return true;
    }
  }

  return false;
}

function calculate() {
  let result = 0;
  if (operator == null && previousInput == "0") return;
  switch (operator) {
    case "+":
      result = parseFloat(previousInput) + parseFloat(currentInput);
      break;
    case "-":
      result = parseFloat(previousInput) - parseFloat(currentInput);
      break;
    case "*":
      result = parseFloat(previousInput) * parseFloat(currentInput);
      break;
    case "/":
      if (parseFloat(currentInput) !== 0) {
        result = parseFloat(previousInput) / parseFloat(currentInput);
      } else {
        alert("Error: Division by zero");
        resetCalculator();
        return;
      }
      break;
  }
  currentInput = result.toString();
  operator = null;
  historyList.push(fullExpression + " = " + currentInput);
  updateHistoryList();
  updateDisplay();
}

// Function to reset calculator variables
function resetCalculator() {
  currentInput = "0";
  previousInput = "0";
  operator = null;
}

// Add event listeners for button clicks
document
  .getElementById("calculator")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("number")) {
      inputDigit(event.target.innerText);
    } else if (event.target.classList.contains("operator")) {
      setOperator(event.target.innerText);
    } else if (event.target.id === "equals") {
      handleEquals();
    } else if (event.target.id === "clear") {
      clearCalculator();
    }
  });

let fullExpression = "";

// Function to update the full expression display
function updateFullExpression() {
  document.getElementById("fullExpression").innerText = fullExpression;
}

// Function to handle numeric button clicks
function inputDigit(digit) {
  if (answered) {
    currentInput = "0";
  }
  currentInput = currentInput === "0" ? digit : currentInput + digit;
  fullExpression += digit;
  answered = false;
  updateDisplay();
  updateFullExpression();
}

// Functions to handle operation button clicks
function setOperator(op) {
  if (operator !== null) {
    calculate();
  }
  previousInput = currentInput;
  currentInput = "0";
  operator = op;
  fullExpression += ` ${op} `;
  updateFullExpression();
}

function handleEquals() {
  calculate();
  fullExpression = `${fullExpression} = ${currentInput}`;
  updateFullExpression(true); // Passing true to indicate bold
  fullExpression = "";
  answered = true;
  updateDisplay();
}

// Function to handle clear button click
function clearCalculator() {
  resetCalculator();
  fullExpression = "";
  updateFullExpression(false); // Passing false to indicate not bold
  updateDisplay();
}

// Function to update the full expression display
function updateFullExpression(isBold) {
  const fullExpressionElement = document.getElementById("fullExpression");
  fullExpressionElement.innerHTML = isBold
    ? `<b>${fullExpression}</b>`
    : fullExpression;
}

function updateHistoryList() {
  const historyListElement = document.getElementById("history-list");
  historyListElement.innerHTML = "";
  for (const historyItem of historyList) {
    const li = document.createElement("li");
    li.innerText = historyItem;
    historyListElement.appendChild(li);
  }
}

// Function to add a new note
function addNote() {
  const noteInput = document.getElementById("note-input").value;
  if (noteInput.trim() !== "") {
    const noteList = document.getElementById("note-list");
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${noteInput}</span>
            <div>
                <button onclick="editNote(this)">
                    <img src="static/edit.png" style="height: 16px;" alt="edit">
                </button>
                <button onclick="deleteNote(this)">
                    <img src="static/delete.png" style="height: 16px;" alt="delete">
                </button>
            </div>
        `;
    noteList.appendChild(li);
    document.getElementById("note-input").value = "";
  }
}

// Function to edit a note
function editNote(button) {
  const li = button.parentElement.parentElement;
  const span = li.querySelector("span");
  const newText = prompt("Edit note:", span.textContent);
  if (newText !== null) {
    span.textContent = newText;
  }
}

// Function to delete a note
function deleteNote(button) {
  const li = button.parentElement.parentElement;
  li.remove();
}

// Function to clear all notes
function clearNotes() {
  const noteList = document.getElementById("note-list");
  while (noteList.firstChild) {
    noteList.removeChild(noteList.firstChild);
  }
}

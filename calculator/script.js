const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove("is-depressed")
    );

    if (!action) {
      if (displayedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKey = "number";
    }

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-depressed");
      //Clearing first operator is-depressed
      calculator.dataset.previousKeyType = "operator";
      //Storing first number
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;

      if (firstValue && operator && previousKeyType == "operator") {
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      display.textContent = displayedNum + keyContent;

      //Checks to see if a demical exists and stops from adding another
      if (displayedNum.includes(".")) {
        display.textContent = displayedNum;
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKey = "decimal";
    }

    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      const calculate = (n1, operator, n2) => {
        let result = "";

        if (operator === "add") {
          result = parseFloat(n1) + parseFloat(n2);
        } else if (operator === "subtract") {
          result = parseFloat(n1) - parseFloat(n2);
        } else if (operator === "multiply") {
          result = parseFloat(n1) * parseFloat(n2);
        } else if (operator === "divide") {
          result = parseFloat(n1) / parseFloat(n2);
        }

        calculator.dataset.previousKeyType = "calculate";

        return result;
      };

      display.textContent = calculate(firstValue, operator, secondValue);
    }

    if (action === "clear") {
      calculator.dataset.previousKeyType = "clear";

      calculator.dataset.firstValue = "0";
      calculator.dataset.operator = undefined;
      display.textContent = "0";
    }
  }
});

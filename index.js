class Calculator {
  constructor(currentOperandEl, previousOperandEl) {
    this.currentOperandEl = currentOperandEl;
    this.previousOperandEl = previousOperandEl;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = "";
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  insertNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  calculate() {
    let result;

    const floatCurrentOp = parseFloat(this.currentOperand);
    const floatPreviousOp = parseFloat(this.previousOperand);

    switch (this.operator) {
      case "x":
        result = floatCurrentOp * floatPreviousOp;
        break;
      case "/":
        result = floatPreviousOp / floatCurrentOp  ;
        break;
      case "+":
        result = floatCurrentOp + floatPreviousOp;
        break;
      case "-":
        result = floatPreviousOp - floatCurrentOp  ;
        break;
      case "%":
        result = (floatCurrentOp / 100)  * floatPreviousOp;
        break;
      default:
        return;
    }
    if(isNaN(result) ) {
       
        this.currentOperand = 'Error'
      
        return;
        
    }
    this.currentOperand = result;


    this.previousOperand = "";
    this.operator = "";
   
  }

  selectOperation(operator) {
    if (operator === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  
  }

  updateUI() {
    this.currentOperandEl.value = this.currentOperand;

    this.previousOperandEl.value = this.previousOperand + " " + this.operator;
  }
}

/* elements from the DOM */

const previousOperandEl = document.querySelector("[data-previous-operand]");
const currentOperandEl = document.querySelector("[data-current-operand]");

const allClear = document.querySelector("[data-all-clear]");
const dataDelete = document.querySelector("[data-delete]");
const dataEquals = document.querySelector("[data-equals]");
const dataOperators = document.querySelectorAll("[data-operator]");
const dataNumbers = document.querySelectorAll("[data-number]");

/* instantiate new CALCULATOR class */
const calc = new Calculator(currentOperandEl, previousOperandEl);

/* EVENTS */

//delete event listener
dataDelete.onclick = (e) => {
  calc.delete();
  calc.updateUI();
};

//all clear button event listener
allClear.onclick = (e) => {
  calc.clear();
  calc.updateUI();
};

//number buttons event listener
dataNumbers.forEach((dataNumber) => {
  dataNumber.onclick = (e) => {
    calc.insertNumber(e.target.textContent);
    calc.updateUI();
  };
});

//operators event listener
dataOperators.forEach((dataOperator) => {
  dataOperator.onclick = (e) => {
    calc.selectOperation(e.target.textContent);
    calc.updateUI();
  };
});

//equals event listener
dataEquals.onclick = (e) => {
  calc.calculate();
  calc.updateUI();
};

document.addEventListener("DOMContentLoaded", (e) => {
  calc.clear();
  calc.updateUI();
});

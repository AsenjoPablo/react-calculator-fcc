import { useState } from "react";
import "../styles/Calculator.css";

const Calculator = (props) => {
  const [display, setDisplay] = useState("0");
  const [operationMode, setOperationMode] = useState(false);
  const [currentOperation, setCurrentOperation] = useState("");
  const [firstNum, setFirstNum] = useState(0);
  const [prevSol, setPrevSol] = useState(0);
  const [addedDecimal, setAddedDecimal] = useState(false);

  const handleClear = () => {
    setOperationMode(false);
    setCurrentOperation("");
    setAddedDecimal(false);
  };

  const hardClear = () => {
    setDisplay("0");
    setPrevSol(0);
    setOperationMode(false);
    setCurrentOperation("");
    setAddedDecimal(false);
  };

  const handleDisplay = (value) => {
    // prevents multiple zero
    if (value === 0 && display === "0") {
      setDisplay("0");
    } else {
      if (display === "0") {
        if (display.length < 21) {
          // removes zero, adds as a first number
          setDisplay(value.toString());

          if (!operationMode) {
            setFirstNum(display + value.toString());
          }
        }
      } else {
        if (display.length < 21) {
          // keeps previous number, adds next
          setDisplay(display + value.toString());

          if (!operationMode) {
            setFirstNum(display + value.toString());
          }
        } else {
          setDisplay("Too many numbers!");
        }
      }
    }
  };

  const handleDecimal = () => {
    // checks if last char is not a dot
    if (display.charAt(display.length - 1) !== "." && !addedDecimal) {
      setDisplay(display + ".");
      setAddedDecimal(true);
    }
  };

  const handleOperation = (value) => {
    // if there is no first value, previous solution is added as first number
    if (!operationMode && display === "0") {
      setDisplay(prevSol + value);
      setOperationMode(true);
      handleOperationType(value);
      // added so we can add more decimal numbers
      setAddedDecimal(false);
    } else if (!operationMode) {
      setDisplay(display + value);
      setOperationMode(true);
      handleOperationType(value);
      // added so we can add more decimal numbers
      setAddedDecimal(false);

      // PENDIENTE: GESTIÓN DE MULTIPLICACIONES CON NÚMEROS NEGATIVOS
    } else if (operationMode) {
      if (value !== "-") {
        if (
          display.charAt(display.length - 1) === "*" ||
          display.charAt(display.length - 1) === "+" ||
          display.charAt(display.length - 1) === "-" ||
          display.charAt(display.length - 1) === "/"
        ) {
          setDisplay(display.slice(0, display.length - 1) + value);
          handleOperationType(value);
        }
      } else {
        setDisplay(display + "-");
      }
    }
  };

  const handleOperationType = (value) => {
    switch (value) {
      case "+":
        setCurrentOperation("+");
        break;
      case "-":
        setCurrentOperation("-");
        break;
      case "*":
        setCurrentOperation("*");
        break;
      case "/":
        setCurrentOperation("/");
        break;

      default:
        console.log("No operation defined");
        break;
    }
  };

  const handleSolution = () => {
    let num1;
    if (firstNum === 0) {
      num1 = prevSol;
    } else {
      num1 = Number(firstNum);
    }

    // decimal checker
    let ind;
    if (addedDecimal) {
      ind = display.search(/[0-9]\.[0-9]+$/g);
    } else {
      ind = display.search(/[0-9]+$/g);
    }

    // this will get the index of the second number and assign it to num2
    let num2 = Number(display.slice(ind));

    let result;

    switch (currentOperation) {
      case "+":
        result = num1 + num2;
        setDisplay(result);
        setPrevSol(result);
        handleClear();

        // reset everything but not displayed numbers
        setOperationMode(false);
        setCurrentOperation("");
        setFirstNum(0);
        break;
      case "-":
        result = num1 - num2;
        setDisplay(result);
        setPrevSol(result);
        handleClear();

        // reset everything but not displayed numbers
        setOperationMode(false);
        setCurrentOperation("");
        setFirstNum(0);
        break;
      case "*":
        // checker for negative numbers
        if (display.indexOf("*") > 0 && display.indexOf("-") > 0) {
          num2 = -num2;
        }

        result = num1 * num2;
        setDisplay(result);
        setPrevSol(result);
        handleClear();

        // reset everything but not displayed numbers
        setOperationMode(false);
        setCurrentOperation("");
        setFirstNum(0);
        break;
      case "/":
        result = num1 / num2;
        setDisplay(result);
        setPrevSol(result);
        handleClear();

        // reset everything but not displayed numbers
        setOperationMode(false);
        setCurrentOperation("");
        setFirstNum(0);
        break;

      default:
        break;
    }
  };

  return (
    <div id="button-container">
      <div id="prevsol">S: {prevSol}</div>
      <div id="display">{display}</div>

      {
        // reset row
      }
      <button
        onClick={() => hardClear()}
        className="number-button button"
        id="clear"
      >
        C
      </button>

      <button
        onClick={() => handleSolution()}
        className="number-button button"
        id="equals"
      >
        =
      </button>

      {
        // first row
      }
      <button
        onClick={() => handleDisplay(7)}
        className="number-button button"
        id="seven"
      >
        7
      </button>
      <button
        onClick={() => handleDisplay(8)}
        className="number-button button"
        id="eight"
      >
        8
      </button>
      <button
        onClick={() => handleDisplay(9)}
        className="number-button button"
        id="nine"
      >
        9
      </button>
      <button
        onClick={() => handleOperation("+")}
        className="operation-button button"
        id="add"
      >
        +
      </button>

      {
        // second row
      }
      <button
        onClick={() => handleDisplay(4)}
        className="number-button button"
        id="four"
      >
        4
      </button>
      <button
        onClick={() => handleDisplay(5)}
        className="number-button button"
        id="five"
      >
        5
      </button>
      <button
        onClick={() => handleDisplay(6)}
        className="number-button button"
        id="six"
      >
        6
      </button>
      <button
        onClick={() => handleOperation("-")}
        className="operation-button button"
        id="subtract"
      >
        -
      </button>

      {
        // third row
      }
      <button
        onClick={() => handleDisplay(1)}
        className="number-button button"
        id="one"
      >
        1
      </button>
      <button
        onClick={() => handleDisplay(2)}
        className="number-button button"
        id="two"
      >
        2
      </button>
      <button
        onClick={() => handleDisplay(3)}
        className="number-button button"
        id="three"
      >
        3
      </button>
      <button
        onClick={() => handleOperation("*")}
        className="operation-button button"
        id="multiply"
      >
        *
      </button>

      {
        // fourth row
      }
      <button
        onClick={() => handleDisplay(0)}
        className="number-button button"
        id="zero"
      >
        0
      </button>
      <button
        onClick={() => handleDecimal()}
        className="operation-button button"
        id="decimal"
      >
        .
      </button>
      <button
        onClick={() => handleOperation("/")}
        className="operation-button button"
        id="divide"
      >
        /
      </button>
    </div>
  );
};

export default Calculator;

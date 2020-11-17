import { useState } from "react";
import "../styles/Calculator.css";

const Calculator = (props) => {
  const [display, setDisplay] = useState("0");
  const [addedDecimal, setAddedDecimal] = useState(false);

  const hardClear = () => {
    setDisplay("0");
    setAddedDecimal(false);
  };

  const addNumber = (number) => {
    // this prevents starting with more than one zero
    if (display === "0" && number === 0) {
      console.log("Starting with a 0");
      setDisplay("0");

      // this will prevent from starting with 08 with no decimal
    } else if (display === "0") {
      setDisplay(number);

      // this will just add the number
    } else {
      setDisplay(display + number.toString());
    }
  };

  const handleDecimal = () => {
    // if last char is a ".", it won't add anything
    if (!addedDecimal) {
      setDisplay(display + ".");
      setAddedDecimal(true);
      console.log("Decimal deactivated");
    }
  };

  const handleOperation = (operator) => {
    setDisplay(display + operator);
    setAddedDecimal(false);
    console.log("Decimal activated");
  };

  const handleSolution = () => {
    // replacing "invalid" operator combinations
    let replacedStr = display.replace(/\W+\+/g, "+");
    replacedStr = replacedStr.replace(/\W+\*/g, "*");
    replacedStr = replacedStr.replace(/\W+\//g, "/");

    console.log("Actual display is -> " + display);

    console.log("Evaluating ... " + replacedStr);
    setDisplay(eval(replacedStr));
    console.log("End result was -> " + eval(replacedStr));
    setAddedDecimal(false);
  };

  return (
    <div id="button-container">
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
        onClick={() => addNumber(7)}
        className="number-button button"
        id="seven"
      >
        7
      </button>
      <button
        onClick={() => addNumber(8)}
        className="number-button button"
        id="eight"
      >
        8
      </button>
      <button
        onClick={() => addNumber(9)}
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
        onClick={() => addNumber(4)}
        className="number-button button"
        id="four"
      >
        4
      </button>
      <button
        onClick={() => addNumber(5)}
        className="number-button button"
        id="five"
      >
        5
      </button>
      <button
        onClick={() => addNumber(6)}
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
        onClick={() => addNumber(1)}
        className="number-button button"
        id="one"
      >
        1
      </button>
      <button
        onClick={() => addNumber(2)}
        className="number-button button"
        id="two"
      >
        2
      </button>
      <button
        onClick={() => addNumber(3)}
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
        onClick={() => addNumber(0)}
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

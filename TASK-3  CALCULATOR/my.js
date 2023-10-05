document.addEventListener("DOMContentLoaded", function () {
    let display = document.getElementById("display");
    let currentInput = "";
    let currentOperator = "";
    let firstOperand = "";

    // Helper function to update the display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Add click event listeners to digit and operator buttons
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const buttonValue = button.textContent;

            if (!isNaN(buttonValue) || buttonValue === ".") {
                currentInput += buttonValue;
                updateDisplay();
            } else if (buttonValue === "C") {
                currentInput = "";
                firstOperand = "";
                currentOperator = "";
                updateDisplay();
            } else if (["+", "-", "*", "/"].includes(buttonValue)) {
                if (currentInput !== "") {
                    if (firstOperand === "") {
                        firstOperand = currentInput;
                        currentInput = "";
                        currentOperator = buttonValue;
                    } else {
                        // Calculate and update result
                        const result = performOperation(
                            parseFloat(firstOperand),
                            parseFloat(currentInput),
                            currentOperator
                        );
                        currentInput = result.toString();
                        firstOperand = result.toString();
                        currentOperator = buttonValue;
                        updateDisplay();
                    }
                }
            } else if (buttonValue === "=") {
                if (currentInput !== "" && firstOperand !== "") {
                    const result = performOperation(
                        parseFloat(firstOperand),
                        parseFloat(currentInput),
                        currentOperator
                    );
                    currentInput = result.toString();
                    firstOperand = "";
                    currentOperator = "";
                    updateDisplay();
                }
            }
        });
    });

    // Helper function to perform calculations
    function performOperation(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if (num2 === 0) {
                    return "Error";
                }
                return num1 / num2;
            default:
                return num2;
        }
    }
});

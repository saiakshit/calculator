let string = "";
// Grab the buttons and display area
let buttons = document.querySelectorAll(".button");
let ansDisplay = document.querySelector(".ans");

// Function to update the display
function updateDisplay() {
    ansDisplay.textContent = string || 0; // prints truthy value else 0
}

// Adding event listeners to each button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;

        let iconClass = null;

        // Check if the button contains an icon
        if (button.querySelector("i")) {
            iconClass = button.querySelector("i").classList;
        }

        // Handle operators when the last character is a number and NOT AN OPERATOR
        if (iconClass && !isNaN(string[string.length - 1])) {
            if (iconClass.contains("fa-divide")) {
                string += '/';
            } else if (iconClass.contains("fa-xmark")) {
                string += '*';
            } else if (iconClass.contains('fa-minus')) {
                string += '-';
            } else if (iconClass.contains('fa-plus')) {
                string += '+';
            } else if (iconClass.contains('fa-equals')) {
                try {
                    string = eval(string).toString();  // eval()  evaluates the string 
                } catch (e) {
                    console.log("ERROR");
                    string = "Error";
                }
            }
        }

        // if the last digit is an OPERATOR ,then Replace the existing operator with the new operator
        else if (iconClass && isNaN(string[string.length - 1])) {
            if (iconClass.contains("fa-divide")) {
                string = string.slice(0, -1) + '/';
            } else if (iconClass.contains("fa-xmark")) {
                string = string.slice(0, -1) + '*';
            } else if (iconClass.contains('fa-minus')) {
                string = string.slice(0, -1) + '-';
            } else if (iconClass.contains('fa-plus')) {
                string = string.slice(0, -1) + '+';
            }
        }

        // Case: Clear
        else if (buttonText == "AC") {
            string = '';
        } 
        // Case: Change sign
        else if (buttonText === '+/-') {
            if (string !== '' && !isNaN(string[string.length - 1])) {
                ans=string-'0'; ans=-1*ans;
                string = ans.toString();
                // string = (-parseFloat(string)).toString();
            }
        } 
        // Case: Percentage
        else if (buttonText === '%') {
            if (string !== '') {
                string = (parseFloat(string) / 100).toString();
            }
        } 
        // Default: Append the clicked button to the expression
        else {
            string += buttonText;
        }

        updateDisplay();
    });
});

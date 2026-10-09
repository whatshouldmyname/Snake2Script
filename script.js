
const codeSpace = document.getElementById("codespace");
const input = document.getElementById("code-editor");
const jsOutput = document.getElementById("js-equiv");
const webEnvironment = document.getElementById("web-environment");
const error = document.getElementById("terminal");
function runCode(event){
    event.preventDefault();
    const code = input.value;
    error.textContent = ""
    jsOutput.textContent = ""
    if (code.includes("my_button = create_button()")){
        jsOutput.textContent = "const myButton = document.createElement(\"button\");";
        const userButton = document.createElement("button");
        userButton.textContent = "Button";
        webEnvironment.appendChild(userButton);
    }else{
        error.textContent = "Looks like you entered something wrong! Did you enter \"my_button = create_button()\"?";


    };

}

codeSpace.addEventListener("submit", runCode);

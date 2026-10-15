
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";

const codeSpace = document.getElementById("codespace");
const input = document.getElementById("code-editor");
const jsOutput = document.getElementById("js-equiv");
const webEnvironment = document.getElementById("web-environment");
const error = document.getElementById("terminal");

const editor = new EditorView({
    state: EditorState.create({
        extensions: [
            basicSetup,
            python(),
            EditorView.theme({
                "&": {
                    height: "100%",
                    backgroundColor: "#333",
                    color: "#7fff00"
                },
                ".cm-content": {
                    fontFamily: "monospace",
                    caretColor: "#7fff00"
                },
                ".cm-gutters": {
                    backgroundColor: "#121212",
                    color: "#333",
                    border: "none"
                }
            })
        ]
    }),
    parent: input
});

console.log("CodeMirror initialized:", editor);
function runCode(event){
    event.preventDefault();
    const code = editor.state.doc.toString();
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

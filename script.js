/*TODO:
    Implement better checking than exact string matching. (Thinking regex for now, and perhaps parsing later)
    More lessons
    Progress Saving
*/

//chat helped integrate codemirror6
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { syntaxHighlighting, HighlightStyle, indentUnit} from "@codemirror/language";
import {tags} from "@lezer/highlight"
//connect to principal html elements
const codeSpace = document.getElementById("codespace");
const input = document.getElementById("code-editor");
const jsOutput = document.getElementById("js-equiv");
const webEnvironment = document.getElementById("web-environment");
const error = document.getElementById("terminal");
const tutorial = document.getElementById("tutorial")
//sets highlight colors for the user codespace
const textHighlighting = HighlightStyle.define([
    {tag: tags.keyword, color: "#7fff00" },
    {tag: tags.string, color: "#FF8500"},
    {tag: tags.comment, color: "#71AA39"},
    {tag: tags.bracket, color: "#00BAFF"},
    {tag: tags.paren, color: "#E100FF"},
    {tag: tags.function, color: "#00ff88"}


]);

const editor = new EditorView({
    state: EditorState.create({ //had to have chatgpt help me integrate the codemirror6
        extensions: [
            basicSetup,
            python(),
            syntaxHighlighting(textHighlighting),
            indentUnit.of("    "),
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
function checkCode(event){
    event.preventDefault();
    const code = editor.state.doc.toString();
    if (code[0]!="m"){
        error.textContent = "Looks like you entered something wrong! Did you enter \"my_button = create_button()\"?";
        return
    }
    error.textContent = ""
    jsOutput.textContent = ""
    let codeNormalized = code.replace(/\s/g, "")
    if (codeNormalized == "my_button=create_button()"){
        runCode();
    }else{
        error.textContent = "Looks like you entered something wrong! Did you enter \"my_button = create_button()\"?";


    };
}

function runCode(){
    jsOutput.textContent = "const myButton = document.createElement(\"button\");";
        const userButton = document.createElement("button");
        userButton.textContent = "Button";
        webEnvironment.appendChild(userButton);
}

codeSpace.addEventListener("submit", checkCode);


import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { syntaxHighlighting, HighlightStyle, indentUnit} from "@codemirror/language";
import {tags} from "@lezer/highlight"

const codeSpace = document.getElementById("codespace");
const input = document.getElementById("code-editor");
const jsOutput = document.getElementById("js-equiv");
const webEnvironment = document.getElementById("web-environment");
const error = document.getElementById("terminal");

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

/*
Користувач вводить вхідний синтаксис у форматі .class>element#id, де:
.class представляє клас елемента.
> рівень вкладеності
^  на рівень вище
element представляє назву HTML елемента.
#id представляє ідентифікатор елемента.
*/

const emmetCode = document.getElementById("input");
const htmlOutput = document.getElementById("output");

emmetCode.addEventListener("input", () => {
  const textOutput = emmetToHTML(emmetCode.value);
  htmlOutput.innerHTML = textOutput;
});

function emmetToHTML(textInput) {
  const stack = []; //масив, куди будуть записуватись div-елементи
  let html = ""; //змінна, в яку будуть вигружатись зі стеку div-елементи

  textInput.split(">").forEach((tag) => {
    const classes = tag.match(/\. \w+/g);
    const id = tag.match(/#\w+/);

    let element = "<div>";

    if (id) {
      const idValue = id[0].substr(1);
      element = `<div id="${idValue}">`;
    }

    if (classes) {
      const classValues = classes.map((classString) => classString.substr(1));
      element = `<div class="${classValues.jooin(" ")}">`;
    }

    stack.push(element);
  });

    stack.reverse();
    
  while (stack.length > 0) {
    html += stack.pop();
    html += "</div>";
  }

  return html;
}

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
    /*метасимоволи: 
    \w - будь-який алфавітно-цифровий симовл, 
    + декілька символів, 
    /g - пошук всіх символів разом */
    const classes = tag.match(/\.\w+/g);
    console.log(classes);
    const id = tag.match(/\#\w+/g);
    console.log(id);

    let element = "<div>";

    if (classes) {
      const classValue = classes[0].substr(1);
      element = `<div class="${classValue}">`;
    }

    if (id) {
      const idValue = id[0].substr(1);
      element = `<div id="${idValue}">`;
    }

    stack.push(element);
  });

  stack.reverse();
  console.log(stack);
  let initialQuantity = stack.length; //зберігаємо значення кількості div

  while (stack.length > 0) {
    html += stack.pop();
  }
  html += "</div>".repeat(initialQuantity); //додаємо закриваючі div потрібної кількості

  return html;
}

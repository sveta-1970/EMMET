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
  const container = document.createElement("div");
  let currentElement = container;

  textInput.split(">").forEach((tag) => {
    let element = document.createElement("div");

    const classes = tag.match(/\.[\w-]+/g);
    if (classes) {
      const classValue = classes[0].substr(1);
      element.classList.add(classValue);
    }

    const id = tag.match(/#[\w-]+/g);
    if (id) {
      const idValue = id[0].substr(1);
      element.setAttribute("id", idValue);
    }

    currentElement.appendChild(element);

    if (tag.includes("^")) {
      const higherLevels = tag.split("^");
      let currentLevel = higherLevels[1];

      currentElement = currentElement.parentElement;
      console.log(currentElement);
      //const siblingElement
      element = document.createElement("div");

      const siblingClasses = currentLevel.match(/\.[\w-]+/g);
      if (siblingClasses) {
        const siblingClassValue = siblingClasses[0].substr(1);
        element.classList.add(siblingClassValue);
      }

      const siblingId = currentLevel.match(/#[\w-]+/g);
      if (siblingId) {
        const siblingIdValue = siblingId[0].substr(1);
        element.setAttribute("id", siblingIdValue);
      }

      currentElement.appendChild(element);
      currentElement = element;

      console.log(currentElement);
      //currentLevel = higherLevels[1];
    }
    currentElement = element;
  });

  return container.innerHTML;
}

/*
function emmetToHTML(textInput) {
  const stack = []; //масив, куди будуть записуватись div-елементи
  let html = ""; //змінна, в яку будуть вигружатись зі стеку div-елементи
  debugger;
  const tags = textInput.split(">");
  tags.forEach((tag) => {
    const classes = tag.match(/^\.\w+$/g);
    const id = tag.match(/\#\w+/g);
    const higherLevel = "";
    const higherLevels = tag.split("^");
    higherLevels.forEach((higherLevel) => {
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

    /*метасимоволи: 
    \w - будь-який алфавітно-цифровий симовл, 
    + декілька символів, 
    /g - пошук всіх символів разом */
//const classes = tag.match(/^\.\w+$/g);
// const id = tag.match(/\#\w+/g);

/*
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
*/

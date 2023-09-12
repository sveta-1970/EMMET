const emmetCode = document.getElementById("input");
const htmlOutput = document.getElementById("output");

emmetCode.addEventListener("input", () => {
  const textOutput = emmetToHTML(emmetCode.value);
  htmlOutput.innerHTML = textOutput;
});

function emmetToHTML(textInput) {
  const container = document.createElement("div");
  container.classList.add("container");
  let currentElement = container;

  textInput.split(">").forEach((tag) => {
    let element = document.createElement("div");

    let classes = tag.match(/\.[\w-]+/g);
    if (classes) {
      let classValue = classes[0].substr(1);
      element.classList.add(classValue);
    }

    let id = tag.match(/#[\w-]+/g);
    if (id) {
      let idValue = id[0].substr(1);
      element.setAttribute("id", idValue);
    }

    currentElement.appendChild(element);
    currentElement = element;
    console.log(currentElement);

    if (tag.includes("^")) {
      const higherLevels = tag.split("^").slice(1); //delete first element from higherLevels array because it is from the lower level
      higherLevels.forEach((higherLevel) => {
        currentElement = currentElement.parentElement; //we go to the upper level from the previous current element
        element = document.createElement("div");

        classes = higherLevel.match(/\.[\w-]+/g);
        if (classes) {
          classValue = classes[0].substr(1);
          element.classList.add(classValue);
        }

        id = higherLevel.match(/#[\w-]+/g);
        if (id) {
          idValue = id[0].substr(1);
          element.setAttribute("id", idValue);
        }

        //we check if the parent of the current element is the highest level(container)
        if (currentElement.parentNode == container) {
          container.appendChild(element);
        } else {
          currentElement.appendChild(element);
        }
      });
    }
    currentElement = element;
  });

  return container.innerHTML;
}

/*метасимоволи: 
    \w - будь-який алфавітно-цифровий симовл, 
    + декілька символів, 
    /g - пошук всіх символів разом */

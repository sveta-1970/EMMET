const emmetCode = document.getElementById("input");
const htmlOutput = document.getElementById("output");

emmetCode.addEventListener("input", () => {
  const textOutput = emmetToHTML(emmetCode.value);
  htmlOutput.innerHTML = textOutput;
});

//function to destinguish id and class from tagString,
//and add their value to html element(div)

function selectIdClass(element, tagString) {
  let classes = tagString.match(/\.[a-z-]+/);
  let id = tagString.match(/#[a-z-]+/);

  if (classes) {
    let classValue = classes[0].substr(1);
    return element.classList.add(classValue);
  }
  if (id) {
    let idValue = id[0].substr(1);
    return element.setAttribute("id", idValue);
  }
}

/*
function selectIdClass(element, tagString) {
  if (/^\.[a-z-]+$/.test(tagString)) {
    // Checking for class format
    let classValue = tagString.substr(1);
    return element.classList.add(classValue);
  }
  if (/^#[a-z-]+$/.test(tagString)) {
    // Checking for id format
    let idValue = tagString[0].substr(1);
    return element.setAttribute("id", idValue);
  }
}
*/
function emmetToHTML(textInput) {
  const container = document.createElement("div");
  container.classList.add("container");
  let currentElement = container;

  textInput.split(">").forEach((tag) => {
    // Skip empty tags
    if (tag.trim() === "") {
      return;
    }
    let element = document.createElement("div");
    if (tag.startsWith(".") || tag.startsWith("#")) {
      selectIdClass(element, tag);
    } else {
      alert(`Type tag in correct form ".class" or "#id"`);
    }

    currentElement.appendChild(element);
    currentElement = element;

    if (tag.includes("^")) {
      const higherLevels = tag.split("^").slice(1); //delete first element from higherLevels array because it is from the lower level

      higherLevels.forEach((higherLevel) => {
        // Skip empty tags
        if (higherLevel.trim() === "") {
          return;
        }
        currentElement = currentElement.parentElement; //we go to the upper level from the previous current element
        parentElement = currentElement.parentElement;
        element = document.createElement("div");

        if (higherLevel.startsWith(".") || higherLevel.startsWith("#")) {
          selectIdClass(element, higherLevel);
        } else {
          alert(`Type tag in correct form ".class" or "#id"`);
        }

        //we check if the current element or parent of the current element is the highest level(container)
        if (currentElement == container) {
          alert("You cannot add higher level");
        } else if (currentElement.parentNode == container) {
          container.appendChild(element);
        } else {
          parentElement.appendChild(element);
        }
      });
    }
    currentElement = element;
  });

  return container.innerHTML;
}

/*метасимоволи: 
    [a-z] - будь-який алфавітний симовл, 
    + декілька символів, 
     
  */

let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;

  let kittenName = form.name.value;
  //console.log(kittenName);

  let kittenId = generateId();
  //console.log(kittenId);

  let newKitten = kittens.find(kitten => kitten.name == kittenName);

  if (newKitten) {
    window.alert('You already own a cat named ' + kittenName + '. Please choose a new name :)')
  } else {
    kittens.push({name: kittenName, id: kittenId})
  }
  

  //console.log(kittens)

  form.reset()
  saveKittens()
  drawKittens()

  if (kittens.length > 5) {
    window.alert('The maximum number of kittens is 5')
    document.getElementById('add-kitten-form').classList.add('hidden')
  }

}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = window.localStorage.getItem("kittens")
  let kittenData = JSON.parse(storedKittens)
  
  if(!kittenData) {
    document.getElementById("welcome").classList.remove("hidden")
  } else {
    kittens = kittenData
    document.getElementById("add-kitten-form").classList.remove("hidden")
    drawKittens() 
  }

}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("add-kitten-form").classList.remove('hidden')
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();


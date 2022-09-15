let kittens = [];
let kittenPics = ['cat_1.png', 'cat_2.png', 'cat_3.png', 'cat_4.png', 'cat_5.png'];
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

  let kittenId = 'id-'+ generateId();
  //console.log(kittenId);

  let newKitten = kittens.find(kitten => kitten.name == kittenName);

  if (newKitten) {
    window.alert('You already own a cat named ' + kittenName + '. Please choose a new name :)')
  } else {
    kittens.push({name: kittenName, id: kittenId, pic: '', mood: "", affection: 0})
  }
  
  for (let i = 0; i < kittens.length; i++) {
    kittens[i].pic = kittenPics[i]; 
  }

  //console.log(kittens)

  form.reset()
  document.getElementById('start-over').classList.remove('hidden')
  document.getElementById('welcome').classList.add('hidden')
  checkKittensNum()

  saveKittens()
  drawKittens()
}

function checkKittensNum() {
  if (kittens.length == 5) {
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
    document.getElementById('start-over').classList.remove('hidden') 
  }
drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenTemplate = ""
  if (!kittens) {
    console.log(kittenTemplate)
    document.getElementById('kittens').innerHTML = kittenTemplate
  } else {
    kittens.forEach(kitty => {
      kittenTemplate += `
      <div class="kitten container card mt-2 mb-2 ${kitty.mood}" kittenId="${kitty.id}">
        <img src="${kitty.pic}">
        <br>
        <p>${kitty.name}</p>
        <div class='d-flex space-around'>
          <button class='interact mt-1' onclick="pet('${kitty.id}')">Pet</button>
          <button class='interact mt-1' onclick="catnip('${kitty.id}')">Give Catnip</button>
        </div>
        <button class='btn-cancel-ind p-1 mt-3' onclick="deleteKitten(${kitty.id})"><i class="fa-solid fa-x"></i></button>
      </div>`
    })
  document.getElementById('kittens').innerHTML = kittenTemplate
  }
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  //console.log(id)
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1) {
    throw new Error('invalid kitten id')
  } else {
    return index;
  }
   
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
  id = id; 
  let i = findKittenById(id);
  let randMoodNum = Math.random();
  
  //let kittenAffection = ;
  //console.log(randMoodNum);
  

  if (randMoodNum > .5) {
    kittens[i].affection += 1;
  } else {
    kittens[i].affection -= 1;
  }
  let kitten = {name: kittens[i].name, mood: kittens[i].mood, affection: kittens[i].affection}
  
  setKittenMood(kitten)
  saveKittens()
  loadKittens()
  
}
  
  



/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let i = findKittenById(id);
  kittens[i].mood = 'tolerant';
  kittens[i].affection = 5;

  let kitten = {name: kittens[i].name, mood: kittens[i].mood, affection: kittens[i].affection}
  
  setKittenMood(kitten)
  saveKittens()
  loadKittens()
  
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  //console.log(kitten)
  if(kitten.affection > 5) {
    kitten.mood = 'happy'
  } else if (kitten.affection <= 5 && kitten.affection >= 3) {
    kitten.mood = 'tolerant'
  } else if (kitten.affection <= 2 && kitten.affection >= 0) {
    kitten.mood = 'angry'
  } else {
    kitten.mood = 'gone'
  }
  let i = kittens.findIndex(cat => cat.name == kitten.name)
  kittens[i].mood = kitten.mood
  console.log(kittens[i])
  
  let element = document.querySelector('.kitten')
  console.log(element)
  console.log(element.classList)
  element.classList.add(kitten.mood)
  console.log(element.classList)

  saveKittens()
  loadKittens()
}

function deleteKitten(id) {
  let i = kittens.findIndex(kitten => kitten.id == id)
  
  kittens.splice(i, 1)

  
  saveKittens()
  loadKittens()
  drawKittens()

}


/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = [];
  localStorage.clear();
  loadKittens()
  document.getElementById('start-over').classList.add('hidden')
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").classList.add('hidden');
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
drawKittens();


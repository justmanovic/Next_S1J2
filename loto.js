let sendBtn = document.querySelector("#send")
let inputFirstName = document.querySelector("#firstName")
let inputLastName = document.querySelector("#lastName")
let inputEmail = document.querySelector("#email")
let inputlotoNumbers = document.querySelector("#lotoNumbers")
let errors = document.querySelector("#errors")
let tirage = tirageLoto();

console.log(tirage)

function tirageLoto() {
  const ranNum = () => Math.floor(Math.random() * 50) + 1;
  let current;
  let arr = [];

  while (arr.length < 6) {
    if (arr.indexOf(current = ranNum()) === -1) {
      arr.push(current);
    }
  }
  return arr;
};

function checkEmpty(element, msg) {
  if (element === "") {
    let blockError = document.createElement('p')
    blockError.innerText = msg
    errors.append(blockError)
  }
}

function checkLoto(e) {
  e.preventDefault()
  let inputlotoNumbersValues = inputlotoNumbers.value.split(",")
  let newValues = inputlotoNumbersValues.map(value => parseInt(value))

  checkEmpty(inputFirstName.value, 'Veuillez entrer un prénom')
  checkEmpty(inputLastName.value, 'Veuillez entrer un nom de famille')
  checkEmpty(inputEmail.value, 'Veuillez entrer un email')
  checkEmpty(inputlotoNumbers.value, 'Veuillez entrer vos numéros')

  if (inputEmail.value && !validateEmail(inputEmail.value)) {
    let blockError = document.createElement('p')
    blockError.innerText = 'Veuillez entrer un email valide !'
    errors.append(emailValidateError)
  }

  if (inputlotoNumbers.value) {

    if (compareLotoNumbers(tirage, newValues)) {
      let winMessage = document.createElement('p')
      winMessage.innerText = 'CHAMPION'
      errors.append(winMessage)
    }

    else {
      let loseMessage = document.createElement('p')
      loseMessage.innerText = 'tu restes à la rue!!'
      errors.append(loseMessage)
    }
  }
}

let compareLotoNumbers = (tirage, grille) => {
  let bonResultat = 0
  let win = false
  grille.forEach(num => {
    if (tirage.includes(num)) {
      bonResultat += 1
    }
  })
  if (bonResultat === tirage.length)
    win = true
  return win
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


sendBtn.addEventListener("click", checkLoto)


// Votre email n'est pas valide (lorsque l'email fourni n'est pas au bon format)
// Désolé, vous avez perdu, les nombres gagnants sont : x1, x2, x3, x4, x5, x6(à remplacer par les 6 chiffres tirés aléatoirement).
//   Félicitations, vous avez gagné 1 million!!!!!
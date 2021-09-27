let sendBtn = document.querySelector("#send")
let inputFirstName = document.querySelector("#firstName")
let inputLastName = document.querySelector("#lastName")
let inputEmail = document.querySelector("#email")



let errors = document.querySelector("#errors")

let tirageLoto = () => {
  let arr = []
  for (i = 0; i < 6; i++) {
    let num = Math.floor(Math.random() * 50)
    if (!arr.includes(num))
      arr.push(num)
  }
  return arr
}

let tirage = tirageLoto()
console.log(tirage)


sendBtn.addEventListener("click", checkLoto)



function checkLoto(e, firstname, lastname, email) {
  e.preventDefault()
  let inputlotoNumbers = document.querySelector("#lotoNumbers")
  let inputlotoNumbersValues = inputlotoNumbers.value.split(",")
  let newValues = inputlotoNumbersValues.map(value => parseInt(value))
  if (inputFirstName.value === '') {
    let firstNameError = document.createElement('p')
    firstNameError.innerText = 'Veuillez entrer un prénom'
    errors.append(firstNameError)
  }
  if (inputLastName.value === '') {
    let lastNameError = document.createElement('p')
    lastNameError.innerText = 'Veuillez entrer un nom de famille'
    errors.append(lastNameError)
  }
  if (inputEmail.value === '') {
    let emailMissingError = document.createElement('p')
    emailMissingError.innerText = 'Veuillez entrer un email'
    errors.append(emailMissingError)
  }
  if (!validateEmail(inputEmail.value)) {
    let emailValidateError = document.createElement('p')
    emailValidateError.innerText = 'Veuillez entrer un email valide !'
    errors.append(emailValidateError)
  }
  if (compareLotoNumbers(tirage, newValues)) {
    let winMessage = document.createElement('p')
    winMessage.innerText = 'Bravo le millionnaire'
    errors.append(winMessage)
  }
  else {
    let loseMessage = document.createElement('p')
    loseMessage.innerText = 'DSL you lose !!!'
    errors.append(loseMessage)
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


// Votre email n'est pas valide (lorsque l'email fourni n'est pas au bon format)
// Désolé, vous avez perdu, les nombres gagnants sont : x1, x2, x3, x4, x5, x6(à remplacer par les 6 chiffres tirés aléatoirement).
//   Félicitations, vous avez gagné 1 million!!!!!
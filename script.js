//Kintamieji
let zmogusRound = 0
let kompRound = 0;
let zmogusScore = 0;
let kompScore = 0;
let roundas = 0;
let paleidimas = false;
let kvadratoPaspaudimas;
//Random funkcijos
function randomSkaicius(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
//Zaidimo funcijos
const nemat = document.querySelectorAll('.nematoma');
const showGame = () =>{  //Atvaizduoja zaidimo score, likusi laika
    nemat.forEach((item) => {item.style.visibility ="initial"} )
    document.querySelector('.matoma').style.visibility = "hidden"
}
const hideGame = () =>{ //Paslepia score ir laika
    document.querySelector('.matoma').style.visibility = "initial"
    nemat.forEach((item) => {item.style.visibility ="hidden"})
}
//Jeigu zmogus daugiau kompiuteris turi dagiau tasku pridedam round score.
const rounduSkaiciuokle = () => {
    if(zmogusScore > kompScore){
        zmogusRound++
        document.querySelector('.zaidejo-laimeti').innerHTML += ` ${roundas + 1},`
    }               

    else if(kompScore > zmogusScore) {
        kompRound++
        document.querySelector('.kompiuterio-laimeti').innerHTML += ` ${roundas + 1},`
     }
    else {
      zmogusRound++;
      kompRound++;
    }
}
//Funkcija skirta atvaizduoti round score, surinktus taskus ir laika.
const atvaizdavimas = () => {
document.querySelector('.komp-rounds').innerHTML = ` Kompiuteris: ${kompRound}`;
document.querySelector('.zaidejas-rounds').innerHTML = `Žaidėjas: ${zmogusRound}`;
document.querySelector('.roundas').innerHTML = `Roundas: ${roundas + 1 }`
}
const ankstRound = () => {

    if (zmogusScore > kompScore){
        return `Rounda laimejo  žaidėjas: ${zmogusScore}`
    }
    else if ( kompScore > zmogusScore)
        return `Roundą laimėjo kompiuteris: ${kompScore}`
    else 
        return `Roundas baigėsi lygiosiomis su ${kompScore} `
}

//Kvadrato atvaizdavimo ir paleidimo funckija
const kvadrato = () =>{
let spalva = randColor();
let kaire = randomSkaicius(1, 100);
let apacia = randomSkaicius(1, 60);
const kvadr = document.querySelector('.kvadratas')
kvadr.style.visibility = "initial"
kvadr.style.backgroundColor = spalva
kvadr.style.left = `${kaire}%`
kvadr.style.bottom = `${apacia}%`
}
const kvadrClicked = () =>{
    kvadratoPaspaudimas = 1;
    document.querySelector('.kvadratas').style.backgroundColor = "red";
    playSound();
}
const scoreNulinimas = () => {
    zmogusScore = 0;
    kompScore = 0;
}
const kvadratoPatikra = () => {
    if (kvadratoPaspaudimas == 1){
        zmogusScore++;
        kvadratoPaspaudimas = 0
    }
    else if (kvadratoPaspaudimas == 0) {
        kompScore++
    }
    else {
        kvadratoPaspaudimas = 0
    }
}
const periodas = () =>{
    kvadrato()
    atvaizdavimas() 
    kvadratoPatikra()
}
let kvadratoIntervalas = null;
let intervalas = null;
let laikas = 0

const kvadratas = () => {
    if (roundas < 10) {
        periodas()
        laikmatis()
     kvadratoIntervalas = setTimeout(() => kvadratas(), 1000);
    }
    else pabaiga()
}
const laikmatis = () => {
    document.querySelector('.laikmatis').innerHTML = `Laikas: ${laikas} sekundės `
    if (laikas < 30){
        laikas++
    }
    else {
        laikas = 0
        roundas++
    }
 
}

const pabaiga = () => {
    document.querySelector('.popup').style.visibility = "initial"
    if (kompRound > zmogusRound)
        document.querySelector('.pergale').innerHTML = `Žaidimą laimėjo: Kompiuteris`
    else  if (zmogusRound > kompRound)
        document.querySelector('.pergale').innerHTML = `Žaidimą laimėjo: Žaidejas`
    else
    document.querySelector('.pergale').innerHTML += `Lygiosios`
}

const pradzia = () => {
    document.querySelector('.popup').style.visibility = "hidden"
    atvaizdavimas()
    showGame()
    if(paleidimas)
        return false;
    paleidimas = true;
    if(paleidimas){
        kvadratas()
        intervalas = setInterval(() => {
            if (roundas < 10){
            rounduSkaiciuokle()
            atvaizdavimas()
            document.querySelector('.preitas-game').innerHTML = ankstRound()
            scoreNulinimas()
            }
        }, 30000)
    }
    else{
        clearInterval(intervalas)
        clearTimeout(kvadratoIntervalas)
    }


}
const baigti = () => {
    hideGame()
    laikas = 0;
    zmogusRound = 0
    kompRound = 0;
    kvadratoPaspaudimas = null;
    zmogusScore = 0;
    kompScore = 0;
    roundas = 0;
    paleidimas = false;
    clearInterval(intervalas)
    clearTimeout(kvadratoIntervalas)
    const kvadr = document.querySelector('.kvadratas').style.visibility = "hidden"
    document.querySelector('.zaidejo-laimeti').innerHTML = "Žaidejo laimeti roundai: "
    document.querySelector('.kompiuterio-laimeti').innerHTML = "Kompiuterio laimeti roundai: "
    document.querySelector('.preitas-game').innerHTML = "Preitas roundas: "
}
//Audio
let x = document.getElementById('myAudio');
const playSound = () => {
    x.play()
}
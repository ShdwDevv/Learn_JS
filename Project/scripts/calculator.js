const showElement = document.querySelector('.js-show');
let calculation = localStorage.getItem('calculate') || ``;
if(calculation) showElement.innerHTML = calculation;
function updateCalculation(value){
    calculation += value;
    showElement.innerHTML = calculation;
    save();
}
function save(){
    localStorage.setItem('calculate',calculation);
}
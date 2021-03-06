const cash_given_input = document.querySelector("#cash_given_input");
const btn_submit = document.querySelector("#submit_btn");

// input fields
const bill_amount = document.querySelector("#bill_amt");
const cash_given = document.querySelector("#cash_given");

// output fields
const modal = document.querySelector(".modal");
const noOfNotes = document.querySelectorAll(".noOfNotes");

const errorMessage = document.querySelector("#errorMessage")
const errorField = document.querySelector(".error");

let notes = [2000, 500, 100, 20, 10, 5, 1];

function init(){
    let arr = [];
    for(let i = 0; i < notes.length; i++){
        arr[i] = 0;
    }
    return arr;
}

function validateInput(){

    if(btn_submit.innerText == "Next"){
        let bill_value = Number(bill_amount.value);
        if(bill_amount.value === ""){
            setError("Please enter bill amount")
        } 
        else if(bill_value < 0 ){
            setError("Bill amount cannot be negative");
        }
        else if(bill_value === 0){
            setError("Bill amount cannot be 0");
        }
        else {
            return true;
        }
    }
    else{
        let bill_value = Number(bill_amount.value);
        let cash_given_value = Number(cash_given.value);

        if(bill_amount.value === "" || cash_given.value === ""){
            setError("Please enter values")
        } 
        else if(bill_value < 0 ){
            setError("Bill amount cannot be negative");
        }
        else if(cash_given_value < 0){
            setError("Cash given amount cannot be negative");
        }
        else if(bill_value === 0){
            setError("Bill amount cannot be 0");
        }
        else if(cash_given_value === 0){
            setError("Cash given amount cannot be 0");
        }
        else if(bill_value > cash_given_value){
            setError("Cash given is less than bill");
        }
        else if(bill_value === cash_given_value){
            errorMessage.style = "color:green";
            setError("No change to return");
        }
        else {
            return true;
        }
    } 
}

function calculateChange(){
    
    let bill_value = Number(bill_amount.value);
    let cash_given_value = Number(cash_given.value);

    let return_amount = cash_given_value - bill_value;

    if(return_amount > 0){

        let return_notes_count = init();

        for(let i = 0; i < notes.length; i++){

            return_notes_count[i] = Math.floor(return_amount / notes[i]);
        
            return_amount -= notes[i] * return_notes_count[i];

            if(return_amount === 0){
                return return_notes_count;
            }
        }
    }
}

function displayOutput(return_notes){

    for (let i = 0; i < notes.length; i++) {
        noOfNotes[i].innerText = return_notes[i];
    }

    modal.classList.add('open');

    const exits = modal.querySelectorAll('.modal-exit');
    exits.forEach(function(exit) {
      exit.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.remove('open');
      });
      });
}


function setError(error){
    errorMessage.innerText = error;
    errorField.style.display = "flex";
}

function resetError(){
    errorMessage.style = "color:red";
    errorMessage.innerText ="";
    errorField.style.display = "none";
}


btn_submit.addEventListener("click", () => {

    if(btn_submit.innerText == "Next"){
        if(validateInput() === true){
            cash_given_input.style.display = "flex";
            btn_submit.innerText = "Submit";
        }       
    }
    else if(validateInput() === true){
        let change =  calculateChange();
        displayOutput(change);
    }

})

cash_given.addEventListener("click", () => {
    resetError()
});
bill_amount.addEventListener("click", () => {
    resetError()
});
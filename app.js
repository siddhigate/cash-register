const cash_given_input = document.querySelector("#cash_given_input");
const btn_submit = document.querySelector("#submit_btn");

// input fields
const bill_amount = document.querySelector("#bill_amt");
const cash_given = document.querySelector("#cash_given");

// output fields
const modal = document.querySelector(".modal");
const noOfNotes = document.querySelectorAll(".noOfNotes");

let notes = [2000, 500, 100, 50, 20, 10, 5, 1];
let returnNotes = [];

function validateInput(){
    return true;
}

function calculateChange(){
    
    let bill_value = bill_amount.value;
    let cash_given_value = cash_given.value;

    let return_amount = parseInt(cash_given_value) - parseInt(bill_value);

    if(return_amount > 0){

        let return_notes_count = [];

        for(let i = 0; i < notes.length; i++){

            return_notes_count[i] = Math.floor(return_amount / notes[i]);
        
            return_amount -= notes[i] * return_notes_count[i];

            if(return_amount === 0){
                return return_notes_count;
            }
        }
    }
}

function displayOutput(return_notes_count){

    for (let i = 0; i < notes.length; i++) {
        noOfNotes[i].innerText = return_notes_count[i];
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
  
function resetInput(){

}

function setError(){

}

function resetError(){

}


btn_submit.addEventListener("click", () => {

    if(btn_submit.innerText == "Next"){
        cash_given_input.style.display = "flex";
        btn_submit.innerText = "Submit";
    }
    else if(validateInput){
        let change =  calculateChange();
        displayOutput(change);
    }

})

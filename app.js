const bill_amount = document.querySelector("#bill_amt");
const cash_given = document.querySelector("#cash_given");
const submit_btn = document.querySelector("#submit_btn");

const modal = document.querySelector(".modal");

let notes = [2000, 500, 100, 50, 20, 10, 5, 1];
let return_notes_count = [];

submit_btn.addEventListener('click', () => {
    calculateChange();
})

const calculateChange = () => {

    let bill_value = bill_amount.value;
    let cash_given_value = cash_given.value;

    let return_amount = parseInt(cash_given_value) - parseInt(bill_value);

    if(isValidTransaction(return_amount)){

        for(let i = 0; i < notes.length; i++){

            return_notes_count[i] = Math.floor(return_amount / notes[i]);
        
            return_amount -= notes[i] * return_notes_count[i];

            if(return_amount === 0){
                display_change_to_return();
                return;
            }
        }
    }
    
}

const display_change_to_return = () => {

    modal.innerHTML ='';
    for(let i = 0; i < return_notes_count.length; i++){

        if(return_notes_count[i] !== 0){
            modal.innerHTML += `<div>${notes[i]}   ${return_notes_count[i]}</div>`
        }
    }
}

const isValidTransaction = (return_amount) => {

    if(return_amount == 0 ){
        modal.innerHTML = `No change to return`;
        return 0;
    }

    if(return_amount < 0){
        modal.innerHTML = `Cash given is less than bill amount`;
        return 0;
    }

    return 1;
}
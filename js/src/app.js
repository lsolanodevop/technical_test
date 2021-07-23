"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSearchButton = document.getElementById("userSearchButton");
const userSearchInput = document.getElementById("userSearchInput");
let c;
//Creating a button to call the api
//taking the info of the user input to send it
userSearchButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (userSearchInput.value) {
        const user = userSearchInput.value;
        fetch("http://localhost:4000/user/" + user, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
            console.log(data.experiences);
        });
    }
    else {
        console.log("Please Input a value");
    }
});

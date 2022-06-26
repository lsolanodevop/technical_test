"use strict";
const advancedSearchButton = document.getElementById("advancedSearchButton");
const advancedSearchInput = document.getElementById("advancedSearchInput");
const advancedCardData = document.getElementById("card3List");
advancedSearchButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (advancedSearchInput.value) {
        const advancedSearch = advancedSearchInput.value;
        console.log(advancedSearch);
        fetch("http://localhost:4000/advanced/" + advancedSearch, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(advancedSearch),
            mode: "no-cors"
        }).then(res => res.json())
            .then(data => {
            console.log(data);
        });
    }
    else {
        console.log("Please Input a value");
    }
});

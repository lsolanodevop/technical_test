const advancedSearchButton = document.getElementById("advancedSearchButton")! as HTMLInputElement;
const advancedSearchInput = document.getElementById("advancedSearchInput")! as HTMLInputElement;
const advancedCardData = document.getElementById("card3List")! as HTMLUListElement;

advancedSearchButton.addEventListener("click", function (e: Event) {
  e.preventDefault();
  if (advancedSearchInput.value) {
    const advancedSearch = advancedSearchInput.value;
    console.log(advancedSearch);
    fetch("http://localhost:4000/advanced/"+advancedSearch  , {
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
  } else {
    console.log("Please Input a value");
  }
});
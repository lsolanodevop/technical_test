const userSearchButton = document.getElementById("userSearchButton")! as HTMLInputElement;
const userSearchInput = document.getElementById("userSearchInput")! as HTMLInputElement;
let c: any;
//Creating a button to call the api
//taking the info of the user input to send it
userSearchButton.addEventListener("click", function (e: Event) {
  e.preventDefault();
  if (userSearchInput.value) {
    const user = userSearchInput.value;
    fetch("http://localhost:4000/user/" + user).then(res => res.json())
      .then(res => {
        console.log(res);
    })
    
  } else {
    console.log("Please Input a value");
  }
});
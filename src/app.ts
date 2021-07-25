const userSearchButton = document.getElementById("userSearchButton")! as HTMLInputElement;
const userSearchInput = document.getElementById("userSearchInput")! as HTMLInputElement;
const userCardData = document.getElementById("card1List")! as HTMLUListElement;
const userImage = document.getElementById("profileImg")! as HTMLImageElement;
const refreshButton = document.getElementById("refresh")! as HTMLInputElement;
let c: any;
const firstOne = document.createElement("li");
const secondOne = document.createElement("li");
const thirdOne = document.createElement("li");
const fourthOne = document.createElement("li");
//Creating a button to call the api
//taking the info of the user input to send it
userSearchButton.addEventListener("click", function (e: Event) {
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
        // showParam(sumUser, "Names ", data);
        // showParam(sumUser, "Title", data);
        // userCardData.appendChild(sumUser);
        firstOne.innerText = data.name + " " + data.professionalHeadline;
        firstOne.classList.add("cardOne");
        userCardData.append(firstOne);
        fourthOne.innerText = "Actual Job: " + data.experiences[0].name;
        fourthOne.classList.add("cardTwo");
        userCardData.append(fourthOne);
        secondOne.innerText = data.summary;
        secondOne.classList.add("restCards");
        userCardData.append(secondOne);
        userImage.removeAttribute("hidden");
        console.log(data.picture);
        if (data.picture) {
          userImage.src = data.picture;
        } else {
          userImage.src = "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";
        }
        thirdOne.innerText = data.location.name + " " + data.location.shortName + " " + data.location.country;
        thirdOne.classList.add("restCards");
        userCardData.append(thirdOne);
        

        // title = data.professionalHeadline,
        // picture = data.picture,
        // name = data.name,
        // summary = data.summary
      });
  } else {
    console.log("Please Input a value");
  }
});

refreshButton.addEventListener("click", function (e: Event) {
  window.location.reload();
});
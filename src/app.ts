const userSearchButton = document.getElementById("userSearchButton")! as HTMLInputElement;
const userSearchInput = document.getElementById("userSearchInput")! as HTMLInputElement;
const userCardData = document.getElementById("card1List")! as HTMLUListElement;
const userImage = document.getElementById("profileImg")! as HTMLImageElement;
let c: any;
const firstOne = document.createElement("li");
const secondOne = document.createElement("li");
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
        userCardData.append(firstOne);
        secondOne.innerText = data.summary;
        userImage.removeAttribute("hidden");
        userImage.src = data.picture;
        // showParam(listUser, "Title", data.professionalHeadline);
        // showParam(listUser, "Names", data.name);
        // showParam(listUser, "Summary", data.summary);
        // userCardData.append("Title ");
         userCardData.append(secondOne);

        // title = data.professionalHeadline,
        // picture = data.picture,
        // name = data.name,
        // summary = data.summary
      });
  } else {
    console.log("Please Input a value");
  }
});

// function showParam(element:HTMLLIElement,header: string, data: object) {
//         element.innerText = header + " " + data.names + ;
//         userCardData.append(element); 
// }
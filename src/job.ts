const jobSearchButton = document.getElementById("jobSearchButton")! as HTMLInputElement;
const jobSearchInput = document.getElementById("jobSearchInput")! as HTMLInputElement;
const jobCardData = document.getElementById("card2List")! as HTMLUListElement;
const firstJob = document.createElement("li");
const secondJob = document.createElement("li");
const thirdJob = document.createElement("li");
let content:string;
let responsabilities:string;
let challenges:string;
// //Creating a button to call the api
// //taking the info of the user input to send it
jobSearchButton.addEventListener("click", function (e: Event) {
  e.preventDefault();
  if (jobSearchInput.value) {
    const job = jobSearchInput.value;
    fetch("http://localhost:4000/job/" + job, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        // 
        firstJob.innerText = data.objective;
        firstJob.classList.add("cardJob");
        jobCardData.append(firstJob);
        let value:any
        for (value of Object.values(data.details)) {
          if (value.code === "requirements") {
            content = value.content;
          }
          if (value.code === "responsibilities") {
            responsabilities = value.content;
          }
          if (value.code === "challenges") {
            challenges = value.content;
          }
        }
        secondJob.innerText = "Recruiter: "+ data.owner.name + " " + data.owner.professionalHeadline + "Status of the position: " + data.status.toUpperCase();
        secondJob.classList.add("cardTwo");
        jobCardData.append(secondJob);

        thirdJob.innerText = "About the position: " + challenges + content +responsabilities;
        thirdJob.classList.add("restCards");
        jobCardData.append(thirdJob);
        
      });
  } else {
    console.log("Please Input a value");
  }
});

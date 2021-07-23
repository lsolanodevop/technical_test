const userSearchButton = document.getElementById("userSearchButton")! as HTMLInputElement;
const userSearchInput = document.getElementById("userSearchInput")! as HTMLInputElement;
let c: any;
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
        console.log(data.experiences);
      });
  } else {
    console.log("Please Input a value");
  }
});

export interface Welcome {
  professionalHeadline: string;
  picture:              string;
  name:                 string;
  links:                Link[];
  location:             Location;
  summary:              string;
  stats:                Stats;
  habilities:           Hability[];
  interest:             Interest[];
  experiences:          Experience[];
}

export interface Experience {
  id:               string;
  category:         string;
  name:             string;
  organizations:    Organization[];
  responsibilities: string[];
  fromMonth:        string;
  fromYear:         string;
  remote:           boolean;
  additionalInfo:   string;
  highlighted:      boolean;
  weight:           number;
  verifications:    number;
  recommendations:  number;
  media:            any[];
  rank:             number;
  toMonth?:         string;
  toYear?:          string;
}

export interface Organization {
  id:       number;
  name:     string;
  publicId: string;
  picture?: string;
}

export interface Hability {
  id:              string;
  code:            number;
  name:            string;
  weight:          number;
  recommendations: number;
  media:           any[];
  supra:           boolean;
  created:         Date;
}

export interface Interest {
  id:      string;
  code:    number;
  name:    string;
  media:   any[];
  created: Date;
}

export interface Link {
  id:      string;
  name:    string;
  address: string;
}

export interface Location {
  name:           string;
  shortName:      string;
  country:        string;
  latitude:       number;
  longitude:      number;
  timezone:       string;
  timezoneOffSet: number;
  placeId:        string;
}

export interface Stats {
  jobs:      number;
  education: number;
  strengths: number;
  interests: number;
}

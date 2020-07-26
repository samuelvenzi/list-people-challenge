let filteredUsersHTML = null;
let allUsers = [];
let filteredUsers = [];
let men = 0;
let women = 0;
let agesSum = 0;
let averageAge = 0;

window.addEventListener('load', start);

function start() {
  let nameInput = null;
  nameInput = document.querySelector('#nameInput');
  nameInput.focus();
  nameInput.addEventListener('keyup', searchUsers);
  fetchNames();
}

async function fetchNames() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfohttps://restcountries.eu/rest/v2/all'
  );
  const json = await res.json();
  allUsers = json;
  allUsers = json.results.map((user) => {
    return {
      name: user.name.first + ' ' + user.name.last,
      picture: user.picture.medium,
      age: user.dob.age,
      gender: user.gender,
    };
  });
}

function searchUsers() {
  if (nameInput.value !== '') {
    filteredUsers = allUsers.filter((user) => {
      return user.name.toLowerCase().includes(nameInput.value.toLowerCase());
    });
    console.log('Found users');
  } else {
    console.log("Didn't find users");
    filteredUsers = [];
  }
  showUsers();
  showUsersStatistics();
}

function showUsers() {
  let filteredUsersCards = document.getElementById('filteredUsers');
  let usersHTML = null
  if (filteredUsers.length > 0) {
    usersHTML = '<div> <h2>Users found</h2>';
    filteredUsers.forEach((user) => {
      const { name, picture, age, gender } = user;
      let userData = `
      <div class="card">
      <img src="${picture}" class="pics"></img>
      <div class="card-content">
        <h3>${name}</h3>
        <p>Age: ${age}</p>
        <p>Gender: ${gender}</p>
      </div>
      </div>
      `;
      usersHTML = usersHTML + userData;
    });
    usersHTML = usersHTML + '</div>';
  } else {
    usersHTML = "<div><h2>No user found</h2></div>"
  }
  filteredUsersCards.innerHTML = usersHTML;
}

function showUsersStatistics() {
  let nMale = 0
  let nFemale = 0
  let sumAge = 0
  filteredUsers.forEach(user => {
    switch (user.gender) {
      case "male":
        nMale++
        break;
      case "female":
        nFemale++
        break;
      default:
        break;
    }

    sumAge += parseInt(user.age)
  })

  let averageAge = sumAge / (filteredUsers.length)

  let statsHTML = `<div>
    <div class="card">
      <h2>Number of women</h2>
      <h4>${nFemale}</h4>
    </div>
    <div class="card">
      <h2>Number of men</h2>
      <h4>${nMale}</h4>
    </div>
    <div class="card">
      <h2>Sum of ages</h2>
      <h4>${sumAge}</h4>
    </div>
    <div class="card">
      <h2>Age average</h2>
      <h4>${averageAge}</h4>
    </div>
  </div>`

  let statsId = document.getElementById('userStatistics');
  statsId.innerHTML = statsHTML
}

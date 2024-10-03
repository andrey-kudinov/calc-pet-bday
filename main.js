const CAT_YEAR_RATES = [15, 9, 4];
const DOG_YEAR_RATES = [15, 9, 5];

const calculatePetBirthdays = (birthDate, yearRates) => {
  const birthdays = [];
  let petYear = 0;
  const currentDate = new Date();
  const startDate = new Date(birthDate);

  while (petYear < yearRates.length || startDate <= currentDate) {
    const yearRate = yearRates[Math.min(petYear, yearRates.length - 1)];

    for (let i = 0; i < yearRate; i++) {
      const birthdayThisYear = new Date(startDate);
      const interval = 365 / yearRate;
      birthdayThisYear.setDate(startDate.getDate() + Math.floor(i * interval));

      if (birthdayThisYear <= currentDate) {
        birthdays.push(new Date(birthdayThisYear));
      }
    }

    startDate.setFullYear(startDate.getFullYear() + 1);
    petYear++;
  }

  return birthdays;
};

const displayBirthdays = (petName, petType, birthDate, year) => {
  const yearRates = petType === 'cat' ? CAT_YEAR_RATES : DOG_YEAR_RATES;
  const birthdays = calculatePetBirthdays(birthDate, yearRates);
  let result = `<h2>${petName}'s Birthdays in ${year}</h2><ul>`;

  if (birthdays.length === 0) {
    result += `<li>No upcoming birthdays this year.</li>`;
  } else {
    birthdays.forEach(birthday => {
      result += `<li>${birthday.toDateString()}</li>`;
    });
  }

  result += `</ul>`;
  document.getElementById('result').innerHTML += result;
};

const handleFormSubmit = event => {
  event.preventDefault();

  const petName = document.getElementById('pet-name').value;
  const petType = document.querySelector('input[name="pet-type"]:checked').value;
  const birthDate = new Date(document.getElementById('birth-year').value);

  const currentYear = new Date().getFullYear();

  document.getElementById('result').innerHTML = '';

  displayBirthdays(petName, petType, birthDate, currentYear);

  addNextYearButton(petName, petType, birthDate, currentYear + 1);
};

const addNextYearButton = (petName, petType, birthDate, nextYear) => {
  const button = document.createElement('button');
  button.textContent = `Add Birthdays for ${nextYear}`;
  button.className = 'add-year-btn';
  button.addEventListener('click', () => {
    displayBirthdays(petName, petType, birthDate, nextYear);
    button.remove();
    addNextYearButton(petName, petType, birthDate, nextYear + 1);
  });

  document.getElementById('result').appendChild(button);
};

document.querySelector('form').addEventListener('submit', handleFormSubmit);

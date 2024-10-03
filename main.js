const CAT_YEAR_RATES = [15, 9, 4];
const DOG_YEAR_RATES = [15, 9, 5];

const calculatePetBirthdays = (birthDate, yearRates, endYear) => {
  const birthdays = [];
  let petYear = 0;
  const currentDate = new Date(endYear, 11, 31);
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
  const birthdays = calculatePetBirthdays(birthDate, yearRates, year);
  const heading = `<h2>${petName}'s Birthdays in ${year}</h2>`;
  const noBirthdays = '<li>No upcoming birthdays this year.</li>';
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const result = document.getElementById('result');

  if (birthdays.length === 0) {
    result.innerHTML += `${heading} ${noBirthdays}`;
    return;
  }
  const currentDate = new Date();
  const birthdaysLayout = birthdays
    .filter(birthday => {
      const birthdayYear = birthday.getFullYear();
      return birthdayYear === year;
    })
    .map(birthday => {
      const isBirthdayToday =
        birthday.getDate() === currentDate.getDate() && birthday.getMonth() === currentDate.getMonth();
      const formattedBirthday = new Intl.DateTimeFormat('en-AU', options).format(birthday);
      return `<li>
        ${isBirthdayToday ? `<strong>${formattedBirthday}</strong>` : formattedBirthday}
      </li>`;
    })
    .join('');

  result.innerHTML += `${heading} <ul>${birthdaysLayout}</ul>`;
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
  button.className = 'add-year-btn button-82-pushable';
  button.innerHTML = `
    <span class="button-82-shadow"></span>
    <span class="button-82-edge"></span>
    <span class="button-82-front text">
      Add Birthdays for ${nextYear}
    </span>
  `;
  button.addEventListener('click', (e) => {
    e.currentTarget.remove();
    displayBirthdays(petName, petType, birthDate, nextYear);
    addNextYearButton(petName, petType, birthDate, nextYear + 1);
  });

  document.getElementById('result').appendChild(button);
};

document.querySelector('form').addEventListener('submit', handleFormSubmit);

const button = document.querySelector('[type="submit"]');
button.ontouchstart = () => button.classList.add('active');
button.ontouchend = () => button.classList.remove('active');

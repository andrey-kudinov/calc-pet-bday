const calculateDogHumanYears = years => {
  let result = [];
  for (let humanYears = 1; humanYears <= years; humanYears++) {
    const nowDogYears = Math.round(16 * Math.log(humanYears) + 31);
    if (!result.length) {
      result.push(nowDogYears);
    } else {
      const prevDogYears = result.reduce((a, b) => a + b, 0);
      result.push(nowDogYears - prevDogYears);
    }
  }
  return result;
};

const calculateCatHumanYears = years => {
  let result = [];
  for (let humanYears = 1; humanYears <= years; humanYears++) {
    let catYears;
    if (humanYears === 1) {
      catYears = 15;
    } else if (humanYears === 2) {
      catYears = 9;
    } else {
      catYears = 4;
    }
    result.push(catYears);
  }
  return result;
};

const getDaysInYear = year => {
  return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
};

const calculatePetBirthdays = (birthDate, petType, endYear) => {
  const birthdays = [];
  const startDate = new Date(birthDate);
  const diff = endYear + 1 - birthDate.getFullYear();
  const years = diff === 0 ? 1 : diff;
  const yearRates = petType === 'cat' ? calculateCatHumanYears(years) : calculateDogHumanYears(years);
  let petAge = 0;
  let humanAge = 0;

  yearRates.forEach((yearRate, humanYear) => {
    const petYearsInRate = Array.from(Array(yearRate).keys());
    const birthdayThisYear = new Date(birthDate);
    birthdayThisYear.setFullYear(birthDate.getFullYear() + humanYear);
    const daysInYear = getDaysInYear(birthdayThisYear.getFullYear());
    const interval = daysInYear / yearRate;

    petYearsInRate.forEach(petYear => {
      const nextBirthday = new Date(birthdayThisYear);
      nextBirthday.setDate(startDate.getDate() + Math.round(petYear * interval));
      const isOrigin =
        nextBirthday.getDate() === birthDate.getDate() && nextBirthday.getMonth() === birthDate.getMonth();
      birthdays.push({ date: new Date(nextBirthday), isOrigin, petAge, humanAge });
      petAge++;
    });
    humanAge++;
  });

  return birthdays;
};

const displayBirthdays = (petName, petType, birthDate, year, addToTop) => {
  const birthdays = calculatePetBirthdays(birthDate, petType, year);
  const title = `<h2 class="center m-0 mb-1 mt-4">${petName}'s Birthdays in ${year}</h2>`;
  const humanAge = year - birthDate.getFullYear();
  const humanAgeDisplay = `<h3 class="center m-0 mb-4">${humanAge} years old</h3>`;
  const heading = `${title} ${humanAge > 0 ? humanAgeDisplay : ''}`;
  const noBirthdays = addToTop
    ? '<p class="center">  There were no birthdays in this year.</p>'
    : '<p class="center">No upcoming birthdays this year.</p>';
  const options = { day: '2-digit', month: 'long' };
  const result = document.getElementById('result');
  const block = document.createElement('div');

  const currentDate = new Date();
  const birthdaysLayout = birthdays
    .filter(({ date }) => {
      const birthdayYear = date.getFullYear();
      return birthdayYear === year;
    })
    .map(({ date, isOrigin, petAge }) => {
      const formattedDate = new Intl.DateTimeFormat('en-AU', options).format(date);
      const petAgeDisplay = petAge ? `${petAge} years old` : 'just born';

      return `<li>${
        isOrigin ? `<strong>${formattedDate}</strong> – ${petAgeDisplay}` : `${formattedDate} – ${petAgeDisplay}`
      }</li>`;
    })
    .join('');

  block.innerHTML = `${heading} ${birthdaysLayout ? `<ul class="mb-5 mt-4">${birthdaysLayout}</ul>` : noBirthdays}`;
  block.dataset.year = year;

  if (addToTop) {
    result.prepend(block);
  } else {
    result.append(block);
  }
};

const handleFormSubmit = event => {
  event.preventDefault();

  const petName = document.getElementById('pet-name').value;
  const petType = document.querySelector('input[name="pet-type"]:checked').value;
  const birthDate = new Date(document.getElementById('birth-year').value);

  const currentYear = new Date().getFullYear();

  document.getElementById('result').innerHTML = '';

  displayBirthdays(petName, petType, birthDate, currentYear);

  handlePreviousYearButton(petName, petType, birthDate, currentYear - 1);
  handleNextYearButton(petName, petType, birthDate, currentYear + 1);

  const params = new URLSearchParams(window.location.search);
  params.set('petName', petName);
  params.set('petType', petType);
  params.set('birthDate', birthDate.getTime());

  window.history.pushState(
    { path: window.location.pathname + '?' + params.toString() },
    '',
    window.location.pathname + '?' + params.toString()
  );
};

const handleNextYearButton = (petName, petType, birthDate, nextYear) => {
  const button = document.querySelector('[data-next-button]');

  if (button.classList.contains('hidden')) {
    const label = document.querySelector('[data-next-year]');
    button.classList.remove('hidden');
    label.textContent = nextYear;
  }
  
  button.onclick = () => {
    const label = document.querySelector('[data-next-year]');
    const result = document.getElementById('result');
    const blocks = result.querySelectorAll('[data-year]');
    const currentYear = Number(blocks[blocks.length - 1].dataset.year);
    const year = currentYear ? currentYear + 1 : nextYear;
    label.textContent = year + 1;
    
    displayBirthdays(petName, petType, birthDate, year);

    button.scrollIntoView({ behavior: "smooth" });
  };
};

const handlePreviousYearButton = (petName, petType, birthDate, prevYear) => {
  const button = document.querySelector('[data-prev-button]');

  if (button.classList.contains('hidden')) {
    const label = document.querySelector('[data-prev-year]');
    button.classList.remove('hidden');
    label.textContent = prevYear;
  }

  button.onclick = () => {
    const label = document.querySelector('[data-prev-year]');
    const result = document.getElementById('result');
    const blocks = result.querySelectorAll('[data-year]');
    const currentYear = Number(blocks[0].dataset.year);
    const year = currentYear ? currentYear - 1 : prevYear;
    label.textContent = year - 1;

    displayBirthdays(petName, petType, birthDate, year, true);
  };
};

const loadFormDataFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const petName = params.get('petName');
  const petType = params.get('petType');
  const birthDate = params.get('birthDate');

  if (petName) {
    document.getElementById('pet-name').value = petName;
  }
  if (petType) {
    document.querySelector(`input[name="pet-type"][value="${petType}"]`).checked = true;
  }
  if (birthDate) {
    const date = new Date(Number(birthDate));
    document.getElementById('birth-year').value = date.toISOString().split('T')[0];
  }
};

const handleButtonAnimations = () => {
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    button.ontouchstart = () => button.classList.add('active');
    button.ontouchend = () => button.classList.remove('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.onload = loadFormDataFromUrl;

  handleButtonAnimations();

  const form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
});

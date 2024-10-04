# Calc Pet Bday

A simple web application to calculate the birthdays of your pets (dogs and cats). This tool provides a fun way to understand how your pets' ages translate into human years, along with calculating their upcoming birthdays.

## Project Links

- [Live Application](https://calc-pet-bday.ru)
- [Backup link](https://calc-pet-bday.netlify.app)

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
  - [Dog Age Calculation](#dog-age-calculation)
  - [Cat Age Calculation](#cat-age-calculation)
- [Usage](#usage)

## Features

- Calculates the birthdays of your pets based on their birth dates.
- Provides a clear conversion of pet ages (in years) to human years for both dogs and cats.
- Displays a list of upcoming birthdays for your pets.

## How It Works

The application allows users to input their pet's birth date and type (dog or cat). It then calculates the corresponding human years and upcoming birthdays. The calculations are based on specific formulas tailored to each pet type.

### Dog Age Calculation

For dogs, the age calculation is based on a logarithmic formula derived from scientific research. The formula used is:

Dog Years = 16⋅log(Human Years) + 31

This approach reflects the faster aging process of dogs compared to humans, especially during their early years. The study suggests that the logarithmic relationship between dog years and human years provides a more accurate estimation of a dog's age in human terms, particularly for different breeds and sizes of dogs. 

You can read more about this calculation in the research paper: [Canine Age and Life Expectancy: A Novel Method to Estimate the Human Age of Dogs](https://www.biorxiv.org/content/10.1101/829192v1.full).

### Cat Age Calculation

For cats, the age conversion is simpler and based on standard age equivalents:

- 1 year = 15 cat years
- 2 years = 9 cat years
- Each additional year = 4 cat years

This method is more straightforward as it reflects the typical aging process of cats, which tends to be less variable than that of dogs.

## Usage

1. Enter your pet's birth date.
1. Select the type of pet (dog or cat).
1. Click the "Calculate" button to see the upcoming birthdays and age conversions.

### Do you like the slider? Please star ⭐ this repository!

Made by Andrey Kudinov with ❤️

Need help? Feel free to contact me [2499931@gmail.com](mailto:2499931@gmail.com?Subject=image-comparison-slider)

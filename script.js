function reverseString(str) {
  return str.split('').reverse().join('');
}

function isPallindrome(str) {
  return str === reverseString(str);
}

function convertDateToString(date) {
  var dateStr = { day: '', month: '', year: '' };
  if (date.day < 10) {
    dateStr.day = `0${date.day}`;
  } else {
    dateStr.day = `${date.day}`;
  }

  if (date.month < 10) {
    dateStr.month = `0${date.month}`;
  } else {
    dateStr.month = `${date.month}`;
  }

  dateStr.year = `${date.year}`;
  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPallindromeForAllFormats(date) {
  var dateFormats = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < dateFormats.length; i++) {
    if (isPallindrome(dateFormats[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }

  } else {
    if (day > daysInMonth[month]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return { day: day, month: month, year: year };
}

function getNextPallindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPallindrome = checkPallindromeForAllFormats(nextDate);
    
    if (isPallindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [ctr, nextDate];
}

function clickHandler() {
  const dateStr = birthdateInput.value;

  if (!dateStr) {
    resultBox.innerText = 'Please enter your birth date!';
    return;
  }
  const listOfDate = dateStr.split('-');

  const date = {
    day: Number(listOfDate[2]),
    month: Number(listOfDate[1]),
    year: Number(listOfDate[0])
  };


  const isPallindrome = checkPallindromeForAllFormats(date);


  if (isPallindrome) {
    resultBox.innerText = 'Yay! Your birthday is pallindrone!';
  } else {
    var [noOfDays, nextPallindromeDate] = getNextPallindromeDate(date);
    resultBox.innerText = `Oops! Your birthday is not pallindrone! The next pallindrome date is ${nextPallindromeDate.day}-${nextPallindromeDate.month}-${nextPallindromeDate.year}. You missed by ${noOfDays} days`;
  }
}

const birthdateInput = document.querySelector('#birth-date');
const showButton = document.querySelector('#show-btn');
const resultBox = document.querySelector('#result-box');

showButton.addEventListener('click', clickHandler);

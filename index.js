function isPalindrome(str) {
    let charArray = str.split("").reverse().join("");
    let result = (str===charArray);
    return result;
}


function dateToString(date) {
    let stringDate = {};
    for (const attr in date){
        let dateString = date[attr].toString();
        if (dateString.length===1) dateString="0"+dateString;
        stringDate[attr] = dateString;
    }
    return stringDate;
}


function dateFormats(date) {
    let outputFormats = [];

    outputFormats.push(date["day"]+date["month"]+date["year"]);
    outputFormats.push(date["month"]+date["day"]+date["year"]);
    outputFormats.push(date["year"]+date["month"]+date["day"]);
    
    outputFormats.push(date["month"]+date["day"]+date["year"].slice(-2));
    outputFormats.push(date["year"].slice(-2)+date["month"]+date["day"]);
    outputFormats.push(date["day"]+date["month"]+date["year"].slice(-2));

    return outputFormats;
}

function checkPalindromeForAllDateFormats(date) {
    let allDateFormats = dateFormats(date);

    let isPalindromeList = [];
    allDateFormats.forEach(function(item,index){
        isPalindromeList.push(isPalindrome(item));
    })
    return isPalindromeList;
}


function isLeapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function generateNextDate(date) {
    let day = date["day"]+1;
    let month = date["month"];
    let year = date["year"];
    let listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month==2){
        if(isLeapYear(year) && day>29){
            day = 1;
            month = 3;
        }
        else if(!isLeapYear(year) && day>28){
            day = 1;
            month = 3;
        }
    }
    else{
        if(day > listOfDays[month-1]){
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function nextPalindromeDate(date) {
    let nextDate = generateNextDate(date);
    let ctr = 0;
  
    while (1) {
      ctr++;
      let dateStr = dateToString(nextDate);
      let resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, nextDate];
            }
        }
      nextDate = generateNextDate(nextDate);
    }
}



function generatePreviousDate(date) {
    let day = date["day"]-1;
    let month = date["month"];
    let year = date["year"];
    let listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month==3){
        if(isLeapYear(year) && day<1){
            day = 29;
            month = 2;
        }
        else if(!isLeapYear(year) && day<1){
            day = 28;
            month = 2;
        }
    }
    else{
        if(day < 1){
            day = listOfDays[(month-2 < 0) ? 11 : (month-2)];
            month--;
        }
    }
    if (month < 1) {
        month = 12;
        year--;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function previousPalindromeDate(date) {
    let previousDate = generatePreviousDate(date);
    let ctr = 0;
    while (1) {
        ctr++;
        console.log(previousDate);
        let dateStr = dateToString(previousDate);
        let resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
            }
        }
      previousDate = generatePreviousDate(previousDate);
    }
}


let birthdayInput = document.querySelector(".birthday-date");
const outputText = document.querySelector(".output-text");

document.querySelector(".check-btn").addEventListener("click",checkForPalindrome);

function checkForPalindrome() {
    var bdayString = birthdayInput.value;

    if (bdayString !== '') {
      var date = bdayString.split('-');
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];
  
      var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
        };
  
      var dateStr = dateToString(date);
      var list = checkPalindromeForAllDateFormats(dateStr);
      var isPalindrome = false;
  
      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
            }
        }
  
      if (!isPalindrome) {
        const [ctr1, nextDate] = nextPalindromeDate(date);
        
        const [ctr2, prevDate] = previousPalindromeDate(date);
  
        if (ctr1 > ctr2) {
          outputText.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} ${(ctr2>1) ? "days" : "day"}.`;
        } else {
          outputText.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} ${(ctr1>1) ? "days" : "day"}.`;
        }
        outputText.style.backgroundColor = '#F3336F';
    } 
        else {
        outputText.innerText = 'Yay! Your birthday is palindrome!';
        outputText.style.backgroundColor = '#B6E45D';
        }
    }
    else {
        alert("Enter a valid date.");
    }
}
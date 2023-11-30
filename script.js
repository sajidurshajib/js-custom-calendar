const date = new Date();
const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const today = date.getDay();
let thisMonth = date.getMonth();
let thisYear = date.getFullYear();

// +------------------------+
// + Create months dropdown +
// +------------------------+
const monthsSelect = document.getElementById('months');
monthsArray.forEach((month, index) => {
    let optionNode = document.createElement('option');
    let optionText = document.createTextNode(month);
    optionNode.append(optionText);
    // create value attribute
    let att = document.createAttribute('value');
    att.value = index;
    optionNode.setAttributeNode(att);

    // check active date
    if (index == thisMonth) {
        let selectedAtt = document.createAttribute('selected');
        optionNode.setAttributeNode(selectedAtt);
    }
    monthsSelect.append(optionNode);
});

function changeMonth(value) {
    thisMonth = parseInt(value);

    changeCalendar();
}

// +--------------------+
// + Create year select +
// +--------------------+
const year = document.getElementById('year');
year.value = thisYear;

// Style purpose
// background year
let backgroundYear = document.getElementById('backgroundYear');
backgroundYear.appendChild(document.createTextNode(thisYear));

// change year
function changeYear(value) {
    thisYear = parseInt(value);
    backgroundYear.innerHTML = '';
    backgroundYear.appendChild(document.createTextNode(thisYear));

    changeCalendar();
}

// =====================================
function getDatesInMonth(year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const dates = [];
    for (let current = startDate; current <= endDate; current.setDate(current.getDate() + 1)) {
        let newDate = new Date(current).getDate();
        dates.push(newDate);
    }

    return dates;
}

// This function change calendar every time depends on month and year
function changeCalendar() {
    const everyDates = getDatesInMonth(thisYear, thisMonth + 1);

    let firstEmptyDates = new Date(thisYear, thisMonth, 1).getDay();
    console.log(firstEmptyDates);

    let allDatesDiv = document.getElementById('allDates');

    allDatesDiv.innerHTML = '';

    // Create day name div
    for (singleDay = 1; singleDay <= 7; singleDay++) {
        let div = document.createElement('div');
        div.classList.toggle('day');
        let p = document.createElement('p');
        let pText = document.createTextNode(daysArray[singleDay - 1]);
        p.append(pText);
        div.append(p);
        allDatesDiv.appendChild(div);
    }

    // Create first empty date div
    for (emptyDates = 0; emptyDates < firstEmptyDates; emptyDates++) {
        let div = document.createElement('div');
        allDatesDiv.appendChild(div);
    }

    // Create every single date
    for (singleDate = 1; singleDate <= everyDates.length; singleDate++) {
        let div = document.createElement('div');
        div.classList.toggle('date');

        // check active date
        if ((thisMonth == date.getMonth()) & (date.getDate() == singleDate)) {
            div.classList.add('active');
        }

        let p = document.createElement('p');
        let pText = document.createTextNode(singleDate);
        p.append(pText);
        div.append(p);
        allDatesDiv.appendChild(div);
    }
}

changeCalendar();

const body = document.getElementById('body');
const time = document.getElementById('time');
const greet = document.getElementById('greeting');
const name = document.getElementById('name');
const form = document.getElementById('focus-form');
const input = document.getElementById('focus-input');
const output = document.getElementById('focus-output');
const activeItem = document.getElementById('active-focus');
const del = document.getElementById('delete');
const checkFocus = document.getElementById('focus-check');

let completed = false;
// call function
startTime();
getName();
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
form.addEventListener('submit', setFocus);
getFocus();
del.addEventListener('click', itemDelete);
checkFocus.addEventListener('change', completeItem);

function startTime(){
  const today = new Date;
  let hour = today.getHours();

  showGreet(hour);

  let mint = today.getMinutes();
  mint = checkTime(mint);

  hour = hour % 12 || 12;

  time.innerHTML = hour + ':' + mint;
  console.log(hour+ ':' + mint);

  setInterval(startTime, 30000);
  showGreet();
}

function checkTime(i){
  if(i < 10){
    return i = '0' + i;
  }else{
    return i = i;
  }
}

// greeting functionality
function showGreet(hour){

  if (hour < 12){
    body.style.background = "url('img/morning.jpg')";
    greet.innerHTML = 'Good morning';
  } else if(hour < 15) {
    body.style.background = "url('img/morning.jpg')";
    greet.innerHTML = 'Good afternoon';
  } else{
    body.style.background = "url('img/evening.jpg')";
    greet.innerHTML = 'Good evening';
  }
}


// set name
function getName(){
  if(localStorage.getItem('name') === null){
    name.innerHTML = 'Enter Name';
  }else{
    name.innerHTML = localStorage.getItem('name');
  }
}
// get Name
function setName(e){
  if(e.type == 'keypress'){
    if(e.which == 13 || e.keyCode == 13){
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  }else{
    localStorage.setItem('name', e.target.innerText);
  }
}

// set focus
function setFocus(e){
  e.preventDefault();
  const focus = document.getElementById('focus').value;
  console.log(focus);
  localStorage.setItem('focus', focus);
  displayOut();
  activeItem.innerHTML = localStorage.getItem('focus');
  e.target.value = '';
}

// get focus
function getFocus(){
  if(localStorage.getItem('focus') === null){
    displayInput();
  }else{
    displayOut();
    activeItem.innerHTML = localStorage.getItem('focus');
  }
}

function completeItem(){
  if(completed == false){
    activeItem.style.textDecoration = 'line-through';
    completed = true;
  }else{
    activeItem.style.textDecoration = 'none';
    completed = false;
  }
  
}

function itemDelete(){
  localStorage.removeItem('focus');
  displayInput();
}

function displayInput(){
  input.style.display = 'flex';
  output.style.display = 'none';
}

function displayOut(){
  input.style.display = 'none';
  output.style.display = 'flex';
}





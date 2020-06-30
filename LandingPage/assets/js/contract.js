var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

var mobile = false;

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Soumettre";
    document.getElementById("nextBtn").className += " sub";
  } else {
    document.getElementById("nextBtn").className = document.getElementById("nextBtn").className.replace("sub", "");
    document.getElementById("nextBtn").innerHTML = "Suivant";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].querySelectorAll('div:not(.hidden) > input');;
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    y[i].className = y[i].className.replace("valid", "");
    y[i].className = y[i].className.replace("invalid", "");
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
    else if (!y[i].validity.valid) {
      y[i].className = y[i].className.replace("valid", "");
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false; 
    }
    else {
      y[i].className = y[i].className.replace("invalid", "");
      y[i].className += " valid";
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  //if (valid) {
  //  document.getElementsByClassName("step")[currentTab].className += " finish";
  //}
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  x = document.getElementsByClassName("form-steps__item");

  if(n === 0) {
    x[n].className += " form-steps__item--active";
  }
  else if(n > 0) {
    x[n-1].className = x[n-1].className.replace("active", "completed");
    x[n].className += " form-steps__item--active";
  }
}


function toggleOnPV() {
  var x = document.querySelector('div.hidden.pv');
  x.className = x.className.replace("hidden", "");
}

function toggleOffPV() {
  var x = document.querySelector('div.pv');
  if(x.className.search("hidden") == -1) {
    x.className += " hidden";
  }
  x.querySelector("input").value = "";
}

function toggleOffImm() {
  var x = document.querySelectorAll('div.no-imm > div.hidden');
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace("hidden", "");
  }
  
  var y = document.querySelector('div.imm');
  if(y.className.search("hidden") == -1) {
    y.className += " hidden";
  }
}

function toggleOnImm() {
  var x = document.querySelectorAll('div.no-imm > div');
  for (i = 0; i < x.length; i++) {
    if(x[i].className.search("hidden") == -1) {
      x[i].className += " hidden";
    }
    x[i].value = "";
  }
  var y = document.querySelector('div.imm');
  y.className = y.className.replace("hidden", "");

}

function manageMobileDisplay() {
  if(window.innerWidth <= 760) {
    toggleMobileDisplayOn();
    mobile = true;
  }
  else if(mobile && (window.innerWidth > 760)) {
    toggleMobileDisplayOff();
    mobile = false;
  }
}

function toggleMobileDisplayOn() {
  var x = document.querySelector('div.container');
  if(x.className.search("flex-column") == -1) {
    x.className += " flex-column";
  }
  var y = document.querySelector('section.inner-page');
  if(y.className.search("mobile-steps") == -1) {
    y.className += " mobile-steps";
  }
}

function toggleMobileDisplayOff() {
  var x = document.querySelector('div.container');
  x.className = x.className.replace("flex-column","");
  var y = document.querySelector('section.inner-page');
  y.className = y.className.replace("mobile-steps","");
}

window.onload = manageMobileDisplay;
window.onresize = manageMobileDisplay;
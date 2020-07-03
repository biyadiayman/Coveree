var currentTab = 0; // Variable indiquant l'étape de formulaire courante
showTab(currentTab); // Affiche le tab courant

var mobile = false;


//Affiche le n-em tab
function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  //Fix les boutons de bas de formulaire en fonction du tab
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

  fixStepIndicator(n);
}

// Fonction qui met à jour les variables pour suivre le tab courant
function nextPrev(n) {

  var x = document.getElementsByClassName("tab");
  // Si un des champs est invalid on exit
  if (n == 1 && !validateForm()) return false;

  x[currentTab].style.display = "none";
  currentTab = currentTab + n;

  if (currentTab >= x.length) {

    document.getElementById("regForm").submit();
    return false;
  }

  showTab(currentTab);
}

  // Fonction de validation des champs du formulaire, l'attribut valid ou invalid détermine si le champs est bon ou non
function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  //On sélectionne ici uniquement les inputs qui ne sont pas dans une division cachée
  y = x[currentTab].querySelectorAll('div:not(.hidden) > div:not(.hidden) > input');;

  for (i = 0; i < y.length; i++) {
    y[i].className = y[i].className.replace("valid", "");
    y[i].className = y[i].className.replace("invalid", "");

    if (y[i].value == "") {

      y[i].className += " invalid";
      valid = false;
    }
    else if (!y[i].validity.valid) {
      y[i].className = y[i].className.replace("valid", "");
      y[i].className += " invalid";
      valid = false; 
    }
    else {
      y[i].className = y[i].className.replace("invalid", "");
      y[i].className += " valid";
    }
  }

  return valid;
}

// Fonction qui gère la maj de la barre de progression
function fixStepIndicator(n) {
  x = document.getElementsByClassName("form-steps__item");

  if(n === 0) {
    x[n].className += " form-steps__item--active";
  }
  else if(n > 0) {
    x[n-1].className = x[n-1].className.replace("active", "completed");
    x[n].className += " form-steps__item--active";
  }
}

//Met à jour le format d'affichage lorsque la fenètre est redimensionnée
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


//Active le mode d'affichage mobile de la bar de progression
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

//Désactive le mode d'affichage mobile de la bar de progression
function toggleMobileDisplayOff() {
  var x = document.querySelector('div.container');
  x.className = x.className.replace("flex-column","");
  var y = document.querySelector('section.inner-page');
  y.className = y.className.replace("mobile-steps","");
}

window.onload = manageMobileDisplay;
window.onresize = manageMobileDisplay;

//jQuerry
$(function(){

  //La class hidden permet au vérificateur de formulaire d'ignorer la validité du champs caché
  //2 fonctions pour afficher ou non les bons inputs en fonction de si l'utilisateur connait ou non la plaque d'immatriculation
  //On reset les valeurs des champs qu'on cache
  $("#immN").click(function(){
    $("div.no-imm").slideDown();
    $("div.no-imm").removeClass("hidden");


    $("div.imm").slideUp("");
    $("div.imm").addClass("hidden");
    $("div.imm > input").val("");
  });

  $("#immY").click(function(){
    $("div.no-imm").slideUp();
    $("div.no-imm").addClass("hidden");
    $("div.no-imm > div").each(function() {
      $( "div.no-imm > div > input" ).val("");
    });

    $("div.imm").slideDown();
    $("div.imm").removeClass("hidden");
  });

  //2 fonctions pour afficher ou non les bons inputs en fonction de si l'utilisateur à eu ou non des PV dans les 10 dernières années
  //On reset les valeurs des champs qu'on cache
  $("#pvY").click(function(){
    $("#nbPvDiv").slideDown();
    $("#nbPvDiv").removeClass("hidden");
  });

  $("#pvN").click(function(){
    $("#nbPvDiv").slideUp();
    $("#iNbPv").val("");
    $("#nbPvDiv").addClass("hidden");
  });

  //Affiche les bons input au chargement de la page, dans le cas ou elle à été rechargé prématurément
  $( document ).ready(function() {
    //Partie PV sur 10 ans
    if($("#pvY").is(":checked")) {
      $("#nbPvDiv").prop("style", "");
      $("#nbPvDiv").removeClass("hidden");
    }

    //Partie conaissance de la plaque d'immatriculation
    if($("#immN").is(":checked")) {
      $("div.no-imm").prop("style", "");
      $("div.no-imm").removeClass("hidden");
  
  
      $("div.imm").prop("style", "display: none;");
      $("div.imm").addClass("hidden");
      $("div.imm > input").val("");
    }
});
});



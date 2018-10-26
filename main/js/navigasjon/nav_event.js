
// Går til overskriften i dokumentet når noen tykker på overskriften i navigasjonen
// Hvis det er flere treff går den til den første overskriften
$(function () {
  'use strict'

  $('.nav_clickable').on('click', function () {

    let Destinasjon = 0;
    const windowHeight = $(window).height();

    // Søker etter overskriften og filterer ut verdiene som ikke treffer søkeverdien
    let Result = Returner_Første_Treff($(this).text(), $('h1,h2'))
    
    if (Result != undefined) {
      Destinasjon = $(Result).offset().top
    }

    // Gjør at den scroller til midten av siden hvis overskriften er lavere enn
    // høyden på vinduet
    if (Destinasjon < windowHeight || Destinasjon !== 0 ) {
      Destinasjon -= (windowHeight / 2);
    };

    // Scroller til destinasjonen og viser highlight i 1 sekund
    if (Destinasjon !== 0) {
      $('html, body').animate({
        scrollTop: (Destinasjon)
      }, 1000);

      $(Result).effect( "highlight", {color:"#669966"}, 3000 );
    };

  });

  // Viser søkeresultatene som matcher (i menyen til høyre)
  $('#søk_nav').on('keyup', function () {

    let Search_Prase = $(this).val();

    // Vis alt hvis søkelengden er null
    if (Search_Prase.length === 0) {
      $('li').show();
      $('.nav_clickable').show();
    }

    // Let gjennom listen og klassen clickable (h1 overskriftene)
    else {

      $('li:not(:def_contains("' + Search_Prase + '")), .nav_clickable:not(:def_contains("' + Search_Prase + '"))')
        .hide();

      // Viser resultatene som matcher (oppdaterer søket etterhver)
      $('li:def_contains("' + Search_Prase + '"), .nav_clickable:def_contains("' + Search_Prase + '")')
        .show();
    };

  });
});
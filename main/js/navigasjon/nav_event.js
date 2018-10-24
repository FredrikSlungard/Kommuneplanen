
// Går til overskriften i dokumentet når noen tykker på overskriften i navigasjonen
// Hvis det er flere treff går den til den første overskriften
$(function () {
  'use strict'

  let Overskrifter = $('h1,h2');

  $('.nav_clickable').on('click', function () {

    let Søk_Etter = $(this).text();
    let Destinasjon = 0;
    let Sel_Header = $();
    const windowHeight = $(window).height();

    // Søker etter overskriften og filterer ut verdiene som ikke treffer søkeverdien
    let Result = Overskrifter.filter(function () {
      
      if ($(this).text().indexOf(Søk_Etter) !== -1) {
        return $(this).text; 
      };
    });

    // Velger destinasjon utifra antall treff, ved flere treff velges den øverste
    if (Result.length === 1) {
      Sel_Header = Result;
      Destinasjon = $(Result).offset().top;
    }
    else if (Result.length >= 1){
      Sel_Header = Result[0];
      Destinasjon = $(Sel_Header).offset().top;
    };

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

      $(Sel_Header).effect( "highlight", {color:"#669966"}, 3000 );
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
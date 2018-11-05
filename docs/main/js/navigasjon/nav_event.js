
// Går til overskriften i dokumentet når noen tykker på overskriften i navigasjonen
// Hvis det er flere treff går den til den første overskriften
$(function () {

  // Returnerer destinasjonen det skal scrolles til
  Finn_Destinasjon = (Resultat, Klikket_Item) => {
    'use strict';

    let Destinasjon = 0;
    const windowHeight = $(window).height();

    // Hent ut destinasjonen hvis resultatet ikke er tomt, hvis ikke bruk navnet
    // Får ikke highligtet med denne
    if (Resultat == undefined) {
      Destinasjon = $(Klikket_Item).attr('name');
    }
    else {
      Destinasjon = $(Resultat).offset().top;
    };

    // Trekker ifra vindushøyden hvis overskriften er lavere enn
    // høyden på vinduet (overskriften lander midt på vinduet)
    if (Destinasjon < windowHeight || Destinasjon !== 0) {
      Destinasjon -= (windowHeight / 2);
    };

    return Destinasjon

  };

  $('.nav_clickable').on('click', function () {
    'use strict';

    let Destinasjon = 0;

    // Søker etter overskriften og filterer ut verdiene som ikke treffer søkeverdien
    let Type_Overskrift = $(this).parent().prop('nodeName');
    let Result = Returner_Første_Treff($(this), $('#innhold > ' + Type_Overskrift))

    Destinasjon = Finn_Destinasjon(Result, this);

    // Scroller til destinasjonen og viser highlight
    if (Destinasjon !== 0) {
      $('html, body').animate({
        scrollTop: (Destinasjon)
      }, 1000);

      $(Result).effect( "highlight", {color:"#86ac41"}, 3000 );
    };

  });
});
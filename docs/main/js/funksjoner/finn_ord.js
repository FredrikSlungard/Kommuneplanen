/* Søker etter ord/setning, hvis det er flere treff søker den etter overskriften som er nærmest destinasjonen
- Søk_Etter er HTML delen av det du skal finne du skal finne
- Søk_Her er HTML innholdet det skal søkes i */
Returner_Første_Treff = (Søk_Etter, Søk_Her) => {
  'use strict';

  // Destinasjonen er lagret som et navn i navigasjonen og søkefeltet
  let Destinasjon = Søk_Etter.attr('name');

  // Filterer alle resultatene
  let Result = Søk_Her.filter(function () {
    if ($(this).text().indexOf(Søk_Etter.text()) !== -1) {
      return $(this);
    };
  });

  // Velger destinasjon utifra antall treff, ved flere treff velges den øverste
  if (Result.length === 1) {
    return Result;
  }

  // Returnerer det første resultatet hvis det er flere treff og navnet ikke viser posisjonen
  else if (Result.length >= 1) {
    if (Destinasjon == undefined) {
      return Result[0];
    }

    // Jobbes videre med denne, returnerer aldri riktig indeks?
    else {

      // Array med differansene fra overskriftene og destinasjonen
      let Differanse = $.map(Result, function(value, index) {
        return Math.abs($(value).offset().top - Destinasjon); 
      });

      // Den minste verdien i differansen er den nærmeste overskriften
      let Index_Treff = Differanse.indexOf(Math.min(...Differanse));

      console.log(Index_Treff);
      return Result[Index_Treff];

    };
  };
}

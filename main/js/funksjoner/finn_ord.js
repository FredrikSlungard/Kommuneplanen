/* Søker etter ord/setning, hvis det er flere treff returneres det første treffet. Der:
- Søk_Etter er strengen du skal finne
- Søk_Her er HTML innholdet det skal søkes i */
Returner_Første_Treff = (Søk_Etter, Søk_Her) => {
  'use strict';

  // Filterer alle resultatene
  let Result = Søk_Her.filter(function () {
    if ($(this).text().indexOf(Søk_Etter) !== -1) {
      return $(this); 
    };
  });
  
  // Velger destinasjon utifra antall treff, ved flere treff velges den øverste
  if (Result.length === 1) {
    return Result;
  }
  else if (Result.length >= 1){
    return Result[0];
  };

}

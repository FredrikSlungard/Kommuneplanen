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

  switch (Result.length) {
    case 0:
      // Gå ut hvis det ikke er noe treff
      break

    case 1:

      return Result;

    // Den minste verdien i differansen er den nærmeste overskriften
    default:
      let Differanse = $.map(Result, function (value, index) {
        return Math.abs($(value).offset().top - Destinasjon);
      });
      let Index_Treff = Differanse.indexOf(Math.min(...Differanse));

      return Result[Index_Treff];
  };
};


// Trekker ut bokstavbiten av en streng, brukes primært for overskrifter
Formater_Overskrift = (Source) => {
  'use strict';

  let Item_Text = $(Source).text();
  let First_Pos = Item_Text.match(/[a-åA-Å]/); // Finner første bokstav
  let Last_Pos = Item_Text.length;
  
  // Første bokstav
  if (First_Pos === null) {
    First_Pos === 0;
  }
  else {
    First_Pos = First_Pos.index;
  };

  // Siste bokstav
  if (Item_Text.indexOf('(') !== -1) {
    Last_Pos = Item_Text.indexOf('(');
  };

  return Item_Text.substring(First_Pos, Last_Pos).trim();

};


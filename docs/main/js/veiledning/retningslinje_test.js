/* Viser veiledningen til bestemmelsene, når lenken trykkes på søker det etter en id, hvis den ikke eksisterer søker den etter innholdet.

Retningslinjene sorteres på følgende måte:
1. H2 overskriften er den samme som retningslinjen, den velger først alt innholdet frem til neste H2

2. H3 overskriftene legges til som knapper, mens alt innholdet frem til neste H3 legges til som content i listen */
$(function () {

  /* Leter opp innholdet som skal brukes i nedtrekkslisten.
  Leter gjennom overskriftene i retningslinjene og returnerer innholdet til neste overskrift (eller slutten av dokumentet) */
  Finn_Innhold_Liste = ($Kilde) => {
    'use strict';

    let Let_Etter = Formater_Overskrift($($Kilde).prev(':header').first()).toLowerCase();
    let Retningslinjer = $('h2', '#retningslinje');

    // Finner innholdet som skal brukes i nedtrekkslisten
    let Overskrift = $(Retningslinjer).filter(function (index, value) {
      let retn = $(value).text().toLowerCase();

      if (retn.indexOf(Let_Etter) !== -1) {
        return $(value);
      };
    });

    let Type_Overskrift = $(Overskrift).prop('nodeName').toLowerCase();
    let Innhold = $(Overskrift.nextUntil(Type_Overskrift));

    return Innhold;

  };


  // Event når lenken klikkes på, setter sammen listen eller flytter den til lokasjonen.
  $('.retningslinje').on('click', function () {

    let Ref_ID = $(this).attr('href').replace('#', '');

    // Flytt innholdet hvis ID eksisterer fra før
    if (Ref_ID !== '' && $('#' + Ref_ID).length !== 0) {
      $('#' + Ref_ID).insertAfter($(this));
    }

    // Leter opp og henter innholdet fra definisjonene og bygger HTML streng
    else {
      
      Finn_Innhold_Liste(this);

      //let Innhold = HTML_Streng(this);
      //$(Innhold).insertAfter($(this));

    };
  });
});
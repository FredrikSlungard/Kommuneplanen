/* Viser veiledningen til bestemmelsene, når lenken trykkes på søker det etter en id, hvis den ikke eksisterer søker den etter innholdet.

Retningslinjene sorteres på følgende måte:
1. H2 overskriften er den samme som retningslinjen, den velger først alt innholdet frem til neste H2

2. H3 overskriftene legges til som knapper, mens alt innholdet frem til neste H3 legges til som content i listen */
$(function () {
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

  // Flytter veiledningen til etter lenken som brukeren trykket på
  Flytt_Innhold = (Lenke) => {
    let Innhold = Finn_Innhold_Liste(Lenke).clone();
    let Hoved_Header = $(Innhold).prop('nodeName').toLowerCase();

    $(Innhold).insertAfter($(Lenke));
    return $(Innhold);

  };

  /* Leter opp innholdet som skal brukes i nedtrekkslisten.
  Leter gjennom overskriftene i retningslinjene og returnerer innholdet til neste overskrift (eller slutten av dokumentet) */
  Lag_Veiledning = (Lenke_Trykket_På) => {

    let Overskrift_Closest = $(Lenke_Trykket_På).prev(':header').first();
    let liste_id = 'veil' + $(Overskrift_Closest).text().replace(/[^A-Za-z0-9]/igm, '_');

    let liste_div = '<div class="collapse" id=' + liste_id + '></div>'
    let veiledning = $(Flytt_Innhold(Lenke_Trykket_På).wrapAll(liste_div));

    // Velg neste overskrift eller hovedoveskrift, hvis ikke velg frem til siste element
    $(veiledning).each(function (index, value) {
      if ($(value).prop('nodeName').toLowerCase() === 'h3') {

        let Neste = $(value).nextUntil('h2, h3');
        if (Neste.length === undefined) {
          Neste = $(veiledning).last();
        };

        $(value).replaceWith('<button class="collapsible">' + $(value).text() + '</button>');
        $(Neste).wrapAll('<div class="content"></div>')

      };
    });
  };
});
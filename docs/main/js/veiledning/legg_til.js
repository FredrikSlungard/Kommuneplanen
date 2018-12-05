/* Finner innholdet som skal brukes i definisjonene.
Denne modulen brukes hvis ordet er "hovedoverskriften" til definisjonene, f.eks. Småhus som er en overordnet definisjon med flere begreper.
*/
$(function () {
  Finn_Innhold_Liste_Def = ($Kilde) => {
    'use strict';

    let Let_Etter = $($Kilde).text().toLowerCase();
    let Definisjoner = $('h3', '#definisjoner');

    // Finner innholdet som skal brukes i nedtrekkslisten
    let Overskrift = $(Definisjoner).filter(function (index, value) {
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
  Flytt_Innhold_Def = (Lenke) => {
    let Innhold = Finn_Innhold_Liste_Def(Lenke).clone();
    $(Innhold).insertAfter($(Lenke).parent());

    return $(Innhold);

  };

  /* Leter opp innholdet som skal brukes i nedtrekkslisten.
  Leter gjennom overskriftene i retningslinjene og returnerer innholdet til neste overskrift (eller slutten av dokumentet) */
  Lag_Veiledning_Def = (Lenke_Trykket_På) => {

    let liste_id = $(Lenke_Trykket_På).attr('href');
    let liste_div = '<div class="collapse" id=' + liste_id + '></div>'
    let veiledning = $(Flytt_Innhold_Def(Lenke_Trykket_På).wrapAll(liste_div));

    // Ordner teksten hvis det første elementet er "vanlig tekst", velger som vanlig hvis nodenavnet er 'h4' og første item
    if ($(veiledning).first().is(':header') == false) {

      let Header = $('<h4>' + $(Lenke_Trykket_På).text() + '</h4>');

      // Denne legges ikke riktig til, blir en del av det første itemet?
      $(veiledning).first().prepend('<h4>' + $(Lenke_Trykket_På).text() + '</h4>');

    };

    // Velg neste overskrift eller hovedoveskrift, hvis ikke velg frem til siste element
    $(veiledning).each(function (index, value) {
      let node_name = $(value).prop('nodeName').toLowerCase();

        if (node_name === 'h4') {
          console.log($(value).html());
          let Header = $(value);
          let Neste = $(Header).nextUntil('h3, h4');

          if (Neste.length === undefined) {
            Neste = $(veiledning).last();
          };

          $(value).replaceWith('<button class="collapsible">' + $(Header).text() + '</button>');
          $(Neste).wrapAll('<div class="content"></div>')
        };

    });
  };

});
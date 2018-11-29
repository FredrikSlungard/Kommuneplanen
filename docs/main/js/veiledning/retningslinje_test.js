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

  /* Leter opp innholdet som skal brukes i nedtrekkslisten.
  Leter gjennom overskriftene i retningslinjene og returnerer innholdet til neste overskrift (eller slutten av dokumentet) */
  Lag_Veiledning = (Lenke_Trykket_På) => {
    let Innhold = Finn_Innhold_Liste(Lenke_Trykket_På).clone();
    let Overskrift_Closest = $(Lenke_Trykket_På).prev(':header').first();
    let Hoved_Header = $(Innhold).prop('nodeName').toLowerCase();
    let liste_Id = 'veil' + $(Overskrift_Closest).text().replace(/[^A-Za-z0-9]/igm, '_');

    let Temp = $(Innhold).each(function(index, value) {
      
      if ($(value).prop('nodeName').toLowerCase() === 'h3') {
        let Header = '<button class="collapsible>"' + $(value).text() + '</button>';
        let Content = '<div class="content">';
        let Neste = $(value).nextUntil('h2', '#retningslinje');

        console.log($(Neste).length);
        

        Content += $(Neste).each(function(index, value) {
         
          return $(value).html();
        });

        Content += '</div>';

        //console.log(Content);

      };
    });
  };



  // Event når lenken klikkes på, setter sammen listen eller flytter den til lokasjonen.
  $('.retningslinje').on('click', function () {
    'use strict'

    let Ref_ID = $(this).attr('href').replace('#', '');

    // Flytt innholdet hvis ID eksisterer fra før
    if (Ref_ID !== '' && $('#' + Ref_ID).length !== 0) {
      $('#' + Ref_ID).insertAfter($(this));
    }

    // Leter opp og henter innholdet fra definisjonene og bygger HTML streng
    else {
      
      Lag_Veiledning(this);

      //let Innhold = HTML_Streng(this);
      //$(Innhold).insertAfter($(this));

    };
  });
});
/* Setter inn de utdypende forklaringene under h1 overskriften den gjelder for. Sjekker hvilken overskrift som er nærmest og henter innholdet som stemmer overenst med overskriften.
*/
$(function () {
  Finn_Innhold_Utdypende = ($Kilde) => {
    'use strict';

    let Fldr = 'main/html/rettelse/';
    let Overskrift = $($Kilde).prev('h1').first().text();
    let Let_Etter = {'Boligområder – generelt': Fldr + '19_boligformål_generelt.html', 'Nåværende boligområder': Fldr + '20_nåværende_boligområder.html'};

    return $.get(Let_Etter[Overskrift])
    .done(function( data ) {

      let ID = $($Kilde).attr('href').replace('#', '');
      let wrapper = '<div id="' + ID + '"></div>';

      $(wrapper).insertAfter($Kilde);
      return data
    });
  };


  Lag_Utdypende_Forklaring = (Aktiv_Lenke) => {
    'use strict'

    let Innhold = Finn_Innhold_Utdypende(Aktiv_Lenke).done(function(data) {
      // Div lages når den laster inn innholdet
      let Destinasjon = $($(Aktiv_Lenke).attr('href')); 
      $(Destinasjon).append(data);
    });

    Innhold.done(function() {
      let Dest = $($(Aktiv_Lenke).attr('href')).children();

      $(Dest).each(function (index, value) {
        if ($(value).prop('nodeName').toLowerCase() === 'h3') {
          let Neste = $(value).nextUntil('h3');
          if (Neste.length === undefined) {
            Neste = $(Dest).last();
          };

          $(value).replaceWith('<button class="collapsible">' + $(value).text() + '</button>');
          $(Neste).wrapAll('<div class="content"></div>')

        };
      });
    });
  };
});
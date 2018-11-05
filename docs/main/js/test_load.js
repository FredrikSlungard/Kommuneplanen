// Laster inn deler av innholdet til testing (tabeller etc.)

// Script som kjører når siden lastes inn
$(function () {

  // Innholdet i hoveddelen
  Hoved_Innholdet = async () => {
    'user strict';

    let Fldr = 'main/html/bestemmelser/';
    let Filer = [
      '1_plankrav',
      '20_nåværende_boligområder',
      'parkeringsnorm'
    ];

    // Gå gjennom alle filene som skal lastes inn
    let Path = '';

    $.each(Filer, function (index, value) {
      Path = Fldr + value + '.html';

      $.get(Path, function (data) {
      })

        .done(function (data) {
          $(data).appendTo('#innhold');
        });
    });

/*     $.each(Filer, function (index, value) {
      Path = Fldr + value + '.html';

      $.get(Path, function (data) {
      })

      .done(function(data) {
        content = data;
      });

      $(content).appendTo('#innhold');

    }); */
  };

  Last_Inn_Vedlegg = () => {
    'use strict';

    let Fldr_3 = 'main/html/veiledning/vedlegg_3/';
    let Vedlegg_3 = [
      'definisjoner'
    ];

    // Gå gjennom alle filene som skal lastes inn
    let Path = '';
    let Content = $();

    // Innholdet i vedlegg 3
    $.each(Vedlegg_3, function (index, value) {
      Path = Fldr_3 + value + '.html';

      $.get(Path, function (data) {

        $(data).appendTo('#innhold')

      });
    });
  };


  // Laster inn HTML innholdet på siden
  Last_Innhold = () => {
    'use strict'
    let Nav_Fldr = 'main/html/navbar/';

    // Laster inn innholdet som skal være i navigasjonbarene.
    // Toppen, til høyre og venstre.
    $('#top_navbar').load(Nav_Fldr + 'top_navbar.html');
    $('#left_navbar').load(Nav_Fldr + 'left_nav.html');

    // Laster inn hovedinnholdet og vedleggene
    Hoved_Innholdet();
    Last_Inn_Vedlegg();
  };

  /* Laster inn javascript filer med eventer som aktiveres når siden lastes for første gang. */
  Javascript_Funksjonalitet = () => {
    let Nav_Fldr = 'main/js/navigasjon/';

    // Gjør klar egne pseudo-funksjoner og add-in for highlight klar til bruk
    $.get('main/js/funksjoner/pseudo_exp.js');
    $.get('main/js/funksjoner/highlight.js');
    $.get('main/js/funksjoner/finn_ord.js');

    // Laster inn overskrifter og eventer i navigasjonen
    $.get(Nav_Fldr + 'navigasjon.js');
    $.get(Nav_Fldr + 'nav_event.js');

    // Eventer for body (veiledning)
    $.get(Nav_Fldr + 'vis_veiledning.js');

    // Søkefeltet til høyre
    $.get(Nav_Fldr + 'search_page.js');
  };

  Last_Innhold();
  Javascript_Funksjonalitet();

});
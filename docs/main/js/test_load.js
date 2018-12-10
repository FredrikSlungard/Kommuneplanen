// Script som kjører når siden lastes inn
$(function () {

  // Filbanene til innholdet i hoveddelen
  Hoved_Innholdet = () => {
    'user strict';

    let Fldr = 'main/html/bestemmelser/';
    let Filer = [
/*       '1_plankrav',
      '2_rekkefølgekrav',
      '4_forhold_gjeldende_plan',
      '5_kulturminne_kulturmiljø',
      '6_grønnstruktur',
      '7_vassdrag naturmiljø',
      '8_strandsone og brygge',
      '12_transport_parkering',
      '13_samfunnssikkerhet',
      '15_støy_luftforurensing',
      '16_estetikk_utforming', */
      '19_boligområder_generelt',
      '20_nåværende_boligområder',
      '22_lnf',
      '23_vern_sjø_vassdrag_standsone',
      'parkeringsnorm'
    ];

    return $.map(Filer, function (value, index) {
      return Fldr + value + '.html';
    })

  };

  // Filbanene til vedleggene
  Vedlegg_1 = () => {
    'use strict';

    let Fldr_1 = 'main/html/veiledning/vedlegg_1/';
    let Vedlegg_1 = [
      'krav_regulering',
      'vektsområder',
      'kulturminne_kulturmiljø',
      'landskap_vann',
      'transport_parkering',
      'handel_næring',
      'infra_miljø_sikkerhet',
      'estetikk_utforming',
      'boligområder_generelt',
      'nåværende_boligområder',
      'arealformål',
      'lnf'
    ];

    return $.map(Vedlegg_1, function (value, index) {
      return Fldr_1 + value + '.html';
    })
  };


  // Laster inn HTML innholdet på siden
  Last_Innhold = () => {
    'use strict'

    let Nav_Fldr = 'main/html/navbar/';
    //let Last_Inn_Filer = [];

    // Laster inn innholdet som skal være i navigasjonbarene.
    // Toppen og venstre.
    $('#top_navbar').load(Nav_Fldr + 'top_navbar.html');
    $('#left_navbar').load(Nav_Fldr + 'left_nav.html');

    // Laster inn hovedinnholdet og vedleggene
    let Veiledning = Vedlegg_1();
    let Bestemmelser = Hoved_Innholdet();

    // Last inn bestemmelsene
    $.each(Bestemmelser, function (index, value) {
      $.get(value, function (data) {
      })

        .done(function (data) {
          $(data).appendTo('#bestemmelser')
        });
    });

    // Last inn veiledningen
    $.each(Veiledning, function (index, value) {
      $.get(value, function (data) {
      })

        .done(function (data) {
          $(data).appendTo('#retningslinje')
        });
    });

    // Last inn definisjoner og utdypende forklaringer
    let Fldr_3 = 'main/html/veiledning/vedlegg_3/';
    $.get(Fldr_3 + 'utdypende_forklaringer.html', function (data) {
    })

      .done(function (data) {
        $(data).appendTo('#utdypende')
      });

    $.get(Fldr_3 + 'definisjoner.html', function (data) {
    })
      .done(function (data) {
        $(data).appendTo('#definisjoner')
      });

  };

  /* Laster inn javascript filer med eventer som aktiveres når siden lastes for første gang. */
  Javascript_Funksjonalitet = () => {
    let Nav_Fldr = 'main/js/navigasjon/';
    let Veil_Fldr = 'main/js/veiledning/';

    // Egne pseudo-funksjoner og add-in for highlight
    $.get('main/js/funksjoner/pseudo_exp.js');
    $.get('main/js/funksjoner/highlight.js');
    $.get('main/js/funksjoner/finn_ord.js');

    // Laster inn overskrifter og eventer i navigasjonen
    $.get(Nav_Fldr + 'navigasjon.js');
    $.get(Nav_Fldr + 'nav_event.js');
    $.get(Nav_Fldr + 'vis_plassering.js');

    // Eventer for body (veiledning)
    $.get(Veil_Fldr + 'legg_til.js');
    $.get(Veil_Fldr + 'definisjoner.js');
    $.get(Veil_Fldr + 'eventer.js');

    $.get(Veil_Fldr + 'legg_til_lenker.js');
    $.get(Veil_Fldr + 'retningslinje.js');
    $.get(Veil_Fldr + 'utdypende_forklaring.js');

    // Aktiverer søkefelt
    $.get(Nav_Fldr + 'search_page.js');

  };

  Last_Innhold();
  Javascript_Funksjonalitet();

});
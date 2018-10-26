// Script som kjører når siden lastes inn
$(function () {

  // Innholdet i hoveddelen
  Hoved_Innholdet = () => {
    'user strict';

    let Fldr = '/main/html/bestemmelser/';
    let Filer = [
      '1_plankrav',
      '2_rekkefølgekrav',
      '4_forhold_gjeldende_plan',
      '5_kulturminne_kulturmiljø',
      '6_grønnstruktur',
      '7_vassdrag naturmiljø',
      '8_strandsone og brygge',
      '12_transport_parkering',
      '13_samfunnssikkerhet',
      '15_støy_luftforurensing',
      '16_estetikk_utforming',
      '19_boligområder_generelt',
      '20_nåværende_boligområder',
      '22_lnf',
      '23_vern_sjø_vassdrag_standsone',
      'parkeringsnorm'
    ];

    // Gå gjennom alle filene som skal lastes inn
    let Path = '';

    $.each(Filer, function (index, value) {
      Path = Fldr + value + '.html';

      $.get(Path, function (data) {

        $(data).appendTo('#innhold')

      });
    });
  };



  // Laster inn HTML innholdet på siden
  Last_Innhold = () => {
    'use strict'
    let Nav_Fldr = '/main/html/navbar/';

    // Laster inn innholdet som skal være i navigasjonbarene.
    // Toppen, til høyre og venstre.
    $('#top_navbar').load(Nav_Fldr + 'top_navbar.html');
    $('#left_navbar').load(Nav_Fldr + 'left_nav.html');
    $('#right_navbar').load(Nav_Fldr + 'right_nav.html');

    // Laster inn hovedinnholdet
    Hoved_Innholdet(); // Fungerer ikke når den er i en egen modul?
  };

  /* Laster inn javascript filer med eventer som aktiveres når siden lastes for første gang. */
  Javascript_Funksjonalitet = () => {
    let Nav_Fldr = '/main/js/navigasjon/';
    
    // Egne pseudo-funksjoner og add-in for highlight
    $.get('/main/js/funksjoner/pseudo_exp.js');
    $.get('/main/js/funksjoner/highlight.js')
    $.get('/main/js/funksjoner/finn_ord.js')

    // Laster inn overskrifter og eventer i navigasjonen
    $.get(Nav_Fldr + 'navigasjon.js');
    $.get(Nav_Fldr + 'nav_event.js');

    // Søkefeltet til høyre
    $.get(Nav_Fldr + 'search_page.js');
  };

  Last_Innhold();
  Javascript_Funksjonalitet();

});
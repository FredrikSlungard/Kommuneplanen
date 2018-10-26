// Laster innholdet i main
$(function() {
  'user strict';

  let Fldr = '/main/html/bestemmelser/';
  let Filer = [
    '1_plankrav',
    '2_rekkefølgekrav',
    '3_utbyggingsavtaler',
    '4_forhold_gjeldende_plan',
    '5_kulturminne_kulturmiljø',
    '6_grønnstruktur',
    '7_vassdrag naturmiljø',
    '8_strandsone og brygge',
    '12_transport_parkering',
    '13_samfunnssikkerhet'
  ];

  // Gå gjennom alle filene som skal lastes inn
  let Path = '';
  
  $.each(Filer, function (index, value) {
    Path = Fldr + value + '.html';

    $.get(Path, function(data) {

      $(data).appendTo('#innhold')
      //content =+ $(data);

    });
  });

  //$(content).appendTo('#innhold')

});
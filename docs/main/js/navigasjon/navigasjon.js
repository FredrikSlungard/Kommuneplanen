/* Legger til overskrifter i navigasjonen til venstre, med referanse til overskriften hvis den har en ID. Hvis ikke søkes det etter overskriften når brukeren klikker på overskriften

h1 Legges til som navmenu-brand 
h2 legges til som liste under h1
Fjerner parenteser og nummerering, dette gjør at det er lettere å navigere overskriftene */
$(function () {

  let destinasjon = $('#nav_innhold');
  let Overskrifter = $('h1, h2');
  let innhold = '';
  let Tekst = '';
  let Top_Pos = 0;

  destinasjon.empty(); // Fjerner gammelt innhold i div, f.eks. testeverdier etc.

  // Henter ut tekstdelen i Source, fjerner paragrafene i parantes (streng)
  Endre_Innhold = (Source) => {
    'use strict'

    let First_Pos = Source.match(/[a-zA-Z]/); // Finner første bokstav
    let Last_Pos = Source.length;
    let temp = '';

    // Første bokstav
    if (First_Pos === null) {
      First_Pos === 0;
    }
    else {
      First_Pos = First_Pos.index;
    };

    // Siste bokstav
    if (Source.indexOf('(') !== -1) {
      Last_Pos = Source.indexOf('(');
    };

    // Sjekker om strengen inneholder vedlegg, og trekker ut posisjonen til tekstbiten
    if (Source.indexOf('Vedlegg') !== -1) {
      if (Source.match(':').index + 1 > First_Pos) {
        First_Pos = Source.match(':').index + 1;
      };
    };
    
    return Source.substring(First_Pos, Last_Pos).trim();

  };

  // Gå gjennom alle overskriftene i dokumentent og legger de til i navigasjonen til vendtre
  $.each(Overskrifter, function (index, value) {
    Tekst = Endre_Innhold($(value).text());
    Top_Pos = $(value).offset().top;

    // Lager h2 elementer som et liste element med href
    if ($(value).is('h2')) {
      innhold += '<li><h2><a name=' + Top_Pos + ' class="nav_clickable" href="#">' + Tekst + '</li></a></h2>';

    }

    // Start en ny liste og legg til h1 som brand
    else if ($(value).is('h1')) {

      // Første item
      if (index === 0) {
        innhold += '<ul><h1><a name=' + Top_Pos + ' class="nav_clickable" href="#">' + Tekst + '</a></h1>';
      }
      // Avslutter den gamle overskriften
      else {
        innhold += '</ul>';
        innhold += '<ul><h1><a name=' + Top_Pos + ' class="nav_clickable" href="#">' + Tekst + '</a></h1>';
      };
    };
  });

  // Avslutt den siste listen
  innhold += '</ul>';

  $($(destinasjon)).append(innhold);
});
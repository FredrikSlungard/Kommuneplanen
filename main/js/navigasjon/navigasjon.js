/* Legger til overskrifter i navigasjonen til venstre, med referanse til overskriften hvis den har en ID. Hvis ikke søkes det etter overskriften når brukeren klikker på overskriften

h1 Legges til som navmenu-brand 
h2 legges til som liste under h1
Fjerner parenteser og nummerering, dette gjør at det er lettere å navigere overskriftene */
$(function() {
  
  let destinasjon = $('#nav_innhold');
  let Overskrifter = $('h1, h2');
  let innhold = '';
  let Tekst = '';
  let Navn = '';

  destinasjon.empty(); // Fjerner gammelt innhold i div, f.eks. testeverdier etc.

  // Henter ut tekstdelen i Source (streng)
  Endre_Innhold = (Source) => {
    'use strict'

    let First_Pos = Source.match(/[a-zA-Z]/);
    let Last_Pos = Source.length;

    if (First_Pos === null) {
      First_Pos === 0;
    }
    else {
      First_Pos = First_Pos.index;
    };

    if (Source.indexOf('(') !== -1) {
      Last_Pos = Source.indexOf('(');
    };

    return Source.substring(First_Pos, Last_Pos).trim();

  };

  // Gå gjennom alle overskriftene i dokumentent og legger de til i navigasjonen til vendtre
  $.each(Overskrifter, function (index, value) {
    Tekst = Endre_Innhold($(value).text());
    //Navn = $(value).text().replace(' ', '_');

    // Lager h2 elementer som et liste element med href
    if ($(value).is('h2')) {
      innhold += '<li><a class="navItem nav_clickable" href="#">' + Tekst + '</li></a>';

    }
    // Start en ny liste og legg til h1 som brand
    else if ($(value).is('h1')) {

      if (index === 0) {
        innhold += '<a class="navItem navmenu-brand nav_clickable" href="#">' + Tekst + '</a>';
      }
      // Avslutter den gamle overskriften
      else {
        innhold += '</ul>';
        innhold += '<a class="navItem navmenu-brand nav_clickable" href="#">' + Tekst + '</a>';
      };

      // Starter en ny liste under hovedoverskriften
      innhold += '<ul class="navItem navmenu-nav">';

    };
  });

  // Avslutt den siste listen
  innhold += '</ul>';

  $(innhold).insertAfter($(destinasjon));
});
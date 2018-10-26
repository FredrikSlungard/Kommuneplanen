/* Legger til overskrifter i navigasjonen til venstre, med referanse til overskriften hvis den har en ID. Hvis ikke søkes det etter overskriften når brukeren klikker på overskriften

h1 Legges til som navmenu-brand 
h2 legges til som liste under h1 */
$(function() {
  'use strict'
  
  let destinasjon = $('#nav_innhold');
  let Overskrifter = $('h1, h2');
  let innhold = '';

  destinasjon.empty(); // Fjerner gammelt innhold i div, f.eks. testeverdier etc.

  // Gå gjennom alle overskriftene i dokumentent og legger de til i navigasjonen til vendtre
  $.each(Overskrifter, function (index, value) {
    
    // Lager h2 elementer som et liste element med href
    if ($(value).is('h2')) {
      innhold += '<li><a class="navItem nav_clickable" href="#">' + $(value).text() + '</li></a>';

    }
    // Start en ny liste og legg til h1 som brand
    else if ($(value).is('h1')) {

      if (index === 0) {
        innhold += '<a class="navItem navmenu-brand nav_clickable" href="#">' + $(value).text() + '</a>';
      }
      // Avslutter den gamle overskriften
      else {
        innhold += '</ul>';
        innhold += '<a class="navItem navmenu-brand nav_clickable" href="#">' + $(value).text() + '</a>';
      };

      // Starter en ny liste under hovedoverskriften
      innhold += '<ul class="navItem navmenu-nav">';

    };
  });

  // Avslutt den siste listen
  innhold += '</ul>';

  $(innhold).insertAfter($(destinasjon));
});
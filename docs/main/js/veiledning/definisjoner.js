/* Legger til veiledningstekst for definisjonene i kommuneplanen, disse vises som en popover der tittelen på definisjonen er overskrift og teksten er innholdet */

$(function () {

  const Start_HTML = '<a class="inter_popover" href="#" data-toggle="popover"; data-trigger="focus" data-placement="right" title="';

  Finn_Definisjoner = () => {
    'use strict';

    let Content = $('p, li, td', '#bestemmelser');
    /* Sorterer slik at vi leter etter den lengste strengen først, hvis ikke kan "enebolig med sekundær" ikke finnet ordet fordi "enebolig" allerede er funnet (og lagt til som hyperlenke) */
    let Definisjoner = $('h4', '#definisjoner').sort(function (a, b) {
      let a_len = $(a).text().length;
      let b_len = $(b).text().length;

      if (a_len < b_len) {
        return 1;
      } else if (a_len > b_len) {
        return -1;
      } else {
        return 0;
      }
    });
    
    

    $(Definisjoner).each(function (index, value) {
      'use strict';
      let Innhold = $(value).nextUntil(':header');
      let Tittel = $(value).text();

      // HTML som skal erstattes
      let Pop_HTML = Start_HTML + Tittel + '" data-content="' + $(Innhold).html() + '">' + Tittel + '</a>';
      let reg_exp = new RegExp('\\b(' + Tittel + ')\\b', 'i');

      // Går gjennom hver paragraf og setter inn verdiene hvis innholdet er synlig
      $(Content).each(function (index, value) {
        let ord_funnet = reg_exp.test($(value).text());

        if (ord_funnet) {
          $(value).html($(value).html().replace(reg_exp, Pop_HTML));
        };
      });
    });

  };

  // Aktiverer eventer for popover
  Finn_Definisjoner();
  $('[data-toggle="popover"]').popover();

  // Forhindrer scrolling når brukeren trykker på popover (href tar brukeren til toppen)
  $('.inter_popover').on('click', function (e) {
    'use strict';

    e.preventDefault();
    return true;
  });
});


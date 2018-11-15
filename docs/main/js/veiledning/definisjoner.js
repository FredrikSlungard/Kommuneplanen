/* Legger til veiledningstekst for definisjonene i kommuneplanen, disse vises som en popover der tittelen på definisjonen er overskrift og teksten er innholdet */
$(function () {

  const Start_HTML = '<a class="inter_popover" href="#" data-toggle="popover"; data-trigger="focus" data-placement="right" title="';

  Finn_Definisjoner = () => {
    'use strict';
    let Definisjoner = $('h4', '#definisjoner');
    let Content = $('p, li, td', '#bestemmelser');

    $(Definisjoner).each(function (index, value) {
      'use strict';

      let Innhold = $(value).nextUntil('h4');
      let Tittel = $(value).text();

      // HTML som skal erstattes
      let Pop_HTML = Start_HTML + Tittel + '" data-content="' + $(Innhold).html() + '">' + Tittel + '</a>';
      let reg_exp = new RegExp('\\b(' + Tittel + ')\\b', 'i');

      // Går gjennom hver paragraf og setter inn verdiene hvis innholdet er synlig
      $(Content).each(function (index, value) {
        let ord_funnet = reg_exp.test($(value).text());

        if ($(value).is(':visible') && ord_funnet) {
          $(value).html($(value).html().replace(reg_exp, Pop_HTML));
        };
      });
    });

  };

  Finn_Retningslinjer = () => {
    'use strict';

    let Forklaringer = $('h4', '#utdypende');
    let Content = $('p, li, td', '#bestemmelser');
    
    Forklaringer.css('color','red');
    $(Forklaringer).each(function (index, value) {
      'use strict';

      let Innhold = $(value).nextUntil('h4');
      let Tittel = $(value).text();

      // HTML som skal erstattes
      let Pop_HTML = Start_HTML + Tittel + '" data-content="' + $(Innhold).html() + '">' + Tittel + '</a>';
      let reg_exp = new RegExp('\\b(' + Tittel + ')\\b', 'i');

      // Går gjennom hver paragraf og setter inn verdiene hvis innholdet er synlig
      $(Content).each(function (index, value) {
        let ord_funnet = reg_exp.test($(value).text());

        if ($(value).is(':visible') && ord_funnet) {
          $(value).html($(value).html().replace(reg_exp, Pop_HTML));
        };
      });
    });
  };

  // Aktiverer eventer for popover
  Finn_Definisjoner();
  Finn_Retningslinjer();
  $('[data-toggle="popover"]').popover();

  // Forhindrer scrolling når brukeren trykker på popover (href tar brukeren til toppen)
  $('.inter_popover').on('click', function (e) {
    'use strict';

    e.preventDefault();
    return true;
  });
});


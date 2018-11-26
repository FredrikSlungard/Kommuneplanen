/* Legger til veiledningstekst for definisjonene i kommuneplanen, disse vises som en popover der tittelen på definisjonen er overskrift og teksten er innholdet */
$(function () {

  let Definisjoner = $('h4', '#definisjoner');

  // Setter inn lenker og legger til klasse som gjør at popover kan aktiveres for definisjonene.
  Finn_Lenker_Til_Popper = () => {
    /* Sorterer slik at vi leter etter den lengste strengen først, hvis ikke kan "enebolig med sekundær" ikke finnet ordet fordi "enebolig" allerede er funnet (og lagt til som hyperlenke) */
    const Start_HTML = '<a class="inter_popover" href="#" data-toggle="popover">';

    let Content = $('*:not(* > :header)', '#bestemmelser');
    Definisjoner.sort(function (a, b) {
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

      let Tittel = $(value).text();
      let reg_exp = new RegExp('\\b(' + Tittel + ')\\b', 'i');
      let Sett_Inn = Start_HTML + Tittel + '</a>';

      // Går gjennom hver paragraf og setter inn verdiene hvis innholdet er synlig
      $(Content).each(function (index, value) {
        let ord_funnet = reg_exp.test($(value).text());

        if (ord_funnet) {
          $(value).html($(value).html().replace(reg_exp, Sett_Inn))
        };
      });
    });
  };

  Finn_Lenker_Til_Popper();

  /* Overskriften i popover
  Setter beste treff øverst (hvis det er flere matcher). Gjør en enkel sammenligning der vi antar at det beste treffet har minst differanse. */
  Hent_Overskrift = (Valgt_Item) => {
    'use strict';

    let Søk_Etter = $(Valgt_Item).text().toLowerCase();
    let Veil_Overskrfift = $(Definisjoner).filter(function (index, value) {
      let overskrift = $(value).text().toLowerCase();

      if (overskrift.indexOf(Søk_Etter) !== -1) {
        return $(value);
      };
    });

    if (Veil_Overskrfift.length > 1) {
      Veil_Overskrfift.sort(function (a, b) {
        let a_len = Math.abs($(a).text().length - Søk_Etter.length);
        let b_len = Math.abs($(b).text().length - Søk_Etter.length);

        if (a_len > b_len) {
          return 1;
        } else if (a_len < b_len) {
          return -1;
        } else {
          return 0;
        }
      });
    };

    return $(Veil_Overskrfift[0]);
  };

  /* Innholdet i popover */
  Pop_Innhold = (Overskrift) => {
    'use strict';

    let Innhold = $();

    $(Definisjoner.each(function (index, value) {
      if ($(value).text() === $(Overskrift).text()) {

        Innhold = $(value).nextUntil(':header');
        // Denne er OK console.log("Item: " + $(Item).text() + " Verdi: " + $(value).text());

        // Denne stemmer console.log($(Temp).html());
        //return $(Temp).html();
      };
    }));

    if (Innhold !== undefined) {
      return Innhold;
    };
  };

  /* Lager popover til det valgte itemet */
  Lag_Popover = (Item) => {
    'use strict';

    let Tittel = Hent_Overskrift(Item);
    let Innhold = Pop_Innhold(Tittel);

    return $(Item).popover({
      html: true,
      placement: 'right',
      trigger: 'focus',

      title: $(Tittel).text(),
      content: $(Innhold).html()

    });
  };
  


  /* Forhindrer scrolling når brukeren trykker på popover (href tar brukeren til toppen) */
  $('.inter_popover').on('click', function (e) {
    'use strict';
    e.preventDefault();

    // Lager en ny popover hvis det ikke er noe der fra før
    if (!$(this).data("bs.popover")) {
      Lag_Popover(this);
      $(this).popover('show');
    };
    
    return true;

  });
});
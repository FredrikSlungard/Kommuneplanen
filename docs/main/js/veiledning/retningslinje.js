/* Legger til retningslinjene som en skjult nedtrekksliste i bestemmelsene, disse kan aktiveres ved å trykke på lenken "Vis retningslinje" 

Benytter samme metode som ved søk i veiledningene/definisjonene (ved opplasting er det derfor kun selve lenketeksten som legges til)
*/
/* Finner ordene som skal ha veiledningstekst og legger til en hyperlenke med veiledningstekst

Data-toggle bestemmer hva som skjer, hvis den er usynlig fra før blir den synlig. Hvis den er synlig skjules den.
*/
$(function () {

  // Legger til hyperlenker til veiledningsteksten
  // Search For kan erstattes med overskriftene i definisjonene?
  Lenke_Til_Veiledning = () => {
    'use strict';

    let Search_In = $('p', '#bestemmelser');
    let Search_For = ['Fortetting', 'Boligfortetting', 'Frittliggende småhusbebyggelse', 'Konsentert småhusbebyggelse', 'støyfølsomt bruksformål'];

    let Start_HTML = '<a class="intern_lenke" data-toggle="collapse" ';
    let Slutt_HTML = '</a>';

    // Den nye HTML strengen (ref endres til korrekt syntaks, fjerner mellomrom)
    let Ny_HTML = $(Search_For).map(function (i, ord) {
      let ref = ' href="#veil' + ord.replace(' ', '_') + '">';
      return Start_HTML + ref + ord + Slutt_HTML;
    });

    // Let etter ordene i hele dokumentet
    $(Search_For).each(function (i, ord) {
      let reg_exp = new RegExp('\\b(' + Search_For[i] + ')\\b', 'i');

      $(Search_In).each(function (index, value) {
        let ord_funnet = reg_exp.test($(value).text());

        if (ord_funnet && $(value).is(':visible')) {
          $(value).html($(value).html().replace(reg_exp, Ny_HTML[i]));
        };
      });
    });
  };

  Lenke_Til_Veiledning();

  /* Leter opp innholdet som skal brukes i nedtrekkslisten.
  Leter gjennom overskriftene i definisjonene og returnerer innholdet til neste overskrift (eller slutten av dokumentet) */
  Finn_Innhold_Liste = ($Kilde) => {
    'use strict';

    let Lenke_Tekst = $($Kilde).text().toLowerCase();
    let Def_Headings = $('h3', '#definisjoner');

    // Finner innholdet som skal brukes i nedtrekkslisten
    let Overskrift = $(Def_Headings).filter(function (index, value) {
      if ($(value).text().toLowerCase().indexOf(Lenke_Tekst) !== -1) {
        return $(value)
      };
    });

    let Type_Overskrift = $(Overskrift).prop('nodeName');
    let Innhold = Overskrift.nextUntil(Type_Overskrift);

    return Innhold;

  };

  // Bygger HTML strengen som skal settes inn i listen
  HTML_Streng = ($Kilde) => {
    'use strict';

    let Ref_ID = $($Kilde).attr('href').replace('#', '');
    let Lenke_Tekst = $($Kilde).text();
    let Innhold = Finn_Innhold_Liste($Kilde);

    let btn_Start = '<button class="collapsible">';
    let btn_End = '</button>'

    let innhold_Start = '<div class="content">';
    let innhold_end = '</div>';

    let Start_Liste = '<div id="' + Ref_ID + '" class="collapse">';
    let Liste_Innhold = '';

    /* Gå gjennom alle items som passer til definisjonene.
    Hvis et er første item er en paragraf legges første item som en overskrift av definisjonen. 
    
    Hvis det er en overskrift legges den til som en collapsible (knappen du trykker på), hvis ikke er det innholdet som skal vises/skjules i listen */
    $(Innhold).each(function (index, value) {
      if (index === 0) {
        if ($(value).prop('nodeName').toLowerCase() === 'p') {

          Liste_Innhold += btn_Start + Lenke_Tekst + btn_End;

          Liste_Innhold += innhold_Start +
            $(value).html() + innhold_end;

        }

        else if ($(value).is(':header')) {

          Liste_Innhold += btn_Start + $(value).html() + btn_End;

        };

      }
      // Når det ikke er først element
      else {

        if ($(value).is(':header')) {
          Liste_Innhold += btn_Start + $(value).html() + btn_End;
        }

        else {

          Liste_Innhold += innhold_Start + $(value).html() + innhold_end;

        };
      };
    });

    return Start_Liste + Liste_Innhold + innhold_end;

  };

  // Event når lenken klikkes på, setter sammen listen eller flytter den til lokasjonen.
  $('.retningslinje').on('click', function () {

    let Ref_ID = $(this).attr('href').replace('#', '');
    let para_end = $(this).parent();

    // Flytt innholdet hvis ID eksisterer fra før
    if ($('#' + Ref_ID).length !== 0) {
      $('#' + Ref_ID).insertAfter(para_end);
    }

    // Leter opp og henter innholdet fra definisjonene og bygger HTML streng
    else {

      let Innhold = HTML_Streng(this);
      $(Innhold).insertAfter(para_end);

    };

  });
});
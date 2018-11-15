/* Legger til retningslinjene som en skjult nedtrekksliste i bestemmelsene, disse kan aktiveres ved å trykke på lenken "Vis retningslinje" 

Benytter samme metode som ved søk i veiledningene/definisjonene (ved opplasting er det derfor kun selve lenketeksten som legges til)
*/
/* Finner ordene som skal ha veiledningstekst og legger til en hyperlenke med veiledningstekst

Data-toggle bestemmer hva som skjer, hvis den er usynlig fra før blir den synlig. Hvis den er synlig skjules den.
*/
$(function () {

  // Legger til hyperlenker til veiledningsteksten
  // Search For kan erstattes med overskriftene i definisjonene?
  Lenke_Til_Retningslinje = () => {
    'use strict';

    let Search_In = $('h2, h3', '#bestemmelser');
    let Search_For = $('h3, h4', '#retningslinje');
    let lcase_Overskrift = '';
    let lcase_veil = '';

    let Start_HTML = '<a class="retningslinje" data-toggle="collapse" href="#">';
    let Ny_HTML = Start_HTML + 'Retningsline for bestemmelse' + '</a>';

    // Let etter ordene i hele dokumentet
    $(Search_In).each(function (i, overskrift) {
      lcase_Overskrift = $(overskrift).text().toLowerCase();

      if (Search_For.length === 0) {
        return
      };

      // Hvis overskriften inneholder deler av teksten sett inn lenke til retningslinjen
      $(Search_For).each(function (i, ord) {
        lcase_veil = $(ord).text().toLowerCase();

        if (lcase_Overskrift.indexOf(lcase_veil) !== -1) {
          $($(overskrift)).after(Ny_HTML);
          Search_For.splice(i, 1);
          return
        };
      });
    });
  };

  Lenke_Til_Retningslinje();

  /* Leter opp innholdet som skal brukes i nedtrekkslisten.
  Leter gjennom overskriftene i definisjonene og returnerer innholdet til neste overskrift (eller slutten av dokumentet) */
  Finn_Innhold_Liste = ($Kilde) => {
    'use strict';

    let Let_Etter = Formater_Overskrift($Kilde);
    let Retningslinjer = $('h3, h4', '#retningslinjer');
  
    

    // Finner innholdet som skal brukes i nedtrekkslisten
    let Overskrift = $(Retningslinjer).filter(function (index, value) {
      if ($(value).text().toLowerCase().indexOf(Let_Etter.toLowerCase()) !== -1) {
        return $(value)
      };
    });

    // Finner ikke noen treff
    let Type_Overskrift = $(Overskrift).prop('nodeName');
    let Innhold = Overskrift.nextUntil(Type_Overskrift);

    return Innhold;

  };


  // Returnerer tekstbiten som skal finnes i retningslinjene
  Formater_Overskrift = (Source) => {

    let Finn_Overskrift = $(Source).prev(':header').first().text();
    let First_Pos = Finn_Overskrift.match(/[a-zA-Z]/); // Finner første bokstav
    let Last_Pos = Finn_Overskrift.length;

    // Første bokstav
    if (First_Pos === null) {
      First_Pos === 0;
    }
    else {
      First_Pos = First_Pos.index;
    };

    // Siste bokstav
    if (Finn_Overskrift.indexOf('(') !== -1) {
      Last_Pos = Finn_Overskrift.indexOf('(');
    };

    return Finn_Overskrift.substring(First_Pos, Last_Pos).trim();

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
    
    Hvis det er en overskrift legges den til som en retningslinje (knappen du trykker på), hvis ikke er det innholdet som skal vises/skjules i listen */
    $(Innhold).each(function (index, value) {
      if (index === 0) {
        if (!$(value).is(':header')) {

          Liste_Innhold += btn_Start + $(value).html() + btn_End;

        }
        else {

          Liste_Innhold += btn_Start + Lenke_Tekst + btn_End;

          Liste_Innhold += innhold_Start +
            $(value).html() + innhold_end;

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

    let Innhold = HTML_Streng(this);
    $(Innhold).insertAfter(para_end);

  });
});
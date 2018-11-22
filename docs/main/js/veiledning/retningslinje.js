/* Legger til retningslinjene som en skjult nedtrekksliste i bestemmelsene, disse kan aktiveres ved å trykke på lenken "Vis retningslinje" 

Benytter samme metode som ved søk i veiledningene/definisjonene (ved opplasting er det derfor kun selve lenketeksten som legges til)
*/
/* Finner ordene som skal ha veiledningstekst og legger til en hyperlenke med veiledningstekst

Data-toggle bestemmer hva som skjer, hvis den er usynlig fra før blir den synlig. Hvis den er synlig skjules den.
*/
$(function () {


  // Returnerer tekstbiten som skal finnes i retningslinjene
  Formater_Overskrift = (Source) => {
    'use strict';

    let Item_Text = $(Source).text();
    let First_Pos = Item_Text.match(/[a-zA-Z]/); // Finner første bokstav
    let Last_Pos = Item_Text.length;

    // Første bokstav
    if (First_Pos === null) {
      First_Pos === 0;
    }
    else {
      First_Pos = First_Pos.index;
    };

    // Siste bokstav
    if (Item_Text.indexOf('(') !== -1) {
      Last_Pos = Item_Text.indexOf('(');
    };

    return Item_Text.substring(First_Pos, Last_Pos).trim();

  };

  // Legger til hyperlenker til veiledningsteksten
  // Search For kan erstattes med overskriftene i definisjonene?
  Lenke_Til_Retningslinje = () => {
    'use strict';


    let Search_In = $('h1', '#bestemmelser');
    let Search_For = $('h2', '#retningslinje');
    let Start_HTML = '<a class="retningslinje" data-toggle="collapse"';
    let Slutt_HTML = '</a>'

    let Ny_HTML = $(Search_For).map(function (i, ord) {
      let overskrift = Formater_Overskrift(ord).replace(/[^A-Za-z0-9]/ig, '_');
      let ref = ' href="#veil' + overskrift + '">';
      return Start_HTML + ref + 'Retningslinje for bestemmelse' + Slutt_HTML;
    });

    // Let gjennom overskriftene og om det er noen retningslinjer knyttet til overskriften
    $(Search_In).each(function (i, overskrift) {
      let lcase_Overskrift = $(overskrift).text().toLowerCase();
      // Gå ut hvis det ikke er flere overskriften som skal finnes
      if (Search_For.length === 0) {
        return
      };


      // Hvis overskriften inneholder deler av teksten sett inn lenke til retningslinjen
      $(Search_For).each(function (j, ord) {
        let lcase_veil = $(ord).text().toLowerCase();

        if (lcase_Overskrift.indexOf(lcase_veil) !== -1) {
          $($(overskrift)).after(Ny_HTML[j]);

          Ny_HTML.splice(j, 1); // Reduserer antall loops
          Search_For.splice(j, 1); // Reduserer antall loops
          return;
        };
      });
    });
  };

  Lenke_Til_Retningslinje();

  /* Leter opp innholdet som skal brukes i nedtrekkslisten.
  Leter gjennom overskriftene i definisjonene og returnerer innholdet til neste overskrift (eller slutten av dokumentet) */
  Finn_Innhold_Liste = ($Kilde) => {
    'use strict';

    let Let_Etter = Formater_Overskrift($($Kilde).prev(':header').first());
    let Retningslinjer = $('h2', '#retningslinje');

    // Finner innholdet som skal brukes i nedtrekkslisten

    let Overskrift = $(Retningslinjer).filter(function (index, value) {
      let retn = $(value).text().toLowerCase();

      if (retn.indexOf(Let_Etter.toLowerCase()) !== -1) {
        return $(value);
      };
    });

    let Type_Overskrift = $(Overskrift).prop('nodeName');
    let Innhold = Overskrift.nextUntil(Type_Overskrift);

    return Innhold;

  };

  // Bygger HTML strengen som skal settes inn i listen
  HTML_Streng = ($Kilde) => {
    'use strict';

    let Nærmeste_Overskrift = Formater_Overskrift($($Kilde).prev(':header').first());
    let Innhold = $(Finn_Innhold_Liste($Kilde)).clone();

    let Liste_ID = 'veil' + Nærmeste_Overskrift.replace(/[^A-Za-z0-9]/g, '_');
    

    let btn_div = '<button class="collapsible>"';
    let inn_div = '<div class="content">';
    let Liste_Div = '<div id="' + Liste_ID + '" class="collapse"></div>';

    /* Søk gjennom innholdet og sett inn nedtrekkslisten.
    1) Finn den største overskriften, dette er nedtrekksknappen(e)
      1.1) Filter ut alle overskriftene med samme overskriftstype (størtste)  
    2) Søk etter innholdet til den neste overskriften (.next(:header))
    3) Innholdet mellom overskriftene settes inn som vanlig html tekst

    Alternativ:
    1) Filter ut alle hovedoverskriftene og legg til klassen "collapsible" og gjør den til en knapp
      Kanskje bruke replace html, først søke om overksrift
    
    2) Loop gjennom overskriftene og finn innholdet mellom de
      Legg til klassen content, kan sikkert bruke .next på jquery
    */
    // Første item vil alltid være største overskrift
    let Hoved_Overskrift = $(Innhold).prop('nodeName').toLowerCase();

    Innhold = $(Innhold).replaceWith( function() {
      if ($(this).prop('nodeName').toLowerCase() === Hoved_Overskrift) {
        let Temp = $();
        Temp = btn_div + $(this).text + '</button>';
        return Temp;

      };
    });

    Innhold = $(Innhold).wrapInner(Liste_Div);

    return Innhold

  };

  

  // Event når lenken klikkes på, setter sammen listen eller flytter den til lokasjonen.
  $('.retningslinje').on('click', function () {

    let Ref_ID = $(this).attr('href').replace('#', '');

    // Flytt innholdet hvis ID eksisterer fra før
    if (Ref_ID !== '' && $('#' + Ref_ID).length !== 0) {
      $('#' + Ref_ID).insertAfter($(this));
    }

    // Leter opp og henter innholdet fra definisjonene og bygger HTML streng
    else {

      let Innhold = HTML_Streng(this);
      $(Innhold).insertAfter($(this));

    };
  });
});


/*  let ant_hoved = $(Innhold).map(function (index, value) {
      if ($(value).prop('nodeName').toLowerCase() === 'h3') {
        return index;
      };
    });
    
    // Fjerner "hovedoverskriften" i retningslinjene. Hvis det bare er en overskrift er det uansett kun ett tema
    if (ant_hoved.length === 1) {
      Innhold.splice(ant_hoved[0],1)
    };

    /* Gå gjennom alle items som passer til definisjonene.
    Hvis et er første item er en paragraf legges første item som en overskrift av definisjonen. 
    
    Hvis det er en overskrift legges den til som en retningslinje (knappen du trykker på), hvis ikke er det innholdet som skal vises/skjules i listen
let First_SubHeading = true;

$(Innhold).each(function (index, value) {
  if (index === 0) {
    if ($(value).is('h3')) {

      Liste_Innhold += btn_Start + $(value).html() + btn_End;

    }
    // Hvis indeksen er null og den første verdien ikke er en overskrift brukes nærmeste overskriften (sikrer at knappen får en tekst)
    else {

      Liste_Innhold += btn_Start + Nærmeste_Overskrift + btn_End;
      Liste_Innhold += innhold_Start + $(value).html() + innhold_end;

    };
  }
  // Når det ikke er først element, hvis det er flere h3 overskrifter er det også flere tema (se splice over). Hvis ikke vil h3 uansett ikke være relevant
  else {
    switch ($(value).prop('nodeName').toLowerCase()) {
      case 'h3':
        if (First_SubHeading === false) {
          Liste_Innhold += innhold_end;
        }
        else {
          First_SubHeading = false;
        };

        Liste_Innhold += btn_Start + $(value).html() + btn_End;
        Liste_Innhold += innhold_Start;
        break;

      case 'h4':
        Liste_Innhold += btn_start_Sub + $(value).html() + btn_End;
        break;

      default:
        Liste_Innhold += innhold_Start + $(value).html() + innhold_end;

    };
  };
});

return Start_Liste + Liste_Innhold + innhold_end;

  }; */
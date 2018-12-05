/* Legger til lenke for retningslinjene ved oppstart 
Legger til lenkene for overskriftene i definisjonene
*/
$(function () {

  // Legger til hyperlenker til veiledningsteksten
  // Search For kan erstattes med overskriftene i definisjonene?
  Lenke_Til_Retningslinje = () => {
    'use strict';

    let Search_In = $('h1', '#bestemmelser');
    let Search_For = $('h2', '#retningslinje');
    let Start_HTML = '<a class="retningslinje"';
    let Slutt_HTML = '</a>'
    
    // Teksten brukeren ser, inneholder referanse og <a> tag
    let Ny_HTML = $(Search_For).map(function (i, ord) {
      let overskrift = Formater_Overskrift(ord).replace(/[^A-Za-z0-9]/ig, '_');
      let ref = ' href="#veil' + overskrift + '">';
      return Start_HTML + ref + 'Retningslinje for ' + $(ord).text().toLowerCase() + Slutt_HTML;
    });

    // Let gjennom overskriftene og om det er noen retningslinjer knyttet til overskriften
    $(Search_In).each(function (i, overskrift) {
      let lcase_Overskrift = $(overskrift).text().toLowerCase();
      // Gå ut hvis det ikke er flere overskriften som skal finnes
      if (Search_For.length !== 0) {

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
    };
    });
  };


  // Legger til nedtrekksliste hvis det er en av hovedoverskriftene i definisjonene
  Lenke_Til_Definisjonene = () => {

    let Search_In = $('p:not(td > p)', '#bestemmelser');
    // Denne bør representeres ved overskriftene i definisjoenen (h3), problemet er at det er lange overskrifter
    let Search_For = ['Fortetting', 'Boligfortetting', 'Frittliggende småhusbebyggelse', 'Konsentert småhusbebyggelse', 'Støyfølsomt bruksformål'];
    let Start_HTML = '<a class="intern_lenke"';
    let Slutt_HTML = '</a>'
    
    // Teksten brukeren ser, inneholder referanse og <a> tag
    let Ny_HTML = $(Search_For).map(function (i, ord) {
      let ref = ' href="#def_main' + ord + '">';
      return Start_HTML + ref + ord + Slutt_HTML;
    });

    /* Let gjennom overskriftene og om det er noen retningslinjer knyttet til overskriften. Hvis overskriften inneholder deler av teksten sett inn lenke til retningslinjen */
    $(Search_For).each(function (j, ord) {
      let lcase_veil = $(ord).text().toLowerCase();
      let reg_exp = new RegExp('\\b(' + ord + ')\\b', 'i');

      $(Search_In).each(function (index, value) {
        let ord_funnet = reg_exp.test($(value).text());
      
        if (ord_funnet) {
          $(value).html($(value).html().replace(reg_exp, Ny_HTML[j]));
        };
      });
    });
  }; 

  Lenke_Til_Retningslinje();
  Lenke_Til_Definisjonene();
});
    
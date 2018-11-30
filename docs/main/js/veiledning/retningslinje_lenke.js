/* Legger til lenke for retningslinjene ved oppstart */
// Returnerer tekstbiten som skal finnes i retningslinjene
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

  Lenke_Til_Retningslinje();
});
    
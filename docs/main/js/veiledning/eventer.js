/* 
Hvis innholdet er skjult, legges til pluss, ved å nevne begge CSS stylene
sikrer vi at den enten fjerner collapsible eller visible og legger til vica versa.

Ved å bruke document knyttes også dynamiske elementer til knappen
*/
$(document).on('click', 'button', function () {
  'use strict';

  if ($(this).hasClass('collapsible') || $(this).hasClass('visible')) {
    let Innhold = $(this).next('.content');

    $(this).toggleClass("collapsible visible");
    Innhold.slideToggle('fast');
    
  };
});

// Viser veiledningsteksten for retningslinjer
$(document).on('click', '.retningslinje', function (e) {
  'use strict'

  e.preventDefault()
  let Ref_ID = $(this).attr('href').replace('#', '');

  // Flytt innholdet hvis ID eksisterer fra før
  if (Ref_ID !== '' && $('#' + Ref_ID).length !== 0) {
    $('#' + Ref_ID).insertAfter($(this));
  }

  // Setter inn veiledningen
  else {
    
    Lag_Veiledning(this);

  };

  $('#' + Ref_ID).slideToggle('fast');
});

// Event når lenken klikkes på, setter sammen listen eller flytter den til lokasjonen.
$(document).on('click', '.intern_lenke', function (e) {
  'use strict'

  e.preventDefault()
  let Ref_ID = $(this).attr('href').replace('#', '');
  let para_end = $(this).parent();
  
  // Flytt innholdet hvis ID eksisterer fra før
  if (Ref_ID !== '' && $('#' + Ref_ID).length !== 0) {
    $('#' + Ref_ID).insertAfter($(para_end));
  }

  // Leter opp og henter innholdet fra definisjonene og bygger HTML streng
  else {

    Lag_Veiledning_Def(this);

  };

  $('#' + Ref_ID).slideToggle('fast');
});
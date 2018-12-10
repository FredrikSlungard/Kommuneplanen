/* 
Hvis innholdet er skjult, legges til pluss, ved å nevne begge CSS stylene
sikrer vi at den enten fjerner collapsible eller visible og legger til vica versa.

Ved å bruke document knyttes også dynamiske elementer til knappen
*/
$(document).on('click', 'button', function (e) {
  'use strict';

  switch(true) {
    case $(this).hasClass('collapsible'):
    case $(this).hasClass('visible'):
      let Innhold = $(this).next('.content');

      $(this).toggleClass("collapsible visible");
      Innhold.slideToggle('fast');
      break;
    
    // Viser veiledningsteksten for retningslinjer
    case $(this).hasClass('retningslinje'):
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
      break;

  };
});

// Eventer med hyperlenker
$(document).on('click', 'a', function (e) {
  'use strict';

  switch(true) {
    // Event når lenken klikkes på, setter sammen listen eller flytter den til lokasjonen.
    case $(this).hasClass('intern_lenke'):
      e.preventDefault()
      let Ref_ID = $(this).attr('href').replace('#', '');

      // Flytt innholdet hvis ID eksisterer fra før
      if (Ref_ID !== '' && $('#' + Ref_ID).length !== 0) {
        let para_end = $(this).parent();
        $('#' + Ref_ID).insertAfter($(para_end));
      }
      // Leter opp og henter innholdet fra definisjonene og bygger HTML streng
      else {

        Lag_Veiledning_Def(this);

      };

      $('#' + Ref_ID).slideToggle('fast');
      break;
    
    case $(this).hasClass('inter_popover'):
      e.preventDefault();

      // Lager en ny popover hvis det ikke er noe der fra før
      if (!$(this).data("bs.popover")) {
        Lag_Popover(this);
        $(this).popover('show');
      };

      return true;
  };

});

// Tar brukeren til lokasjonen som har søketeksten
$(document).on('scroll', function (event) {
  let Temp = Overskrift_Navigasjon().children('a');

  $('*', '#nav_innhold').removeClass('active');
  $(Temp).addClass('active');

});
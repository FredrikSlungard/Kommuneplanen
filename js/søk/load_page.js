/* 
Script som kjører etter at siden er lastet inn.
Legger til click event for alle nedtrekkslister (collapsible).
Listen ekspanderes eller kollapses (avhengig av hvilket item det er)

Hvis innholdet er skjult, legges til pluss, ved å nevne begge CSS stylene
sikrer vi at den enten fjerner collapsible eller visible og legger til vica versa.
*/
$('.collapsible').on('click', function() {

  let content = $(this).next('.content');

  //Denne MÅ komme før slideToggle
  if (content.is(":hidden")) {
    $(this).toggleClass("collapsible visible");
  }
  else {
    $(this).toggleClass("collapsible visible");
  }

  // Skjuler/Viser innholdet
  content.slideToggle('fast');

});
/* 
Legger til click event for alle nedtrekkslister (collapsible).
Listen ekspanderes eller kollapses (avhengig av hvilket item det er)
Den flyttes til høyre for lenken hvis den ikke allerede er der.

Hvis innholdet er skjult, legges til pluss, ved å nevne begge CSS stylene
sikrer vi at den enten fjerner collapsible eller visible og legger til vica versa.
*/
$('.collapsible').on('click', function () {

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
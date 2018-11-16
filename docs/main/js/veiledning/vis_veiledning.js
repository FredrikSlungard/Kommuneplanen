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
    
  }
  else if ($(this).hasClass('collapsible_sub') || $(this).hasClass('visible_sub')) {
    let Innhold = $(this).next('.content');
    $(this).toggleClass("collapsible_sub visible");
    Innhold.slideToggle('fast');
  };
});
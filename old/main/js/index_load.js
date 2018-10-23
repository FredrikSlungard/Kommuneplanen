// Script som kjører når siden lastes inn
$(function () {

  // Laster inn HTML innholdet på siden
  Last_Innhold = () => {
    // Laster inn innholdet som skal være i navigasjonbarene.
    // Toppen, til høyre og venstre.
    $('#top_navbar').load('/main/html/navbar/top_navbar.html');
    $('#left_navbar').load('/main/html/navbar/left_nav.html');
    $('#right_navbar').load('/main/html/navbar/right_nav.html');

    // TESTER INNHOLD //
    $('#innhold').load('/main/html/test.html');
  };

  /* Laster inn javascript filer med eventer som aktiveres når siden lastes for første gang. */
  Javascript_Funksjonalitet = () => {
    // Egne pseudo-funksjoner og add-in for highlight
    $.get('/main/js/funksjoner/pseudo_exp.js');
    $.get('/main/js/funksjoner/highlight.js')

    // Laster inn overskrifter og eventer i navigasjonen
    $.get('/main/js/navigasjon/navigasjon.js');
    $.get('/main/js/navigasjon/nav_event.js');

    // Søkefeltet til høyre
    $.get('/main/js/navigasjon/search_page.js');
  };

  let innhold = Last_Innhold();
  let funksjonalitet = Javascript_Funksjonalitet();

});
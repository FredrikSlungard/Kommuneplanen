// Script som kjører når siden lastes inn
$(function () {

  // Laster inn HTML innholdet på siden
  Last_Innhold = () => {
    let Nav_Fldr = '/main/html/navbar/';

    // Laster inn innholdet som skal være i navigasjonbarene.
    // Toppen, til høyre og venstre.
    $('#top_navbar').load(Nav_Fldr + 'top_navbar.html');
    $('#left_navbar').load(Nav_Fldr + 'left_nav.html');
    $('#right_navbar').load(Nav_Fldr + 'right_nav.html');

    // Laster inn hovedinnholdet
    // $('#innhold').load('/main/html/bestemmelser/1_plankrav.html') - Denne fungerer fint
    $.get('/main/js/load_main_content.js'); // Denne fungerer ikke
  };

  /* Laster inn javascript filer med eventer som aktiveres når siden lastes for første gang. */
  Javascript_Funksjonalitet = () => {
    let Nav_Fldr = '/main/js/navigasjon/';
    
    // Egne pseudo-funksjoner og add-in for highlight
    $.get('/main/js/funksjoner/pseudo_exp.js');
    $.get('/main/js/funksjoner/highlight.js')

    // Laster inn overskrifter og eventer i navigasjonen
    $.get(Nav_Fldr + 'navigasjon.js');
    $.get(Nav_Fldr + 'nav_event.js');

    // Søkefeltet til høyre
    $.get(Nav_Fldr + 'search_page.js');
  };

  Last_Innhold();
  Javascript_Funksjonalitet();

});
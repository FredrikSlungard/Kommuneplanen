/* Søker gjennom siden og returnerer overskriften(e) med den nærmeste tenksten som matcher. 

Navn lagrer posisjonen til itemet, når brukeren trykker på scrolles siden ned til plasseringen. Antar at de fleste søker og trykker raskt, dermed vil posisjonen være gyldig*/
$(function () {
  'user strict';

  // Konstanter som ikke endres underveis (vil ikke søke i nedtrekkslister)
  let Doc_Content = $('p, :header, td, li');
  const Dest_Treff = $('#søke_treff');
  const Nav_Overskrifter = $('#nav_innhold');

  // Returnerer treffene i dokumentet
  Treff_I_Dokument = (Søk_Etter) => {

    let New_Phrase = '';

    let Treff = Doc_Content.filter(function (index, value) {
      if ($(value).is(':def_contains(' + Søk_Etter + ')')) {
        return $(value);
      };
    });

    // Gjør om til en <ul> liste for orden og <a> tag med referanse til posisjon.
    return $.map(Treff, function (value, i) {
      let Top_Pos = $(value).offset().top;

      New_Phrase = '<ul class="navItem navmenu-nav"><a name=' + Top_Pos + '>' + $(value).text() + '</a></ul>';
      
      return New_Phrase

    });
  };


  // Endrer synligheten på søkefeltet/overskriftene
  Endre_Synlighet = (Vis_Søk) => {

    // Skjuler overskriftene når brukeren søker
    if (Vis_Søk === true) {
      if (Nav_Overskrifter.hasClass('synlig')) {
        Nav_Overskrifter.removeClass('synlig').addClass('usynlig')
      };

      // Viser div som skal ha søketreffene
      if (Dest_Treff.hasClass('usynlig')) {
        Dest_Treff.removeClass('usynlig').addClass('synlig')
      };
    }

    // Skjuler søkefeltet og viser overskriftene
    else {

      if (Nav_Overskrifter.hasClass('usynlig')) {
        Nav_Overskrifter.removeClass('usynlig').addClass('synlig')
      };

      // Viser div som skal ha søketreffene
      if (Dest_Treff.hasClass('synlig')) {
        Dest_Treff.removeClass('synlig').addClass('usynlig')
      };

    };
  };

  // Viser søkeresultatene som matcher (i menyen til venstre)
  $('#søk_nav').on('keyup', function () {
    let Search_Prase = $(this).val();

    if (Search_Prase.length >= 3) {


      Endre_Synlighet(true);
      let Funnet_Ord = Treff_I_Dokument(Search_Prase);

      // Limer inn søkeresultatet hvis det er treff
      Dest_Treff.empty()
        .append(Funnet_Ord)
        .highlight(Search_Prase)

      if (Funnet_Ord.length === 0) {
        Dest_Treff.append('<p>Ingen treff, prøv å begrense søket</p>')
      };
    }

    // Fjern innholdet hvis det er mindre enn 3 bokstaver
    else {

      Endre_Synlighet(false);

    };
  });

  // Tar brukeren til lokasjonen som har søketeksten
  $('#søke_treff').on('click', function (event) {
    
    console.log("Hello");
    let windowHeight = $(window).height();
    let Item = $(event.target);
    let Result = Returner_Første_Treff($(event.target), Doc_Content);

    if (Item != undefined) {
      // Gjør at den scroller til midten av siden hvis overskriften er lavere enn høyden på vinduet
      let Destinasjon = Item.attr('name');
      if (Destinasjon < windowHeight || Destinasjon !== 0) {
        Destinasjon -= (windowHeight / 2);
      };

      // Scroller til destinasjonen
      $('html, body').animate({
        scrollTop: (Destinasjon)
      }, 1000);

      $(Result).effect("highlight", { color: "#86ac41" }, 3000);

    }
  });
});

  /*       $('li:not(:def_contains("' + Search_Prase + '")), .nav_clickable:not(:def_contains("' + Search_Prase + '"))')
        .hide();
   
      // Viser resultatene som matcher (oppdaterer søket etterhver)
      $('li:def_contains("' + Search_Prase + '"), .nav_clickable:def_contains("' + Search_Prase + '")')
        .show(); */



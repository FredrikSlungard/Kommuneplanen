/* Søker gjennom siden og returnerer overskriften(e) med den nærmeste tenksten som matcher. 

Navn lagrer posisjonen til itemet, når brukeren trykker på scrolles siden ned til plasseringen. Antar at de fleste søker og trykker raskt, dermed vil posisjonen være gyldig*/
$(function () {
  'user strict'

  // Konstanter som ikke endres underveis (vil ikke søke i nedtrekkslister)
  const Doc_Content = $('p, :header');
  const Dest_Treff = $('#søke_treff');

  // Returnerer treffene i dokumentet
  Treff_I_Dokument = (Søk_Etter) => {
    // Filtrer treffene
    let New_Phrase = '';

    let Treff = Doc_Content.filter(function (index, value) {
      if ($(value).is(':def_contains(' + Søk_Etter + ')')) {
        return $(value);
      };
    });

    // Gjør om til en <ul> liste for orden og <a> tag med referanse til posisjon.
    return $.map(Treff, function(value, i) {
      let Top_Pos = $(value).offset().top;

      New_Phrase = '<ul><a name=' + Top_Pos + '>' + $(value).text() + '</a></ul>';
      return New_Phrase

    });
  };

  // Viser søkeresultatene som matcher
  $('#search_doc').on('keyup', function () {
    let Search_Prase = $(this).val();

    if (Search_Prase.length >= 3) {
      let Funnet_Ord = Treff_I_Dokument(Search_Prase);

      // Limer inn søkeresultatet hvis det er treff
      Dest_Treff.empty()
      .append(Funnet_Ord)
      .highlight(Search_Prase);
    }

    // Fjern innholdet hvis det er mindre enn 3 bokstaver
    else {
      Dest_Treff.empty();
    };
  });


  // Tar brukeren til lokasjonen som har søketeksten
  $('#søke_treff').on('click', function (event) {
    let windowHeight = $(window).height();
    let Item = $(event.target);

    
    if (Item != undefined) {
      // Gjør at den scroller til midten av siden hvis overskriften er lavere enn høyden på vinduet
      let Destinasjon = Item.attr('name');
      if (Destinasjon < windowHeight) {
        Destinasjon -= (windowHeight / 2);
      };

      // Scroller til destinasjonen
      $('html, body').animate({
        scrollTop: (Destinasjon)
      }, 1000);

    }
  });
});



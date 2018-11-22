/* Viser nærmeste overskrift i navigasjonen slik at brukeren ser hvor de er */
$(function () {
  let windowHeight = $(window).height();
  let Overskrifter = $('h1, h2', 'main')

  Nærmeste_Overskrift = () => {
    let Curr_Location = $(window).scrollTop();

    let Nærmeste = Overskrifter.sort(function (a, b) {
      let a_pos = $(a).position().top;
      let b_pos = $(b).position().top;

      let prev_Diff = Math.abs(Curr_Location - a_pos);
      let curr_Diff = Math.abs(Curr_Location - b_pos);

      if (prev_Diff > curr_Diff) {
        return 1;
      } else if (prev_Diff < curr_Diff) {
        return -1;
      } else {
        return 0;
      };
    });

    return $(Nærmeste[0]);

  };

});


// Tar brukeren til lokasjonen som har søketeksten
$(document).on('scroll', function (event) {
  Nærmeste_Overskrift().css('color','blue');
});

/* let windowHeight = $(window).height();
    let Item = $(event.target);
    let Result = Returner_Første_Treff($(event.target), $('p, :header, td, li', 'main'));

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
  }); */
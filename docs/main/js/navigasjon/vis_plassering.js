/* Viser nærmeste overskrift i navigasjonen slik at brukeren ser hvor de er */
$(function () {
  let Overskrifter = $('h1, h2', 'main');

  Nærmeste_Overskrift = () => {
    'use strict'
    let Curr_Location = $(window).scrollTop();

    if (Curr_Location >= 10) {
      Overskrifter.sort(function (a, b) {
        let prev_Diff = Math.abs(Curr_Location - $(a).position().top);
        let curr_Diff = Math.abs(Curr_Location - $(b).position().top);

        if (prev_Diff > curr_Diff) {
          return 1;
        } else if (prev_Diff < curr_Diff) {
          return -1;
        } else {
          return 0;
        };
      });

      return $(Overskrifter[0]);
    }
    // Hvis scrollehøyden er for lav sorteres den feil, dette gjelder kun for lave scrolltall
    else {
      Overskrifter.sort(function (a, b) {
        let a_top = Math.abs(Curr_Location - $(a).position().top);
        let b_top = Math.abs(Curr_Location - $(b).position().top);

        if (a_top > b_top) {
          return 1;
        } else if (a_top < b_top) {
          return -1;
        } else {
          return 0;
        };
      });

      return $('h1, h2', 'main').first();
    };

  };

  // Finner den matchende overskriften i navigasjonen og viser en higlight
  Overskrift_Navigasjon = () => {
    Finn_Overskrift = Nærmeste_Overskrift();

    if (Finn_Overskrift != undefined) {
      let Closest_Heading = $(Finn_Overskrift).text().toLowerCase();
      let Overskrift_Type = Finn_Overskrift.prop('nodeName').toLowerCase();
      let Nav_Menu = $(Overskrift_Type, '#nav_innhold');

      return $(Nav_Menu).filter(function (index, value) {
        let Nav_Overskrift = $(value).text().toLowerCase(); 

        if (Closest_Heading.indexOf(Nav_Overskrift) !== -1) {

          return $(value)
        };
      });

    };
  };
});

// Tar brukeren til lokasjonen som har søketeksten
$(document).on('scroll', function (event) {
  let Temp = Overskrift_Navigasjon().children('a');

  $('*', '#nav_innhold').removeClass('active');
  $(Temp).addClass('active');

});
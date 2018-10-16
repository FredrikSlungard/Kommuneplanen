// Legger til overskrifter in navigasjonsmenyen
Legg_Til_Overskrift = () => {

  let destinasjon = $('#nav_innhold');
  let Overskrifter = $('h2');
  let innhold = '<ul class="navmenu-nav"';

  destinasjon.empty();
  $.each(Overskrifter, function (index, value) {
    innhold += '<li><a class="nav_Clickable" href="#">' + $(this).text() + '</a></li>';
    //console.log($(this).url);

  });

  innhold += '</ul>'

  $(innhold).insertAfter($(destinasjon));
};

Legg_Til_Overskrift();


// Går til overskriften når noen tykker på overskriften i navigasjonen
$('.nav_Clickable').on('click', function () {
  let Overskrifter = $('h2');
  let Søk_Etter = this.text;

  // Søker etter overskriften og filterer ut verdiene som ikke treffer søkeverdien
  let Result = $('h2').filter(function () {
    return $(this).text() === Søk_Etter;
  });

  if (Result.length === 1) {

    $('html, body').animate({
      scrollTop: (Result.offset().top)
    }, 300);
  }
  else {
    /* let Result2 = Result[0];
    console.log(Result2.position().top);   */
  };

});
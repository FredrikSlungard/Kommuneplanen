/* Flytter innholdet som skal vises når brukeren trykker på interne hyperlenker.
Det er en forutsetning hyperlenken er en del av klassen (class = "intern_lenke"

Finner den nærmeste paragrafen (denne) og setter
*/
$('.intern_lenke').on('click', function (event) {
  let referanse = $(this).attr("href"); // referansen til itemet som trykkes på
  let Scroll_To = $(referanse)[0]; // Nedtrekkslisten som blir synlig

  let Closest_Para = $(this).closest('p');
  $(Scroll_To).insertAfter($(Closest_Para));
});
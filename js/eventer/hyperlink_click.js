/* Flytter innholdet som skal vises når brukeren trykker på interne hyperlenker.
Det er en forutsetning hyperlenken er en del av klassen (class = "intern_lenke"*/
$('.intern_lenke').on('click', function (event) {

  event.preventDefault();
  let referanse = $(this).attr("href");
  let Scroll_To = $(referanse)[0];

  console.log(referanse);

  Scroll_To.scrollIntoView(true);
  //console.log(referanse)

  //let pos = $(this).offset().top;
  //let source_pos = $(this).offset().top;

});
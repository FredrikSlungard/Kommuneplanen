/* Flytter innholdet som skal vises når brukeren trykker på interne hyperlenker.
Det er en forutsetning hyperlenken er en del av klassen (class = "intern_lenke"

Finner den nærmeste paragrafen (denne) og setter inn innholdet etter paragrafen.
*/
$('.intern_lenke').on('click', function (event) {

  let referanse = $(this).attr("href"); // Referansen til itemet som trykkes på
  let Scroll_To = $(referanse)[0]; // Nedtrekkslisten som blir synlig
  let Closest_Para = $(this).closest('p'); // Nærmeste paragraf

  
  // Sjekker om ID eksiterer, hvis ikke lastes siden inn
  if (Scroll_To == null) {
    $(Closest_Para).load(Filbane(this.text));
  };

  $(Scroll_To).insertAfter($(Closest_Para));
});

// Liste over filbaner og id til nedtrekkslistene
// Ord = ordet/teksten som brukeren ser
Filbane = (Ord) => {
  let Fldr = '/main/veiledning/definisjoner/';
  let dict = {
    'sekundær boenhet': Fldr + 'sekundær boenhet.html',
    'fortetting': Fldr + 'fortetting.html'
  };

  let key = Ord.toLowerCase();
  return dict[key];

};


/* <div id="rad_sekundær_boenhet">
  <script>
    $("#rad_sekundær_boenhet").load("/main/bestemmelser/sekundær_enhet.html");
  </script>
</div>
name = $(this).text();
  if($("#" + name).length == 0) {
    $("div#chatbar").append("<div class='labels'><div id='" + name + "' style='display:none;'></div>" + name + "</div>");
  } else {
    alert('this record already exists');
  } */
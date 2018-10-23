/* Flytter innholdet som skal vises når brukeren trykker på interne hyperlenker.
Det er en forutsetning hyperlenken er en del av klassen (class = "intern_lenke"

Finner den nærmeste paragrafen (denne) og setter inn innholdet etter paragrafen.
*/

// Hva som skjer når du klikker på en intern lenke, viser en nedtrekkslisten med veiledning
$('.intern_lenke').on('click', function (event) {
  let referanse = $(this).attr("href"); // Referansen til itemet som trykkes på
  let Destinasjon = $(referanse)[0]; // Nedtrekkslisten som blir synlig
  let Closest_Para = $(this).closest('p'); // Nærmeste paragraf

  // Sjekker om ID eksiterer, 
  if (Destinasjon != null) {
    $(Destinasjon).insertAfter($(Closest_Para, referanse));
  }

  // Last inn HTML innholdet på siden hvis Destinasjon ikke eksisterer
  else{
    Lag_Innhold((this.text), Closest_Para, referanse);
  };
});

// Lager HTML strengen som skal settes inn hvis innholdet ikke er lastet inn
// Ord = Ordet brukeren ser
// Sett_Inn_Etter = Paragrafen eller div som det skal settes inn etter
Lag_Innhold = (Ord, Sett_Inn_Etter, ref) => {
  let url = Filbane(Ord);

  // Må vente til etter call er ferdig, hvis ikke returneres undefined
  Sett_Inn_HTML = (data) => {
    $(data).insertAfter($(Sett_Inn_Etter, ref));
  };

  $.get(url, Sett_Inn_HTML);

};


// Liste over filbaner og id til nedtrekkslistene
// Ord = ordet/teksten som brukeren ser
Filbane = (Ord) => {
  let Fldr = '/main/veiledning/definisjoner/';
  let dict = {
    'sekundær boenhet': 'main/bestemmelser/sekundær_boenhet.html',
    'fortetting': Fldr + 'fortetting.html',
    'hovedbruksenhet': Fldr + 'hovedbruksenhet.html'
  };

  let key = Ord.toLowerCase();

  return dict[key];

};
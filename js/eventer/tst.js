
let let_etter = 'fortetting';
let Fldr = '/main/veiledning/definisjoner/';
let Dict = {
  'sekundær boenhet': Fldr + '/sekundær boenhet.html',
  'fortetting': Fldr + '/fortetting.html'
};



// Liste over filbaner og id til nedtrekkslistene
// Key = ordet/teksten som brukeren ser
const Liste_Filbaner = () => {
  let Fldr = '/main/veiledning/definisjoner/';

  return {
    'sekundær boenhet': Fldr + '/sekundær boenhet.html',
    'fortetting': Fldr + '/fortetting.html'
  };
};

console.log(Object.keys(Liste_Filbaner).length);
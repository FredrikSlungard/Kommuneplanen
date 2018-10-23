// Åpner og lukker sidenavigasjonen - Må forbedres!
$('.navigasjon').on('click', function () {

  if (this.id === 'åpne_nav') {
    $('#mySidenav').css('width', '250px')
    $('#main').css('marginLeft', '250px')
  }
  else {
    $('#mySidenav').css('width', '0')
    $('#main').css('marginLeft', '0')
  };

});
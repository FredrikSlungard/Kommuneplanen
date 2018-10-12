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

  Legg_Til_Overskrift();

});


Legg_Til_Overskrift = () => {
  let destinasjon = $('#nav_innhold');
  let new_HTML;

  new_HTML = $("h2").map(function(n){
    return ('<a href="#">' + n + '</a>');
  });

  /* $('h2').each(function() {
    
    console.log(this);
    new_HTML =+ '<a href="#">' + this + '</a>';

  });
 */

  console.log(new_HTML);
  
};
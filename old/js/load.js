// Laster inn innholdet fra de ulike html filene som skal inn i indeksen ved oppstart.
//'use strict';

const Bestemmelser = '/main/bestemmelser/';
let Mapper = ['1-4', 
          '5-13'];

Last_Innhold = () => {
  let dir = Bestemmelser + Mapper[0];
  let $Content = $('<div>');


  $.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function (data) {
      //List all .html file names in the page
      $(data).find("a:contains(.html)").each(function () {
        let filename = this.href.replace(window.location, "").replace("http://", "");

        $Content.load(filename);
        
        console.log($Content.html())
        $('#main').after($Content);
        

      });
    }
  });
};


Last_Innhold();
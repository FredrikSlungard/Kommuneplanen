// Legger til en popover i ordet hvis ordet ikke er en lenke fra før, denne benyttes i første omgang i nedtrekkslister som blir synlige.
Add_Hover = (doc) => {
  doc.each(function () {
    let para = $(this);
    let text = '"Enebolig med integrert sekundær boenhet"';

    // Legg til hvis det ikke er en lenke fra før og teksten er synlig
    if (!$(para).closest('a').length && para.is(":visible")) {

      para.html(para.html().replace(/hovedbruksenhet/ig, '<a href="#" data-toggle="popover" data-trigger="focus" data-placement="bottom" title="Definisjon av hovedbruksenhet" data-content=' + text + '>hovedbruksenhet</a>'));

    };
  });

  $('[data-toggle="popover"]').popover();

};

Add_Hover(all_para);
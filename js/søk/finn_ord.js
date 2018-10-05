/* Leter gjennom en html fil med tekst og legger til en <a> tag med hyperlenke hvis ordet matcher. 

Den legger kun til slike lenger hvis teksten er en del av en paragraf <p> */
// Finner ordene som skal erstattes i dokumentet
Legg_Til_Lenke = (doc) => {
  doc.each(function () {
    let para = $(this);
  
    if (para.is(":visible")) {
      para.html(para.html().replace(/sekundær boenhet/ig, '<a href="#Sekundær_Boenhet" data-toggle="collapse">sekundær boenhet</a>')); 
    }
  });
};

// Legger til en popover i ordet med mindre det er en lenke fra før og teksten ikke er synlig
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

let all_para = $('p');
let søk_etter = 'sekundær boenhet';

Legg_Til_Lenke(all_para);
Add_Hover(all_para)
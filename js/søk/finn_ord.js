/* Leter gjennom en html fil med tekst og legger til en <a> tag med hyperlenke hvis ordet matcher. 

Den legger kun til slike lenger hvis teksten er en del av en paragraf <p> */
// Finner ordene som skal erstattes i dokumentet
Legg_Til_Lenke = (doc) => {
  doc.each(function () {
    let para = $(this);
  
    if (para.is(":visible")) {
      para.html(para.html().replace(/sekundær boenhet/ig, '<a href="#sekundær_boenhet" data-toggle="collapse">sekundær boenhet</a>')); 
    }
  });
};

// Legger til en hoverbox over ordet (hvis det ikke er en lenke fra før)
Add_Hover = (doc) => {
  doc.each(function () {
    let para = $(this);
  
    if (!$(para).closest('a').length) {
      para.html(para.html().replace(/hovedbruksenheten/ig, '<a href="#" data-toggle="tooltip"  data-placement="top" title="Hooray!">hovedbruksenheten</a>'));
    };
  });
};


let all_para = $('p');
let søk_etter = 'sekundær boenhet';

Legg_Til_Lenke(all_para);
Add_Hover(all_para)


/* const instance = new Tooltip(referenceElement, {
  title: "Hey there",
  trigger: "click",
});
instance.hide();

var popper = new Popper(referenceElement, onBottomPopper, {
  placement: 'bottom'
}); */
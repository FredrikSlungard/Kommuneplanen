/* Leter gjennom en html fil med tekst og legger til en <a> tag med hyperlenke hvis ordet matcher. 

Den legger kun til slike lenger hvis teksten er en del av en paragraf <p> */

// Finner ordene som skal erstattes i dokumentet
let all_para = $('p');
let søk_etter = 'sekundær boenhet';

all_para.each(function () {
  let para = $(this);

  if (para.is(":visible")) {
    para.html(para.html().replace(/sekundær boenhet/ig, '<a href="#sekundær_boenhet" data-toggle="collapse">sekundær boenhet</a>')); 
  }
  console.log("OK");
});


//doc.html(doc.html().replace(/sekundær boenhet/ig, '<a href="#sekundær_boenhet" data-toggle="collapse">sekundær boenhet</a>')); 

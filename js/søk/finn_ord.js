/* Leter gjennom en html fil med tekst og legger til en <a> tag med hyperlenke hvis ordet matcher.

Data-toggle bestemmer hva som skjer, hvis den er usynlig fra før blir den synlig. Hvis den er synlig skjules den.

Den legger kun til slike lenger hvis teksten er en del av en paragraf <p> */
let all_para = $('p');
let expressions = {
  'sekundær boenhet': [/sekundær boenhet/ig, '<a class = "intern_lenke" href="#veil_Sekundær_Boenhet" data-toggle="collapse">sekundær boenhet</a>'],

  'hovedbruksenhet ': [/hovedbruksenhet/ig, '<a class = "intern_lenke" href="#veil_Sekundær_Boenhet" data-toggle="collapse">hovedbruksenhet</a>']
};

/* Finner ordene som skal erstattes i dokumentet, det forutsettes da at dokumentet er lastet inn på forhånd. 
Doc = Paragrafer som skal letes gjennom
look_for = Dictionary med søkefrase der:
  index 0 = regexp
  index 1 = ny HTML som skal settes inn.
*/
Legg_Til_Lenke = (doc, look_for) => {

  // Gå gjennom alle søkeørdene
  for (let key in look_for) {
    let reg_exp = look_for[key][0];
    let HTML_command = look_for[key][1];

    // Gå gjennom alle paragrafene og sjekk om den er synlig
    doc.each(function () {
      let para = $(this);

      if (para.is(":visible")) {
        para.html(para.html().replace(reg_exp, HTML_command));
      }
    });
  };
};

// Legger til lenker og hoverboks for ord (se finn ord)
Legg_Til_Lenke(all_para, expressions);
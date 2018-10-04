/* Leter gjennom en html fil med tekst og legger til en <a> tag hvis ordet matcher. Den legger kun til slike lenger hvis teksten er en del av en paragraf <p> */

// Finner ordene som skal erstattes i dokumentet
let doc = $('body')  //'/../main/test/index.html';
let søk_etter = 'sekundær boenhet';

let new_content = doc.html().replace('/' + søk_etter +'/g', '<b>' + søk_etter + '</b>');

doc.html(new_content);


//$('<b>' + søk_etter + '</b>')  //
//$('p:contains(' + søk_etter + ')').css('text-decoration' , 'underline');
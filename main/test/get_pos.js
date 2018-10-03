// Angir posisjonen til elementet som velges
// Angir eventene for skjemaet
$('a').click(function(event) {

  //let parent = $(event.target).closest(":header");
  let pos = $(event.target).position();
  let veiledning = $('#sekundær_boenhet');

  veiledning.css({top: pos.top});

  //console.log(veiledning.top);
  //console.log(veiledning.left);
  //console.log(pos.top);
  //console.log(pos.left);
});
/* Liste over pseudofunksjoner som benyttes i programmet */

/* Gjør funksjonen "contains" case-insensitive
  https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
  https://github.com/jquery/sizzle/wiki#sizzleselectorscreatepseudofunction */
$.expr[":"].def_contains = $.expr.createPseudo(function (arg) {
  return function (elem) {
    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});
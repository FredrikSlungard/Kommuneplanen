# Kommentarer
Problemet med nedtrekkslisten er tofold; hvordan skal jeg sikre at alle ordene
markeres riktig, og hvordan bestemmmer innholdet?

## Alternativ 1:
Dette er den "letteste" måten, forutsetter at veilednignene og definisjonene
har en klasse, navn, id eller lignende som gjør at de lett er definerbare.

Problemet her er at det fører til svært mange klassenavn på veiledningene og
definisjonene. Kan bli vanskelig å holde ordne på alle sammen.

## Alternativ 2:
Lage egne filer/mapper med veiledningene til ordene. 
Fordelen er at det er lett å vedlikeholde, dvs. oversiktlig i og med at innholdet
er gitt i filen og at det kun trengs "vanlig" klassenavn.

Ulempen er at det blir det samme innholdet som i mange av HTML filene.
Fører til mye dobbeltlagring.

## Alternativ 3:
Lage en backend løsning, den "beste" måten er jo å ha et eget felt i serveren
der de ulike tekstdelene referer til ord/utrykket som skal hentes inn.

Isåfall må callingen optimaliseres, må snakke med noen andre om akkurat det.
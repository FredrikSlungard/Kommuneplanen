# Kommuneplanen
Se på muligheten for å ha en mer lesbar/brukervennlig versjon av kommuneplanen.
Særlig med tanke på forkalringer i forbindelse med interne rutiner/tolkninger osv.
# Funksjonalitet
Bestemmelsene i kommuneplanen vises som normal tekst. 
I denne teksten bør det være så få hyperlenker som mulig, med følgende unntak:

* Definisjoner av ord/utrykk
* Interne lenker til kommuneplanen
## Definisjoner
Definisjonene vises som en exandable til høyre når du trykker på ordet/lenken.
I disse tekstbolkene kan det også være hyperlenker til relevante lovverk eller andre, men disse bør egentlig unngås.
Generelt bør lenkene ikke vise videre til lovverk, og heller forklare hva loven sier/hvordan den skal brukes.
## Interne lenker
Brukes hvis det er beskrivelser som peker tilbake på andre bestemmelser/dokumenter, f.eks. sekundære boenheter, vei- og gatenormalen osv.
Beskrivelsen vises som en expandable under paragrafen når du trykker på ordet/lenken.

# Oppbygging
Programmet er bygd slik at bestemmelsene vises, mens veiledninger/definisjoner vises etterhvert som de blir relevante.

## Veiledninger
I den grad definisjonene og veiledningene kan knyttes direkte til en bestemmelse ligger de i samme HTML fil.
Hvis ikke er beskrivelsen trukket ut som en egen HTML med beskrivelse.

## Klasser
Liste over de ulikene klassene som brukes i CSS/HTML og jQuery:

* **Collapse** beskriver selve containeren til listen
* **Collapsible** er knappen som trykkes på for å vise beskrivelse til listen, underordnet collapse


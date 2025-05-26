# Projekt Typescript

Detta projekt har gått ut på att skapa en fiktiv webbplats för ett lärosäte, där användare ska kunna söka kurser, filtrera ut kurser på ämne, och kunna lägga till kurser till ett
ramschema. På ramschema sidan ska man kunna se en summering av totala högskolepoäng av valda kurser, det ska även finnas möjlighet att ta bort en kurs från listan.
Kurserna hämtas från en JSON-fil som jag har lagt in under public katalogen.

## Starta Liveserver

För att starta en Liveserver så kör man kommando:

```bash
ng serve
```

## Komponenter

**src/app/courses** - Här finns HTML-kod, CSS-styling och Typescript kod för att skriva ut kurser, för att sortera kurser och filtrera kurser på kurssidan.

**src/app/schedule** - Här finns HTML-kod, CSS-styling och Typescript kod för att visa valda kurser, och möjlighet att ta bort en kurs, samt se summering av högskolepoäng.

## Services

**src/app/services/course** - Hämtar in JSON-filen

**src/app/services/schedule** - Sparar ner valda kurser till LocalStorage och hämtar kurser från LocalStorage, metod för att lägga till kurser i ramschemat. 

## Funktioner för webbplatsen

- Filtrering på kurser utifrån valt ämne.
- Sortera på kurser i ett sökfält.
- Sortera på kurser genom att klicka på rubriken Kurskod, Kursnman, Poäng eller Ämne.
- Finns en text som visar hur många kurser som visas just nu på kurssidan.
- En "Lägg till"-knapp för att lägga till kurser till ramschemat.
- I ramschemat hämtas sparade kurser i LocalStorage och skrivs ut.
- En summering av högskolepoängen för valda kurser.
- En "Ta bort"-knapp för att ta bort en kurs från ramschemat.
- Responsiv design.

## Responsiv design
För att göra sidan responsiv har jag använt mig av media queries. Eftersom jag använder mig av tabeller för att visa kurser på stora skärmar har jag valt att på små skärmar byta till
p-element för att skriva ut data. Istället för att visa i tabellform så skrivs varje kurs ut "blockvis" för en bättre användarupplevelse för mindre enheter. 

### Har använt mig av:

- HTML
- CSS
- Angular
- TypeScript



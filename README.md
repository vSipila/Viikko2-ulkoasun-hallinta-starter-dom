# Viikko 2 — Ulkoasun hallinta (DOM/CSSOM-Playwright)

Tämä starter käyttää **DOM/CSSOM-pohjaisia Playwright-testejä** (ei regexiä tiedostoihin). Pisteet ovat **kokonaislukuja (0–10)** ja lasketaan **workflowssa**.

## Paikallinen ajo
```bash
npm install
npx playwright install
npm run test
```

## Tehtävä (tiivistelmä)
1) Ulkoinen CSS vain `styles.css`-tiedostossa, ei inline-tyylejä, ei `<style>`-tageja.
2) CSS-muuttujat `:root`-tasolla ja käytä `var(--...)` jossain säännössä.
3) Rungon typografia: line-height ≥ 1.4.
4) `.container`: `max-width` CH-yksiköllä, `margin: 0 auto`, `padding` > 0.
5) Navissa vähintään 2 linkkiä `href`-attribuutilla.
6) `.box`-elementillä padding/border/margin > 0.
7) Spesifisyys Option B: `.title.strong` yliajaa `.title`n (esim. eri väri).
8) Ei CSS-frameworkeja (laatucheck, ei vaikuta pisteisiin).

## Pisteytys
- Sisältötestit (T2–T7) muodostavat pistemäärän 0–10 (integer). T1 ja T8 ovat laatu-tarkistuksia (0p).

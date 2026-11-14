# Test naïf du 2026-11-14, testeur 1 : aupublicholidays.com
**Persona :** Australien(ne) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. Il/elle a tapé sa question dans Google (« Public holidays 2027 by state: dates and long weekends ») et a cliqué parce qu'il/elle veut vraiment savoir quels jours seront fériés en 2027 chez lui/elle.

## 1. Concept

**Après 5 secondes :** « C'est la liste des jours fériés 2027, État par État. » Le titre « Public holidays 2027 in every Australian state and territory » colle exactement au résultat Google. Le sélecteur « State or territory » (New South Wales) et les boutons 2026 / 2027 / 2028 juste en dessous, puis le gros « 14 public holidays » : je sais tout de suite où je suis et quoi toucher. Promesse tenue.

**Après 2 minutes :** c'est plus qu'une liste. Il y a un compte à rebours jusqu'au prochain férié, un « Is today a public holiday in NSW? → No », un calculateur « Make your annual leave go further » (combien de jours de congé pour combien de jours off), les ponts longs, les vacances scolaires, les fériés locaux (show days). Le site s'adresse aux salariés qui organisent leurs congés, et aux parents.

**Clair ? Oui pour la base.** Le bénéfice concret : avoir la liste de MON État avec le jour de la semaine, savoir si le lundi 26 avril (Anzac) ou les 27-28 décembre sont fériés chez moi, et trouver où poser 1 à 5 jours de congé pour un maximum de repos. Ça se brouille dès qu'on regarde les chiffres du planificateur de congés (voir §6).

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour la liste des dates, non pour le planificateur de congés.**
- La liste par État, les tableaux « Holiday / Date / Kind » et les tableaux par férié (« NSW / VIC / QLD… ») se lisent sans effort.
- Ça décroche sur :
  - « 14 days off in a row » alors que le tableau montre deux pauses séparées (4 jours en janvier + 10 jours à Pâques). Je me sens trompé(e).
  - Le bandeau jaune « Example with typical figures — change any figure to see your own result » sur une simple liste officielle de fériés : quels « chiffres » changer ? Les jours fériés ne dépendent pas de moi.
  - Le vocabulaire « Additional day » / « Observed on this day » / « (observed) » / « moved day » : quatre mots pour deux idées.
  - Le jargon technique : « dynamic programming », « republication R11 », « Schedule 2 », « refused automated reading ».

## 3. Parcours écran par écran

**01-accueil-1** : compris. Titre clair, sélecteur d'État, années, « 14 public holidays / 9 of them fall Monday to Friday ». Le bandeau jaune « Example with typical figures » me fait hésiter : est-ce que ces 14 jours sont un exemple ou la vraie liste NSW ? Ça inquiète au lieu de rassurer.

**01-accueil-suite1 / suite2** : compris. La liste NSW complète avec jour de la semaine, très bien. « Bank Holiday — Banks only » : je comprends que ça ne me concerne pas, bien. « Christmas Day / Monday 27 December 2027 / Additional day » : compris. Petite gêne : « Anzac Day » apparaît deux fois de suite sans autre explication que « Additional day » dans la 3e colonne.

**01-accueil-suite2 → suite3** : compte à rebours « Time left until Christmas Day 39 days 22 hrs 59 min ». Sympa mais il s'agit de Noël **2026**, alors que toute la page parle de 2027 : petit choc de contexte. « Is today a public holiday in NSW? No » : clair et utile. « Next public holiday Fri 25 Dec (in 40 days) » à côté de « 39 days 22 hrs » : c'est cohérent, mais deux chiffres différents l'un sous l'autre font tiquer. « School term 4 (NSW) ends Thu 17 Dec » : bonus apprécié pour un parent.

**01-accueil-suite4** : le bloc « Most public holidays (2027) 15, VIC, ACT / Easter 2027 Fri 26 Mar – Mon 29 Mar… » est du texte brut empilé sans mise en forme : on dirait une erreur d'affichage. Les cartes « Tools to plan your days off » sont claires.

**01-accueil-suite5** : cartes claires (Long weekends, Annual leave planner, Next public holiday, 2028, School terms).

**01-accueil-suite6 → suite10** : le tableau « Shared public holidays 2027 » est très lisible et la phrase « Anzac Day is the one that splits the country » m'apprend exactement ce que je cherchais. Seul bémol : c'est très long à faire défiler (8 lignes × 7 fériés) alors que j'ai déjà ma liste NSW plus haut.

**01-accueil-suite10 / suite11** : « Make your annual leave go further » : 5 jours → « NSW 2027: days off in a row 14 days ». Puis « First break Sat 23 Jan – Tue 26 Jan 2027 », soit 4 jours. **Bloque** : 14 jours d'affilée ou 4 ? Je ne comprends pas.

**01-accueil-suite11 / suite12** : liste « Full-day public holidays 2027, state by state » : claire. « Additional day or moved day? » : explication utile, mais c'est un paragraphe que je ne lirais pas.

**01-accueil-suite13 → suite15** : grands sommaires de liens (par État, par férié, show days). Utiles, bien rangés. « The 2027 calendar, topic by topic » : les triangles ▶ sont sur une ligne et le titre sur la ligne d'en dessous, on ne voit pas que c'est cliquable. **Coince.**

**01-accueil-suite16 → suite18** : FAQ en accordéon, claire. Sources officielles : rassurant. « As of 2027, holiday lists and term dates checked on 13 November 2026 » : formulation bizarre (« As of 2027 » alors qu'on est en 2026).

**02-menu-1 / suite1** : menu clair, rubriques « By state / Holidays / Plan / Local ». « Public holidays 2027 » rangé sous « By state » est un peu étrange, et « Local » ne me dit rien avant de l'ouvrir. La 2e capture montre le contenu de la page qui transparaît sous le menu (bord gris en bas) : finition à revoir.

**03-en-about-1 → suite3** : compris : société indépendante, pas le gouvernement, pas de pub de voyage, sources citées. L'adresse « 49 rue du Ressort, 63000 Clermont-Ferrand, France » surprend pour un site sur les fériés australiens. Ça ne bloque pas, mais je me demande « c'est fiable ? ». Les liens vers les sources officielles rattrapent.

**04-en-act-…-1 / suite1 / suite2** : compris. « 15 public holidays… 8 long weekends, more than any state » : bonne accroche. Tableau clair. « Anzac Day — Observed on this day » : nouveau libellé, différent de NSW. « days a minister declares by notice each year are not included » : ça m'inquiète un peu (il manque peut-être un jour ?).

**04-…-suite3** : un énorme paragraphe qui répète le tableau, inutile pour moi.

**04-…-suite4 / suite5** : « Plan Canberra leave for 2027 » : je saisis 5 jours, et le résultat dit « Leave days used 4 » puis « 14 days », « 3.5 », « First break Sat 23 Jan – Tue 26 Jan 2027 ». **Bloque** : j'ai donné 5 jours, il en utilise 4, et toujours « days off in a row » pour un total réparti sur plusieurs pauses.

**04-…-suite6** : la liste des 8 long weekends est utile mais noyée dans une phrase ; ce serait mieux en liste. « The ACT Government holidays page refused automated reading » : là je décroche. Ça sonne comme « on a aspiré des sites et ça n'a pas marché », ce qui fait baisser la confiance. Puis « ACT school terms are not shown » : dommage.

**04-…-suite7 → suite9** : FAQ et liens « Keep planning » clairs.

**05-en-annual-leave-planner-2027-1 / suite1 / suite2** : l'outil est le meilleur de ce que j'ai vu. « Best use of 5 days of leave, NSW 2027 / 14 days off / Using 5 days of leave: 2.8 days off per leave day ». Le tableau « Where to take the leave » est **excellent** : Mon 25 Jan → 4 jours ; Mon 22 – Thu 25 Mar → 10 jours. MAIS le chapeau dit « 5 days of leave give 14 days off in a row », ce qui est faux d'après le tableau (2 pauses, « Breaks 2 »). Je me sens floué(e) par l'accroche.

**05-…-suite3 / suite4** : tableau par État 5/10/15 jours : lisible, mais presque tous à « 14 days off », donc peu informatif. « single-day bridges » : je comprends à peu près.

**05-…-suite5** : « Quick check for your state » avec Queensland / 3 jours → 10 jours, « Sat 25 Dec – Mon 3 Jan 2028 ». Bien, mais pourquoi Queensland ici alors que tout le reste est NSW ? Ça surprend.

**05-…-suite6** : « dynamic programming » : je ne lis pas, je n'en ai pas besoin.

**05-…-suite7 → suite9** : FAQ et liens clairs.

**06-en-anzac-day-2027-1 / suite1 / suite2** : **parfait pour ma question**. Le titre « Anzac Day 2027: Sunday 25 April, and the Monday » et « yes in 5 states and territories, no in 3 » répondent en une ligne. Le tableau par État est limpide. Seuls bémols : « (additional) » contre « (observed) » sans explication immédiate, et le bandeau « Example with typical figures » de nouveau hors sujet.

**06-…-suite3 / suite4** : « Check Anzac Day in your state » avec Victoria → « Sun 25 Apr ». Il ne me dit **pas clairement « Monday 26 April is NOT a holiday in Victoria »**, alors que c'est LA question d'un Victorien. Je dois le déduire.

**06-…-suite5 → suite8** : historique 2026/2028 et FAQ : bons (« Why does Victoria not give Monday 26 April 2027 off? » est exactement la bonne question).

**07-en-australia-day-2027-1 → suite2** : compris immédiatement : mardi 26 janvier partout. Petite contradiction : « there is no automatic long weekend » (en haut) puis « the first long weekend… Australia Day then gives a second break if you take the Monday » : c'est cohérent si on lit, mais ça peut troubler. « The tool shows the same date in all eight columns » : ce sont des lignes, pas des colonnes.

**07-…-suite3 / suite4** : « One leave day around Australia Day » → 4 jours, Sat 23 – Tue 26 Jan. Ici le « days off in a row » est vrai, et c'est très clair. Le meilleur widget du site.

**07-…-suite5 → suite7** : FAQ (« Is Monday 25 January 2027 a public holiday? ») pertinente.

**08-en-christmas-2027-1 / suite1 / suite2** : compris : sam. 25 + lundi 27 additionnel. Mais le tableau « Christmas Day 2027 in each state » ne montre que le lundi 27. Le mardi 28 (Boxing Day) n'apparaît pas dans ce tableau alors que le titre parle « des » jours additionnels. Et l'accueil disait « most states add Monday 27 and Tuesday 28 » / « almost every state », alors qu'ici c'est « all eight states and territories give Monday 27… and Tuesday 28 ». **Incohérence entre pages.**

**08-…-suite3** : « South Australia does the same for Proclamation Day » : je ne comprends pas ce que Proclamation Day vient faire ici.

**08-…-suite4** : widget Tasmanie : clair.

**08-…-suite5** : « the best use of three leave days in NSW gives 6 days off », alors que la page Annual leave planner donnait 10 jours pour 3 jours (Queensland, du 25 déc. au 3 janv.) et que la phrase juste au-dessus dit que 3 jours entre Noël et le Nouvel An relient Noël au week-end du Nouvel An (donc plus de 6 jours). **Contradiction flagrante.**

**08-…-suite6 → suite8** : FAQ et sources : OK.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Liste des fériés par État + année (accueil, pages État) | Oui, tout de suite | Oui | Très | 5/5 |
| Tableau « Shared public holidays » tous États | Oui | Oui | Oui (comparer) | 4/5 |
| Compte à rebours + « Is today a public holiday? » | Oui | Oui (mais porte sur 2026 dans une page 2027) | Moyen | 4/5 |
| Planificateur de congés (mini-widget) | Oui | Partiellement : « days off in a row » faux | Oui | 2/5 |
| Annual leave planner (page dédiée) | Oui (carte + menu) | Le tableau oui, le chiffre principal non | Très | 3/5 |
| Fiche par férié (Anzac, Australia Day, Christmas) | Oui | Oui | Très (Anzac surtout) | 4/5 |
| « Copy share link / Print » | Oui | Oui | Moyen | 4/5 |
| Accordéons « The 2027 calendar, topic by topic » | Difficilement | Pas vu que c'était cliquable | ? | 2/5 |
| FAQ « Common questions » | Oui | Oui | Oui | 5/5 |
| Menu ☰ | Oui | Oui (« Local » flou) | Oui | 4/5 |

## 5. Enchaînement et navigation

- Fil d'Ariane présent partout (« Home / One holiday across Australia / Anzac Day 2027 ») : rassurant.
- Les blocs « Keep planning » en bas de page relancent bien vers les pages voisines.
- Chaque page reprend le même gabarit (sélecteur, gros résultat, tableau, paragraphe replié, FAQ, sources) : on prend vite ses repères.
- Pages longues : l'accueil fait 19 écrans. Le gros tableau « Shared public holidays » (8 × 7 lignes) pousse les outils et les liens très bas.
- L'État présélectionné change sans raison : NSW partout, puis Victoria dans le 2e widget Anzac, Queensland dans le « Quick check », Tasmanie dans le 2e widget Noël. Je dois resélectionner mon État à chaque bloc ; le site ne retient pas mon choix.
- Le pied de page « About this site, legal notices and all pages » est replié : on ne voit pas ce qu'il contient.

## 6. Difficultés classées

1. **« 14 days off in a row » est faux** (accueil suite10, ACT suite5, planner 1).
   *Vécu :* je crois que 5 jours de congé me donnent deux semaines d'affilée, puis je vois « First break Sat 23 Jan – Tue 26 Jan » et « Breaks 2 ». Je perds confiance dans tous les chiffres.
   *Recommandation :* ne jamais écrire « in a row » quand le total est réparti. Remplacer par « **14 days off in total, across 2 breaks** » et afficher la plus longue pause à part : « Longest break: 10 days (Sat 20 – Mon 29 Mar) ». Chapeau du planner : « In NSW, 5 days of leave give 14 days off in 2027, split into two breaks: 4 days around Australia Day and 10 days at Easter. »

2. **Chiffres contradictoires sur 3 jours de congé** (Christmas suite5 contre planner suite5).
   *Vécu :* une page dit « three leave days in NSW gives 6 days off », une autre montre 10 jours pour 3 jours de congé, et la même page Noël suggère que 3 jours relient Noël au Nouvel An.
   *Recommandation :* recalculer et aligner. Texte : « Three days of leave on 29, 30 and 31 December give 9 days off in a row, from Saturday 25 December 2027 to Sunday 2 January 2028 » (à vérifier par le calcul de l'outil).

3. **Le bandeau « Example with typical figures — change any figure to see your own result » sur des dates officielles** (tous les blocs principaux).
   *Vécu :* je me demande si la liste NSW est un exemple ou la vraie liste.
   *Recommandation :* sur les listes et les fiches de férié, remplacer par « **Showing New South Wales — pick your state above** ». Garder « Example » seulement pour le calculateur de congés : « Example: 5 leave days in NSW — change the number to plan yours ».

4. **Incohérence « most states » / « almost every state » / « all eight states »** pour les 27 et 28 décembre (accueil-1 et suite9 contre christmas-1).
   *Recommandation :* une seule formulation partout. Si les 8 donnent les deux jours : accueil « …so every state adds Monday 27 and Tuesday 28 December. » Sinon, nommer l'exception (« every state except Tasmania, which… »).

5. **Le widget Anzac par État ne dit pas « non »** (anzac suite3/suite4, Victoria).
   *Recommandation :* ajouter une ligne explicite : « **Monday 26 April 2027: not a public holiday in Victoria** ». Pour NSW : « Monday 26 April 2027: public holiday (additional day) ».

6. **Vocabulaire additional / observed / moved** (ACT suite2, anzac suite1, accueil suite12).
   *Recommandation :* un seul couple de libellés, avec une info-bulle : « Extra day (weekend holiday kept + Monday added) » et « Moved to Monday (replaces the weekend day) ». Remplacer « Observed on this day » par « Moved to Monday ».

7. **Mots qui font peur ou qui sont techniques** (ACT suite6 : « refused automated reading » ; planner suite6 : « dynamic programming » ; sources : « republication R11 », « Schedule 2 » ; pied de page : « As of 2027 »).
   *Recommandation :* « The ACT Government page could not be checked directly, so each date here is worked out from the Holidays Act 1958. » ; « The planner tries every possible combination and keeps the best one. » ; « Holiday lists and school term dates for 2027, last checked on 13 November 2026. »

8. **Mise en forme cassée sur l'accueil** : le bloc « Most public holidays (2027) 15, VIC, ACT / Easter 2027… » s'affiche en texte brut empilé (suite4), et les triangles ▶ des accordéons sont séparés de leur titre (suite14/16).
   *Recommandation :* présenter le bloc en 4 tuiles chiffrées (libellé petit, valeur en gras) et mettre le ▶ sur la même ligne que son titre, avec la forme de carte des FAQ.

## 7. À garder

- Le titre de l'accueil, identique à la promesse Google, et le sélecteur État + année tout en haut.
- Le gros chiffre « 14 public holidays / 9 of them fall Monday to Friday ».
- Les tableaux avec le **jour de la semaine en toutes lettres** (« Monday 26 April 2027 »).
- « Is today a public holiday in NSW? No » et « School term 4 (NSW) ends Thu 17 Dec ».
- La page Anzac : « yes in 5 states and territories, no in 3 » et le tableau par État. Exactement ma question.
- Le tableau « Where to take the leave » (date à poser → pause obtenue → férié utilisé).
- Le widget « One leave day around Australia Day » (4 jours, Sat 23 – Tue 26 Jan), d'une clarté parfaite.
- Les FAQ bien choisies (« Why does Victoria not give Monday 26 April 2027 off? », « Is Monday 25 January 2027 a public holiday? »).
- Les sources officielles nommées et « We are not a government agency… your award or agreement does » (honnête).
- « Bank Holiday — Banks only » : ça m'évite une fausse joie.

## 8. Notes

Clarté : 7/10
Facilité : 8/10
Utilité : 8/10

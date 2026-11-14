# Test naïf du 2026-11-14, testeur 3 : aupublicholidays.com
**Persona :** Australien(ne) de 61 ans, se sert de son téléphone pour WhatsApp et la météo, lit lentement, se méfie des sites qui demandent des données, ne comprend pas les sigles. Il/elle a cliqué sur le résultat Google « Public holidays 2027 by state: dates and long weekends » parce qu'il/elle a cette question pour lui/elle-même ou un proche.

## 1. Concept

**Après 5 s :** « C'est la liste des jours fériés 2027 en Australie, par État. » Le titre « Public holidays 2027 in every Australian state and territory », le menu déroulant « New South Wales », les boutons « 2026 / 2027 / 2028 » et le gros « 14 public holidays » disent exactement ce que promettait Google. C'est rassurant : je suis au bon endroit.

**Après 2 min :** je comprends qu'en plus de la liste il y a un compte à rebours jusqu'à Noël, une réponse « Is today a public holiday in NSW? → No », un outil pour « faire durer » mes congés, des pages par fête (Anzac, Noël, Australia Day) et par État. C'est clair pour quelqu'un qui veut savoir quand il ne travaille pas, ou quand ses petits-enfants sont libres.

**Pour qui ?** Les salariés en semaine, les parents/grands-parents qui organisent un week-end en famille. **Bénéfice concret :** savoir en un coup d'œil quels jours sont fériés chez moi en 2027, notamment que Noël tombe un samedi et que le lundi 27 et le mardi 28 décembre sont donnés en plus.

**Clair ?** Oui pour l'essentiel (la liste). Moins clair pour l'outil de congés, dont les chiffres se contredisent (voir §6).

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : la liste des fériés, oui ; le reste, pas toujours.** Une personne de 61 ans trouve ses dates en moins d'une minute. Mais ça décroche à quatre endroits :
- **Les sigles** : « NSW, VIC, QLD, WA, SA, TAS, ACT, NT » s'enchaînent partout (tableaux de l'accueil, « Most public holidays (2027) 15, VIC, ACT »). Je reconnais NSW et QLD, mais « NT » ou « ACT » en liste nue me ralentissent ; « Kind », « Additional day », « Observed on this day », « Banks only » demandent réflexion.
- **Le cadre jaune** « Example with typical figures — change any figure to see your own result » au-dessus d'une liste de jours fériés : quels « chiffres » changer ? Une date fériée n'est pas un exemple. Ça me fait douter que les dates soient les vraies.
- **L'outil de congés** : « days off in a row » (d'affilée) affiche 14 jours, alors que le « First break » juste en dessous ne fait que 4 jours (Sat 23 Jan – Tue 26 Jan). Je ne comprends pas.
- **Le jargon technique** : « dynamic programming », « runs of working days », « refused automated reading », « republication R11 », « Schedule 2 ».

## 3. Parcours écran par écran

- **01-accueil-1** — Compris. Titre net, chapeau qui m'apprend que Noël 2027 tombe un samedi. Gros chiffre « 14 public holidays », « 9 of them fall Monday to Friday ». Coince : le cadre jaune « Example with typical figures » ; je ne vois pas quoi « changer ».
- **01-accueil-suite1 / suite2** — Compris : tableau Holiday / Date / Kind très lisible, avec le jour de la semaine en toutes lettres. Coince : « Anzac Day » apparaît deux fois (dimanche 25 + lundi 26), « Christmas Day » et « Boxing Day » aussi ; il faut comprendre « Additional day ». « Bank Holiday — Banks only » : est-ce que je suis de congé ? Pas sûr.
- **01-accueil-suite3** — Le compte à rebours « Time left until Christmas Day 39 days 22 hrs » : c'est Noël **2026**, alors que toute la page parle de 2027. Juste en dessous, « Today in NSW: Sunday 15 November 2026 » (nous sommes le 14 chez moi selon le contexte, ça dépend du fuseau, passe). « Next public holiday Fri 25 Dec (in 40 days) » : compris. « School term 4 (NSW) ends Thu 17 Dec » : utile pour les petits-enfants.
- **01-accueil-suite4** — Bloc de chiffres sans mise en forme : « Most public holidays (2027) / 15, VIC, ACT / Easter 2027 / Fri 26 Mar – Mon 29 Mar… » : ça se lit comme une liste en vrac, sans séparateurs. Paragraphe « Australia has no single list… » clair. Les cartes « Tools to plan your days off » sont claires.
- **01-accueil-suite5** — Cartes de liens claires. « How the dates are found and checked · Who runs this site » : rassurant.
- **01-accueil-suite6 à suite9** — Long tableau par fête × 8 États avec seulement des sigles. Lisible, mais très long à faire défiler sur téléphone (presque 4 écrans). Le paragraphe « Anzac Day is the one that splits the country… » est la phrase la plus utile de la page : je la trouve après 9 écrans.
- **01-accueil-suite10 / suite11** — « Make your annual leave go further », 5 leave days → « 14 days » « days off in a row ». Puis « First break Sat 23 Jan – Tue 26 Jan 2027 ». **Coince fortement** : 14 jours d'affilée, mais la première pause fait 4 jours ? La liste « Full-day public holidays 2027, state by state » est claire.
- **01-accueil-suite12** — « Additional day or moved day? » : explication claire et utile pour quelqu'un qui travaille le week-end. Mention des sources : rassurant.
- **01-accueil-suite13 / suite14** — Liste de liens par État avec une ligne de description : bien. « the Ekka », « Proclamation Day », « Eight Hours Day », « Picnic Day » : je ne connais pas tous les noms, mais ce sont des fêtes locales, la description suffit.
- **01-accueil-suite15 / suite16** — « The 2027 calendar, topic by topic » : des triangles ▶ isolés sur une ligne, le titre sur la ligne d'en dessous. Je ne comprends pas que c'est cliquable ; on dirait un bug d'affichage. « Common questions » : bien, avec « Tap a question to see the answer ».
- **01-accueil-suite17 / suite18** — Sources officielles : rassurant. « Prepared by Radif Partners » : je ne connais pas. « As of 2027, holiday lists and term dates checked on 13 November 2026 » : phrase bizarre (« as of 2027 » alors qu'on est en 2026).
- **02-menu-1 / suite1** — Menu clair : « By state », « Holidays », « Plan », « Local ». Les noms des États sont en sigles (« NSW public holidays 2027 ») mais le premier lien « Public holidays 2027 » est rassurant. Pas de croix visible pour fermer, l'icône ☰ reste la même.
- **03-en-about-1 à suite3** — Compris : « We are not a government agency… your award or agreement does. » Rassurant sur l'indépendance et sur les données : « Nothing you enter is sent or stored, and there is no account. » Mais l'adresse « 49 rue du Ressort, 63000 Clermont-Ferrand, France » m'étonne : une société française qui me donne les fériés australiens ? Ça peut inquiéter une personne méfiante.
- **04-en-act-public-holidays-2027-1 à suite2** — Page Canberra claire : « 15 public holidays in 2027 and 8 long weekends ». Tableau lisible. « Anzac Day — Observed on this day » : je comprends à peu près que le dimanche est remplacé par le lundi.
- **04-…-suite3** — Paragraphe-fleuve de dates à la suite (« Applying the ACT Holidays Act 1958 to 2027 gives… ») : redite du tableau, pénible à lire.
- **04-…-suite5** — Mini-outil congés pour l'ACT : je saisis 5 jours, il affiche « Leave days used 4 », « 14 days », « Days off per leave day 3.5 », « First break Sat 23 Jan – Tue 26 Jan 2027 ». **Coince** : j'ai donné 5 jours, il en utilise 4 ; 4 jours de congé × 3,5 = 14, mais la page « Annual leave planner » dit plus loin ACT « 5 leave days → 14 days off ». Je ne sais pas qui croire.
- **04-…-suite6** — « The ACT Government holidays page refused automated reading, so each date here comes from the Holidays Act 1958 » : ça m'inquiète. Je comprends « on n'a pas pu lire la page du gouvernement, alors on a calculé nous-mêmes ». « ACT school terms are not shown, as the education directorate page refused reading too. » : je perds confiance pour Canberra.
- **04-…-suite7 à suite9** — Questions fréquentes et liens « Keep planning » : clairs.
- **05-en-annual-leave-planner-2027-1** — Chapeau : « in NSW, 5 days of leave give 14 days off in a row. » Gros chiffre « 14 days off ».
- **05-…-suite1 / suite2** — Le tableau « Where to take the leave » révèle la vérité : **2 pauses**, une de 4 jours (Australia Day, 1 jour de congé) et une de 10 jours (Pâques, 4 jours de congé). 4 + 10 = 14 : ce n'est **pas** « in a row ». Le chapeau m'a trompé. Sinon le tableau « Take leave / Leave days / Days off in a row / Holidays used » est la chose la plus utile de cette page : je sais quels jours poser.
- **05-…-suite3 / suite4** — Tableau 5/10/15 jours de congé par État : clair et utile.
- **05-…-suite4 / suite5** — « Quick check for your state » pour Queensland, 3 jours → « 10 days », « Sat 25 Dec – Mon 3 Jan 2028 ». Là, c'est bien une seule pause : compris et séduisant.
- **05-…-suite6** — « How the plan is built » : « dynamic programming », « runs of working days » : je décroche, inutile pour moi.
- **05-…-suite7 à suite9** — FAQ et sources : correct.
- **06-en-anzac-day-2027-1 à suite2** — Excellent : la question que je me pose (« lundi 26 avril férié ou pas ? ») a sa réponse dès le chapeau : « yes in 5 states and territories, no in 3 ». Le tableau par État le confirme. Petit doute : « (additional) » pour NSW/WA et « (observed) » pour QLD/ACT/NT : pourquoi deux mots différents pour moi qui ai le lundi de toute façon ?
- **06-…-suite3 / suite4** — Mini-outil « Check Anzac Day in your state » sur Victoria : affiche « Sun 25 Apr » mais ne dit pas clairement « No Monday off in Victoria ». Le Victorien doit le déduire.
- **06-…-suite5** — « Anzac Day in 2026 and 2028 » : utile. FAQ « Why does Victoria not give Monday 26 April 2027 off? » : très bien vu.
- **07-en-australia-day-2027-1 à suite2** — Clair : mardi 26 janvier partout, pas de pont automatique. « The tool shows the same date in all eight columns » : sur mon téléphone ce sont des lignes, pas des colonnes.
- **07-…-suite3 / suite4** — « One leave day around Australia Day » → « 4 days », « Sat 23 Jan – Tue 26 Jan 2027 ». Compris, mais l'outil ne dit pas **quel jour poser** (le lundi 25) ; il faut lire le paragraphe en dessous (« if you take the Monday »).
- **07-…-suite5 à suite7** — FAQ (« Is Monday 25 January 2027 a public holiday? ») : bonne question. Le reste est répété.
- **08-en-christmas-2027-1 / suite1 / suite2** — Chapeau : « all eight states and territories give Monday 27 December 2027 and Tuesday 28 December 2027 as additional days ». Mais l'accueil disait « **most** states add Monday 27 and Tuesday 28 », et le tableau de l'accueil montre la Tasmanie avec seulement « Tue 28 Dec » pour Boxing Day. « All eight » ou « most » ?
- **08-…-suite3 / suite4** — « South Australia does the same for Proclamation Day » : je ne comprends pas ce que vient faire Proclamation Day ici. « Tasmania adds the Monday and moves Boxing Day to the Tuesday » : nuance subtile. Mini-outil sur Tasmanie : clair (« Additional day Monday 27 December 2027 »).
- **08-…-suite5** — Soirées de Christmas Eve / New Year's Eve : intéressant et honnête (« they are not days off »). Puis contradiction : « Three days of leave there join Christmas to the New Year weekend » (soit environ 9-10 jours), et la phrase suivante : « the best use of three leave days in NSW gives **6 days off** ». Or l'outil Queensland juste avant donnait 10 jours pour 3 jours de congé à la même période. Je ne comprends plus.
- **08-…-suite6 à suite8** — FAQ et sources : correct.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Liste des fériés par État et année (accueil, pages État) | Oui, immédiatement | Oui (sauf « Kind », « Banks only ») | Très | 5/5 |
| Choix de l'État / de l'année | Oui | Oui | Oui | 5/5 |
| Compte à rebours « Time left until Christmas Day » | Oui | Oui, mais c'est Noël 2026 sur une page 2027 | Moyen | 3/5 |
| « Is today a public holiday in NSW? » + prochains fériés | Oui | Oui | Oui | 4/5 |
| Tableau fête × 8 États (accueil) | Oui | Oui, mais sigles seuls et très long | Oui | 3/5 |
| Outil « Make your annual leave go further » / planificateur | Oui | **Non** : « in a row » faux, jours utilisés ≠ jours saisis | Oui une fois compris le tableau | 2/5 |
| Tableau « Where to take the leave » | Oui (page planner) | Oui | Très | 4/5 |
| Pages par fête (Anzac, Australia Day, Noël) | Oui (menu, liens) | Oui | Très (Anzac surtout) | 4/5 |
| Mini-outils « Check … in your state » | Oui | Oui, mais ne disent pas « pas de lundi » / « quel jour poser » | Moyen | 3/5 |
| Sections repliées « The 2027 calendar, topic by topic » (▶) | Vu | Non, ressemble à un bug | ? | 1/5 |
| Questions fréquentes | Oui | Oui (« Tap a question ») | Oui | 4/5 |
| « Copy share link », « Print » | Oui | Oui | Oui (pour envoyer à la famille) | 4/5 |
| Sources officielles, page About | Oui | Oui | Rassurant | 4/5 |

## 5. Enchaînement et navigation

- Le fil d'Ariane (« Home / One holiday across Australia / Anzac Day 2027 ») et le menu ☰ sont simples. Le menu « By state » ouvert par défaut est un bon choix.
- Chaque page suit le même schéma (titre → outil → tableau → texte → FAQ → « Keep planning » → sources) : on s'y retrouve vite.
- L'accueil est **trop long** sur téléphone (19 écrans) ; la phrase-clé sur Anzac et Noël arrive au 9ᵉ écran, les liens par État au 13ᵉ.
- Beaucoup de répétitions : même outil de congés sur l'accueil, la page ACT, Australia Day et le planificateur, avec chaque fois un réglage par défaut différent (5 jours NSW, 5 jours ACT, 1 jour NSW, 3 jours QLD) et des résultats que je ne sais pas relier.
- Le pied de page « About this site, legal notices and all pages » replié : on le trouve, mais rien n'indique qu'il faut le toucher à part la flèche.

## 6. Difficultés classées

1. **« Days off in a row » faux dans le planificateur** — écrans 01-accueil-suite10/11, 05-…-1/suite1, 04-…-suite5. Vécu : on m'annonce « 5 days of leave give 14 days off in a row », puis « First break Sat 23 Jan – Tue 26 Jan » (4 jours) ; le tableau montre en fait deux pauses (4 + 10). Je me sens trompée. Recommandation : afficher le total comme un total, et la plus longue pause comme telle. Texte : « **14 days off in total, in 2 breaks** (longest: 10 days, Sat 20 Mar – Mon 29 Mar) » et chapeau : « in NSW, 5 days of leave give 14 days off across two breaks: Australia Day and Easter. »
2. **Chiffres contradictoires d'un écran à l'autre** — 04-…-suite5 (ACT, 5 saisis → « Leave days used 4 », 3.5/jour) contre 05-…-suite4 (ACT 5 → 14) ; 08-…-suite5 (« three leave days in NSW gives 6 days off ») contre la phrase juste avant et 05-…-suite5 (QLD 3 jours → 10 jours à Noël). Recommandation : vérifier et aligner ; si l'outil choisit d'utiliser moins de jours, le dire : « Only 4 of your 5 days are needed for this result. »
3. **Cadre jaune « Example with typical figures — change any figure to see your own result » sur des dates fériées** — 01-accueil-1, 04-…-1, 06-…-suite1, 07-…-suite1, 08-…-suite1. Vécu : je crois que les dates sont des exemples, pas les vraies. Recommandation : le retirer des listes de fériés ; si besoin : « Showing New South Wales, 2027 — pick your state or year above. »
4. **Sigles d'État partout** — accueil suite4 à suite9, menu. Vécu : « NT », « ACT », « SA » ralentissent la lecture. Recommandation : nom complet au moins dans les tableaux (« Northern Territory ») ou une ligne d'aide : « NSW = New South Wales, VIC = Victoria, … ».
5. **Noël : « all eight » contre « most »** — 08-…-1 contre 01-accueil-1 et suite9 (Tasmanie : Boxing Day « Tue 28 Dec » seul). Recommandation : même formulation partout : « Every state gives Monday 27 and Tuesday 28 December off; in Tasmania, Boxing Day itself moves to the Tuesday. »
6. **Triangles ▶ orphelins « The 2027 calendar, topic by topic »** — 01-accueil-suite15/16. Vécu : on dirait un bug, je ne touche pas. Recommandation : mettre le triangle sur la même ligne que le titre, dans une boîte cliquable avec une flèche ⌄ comme les FAQ, et ajouter « Tap a topic to read more. »
7. **Phrases qui inquiètent ou que je ne comprends pas** — 04-…-suite6 « refused automated reading » ; 05-…-suite6 « dynamic programming » ; 01-accueil-suite18 « As of 2027, … checked on 13 November 2026 ». Remplacements : « The ACT Government page could not be checked directly, so these dates follow the Holidays Act 1958. » ; « The planner tries every possible way to place your leave and keeps the one that gives the most days off. » ; « Dates for 2027 last checked on 13 November 2026. »
8. **Compte à rebours de Noël 2026 sur une page 2027 et mini-outils incomplets** — 01-accueil-suite3 ; 06-…-suite3 ; 07-…-suite3. Recommandation : écrire « Time left until Christmas Day **2026** » ; dans l'outil Anzac pour Victoria ajouter « No extra Monday in Victoria » ; dans l'outil Australia Day ajouter « Take leave on: Monday 25 January 2027 ».

## 7. À garder

- Le titre et la première carte : exactement la réponse promise par Google, en grand, avec État et année au choix.
- Les dates écrites en entier avec le jour de la semaine (« Saturday 25 December 2027 »).
- « Is today a public holiday in NSW? — No » : simple et parfait pour une personne âgée.
- La page Anzac Day : la réponse « yes in 5 states and territories, no in 3 » dès le chapeau, et la FAQ « Why does Victoria not give Monday 26 April 2027 off? ».
- Le tableau « Where to take the leave » (quel jour poser, combien de jours libres, quelles fêtes) : le vrai service rendu.
- « Additional day or moved day? » expliqué en mots simples.
- Les sources officielles nommées, « We are not a government agency… », « Nothing you enter is sent or stored, and there is no account » : rassurant pour quelqu'un de méfiant.
- « Copy share link » et « Print » pour transmettre à la famille.

## 8. Notes

Clarté : 6/10
Facilité : 7/10
Utilité : 8/10

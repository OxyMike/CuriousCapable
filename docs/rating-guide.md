# The Short List: Rating Guide

How every pick on `src/picks.html` gets its stars. Picks and ratings are edited in `src/picks-data.js`. Use this for every new pick so ratings stay consistent year to year. If you change the rules here, update the "How we rate" section on the page to match.

## The two scales

### Easy to learn (every pick)

The question: how long from opening the box until someone can do the main job on their own?

Setup counts. A pick that needs a family member or helper to get it going (Wi-Fi, accounts, programming, settings) loses at least half a star, and the card text says who should set it up.

| Stars | Meaning |
|---|---|
| 5 | The first day, no lesson needed |
| 4 | After one short lesson (under 30 minutes) |
| 3 | After a few lessons, about a week of use |
| 2 | After several weeks of regular practice |
| 1 | Needs ongoing help |

### Can do (do-it-all devices only)

The question: how many of these ten everyday jobs can it handle?

1. Phone calls
2. Text messages
3. Video calls
4. Photos (take, view, share)
5. Email
6. Web browsing
7. Shopping and banking
8. Health apps and patient portals
9. Entertainment (music, TV, games, books)
10. Reminders and calendar

A job it only partly does counts as half.

| Stars | Jobs |
|---|---|
| 5 | 9 to 10 |
| 4 | 7 to 8 |
| 3 | 5 to 6 |
| 2 | 3 to 4 |
| 1 | 1 to 2 |

Half stars are allowed when a count lands between two levels.

Single-purpose items (remotes, clocks, night lights, photo frames, headsets) get only "Easy to learn." A device that does one job well should never lose stars for it.

## Current ratings

Ratings live in `src/picks-data.js` (the `learn` and `can` numbers on each pick). That file is the only copy, so the page and the ratings can never disagree.

## Rules for a new pick

1. It must pass "Easy to use the day it arrives," or the card must say plainly who should set it up, and its "Easy to learn" stars reflect that setup.
2. Any required subscription or plan goes on the card, with the starting price.
3. Commissions never decide whether something makes the list.
4. For a category card with several options (night lights, day clocks, TV headsets), list at most three. Label each with a checkable fact from the listing ("Battery powered," "10-inch screen"), never a judgment ("Softest glow") until it has been tested hands-on. Untested options carry the note "Chosen from buyer reviews. Our own hands-on test is coming."
5. Re-check every pick each quarter: still sold, links still work, ratings still fair, update the "Updated" date.

## Launch checklist

1. Add the Skylight Calendar link in `src/picks-data.js` (the only `link: "#"` left).
2. Swap in Amazon Associates links, then set `affiliateLinks: true` at the top of `src/picks-data.js`. That turns on both commission disclosures.
3. Click every button on the page once.
4. Add "Tech Picks" to the menu in `src/chrome.js`, between Shop and Blog, linking to `picks.html`. Add the same link to the footer's Explore list.
5. Merge the `short-list` branch into `main` and push. Pushing `main` publishes the site.

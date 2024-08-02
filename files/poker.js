"use strict";

// Useful scoring arrays
const { rankedCards, rankedHands } = require("./rankings");

/////////////////////////////////////////
// Figure out what we are working with //
/////////////////////////////////////////
function parseHands(rawInput) {
  const parseHand = (rawHandInput) =>
    // NOTE: we are going to assume that the raw hand comes in as "#S #S #S #S #S"
    rawHandInput
      .split(" ")
      // separate the suit and value into distinct entities
      .map((card) => ({
        suit: card[card.length - 1],
        value: card.substring(0, card.length - 1),
      }))
      // sort the cards in ascending value order (for later hand ranking)
      .sort((a, b) => {
        const firstIndex = rankedCards.findIndex(
          (card) => card.value === a.value
        );
        const secondIndex = rankedCards.findIndex(
          (card) => card.value === b.value
        );
        return firstIndex - secondIndex;
      });

  const scoreHand = (cards) => {
    const getUniqueCardValues = (hand) =>
      hand
        // figure out the suits involved
        .map((card) => card.value)
        // ...and get a distinct list...
        .filter((card, idx, arr) => arr.indexOf(card) === idx);
    const handsInOrderOfImportance = rankedHands.slice().reverse();
    let score = 0;

    for (let idx = 0; idx < handsInOrderOfImportance.length; idx++) {
      // number of unique cards will matter for a few different hands, so let's just figure it out once
      const uniqueCardValues = getUniqueCardValues(cards);
      // because we look at the best hand first, any match is good enough for us
      if (
        handsInOrderOfImportance[idx].handScoringFunc(
          cards,
          uniqueCardValues,
          rankedCards
        )
      ) {
        // we need to adjust the index to return because we reversed the order (checking for best hand first)
        score = handsInOrderOfImportance.length - idx - 1;
        break;
      }
    }

    return score;
  };

  // NOTE: we are going to assume that the raw hands come in as ["#S #S #S #S #S", "#S #S #S #S #S"]
  const blackHand = parseHand(
    rawInput[0]
  );
  const whiteHand = parseHand(
    rawInput[1]
  );

  return {
    black: { cards: blackHand, name: "Black", score: scoreHand(blackHand) },
    white: { cards: whiteHand, name: "White", score: scoreHand(whiteHand) },
  };
}

////////////////////////////////
// Time to do the actual work //
////////////////////////////////

// TODO: This is all predicated on only two players - how bad does it get with more?
function playTheHands(rawInput) {
  // turn the rigid-but-string-based input into an object that we can reason about
  const hands = parseHands(rawInput);

  // If they hands are of the same type, then we need a tie-break
  if (hands.black.score === hands.white.score) {
    return rankedHands[hands.black.score].tieBreakerFunc(hands, rankedCards);
  }
  // we already have a clear winner
  else {
    const winningHand =
      hands.black.score > hands.white.score ? hands.black : hands.white;

    // somebody has a hand!
    return `${winningHand.name} wins - ${rankedHands[winningHand.score].name}`;
  }
}

module.exports = playTheHands;

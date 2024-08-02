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
        suit: card[1],
        value: card[0],
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

  const rateHand = (cards, id) => {
    const getUniqueCardValues = (hand) =>
      hand
        // figure out the suits involved
        .map((card) => card.value)
        // ...and get a distinct list...
        .filter((card, idx, arr) => arr.indexOf(card) === idx);
    let rating = 0,
      score = rankedHands[rankedHands.length - 1].baseScore;

    for (let idx = 0; idx < rankedHands.length; idx++) {
      // number of unique cards will matter for a few different hands, so let's just figure it out once
      const uniqueCardValues = getUniqueCardValues(cards);
      // because we look at the best hand first, any match is good enough for us
      if (
        rankedHands[idx].handScoringFunc(cards, uniqueCardValues, rankedCards)
      ) {
        // this is the best hand we have, so we can stop looking
        rating = idx;
        score = rankedHands[idx].baseScore; // TODO: score is just the base so far - ultimately it will tell us more about the hand in the future
        break;
      }
    }

    return { cards, id, rating, score };
  };

  // NOTE: we are going to assume that the raw hands come in as ["#S #S #S #S #S", "#S #S #S #S #S"]
  return {
    black: rateHand(parseHand(rawInput[0]), 1),
    white: rateHand(parseHand(rawInput[1]), 2),
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
    return rankedHands[hands.black.rating].tieBreakerFunc(hands, rankedCards);
  }
  // we already have a clear winner (lower index === better hand)
  else {
    const winningHand =
      hands.black.score > hands.white.score ? hands.black : hands.white;

    // somebody has a hand!
    return `Hand #${winningHand.id} wins - ${
      rankedHands[winningHand.rating].name
    }`;
  }
}

module.exports = playTheHands;

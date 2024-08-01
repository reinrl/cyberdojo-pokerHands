"use strict";

// Useful scoring arrays
const { rankedCards, rankedHands } = require("./rankings");

/////////////////////////////////////////
// Figure out what we are working with //
/////////////////////////////////////////
function parseHands(rawInput) {
  function nthIndex(str, pat, n) {
    let i = -1;
    while (n-- && i++ < str.length) {
      i = str.indexOf(pat, i);
      if (i < 0) break;
    }
    return i;
  }

  const parseHand = (rawHandInput) =>
    // NOTE: we are going to assume that the raw hand comes in as "color: #S #S #S #S #S"
    rawHandInput
      .split(" ")
      // get rid of the hand color at the start of the string
      .slice(1)
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

  // NOTE: we are going to assume that the raw hands come in as "black: #S #S #S #S #S white: #S #S #S #S #S"
  const blackHand = parseHand(
    rawInput.substring(0, nthIndex(rawInput, " ", 6))
  );
  const whiteHand = parseHand(
    rawInput.substring(nthIndex(rawInput, " ", 6) + 1)
  );

  return {
    black: { cards: blackHand, name: "Black", score: scoreHand(blackHand) },
    white: { cards: whiteHand, name: "White", score: scoreHand(whiteHand) },
  };
}

/////////////////////////////////////////
// Figure out what we are working with //
/////////////////////////////////////////
function getWinnerByHighestCard(hands) {
  const getHighestCard = (hand) => {
    let highestCardValue = -1;

    hand.forEach((card) => {
      let currentCardRank = rankedCards.findIndex(
        (rankedCard) => rankedCard.value === card.value
      );
      highestCardValue =
        currentCardRank > highestCardValue ? currentCardRank : highestCardValue;
    });

    return highestCardValue;
  };

  let numCardsLeftToCompare = 5;
  let highestBlackCard = hands.black.cards[4].value;
  let highestWhiteCard = hands.white.cards[4].value;
  do {
    highestBlackCard = getHighestCard(
      hands.black.cards.slice(0, numCardsLeftToCompare)
    );
    highestWhiteCard = getHighestCard(
      hands.white.cards.slice(0, numCardsLeftToCompare)
    );
    if (highestBlackCard === highestWhiteCard) {
      // we have a tie, keep going
      numCardsLeftToCompare--;
    } else {
      // we have a clear winner, no need to continue
      numCardsLeftToCompare = 0;
    }
  } while (numCardsLeftToCompare > 0);

  if (highestBlackCard === highestWhiteCard) {
    return "Tie";
  } else {
    return highestBlackCard > highestWhiteCard
      ? `Black wins - high card: ${rankedCards[highestBlackCard].name}`
      : `White wins - high card: ${rankedCards[highestWhiteCard].name}`;
  }
}

////////////////////////////////
// Time to do the actual work //
////////////////////////////////

function playTheHands(rawInput) {
  // turn the rigid-but-string-based input into an object that we can reason about
  const hands = parseHands(rawInput);

  // figure out which hand won
  // TODO: tying hands would still give us fits...
  const winningHand =
    hands.black.score > hands.white.score ? hands.black : hands.white;

  // somebody has a hand!
  if (winningHand.score > 0) {
    return `${winningHand.name} wins - ${rankedHands[winningHand.score].name}`;
  } else {
    // if nothing else has tripped the win yet, we should find the winner via highest card:
    return getWinnerByHighestCard(hands);
  }
}

module.exports = playTheHands;

"use strict";

/////////////////////////////////
// "private" utility functions //
/////////////////////////////////
const getHighestCard = (hands, rankedCards) => {
  return {
    highestBlackCard: rankedCards.findIndex(
      (rankedCard) =>
        rankedCard.value ===
        hands.black.cards[hands.black.cards.length - 1].value
    ),
    highestWhiteCard: rankedCards.findIndex(
      (rankedCard) =>
        rankedCard.value ===
        hands.white.cards[hands.white.cards.length - 1].value
    ),
  };
};

const getNoteworthyCard = (hands, rankedCards) => {
  const blackHandCard = hands.black.cards.filter((card, idx, a) =>
    a.some(
      (innerCard, innerIdx) =>
        card.value === innerCard.value && idx !== innerIdx
    )
  );
  const whiteHandCard = hands.white.cards.filter((card, idx, a) =>
    a.some(
      (innerCard, innerIdx) =>
        card.value === innerCard.value && idx !== innerIdx
    )
  );

  return {
    rankedBlackCard: rankedCards.findIndex(
      (rankedCard) => rankedCard.value === blackHandCard[0].value
    ),
    rankedWhiteCard: rankedCards.findIndex(
      (rankedCard) => rankedCard.value === whiteHandCard[0].value
    ),
  };
};

const removeDuplicateCards = (cards) => {
  const counts = {};

  cards.forEach((card) => {
    counts[card.value] = (counts[card.value] || 0) + 1;
  });

  return cards.filter(function (item) {
    return counts[item.value] <= 1;
  });
};

//////////////////////////////////////
// "exported" tie breaker functions //
//////////////////////////////////////

// Hands which do not fit any higher category are ranked by the value of their highest card. If the highest cards have the same value, the hands are ranked by the next highest, and so on.
const breakAHighCardTie = (hands, rankedCards) => {
  let cardIdx = 4,
    highestBlackCard,
    highestWhiteCard;
  do {
    ({ highestBlackCard, highestWhiteCard } = getHighestCard(
      {
        black: { cards: hands.black.cards.slice(0, cardIdx + 1) },
        white: { cards: hands.white.cards.slice(0, cardIdx + 1) },
      },
      rankedCards
    ));
    if (highestBlackCard === highestWhiteCard) {
      // we have a tie, keep going
      cardIdx--;
    } else {
      // we have a clear winner, no need to continue
      cardIdx = 0;
    }
  } while (cardIdx > 0);

  if (highestBlackCard === highestWhiteCard) {
    return "Tie";
  } else {
    return highestBlackCard > highestWhiteCard
      ? `Hand #1 wins - high card: ${rankedCards[highestBlackCard].name}`
      : `Hand #2 wins - high card: ${rankedCards[highestWhiteCard].name}`;
  }
};

// If the pairs are the same, the hands are ranked by the values of the cards not forming the pair, in decreasing order.
const breakAPairTie = (hands, rankedCards) => {
  const blackHandWithoutPair = removeDuplicateCards(hands.black.cards);
  const whiteHandWithoutPair = removeDuplicateCards(hands.white.cards);

  let cardIdx = 2,
    highestBlackCard,
    highestWhiteCard;
  do {
    ({ highestBlackCard, highestWhiteCard } = getHighestCard(
      {
        black: { cards: blackHandWithoutPair },
        white: { cards: whiteHandWithoutPair },
      },
      rankedCards
    ));
    if (highestBlackCard === highestWhiteCard) {
      // we have a tie, keep going
      cardIdx--;
    } else {
      // we have a clear winner, no need to continue
      cardIdx = 0;
    }
  } while (cardIdx > 0);

  if (highestBlackCard === highestWhiteCard) {
    return "Tie";
  } else {
    return highestBlackCard > highestWhiteCard
      ? `Hand #1 wins - pair with high card: ${rankedCards[highestBlackCard].name}`
      : `Hand #2 wins - pair with high card: ${rankedCards[highestWhiteCard].name}`;
  }
};

// Hands with the same highest pair are ranked by the value of their other pair. If these values are the same the hands are ranked by the value of the remaining card.
const breakTwoPairsTie = (hands, rankedCards) =>
  // TODO: tying hands here still haven't been implemented yet...
  {};

// Hands which both contain three of a kind are ranked by the value of the 3 cards.
const breakAThreeOfAKindTie = (hands, rankedCards) => {
  const { rankedBlackCard, rankedWhiteCard } = getNoteworthyCard(
    hands,
    rankedCards
  );

  return rankedBlackCard > rankedWhiteCard
    ? `Hand #1 wins - three of a kind with high card: ${rankedCards[rankedBlackCard].name}`
    : `Hand #2 wins - three of a kind with high card: ${rankedCards[rankedWhiteCard].name}`;
};

// Hands which both contain a straight are ranked by their highest card.
const breakStraightTie = (hands, rankedCards) => {
  const { highestBlackCard, highestWhiteCard } = getHighestCard(
    hands,
    rankedCards
  );

  if (highestBlackCard === highestWhiteCard) {
    return "Tie";
  } else {
    return highestBlackCard > highestWhiteCard
      ? `Hand #1 wins - straight with high card: ${rankedCards[highestBlackCard].name}`
      : `Hand #2 wins - straight with high card: ${rankedCards[highestWhiteCard].name}`;
  }
};

// Hands which are both flushes are ranked using the rules for High Card.
const breakFlushTie = (hands, rankedCards) => {
  const { highestBlackCard, highestWhiteCard } = getHighestCard(
    hands,
    rankedCards
  );

  if (highestBlackCard === highestWhiteCard) {
    return "Tie";
  } else {
    return highestBlackCard > highestWhiteCard
      ? `Hand #1 wins - flush with high card: ${rankedCards[highestBlackCard].name}`
      : `Hand #2 wins - flush with high card: ${rankedCards[highestWhiteCard].name}`;
  }
};

// Ranked by the value of the 3 cards.
const breakFullHouseTie = (hands, rankedCards) =>
  // TODO: tying hands here still haven't been implemented yet...
  {};

// Hands which both contain four of a kind are ranked by the value of the 4 cards.
const breakAFourOfAKindTie = (hands, rankedCards) => {
  const { rankedBlackCard, rankedWhiteCard } = getNoteworthyCard(
    hands,
    rankedCards
  );

  return rankedBlackCard > rankedWhiteCard
    ? `Hand #1 wins - four of a kind with high card: ${rankedCards[rankedBlackCard].name}`
    : `Hand #2 wins - four of a kind with high card: ${rankedCards[rankedWhiteCard].name}`;
};

// Ranked by the highest card in the hand.
const breakStraightFlushTie = (hands, rankedCards) => {
  const { highestBlackCard, highestWhiteCard } = getHighestCard(
    hands,
    rankedCards
  );

  if (highestBlackCard === highestWhiteCard) {
    return "Tie";
  } else {
    return highestBlackCard > highestWhiteCard
      ? `Hand #1 wins - straight flush with high card: ${rankedCards[highestBlackCard].name}`
      : `Hand #2 wins - straight flush with high card: ${rankedCards[highestWhiteCard].name}`;
  }
};

module.exports = {
  breakAHighCardTie,
  breakAPairTie,
  breakTwoPairsTie,
  breakAThreeOfAKindTie,
  breakStraightTie,
  breakFlushTie,
  breakFullHouseTie,
  breakAFourOfAKindTie,
  breakStraightFlushTie,
};

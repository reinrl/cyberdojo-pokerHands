// functions to check for various poker hands
const {
  isPair,
  isTwoPairs,
  isThreeOfAKind,
  isStraight,
  isFlush,
  isFullHouse,
  isFourOfAKind,
  isStraightFlush,
} = require("./handCheckers");

// functions to break ties
const {
  breakAHighCardTie,
  breakAPairTie,
  breakTwoPairsTie,
  breakAThreeOfAKindTie,
  breakStraightTie,
  breakFlushTie,
  breakFullHouseTie,
  breakAFourOfAKindTie,
  breakStraightFlushTie,
} = require("./tieBreakers");

///////////////////////////
// Useful scoring arrays //
///////////////////////////

// rank the cards to give them a relative value
const rankedCards = [
  { value: "2", name: "2" },
  { value: "3", name: "3" },
  { value: "4", name: "4" },
  { value: "5", name: "5" },
  { value: "6", name: "6" },
  { value: "7", name: "7" },
  { value: "8", name: "8" },
  { value: "9", name: "9" },
  { value: "T", name: "10" },
  { value: "J", name: "Jack" },
  { value: "Q", name: "Queen" },
  { value: "K", name: "King" },
  { value: "A", name: "Ace" },
];

// rank the hands to give them a relative value
const rankedHands = [
  {
    name: "straight flush",
    value: "straightFlush",
    handScoringFunc: isStraightFlush,
    tieBreakerFunc: breakStraightFlushTie,
  },
  {
    name: "four of a kind",
    value: "fourOfAKind",
    handScoringFunc: isFourOfAKind,
    tieBreakerFunc: breakAFourOfAKindTie,
  },
  {
    name: "full house",
    value: "fullHouse",
    handScoringFunc: isFullHouse,
    tieBreakerFunc: breakFullHouseTie,
  },
  {
    name: "flush",
    value: "flush",
    handScoringFunc: isFlush,
    tieBreakerFunc: breakFlushTie,
  },
  {
    name: "straight",
    value: "straight",
    handScoringFunc: isStraight,
    tieBreakerFunc: breakStraightTie,
  },
  {
    name: "three of a kind",
    value: "threeOfAKind",
    handScoringFunc: isThreeOfAKind,
    tieBreakerFunc: breakAThreeOfAKindTie,
  },
  {
    name: "two pairs",
    value: "twoPairs",
    handScoringFunc: isTwoPairs,
    tieBreakerFunc: breakTwoPairsTie,
  },
  {
    name: "pair",
    value: "pair",
    handScoringFunc: isPair,
    tieBreakerFunc: breakAPairTie,
  },
  {
    name: "high card",
    value: "highCard",
    handScoringFunc: () => true,
    tieBreakerFunc: breakAHighCardTie,
  },
];

module.exports = {
  rankedCards,
  rankedHands,
};

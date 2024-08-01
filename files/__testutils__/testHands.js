const highCardHand = [
  { value: "2", suit: "D" },
  { value: "3", suit: "H" },
  { value: "7", suit: "S" },
  { value: "8", suit: "C" },
  { value: "9", suit: "D" },
];
const pairHand = [
  { value: "2", suit: "D" },
  { value: "2", suit: "H" },
  { value: "7", suit: "S" },
  { value: "8", suit: "C" },
  { value: "9", suit: "D" },
];
const twoPairsHand = [
  { value: "2", suit: "D" },
  { value: "2", suit: "H" },
  { value: "7", suit: "S" },
  { value: "7", suit: "C" },
  { value: "9", suit: "D" },
];
const threeOfAKindHand = [
  { value: "2", suit: "D" },
  { value: "2", suit: "H" },
  { value: "2", suit: "S" },
  { value: "7", suit: "C" },
  { value: "9", suit: "D" },
];
const straightHand = [
  { value: "2", suit: "D" },
  { value: "3", suit: "H" },
  { value: "4", suit: "S" },
  { value: "5", suit: "C" },
  { value: "6", suit: "D" },
];
const flushHand = [
  { value: "2", suit: "D" },
  { value: "3", suit: "D" },
  { value: "7", suit: "D" },
  { value: "8", suit: "D" },
  { value: "9", suit: "D" },
];
const fullHouseHand = [
  { value: "2", suit: "D" },
  { value: "2", suit: "H" },
  { value: "2", suit: "S" },
  { value: "7", suit: "C" },
  { value: "7", suit: "D" },
];
const fourOfAKindHand = [
  { value: "2", suit: "D" },
  { value: "2", suit: "H" },
  { value: "2", suit: "S" },
  { value: "2", suit: "C" },
  { value: "9", suit: "D" },
];
const straightFlushHand = [
  { value: "2", suit: "D" },
  { value: "3", suit: "D" },
  { value: "4", suit: "D" },
  { value: "5", suit: "D" },
  { value: "6", suit: "D" },
];

module.exports = {
  highCardHand,
  pairHand,
  twoPairsHand,
  threeOfAKindHand,
  straightHand,
  flushHand,
  fullHouseHand,
  fourOfAKindHand,
  straightFlushHand,
};

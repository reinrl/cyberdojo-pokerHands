////////////////////////////////////////////////
// functions to check for various poker hands //
////////////////////////////////////////////////

// 2 of the 5 cards in the hand have the same value
const isPair = (hand, uniqueCardValues, _rankedCards) => 
    // a hand capable of two pairs can only have four unique cards in it (and we already know this wasn't any of the better hands)
    uniqueCardValues.length === 4;
  
  // The hand contains 2 different pairs
  const isTwoPairs = (hand, uniqueCardValues, _rankedCards) => 
    // a hand capable of two pairs can only have three unique cards in it (and we already know this wasn't any of the better hands)
    uniqueCardValues.length === 3;
  
  // Three of the cards in the hand have the same value
  const isThreeOfAKind = (hand, uniqueCardValues, _rankedCards) => {
    const passes = 
      // a hand capable of 3 of a kind can at most only have three unique cards in it...
      uniqueCardValues.length < 4 
      // ...and it must have three of one of them
       && (
        hand.filter((card) => card.value === uniqueCardValues[0]).length === 3 
        || hand.filter((card) => card.value === uniqueCardValues[1]).length === 3
        || hand.filter((card) => card.value === uniqueCardValues[2]).length === 3
      );
    return passes;
  };
  
  // Hand contains 5 cards with consecutive values
  const isStraight = (hand, uniqueCardValues, rankedCards) => {
    const firstIndex = rankedCards.findIndex((card) => card.value === hand[0].value);
    const secondIndex = rankedCards.findIndex((card) => card.value === hand[4].value);
    // if this is a straight, the ranked values should only be 5 numbers apart
    return secondIndex - firstIndex === 4;
  };
  
  // Hand contains 5 cards of the same suit
  const isFlush = (hand, uniqueCardValues, _rankedCards) => 
    hand
      // figure out the suits involved
      .map((card) => card.suit)
      // ...and get a distinct list...
      .filter((card, idx, arr) => arr.indexOf(card) === idx)
      // ...which must have only one suit involved to be a flush
      .length === 1;
  
  // 3 cards of the same value, with the remaining 2 cards forming a pair
  const isFullHouse = (hand, uniqueCardValues, _rankedCards) => 
    // a hand capable of a full house can only have two unique cards in it (and we already know this wasn't four of a kind)
    uniqueCardValues.length < 3;
  
  
  // 4 cards with the same value
  const isFourOfAKind = (hand, uniqueCardValues, _rankedCards) => {
    const passes = 
      // a hand capable of 4 of a kind can only have two unique cards in it...
      uniqueCardValues.length < 3 
      // ...and it must have four of one of them
       && (
        hand.filter((card) => card.value === uniqueCardValues[0]).length === 4 
        || hand.filter((card) => card.value === uniqueCardValues[1]).length === 4
      );
    return passes;
  };
  
  // 5 cards of the same suit with consecutive values
  const isStraightFlush = (hand, uniqueCardValues, rankedCards) => 
    isStraight(hand, uniqueCardValues, rankedCards) && isFlush(hand, uniqueCardValues, rankedCards);
  
  module.exports = {
    isPair, 
    isTwoPairs, 
    isThreeOfAKind, 
    isStraight, 
    isFlush, 
    isFullHouse, 
    isFourOfAKind, 
    isStraightFlush
  };
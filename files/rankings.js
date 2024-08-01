// functions to check for various poker hands
const {
    isPair, 
    isTwoPairs, 
    isThreeOfAKind, 
    isStraight, 
    isFlush, 
    isFullHouse, 
    isFourOfAKind, 
    isStraightFlush
  } = require('./handCheckers');
  
  ///////////////////////////
  // Useful scoring arrays //
  ///////////////////////////
  
  // rank the cards to give them a relative value
  const rankedCards = [
    {value: "2", name: "2"}, 
    {value: "3", name: "3"}, 
    {value: "4", name: "4"}, 
    {value: "5", name: "5"}, 
    {value: "6", name: "6"}, 
    {value: "7", name: "7"}, 
    {value: "8", name: "8"}, 
    {value: "9", name: "9"}, 
    {value: "10", name: "10"}, 
    {value: "J", name: "Jack"}, 
    {value: "Q", name: "Queen"}, 
    {value: "K", name: "King"}, 
    {value: "A", name: "Ace"}
  ];
  
  // rank the hands to give them a relative value
  const rankedHands = [
    {name: "high card", value: "highCard", handScoringFunc: () => true},
    {name: "pair", value: "pair", handScoringFunc: isPair},
    {name: "two pairs", value: "twoPairs", handScoringFunc: isTwoPairs},
    {name: "three of a kind", value: "threeOfAKind", handScoringFunc: isThreeOfAKind},
    {name: "straight", value: "straight", handScoringFunc: isStraight},
    {name: "flush", value: "flush", handScoringFunc: isFlush},
    {name: "full house", value: "fullHouse", handScoringFunc: isFullHouse},
    {name: "four of a kind", value: "fourOfAKind", handScoringFunc: isFourOfAKind},
    {name: "straight flush", value: "straightFlush", handScoringFunc: isStraightFlush}
  ];
  
  module.exports = {
    rankedCards, 
    rankedHands
  };
  
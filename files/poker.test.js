"use strict";

// sample card hands
const {
  highCardHand,
  pairHand,
  twoPairsHand,
  threeOfAKindHand,
  straightHand,
  flushHand,
  fullHouseHand,
  fourOfAKindHand,
  straightFlushHand,
} = require("./__testutils__/testHands");

// object under test
const playTheHands = require("./poker");

// convert sample hand to the form we are expecting
const convertHand = (hand) => {
  return hand.map((card) => `${card.value}${card.suit}`).join(" ");
};

describe("playTheHand", () => {
  describe("ties", () => {
    it("should be a tie", () => {
      expect(playTheHands(["2H 3D 5S 9C KD", "2D 3H 5C 9S KH"])).toEqual("Tie");
    });
  });

  describe("clear winner", () => {
    it("should win with highest card - Ace", () => {
      expect(
        playTheHands([`${convertHand(highCardHand)}`, "2C 3H 4S 8C AH"])
      ).toEqual("White wins - high card: Ace");
    });

    it("should win with pair", () => {
      expect(
        playTheHands([
          `${convertHand(pairHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Black wins - pair");
    });

    it("should win with two pair", () => {
      expect(
        playTheHands([
          `${convertHand(twoPairsHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Black wins - two pairs");
    });

    it("should win with three of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(threeOfAKindHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Black wins - three of a kind");
    });

    it("should win with straight", () => {
      expect(
        playTheHands([
          `${convertHand(straightHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Black wins - straight");
    });

    it("should win with flush", () => {
      expect(
        playTheHands([
          `${convertHand(flushHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Black wins - flush");
    });

    it("should win with full house", () => {
      expect(
        playTheHands([
          `${convertHand(fullHouseHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Black wins - full house");
    });

    it("should win with four of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(fourOfAKindHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Black wins - four of a kind");
    });

    it("should win with straight flush", () => {
      expect(
        playTheHands([
          `${convertHand(straightFlushHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Black wins - straight flush");
    });
  });

  describe("tie breakers", () => {
    it("should show that black has next highest card - 9 - win when the highest card is tied", () => {
      expect(playTheHands(["2H 3D 5S 9C KD", "2C 3H 4S 8C KH"])).toEqual(
        "Black wins - high card: 9"
      );
    });

    it("should show that black wins with pair and highest other card", () => {
      expect(
        playTheHands([`${convertHand(pairHand)}`, "2S 2S 3H 4S 5S"])
      ).toEqual("Black wins - pair with high card: 9");
    });

    it("should show that white wins with a higher three of a kind", () => {
      expect(
        playTheHands([`${convertHand(threeOfAKindHand)}`, "3C 3S 3H 4S 5S"])
      ).toEqual("White wins - three of a kind with high card: 3");
    });

    it("should show that white wins with a higher straight", () => {
      expect(
        playTheHands([`${convertHand(straightHand)}`, "7D 8D 9H 10D JD"])
      ).toEqual("White wins - straight with high card: Jack");
    });

    it("should show that white wins with a higher flush", () => {
      expect(
        playTheHands([`${convertHand(flushHand)}`, "2H 3H 7H 8H 10H"])
      ).toEqual("White wins - flush with high card: 10");
    });

    it("should show that white wins with a higher four of a kind", () => {
      expect(
        playTheHands([`${convertHand(fourOfAKindHand)}`, "3H 3S 3C 3S 5S"])
      ).toEqual("White wins - four of a kind with high card: 3");
    });

    it("should show that white wins with a higher straight flush", () => {
      expect(
        playTheHands([`${convertHand(straightFlushHand)}`, "7D 8D 9D 10D JD"])
      ).toEqual("White wins - straight flush with high card: Jack");
    });
  });
});

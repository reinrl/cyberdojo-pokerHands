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
    it("should be a high card tie", () => {
      expect(playTheHands(["2H 3D 5S 9C KD", "2D 3H 5C 9S KH"])).toEqual("Push");
    });

    it("should be a pair tie", () => {
      expect(
        playTheHands([`${convertHand(pairHand)}`, `${convertHand(pairHand)}`])
      ).toEqual("Push");
    });

    it("should be a straight tie", () => {
      expect(
        playTheHands([
          `${convertHand(straightHand)}`,
          `${convertHand(straightHand)}`,
        ])
      ).toEqual("Push");
    });

    it("should be a flush tie", () => {
      expect(
        playTheHands([`${convertHand(flushHand)}`, `${convertHand(flushHand)}`])
      ).toEqual("Push");
    });

    it("should be a straight flush tie", () => {
      expect(
        playTheHands([
          `${convertHand(straightFlushHand)}`,
          `${convertHand(straightFlushHand)}`,
        ])
      ).toEqual("Push");
    });
  });

  describe("clear winner", () => {
    it("white should win with highest card - Ace", () => {
      expect(
        playTheHands([`${convertHand(highCardHand)}`, "2C 3H 4S 8C AH"])
      ).toEqual("Hand #2 wins - high card: Ace");
    });

    it("black should win with highest card - Ace", () => {
      expect(
        playTheHands(["2C 3H 4S 8C AH", `${convertHand(highCardHand)}`])
      ).toEqual("Hand #1 wins - high card: Ace");
    });

    it("white should win with pair", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(pairHand)}`,
        ])
      ).toEqual("Hand #2 wins - pair");
    });

    it("black should win with pair", () => {
      expect(
        playTheHands([
          `${convertHand(pairHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - pair");
    });

    it("white should win with two pair", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(twoPairsHand)}`,
        ])
      ).toEqual("Hand #2 wins - two pairs");
    });

    it("black should win with two pair", () => {
      expect(
        playTheHands([
          `${convertHand(twoPairsHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - two pairs");
    });

    it("white should win with three of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(threeOfAKindHand)}`,
        ])
      ).toEqual("Hand #2 wins - three of a kind");
    });

    it("black should win with three of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(threeOfAKindHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - three of a kind");
    });

    it("white should win with straight", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(straightHand)}`,
        ])
      ).toEqual("Hand #2 wins - straight");
    });

    it("black should win with straight", () => {
      expect(
        playTheHands([
          `${convertHand(straightHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - straight");
    });

    it("white should win with flush", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(flushHand)}`,
        ])
      ).toEqual("Hand #2 wins - flush");
    });

    it("black should win with flush", () => {
      expect(
        playTheHands([
          `${convertHand(flushHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - flush");
    });

    it("white should win with full house", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(fullHouseHand)}`,
        ])
      ).toEqual("Hand #2 wins - full house");
    });

    it("black should win with full house", () => {
      expect(
        playTheHands([
          `${convertHand(fullHouseHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - full house");
    });

    it("white should win with four of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(fourOfAKindHand)}`,
        ])
      ).toEqual("Hand #2 wins - four of a kind");
    });

    it("black should win with four of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(fourOfAKindHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - four of a kind");
    });

    it("white should win with straight flush", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(straightFlushHand)}`,
        ])
      ).toEqual("Hand #2 wins - straight flush");
    });

    it("black should win with straight flush", () => {
      expect(
        playTheHands([
          `${convertHand(straightFlushHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - straight flush");
    });
  });

  describe("tie breakers", () => {
    it("should show that white has next highest card - 9 - win when the highest card is tied", () => {
      expect(playTheHands(["2C 3H 4S 8C KH", "2H 3D 5S 9C KD"])).toEqual(
        "Hand #2 wins - high card: 9"
      );
    });

    it("should show that black has next highest card - 9 - win when the highest card is tied", () => {
      expect(playTheHands(["2H 3D 5S 9C KD", "2C 3H 4S 8C KH"])).toEqual(
        "Hand #1 wins - high card: 9"
      );
    });

    it("should show that white wins with pair and highest other card", () => {
      expect(
        playTheHands(["2S 2S 3H 4S 5S", `${convertHand(pairHand)}`])
      ).toEqual("Hand #2 wins - pair with high card: 9");
    });

    it("should show that black wins with pair and highest other card", () => {
      expect(
        playTheHands([`${convertHand(pairHand)}`, "2S 2S 3H 4S 5S"])
      ).toEqual("Hand #1 wins - pair with high card: 9");
    });

    it("should show that white wins with a higher three of a kind", () => {
      expect(
        playTheHands([`${convertHand(threeOfAKindHand)}`, "3C 3S 3H 4S 5S"])
      ).toEqual("Hand #2 wins - three of a kind with high card: 3");
    });

    it("should show that black wins with a higher three of a kind", () => {
      expect(
        playTheHands(["3C 3S 3H 4S 5S", `${convertHand(threeOfAKindHand)}`])
      ).toEqual("Hand #1 wins - three of a kind with high card: 3");
    });

    it("should show that white wins with a higher straight", () => {
      expect(
        playTheHands([`${convertHand(straightHand)}`, "7D 8D 9H 10D JD"])
      ).toEqual("Hand #2 wins - straight with high card: Jack");
    });

    it("should show that black wins with a higher straight", () => {
      expect(
        playTheHands(["7D 8D 9H 10D JD", `${convertHand(straightHand)}`])
      ).toEqual("Hand #1 wins - straight with high card: Jack");
    });

    it("should show that white wins with a higher flush", () => {
      expect(
        playTheHands([`${convertHand(flushHand)}`, "2H 3H 7H 8H 10H"])
      ).toEqual("Hand #2 wins - flush with high card: 10");
    });

    it("should show that black wins with a higher flush", () => {
      expect(
        playTheHands(["2H 3H 7H 8H 10H", `${convertHand(flushHand)}`])
      ).toEqual("Hand #1 wins - flush with high card: 10");
    });

    it("should show that white wins with a higher four of a kind", () => {
      expect(
        playTheHands([`${convertHand(fourOfAKindHand)}`, "3H 3S 3C 3S 5S"])
      ).toEqual("Hand #2 wins - four of a kind with high card: 3");
    });

    it("should show that black wins with a higher four of a kind", () => {
      expect(
        playTheHands(["3H 3S 3C 3S 5S", `${convertHand(fourOfAKindHand)}`])
      ).toEqual("Hand #1 wins - four of a kind with high card: 3");
    });

    it("should show that white wins with a higher straight flush", () => {
      expect(
        playTheHands([`${convertHand(straightFlushHand)}`, "7D 8D 9D 10D JD"])
      ).toEqual("Hand #2 wins - straight flush with high card: Jack");
    });

    it("should show that black wins with a higher straight flush", () => {
      expect(
        playTheHands(["7D 8D 9D 10D JD", `${convertHand(straightFlushHand)}`])
      ).toEqual("Hand #1 wins - straight flush with high card: Jack");
    });
  });
});

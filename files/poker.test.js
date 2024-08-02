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
      expect(playTheHands(["2H 3D 5S 9C KD", "2D 3H 5C 9S KH"])).toEqual(
        "Push"
      );
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
    it("should show that hand #2 wins with highest card - Ace", () => {
      expect(
        playTheHands([`${convertHand(highCardHand)}`, "2C 3H 4S 8C AH"])
      ).toEqual("Hand #2 wins - high card: Ace");
    });

    it("should show that hand #1 wins with highest card - Ace", () => {
      expect(
        playTheHands(["2C 3H 4S 8C AH", `${convertHand(highCardHand)}`])
      ).toEqual("Hand #1 wins - high card: Ace");
    });

    it("should show that hand #2 wins with pair", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(pairHand)}`,
        ])
      ).toEqual("Hand #2 wins - pair");
    });

    it("should show that hand #1 wins with pair", () => {
      expect(
        playTheHands([
          `${convertHand(pairHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - pair");
    });

    it("should show that hand #2 wins with two pair", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(twoPairsHand)}`,
        ])
      ).toEqual("Hand #2 wins - two pairs");
    });

    it("should show that hand #1 wins with two pair", () => {
      expect(
        playTheHands([
          `${convertHand(twoPairsHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - two pairs");
    });

    it("should show that hand #2 wins with three of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(threeOfAKindHand)}`,
        ])
      ).toEqual("Hand #2 wins - three of a kind");
    });

    it("should show that hand #1 wins with three of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(threeOfAKindHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - three of a kind");
    });

    it("should show that hand #2 wins with straight", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(straightHand)}`,
        ])
      ).toEqual("Hand #2 wins - straight");
    });

    it("should show that hand #1 wins with straight", () => {
      expect(
        playTheHands([
          `${convertHand(straightHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - straight");
    });

    it("should show that hand #2 wins with flush", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(flushHand)}`,
        ])
      ).toEqual("Hand #2 wins - flush");
    });

    it("should show that hand #1 wins with flush", () => {
      expect(
        playTheHands([
          `${convertHand(flushHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - flush");
    });

    it("should show that hand #2 wins with full house", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(fullHouseHand)}`,
        ])
      ).toEqual("Hand #2 wins - full house");
    });

    it("should show that hand #1 wins with full house", () => {
      expect(
        playTheHands([
          `${convertHand(fullHouseHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - full house");
    });

    it("should show that hand #2 wins with four of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(fourOfAKindHand)}`,
        ])
      ).toEqual("Hand #2 wins - four of a kind");
    });

    it("should show that hand #1 wins with four of a kind", () => {
      expect(
        playTheHands([
          `${convertHand(fourOfAKindHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - four of a kind");
    });

    it("should show that hand #2 wins with straight flush", () => {
      expect(
        playTheHands([
          `${convertHand(highCardHand)}`,
          `${convertHand(straightFlushHand)}`,
        ])
      ).toEqual("Hand #2 wins - straight flush");
    });

    it("should show that hand #1 wins with straight flush", () => {
      expect(
        playTheHands([
          `${convertHand(straightFlushHand)}`,
          `${convertHand(highCardHand)}`,
        ])
      ).toEqual("Hand #1 wins - straight flush");
    });
  });

  describe("tie breakers", () => {
    it("should show that hand #2 has next highest card - 9 - win when the highest card is tied", () => {
      expect(playTheHands(["2C 3H 4S 8C KH", "2H 3D 5S 9C KD"])).toEqual(
        "Hand #2 wins - high card: 9"
      );
    });

    it("should show that hand #1 has next highest card - 9 - win when the highest card is tied", () => {
      expect(playTheHands(["2H 3D 5S 9C KD", "2C 3H 4S 8C KH"])).toEqual(
        "Hand #1 wins - high card: 9"
      );
    });

    it("should show that hand #2 wins with pair and highest other card", () => {
      expect(
        playTheHands(["2S 2S 3H 4S 5S", `${convertHand(pairHand)}`])
      ).toEqual("Hand #2 wins - pair with high card: 9");
    });

    it("should show that hand #1 wins with pair and highest other card", () => {
      expect(
        playTheHands([`${convertHand(pairHand)}`, "2S 2S 3H 4S 5S"])
      ).toEqual("Hand #1 wins - pair with high card: 9");
    });

    it("should show that hand #2 wins with a higher three of a kind", () => {
      expect(
        playTheHands([`${convertHand(threeOfAKindHand)}`, "3C 3S 3H 4S 5S"])
      ).toEqual("Hand #2 wins - three of a kind with high card: 3");
    });

    it("should show that hand #1 wins with a higher three of a kind", () => {
      expect(
        playTheHands(["3C 3S 3H 4S 5S", `${convertHand(threeOfAKindHand)}`])
      ).toEqual("Hand #1 wins - three of a kind with high card: 3");
    });

    it("should show that hand #2 wins with a higher straight", () => {
      expect(
        playTheHands([`${convertHand(straightHand)}`, "7D 8D 9H TD JD"])
      ).toEqual("Hand #2 wins - straight with high card: Jack");
    });

    it("should show that hand #1 wins with a higher straight", () => {
      expect(
        playTheHands(["7D 8D 9H TD JD", `${convertHand(straightHand)}`])
      ).toEqual("Hand #1 wins - straight with high card: Jack");
    });

    it("should show that hand #2 wins with a higher flush", () => {
      expect(
        playTheHands([`${convertHand(flushHand)}`, "2H 3H 7H 8H TH"])
      ).toEqual("Hand #2 wins - flush with high card: 10");
    });

    it("should show that hand #1 wins with a higher flush", () => {
      expect(
        playTheHands(["2H 3H 7H 8H TH", `${convertHand(flushHand)}`])
      ).toEqual("Hand #1 wins - flush with high card: 10");
    });

    it("should show that hand #2 wins with a higher four of a kind", () => {
      expect(
        playTheHands([`${convertHand(fourOfAKindHand)}`, "3H 3S 3C 3S 5S"])
      ).toEqual("Hand #2 wins - four of a kind with high card: 3");
    });

    it("should show that hand #1 wins with a higher four of a kind", () => {
      expect(
        playTheHands(["3H 3S 3C 3S 5S", `${convertHand(fourOfAKindHand)}`])
      ).toEqual("Hand #1 wins - four of a kind with high card: 3");
    });

    it("should show that hand #2 wins with a higher full house", () => {
      expect(
        playTheHands([`${convertHand(fullHouseHand)}`, "6C 6D 4H 4D 4C"])
      ).toEqual("Hand #2 wins - full house with high card: 4");
    });

    it("should show that hand #1 wins with a higher full house", () => {
      expect(
        playTheHands(["6C 6D 4H 4D 4C", `${convertHand(fullHouseHand)}`])
      ).toEqual("Hand #1 wins - full house with high card: 4");
    });

    it("should show that hand #2 wins with a higher straight flush", () => {
      expect(
        playTheHands([`${convertHand(straightFlushHand)}`, "7D 8D 9D TD JD"])
      ).toEqual("Hand #2 wins - straight flush with high card: Jack");
    });

    it("should show that hand #1 wins with a higher straight flush", () => {
      expect(
        playTheHands(["7D 8D 9D TD JD", `${convertHand(straightFlushHand)}`])
      ).toEqual("Hand #1 wins - straight flush with high card: Jack");
    });
  });
});

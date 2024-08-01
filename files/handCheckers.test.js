"use strict";

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
const { rankedCards } = require("./rankings");

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

describe("handCheckers", () => {
  describe("isPair", () => {
    it("should return false if the hand does not have a pair", () => {
      expect(isPair(highCardHand, ["2", "3", "7", "8", "9"], rankedCards)).toBe(
        false
      );
    });

    it("should return true if the hand has a pair", () => {
      expect(isPair(pairHand, ["2", "7", "8", "9"], rankedCards)).toBe(true);
    });
  });

  describe("isTwoPairs", () => {
    it("should return false if the hand does not have two pairs", () => {
      expect(
        isTwoPairs(highCardHand, ["2", "3", "7", "8", "9"], rankedCards)
      ).toBe(false);
    });

    it("should return true if the hand has two pairs", () => {
      expect(isTwoPairs(twoPairsHand, ["2", "7", "9"], rankedCards)).toBe(true);
    });
  });

  describe("isThreeOfAKind", () => {
    it("should return false if the hand does not have three of a kind", () => {
      expect(
        isThreeOfAKind(highCardHand, ["2", "3", "7", "8", "9"], rankedCards)
      ).toBe(false);
    });

    it("should return true if the hand has three of a kind", () => {
      expect(
        isThreeOfAKind(threeOfAKindHand, ["2", "7", "9"], rankedCards)
      ).toBe(true);
    });
  });

  describe("isStraight", () => {
    it("should return false if the hand does not have a straight", () => {
      expect(
        isStraight(highCardHand, ["2", "3", "7", "8", "9"], rankedCards)
      ).toBe(false);
    });

    it("should return true if the hand has a straight", () => {
      expect(
        isStraight(straightHand, ["2", "3", "4", "5", "6"], rankedCards)
      ).toBe(true);
    });
  });

  describe("isFlush", () => {
    it("should return false if the hand does not have a flush", () => {
      expect(
        isFlush(highCardHand, ["2", "3", "7", "8", "9"], rankedCards)
      ).toBe(false);
    });

    it("should return true if the hand has a flush", () => {
      expect(isFlush(flushHand, ["2", "3", "7", "8", "9"], rankedCards)).toBe(
        true
      );
    });
  });

  describe("isFullHouse", () => {
    it("should return false if the hand does not have a full house", () => {
      expect(
        isFullHouse(highCardHand, ["2", "3", "7", "8", "9"], rankedCards)
      ).toBe(false);
    });

    it("should return true if the hand has a full house", () => {
      expect(isFullHouse(fullHouseHand, ["2", "7"], rankedCards)).toBe(
        true
      );
    });
  });

  describe("isFourOfAKind", () => {
    it("should return false if the hand does not have four of a kind", () => {
      expect(
        isFourOfAKind(highCardHand, ["2", "3", "7", "8", "9"], rankedCards)
      ).toBe(false);
    });

    it("should return true if the hand has four of a kind", () => {
      expect(isFourOfAKind(fourOfAKindHand, ["2", "9"], rankedCards)).toBe(
        true
      );
    });
  });

  describe("isStraightFlush", () => {
    it("should return false if the hand does not have a straight flush", () => {
      expect(
        isStraightFlush(highCardHand, ["2", "3", "7", "8", "9"], rankedCards)
      ).toBe(false);
    });

    it("should return false if the hand is a straight but not also a flush", () => {
      expect(
        isStraightFlush(straightHand, ["2", "3", "4", "5", "6"], rankedCards)
      ).toBe(false);
    });

    it("should return false if the hand is a flush but not also a straight", () => {
      expect(isStraightFlush(flushHand, ["2", "3", "7", "8", "9"], rankedCards)).toBe(
        false
      );
    });

    it("should return true if the hand has a straight flush", () => {
      expect(isStraightFlush(straightFlushHand, ["2", "3", "4", "5", "6"], rankedCards)).toBe(
        true
      );
    });
  });
});

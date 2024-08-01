"use strict";

const playTheHands = require("./poker");

describe("playTheHand", () => {
  describe("ties", () => {
    it("should be a tie", () => {
      expect(
        playTheHands("Black: 2H 3D 5S 9C KD White: 2D 3H 5C 9S KH")
      ).toEqual("Tie");
    });
  });
  
  describe("clear winner", () => {
    it("should win with highest card - Ace", () => {
      expect(playTheHands("Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH")).toEqual(
        "White wins - high card: Ace"
      );
    });
  
    it("should win with pair", () => {
      expect(playTheHands("Black: 2D 2H 3S 5C 7D White: 2S 8S AH QS 3S")).toEqual(
        "Black wins - pair"
      );
    });
  
    it("should win with two pair", () => {
      expect(playTheHands("Black: 2D 2H 7S 5C 7D White: 2S 8S AH QS 3S")).toEqual(
        "Black wins - two pairs"
      );
    });
  
    it("should win with three of a kind", () => {
      expect(playTheHands("Black: 2D 2H 2S 5C 7D White: 2S 8S AH QS 3S")).toEqual(
        "Black wins - three of a kind"
      );
    });
  
    it("should win with straight", () => {
      expect(playTheHands("Black: 2D 3D 4D 5D 6H White: 2S 8S AH QS 3S")).toEqual(
        "Black wins - straight"
      );
    });
  
    it("should win with flush", () => {
      expect(playTheHands("Black: 2D 3D 4D 5D 7D White: 2S 8S AH QS 3S")).toEqual(
        "Black wins - flush"
      );
    });
  
    it("should win with full house", () => {
      expect(playTheHands("Black: 2H 4S 4C 2D 4H White: 2S 8S AS QS 3S")).toEqual(
        "Black wins - full house"
      );
    });
  
    it("should win with four of a kind", () => {
      expect(playTheHands("Black: 2D 2H 2S 2C 7D White: 2S 8S AH QS 3S")).toEqual(
        "Black wins - four of a kind"
      );
    });
  
    it("should win with straight flush", () => {
      expect(playTheHands("Black: 2D 3D 4D 5D 6D White: 2S 8S AH QS 3S")).toEqual(
        "Black wins - straight flush"
      );
    });
  });
  
  describe("tie breakers", () => {
    it("should have next highest card - 9 - win when the highest card is tied", () => {
      expect(playTheHands("Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C KH")).toEqual(
        "Black wins - high card: 9"
      );
    });
  });
});

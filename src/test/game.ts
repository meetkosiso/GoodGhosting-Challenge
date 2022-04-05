import { assert } from "chai";
import request from "supertest";
import app from "../app";
import { getPlayerService, getCurrentSegmentService } from "../services/game";
import { player_1_address, player_2_address } from "./__fixtures__/game";

const agent = request.agent(app);

describe("Game", function () {
  it("should fetch a player successfully", function (done) {
    getPlayerService(player_1_address).then((playerFound) => {
      assert.equal(playerFound.addr, player_1_address);
      done();
    });
  });

  it("should throw an error if player is not found", function (done) {
    getPlayerService(player_2_address).catch((response) => {
      assert.equal(response, "Player does not exist on the game");
      done();
    });
  });

  it("should fetch a player successfully via an API", function (done) {
    agent
      .get(`/api/player/${player_1_address}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .then((response) => {
        assert.equal(response.body.success, true);
        assert.equal(response.body.data.addr, player_1_address);
        return done();
      });
  });

  it("should throw an error is player is not found (API)", function (done) {
    agent
      .get(`/api/player/${player_2_address}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(422)
      .then((response) => {
        assert.equal(response.body.success, false);
        assert.equal(response.body.data.addr, undefined);
        return done();
      });
  });

  it("should fetch the current segment successfully", function (done) {
    getCurrentSegmentService().then((segment) => {
      assert.equal(segment.currentSegment, 0);
      done();
    });
  });

  it("should fetch the current segment successfully via the API", function (done) {
    agent
      .get("/api/currentSegment")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .then((response) => {
        assert.equal(response.body.success, true);
        assert.equal(response.body.data.currentSegment, 0);
        return done();
      });
  });
});

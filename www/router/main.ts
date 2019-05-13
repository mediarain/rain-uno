'use strict';

import * as express from "express";
import * as  _ from 'lodash';
import { Storage } from "../services/Storage";

const router = express.Router();

const storage = new Storage(process.env.USER_TABLE_NAME);

async function index(req, res) {
  console.log(JSON.stringify(req.body, null, 2));
  const intent = _.get(req, "body.queryResult.intent.displayName");
  const channel = _.get(req, "body.originalDetectIntentRequest.payload.data.event.channel");
  let players = await storage.scan();
  players = players
  .filter(player => player.score)
  .sort((a, b) => a.score - b.score)
  .reverse();

  const bestPlayer = _.head(players);
  const total = players.reduce((acc, next) => {
    const score = _.toNumber(next.score);
    if (score > 0) {
      acc = acc + score;
    }
    return acc;
  }, 0);


  res.render("index", { total, players, bestPlayer });
}


router.get("/", index);

export { router };

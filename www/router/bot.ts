'use strict';

import * as express from "express";
import * as  _ from 'lodash';
import { payload } from "../services/message";
import { Storage } from "../services/Storage";

const router = express.Router();

const storage = new Storage(process.env.USER_TABLE_NAME);

async function index(req, res) {
  console.log(JSON.stringify(req.body, null, 2));
  const intent = _.get(req, "body.queryResult.intent.displayName");
  const channel = _.get(req, "body.originalDetectIntentRequest.payload.data.event.channel");

  if (intent === "CounterIntent" && channel !== process.env.CHANNEL_ID) {
    return res.json(payload("This is not the uno channel! :angry:"));
  }

  if (intent === "CounterIntent") {
    await counterIntent(req, res);
  }

  if (intent === "StatisticIntent") {
    await statisticIntent(req, res);
  }
}

async function statisticIntent(req, res) {
  const players = await storage.scan();
  const leaderboard = await leaderboardStatement(players);
  res.json(payload(leaderboard));
}

async function counterIntent(req, res) {
  const player =  _.get(req, "body.queryResult.parameters.players");
  let number =  _.get(req, "body.queryResult.parameters.number");
  const operation =  _.get(req, "body.queryResult.parameters.operation");

  const playerFound = await storage.get({ userId : player });

  number = _.toNumber(number);
  if ((!playerFound && !number && !operation) || number <= 0 || number > 10) {
    res.json(payload(`try one more time (ex. juanito +1). Some reestrictions. \nYou can't add more than 10 points at a time. \nPoints most be greater than 0.`));
  }

  const pointAssignmentStatement = await pointAssignment(playerFound, player, number, operation);
  const players = await storage.scan();
  const leaderboard = await leaderboardStatement(players);
  res.json(payload(`${pointAssignmentStatement}\n${leaderboard}`));
}

async function pointAssignment(playerFound, playerId, number, operation) {
  playerFound.score = operation === "add" ? playerFound.score + number : playerFound.score - number;

  await storage.put(playerFound);

  const operationText = operation === "add" ? "added" : "removed";
  const pointText = number === 1 ? "point" : "points";
  const fromConnector =  operation === "add" ? "to": "from";

  return `ok got it!, I ${operationText} ${number} ${pointText} ${fromConnector} ${playerFound.name || playerId}`;
}
async function leaderboardStatement(players) {
  const leaderboard = players
  .filter(player => player.score)
  .sort((a, b) => a.score - b.score)
  .reverse()
  .map(p => `${p.name} -> ${p.score}`).join('\n')

  return `Here is the leaderboard\n${leaderboard}`;
}

const namespace = "/bot";
router.post(`${namespace}/`, index);

export { router, namespace };

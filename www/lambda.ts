import * as awsServerlessExpress from "aws-serverless-express";

import { app } from "./app";

export const handler = (event, context) => {
  const server = awsServerlessExpress.createServer(app);

  return awsServerlessExpress.proxy(server, event, context);
};

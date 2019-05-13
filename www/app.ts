import * as awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import * as Bluebird from "bluebird";
import * as bodyParser from "body-parser";
import * as ejsNotPromised from "ejs";
import * as express from "express";
import { LambdaLog } from "lambda-log";
import * as _ from "lodash";
import * as morgan from "morgan";
import * as path from "path";
import { router } from "./router"

const lambdaLog = new LambdaLog({ debug: true });
const ejs = Bluebird.promisifyAll(ejsNotPromised);

// The rest of the code implements the routes for our Express server.
export const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(morgan('dev'));

app.set("views", path.join(__dirname, "views"));
const now = new Date();



if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.use('/dist', express.static(`${__dirname}/../dist`));
}

app.use(function(req, res, next) {
  // app.locals
  res.locals.year = now.getFullYear();
  res.locals.staticRoot = process.env.AWS_LAMBDA_FUNCTION_NAME ? `https://${process.env.BUCKET_PUBLIC_ASSETS}.s3.amazonaws.com` : '/dist';
  next();
});
router(app);

'use strict';

import { LambdaLog } from "lambda-log";
import { app } from "./app";
const lambdaLog = new LambdaLog({ debug: true });

app.listen(3000, () => lambdaLog.info('Example app listening on port 3000!'))

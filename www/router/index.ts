'use strict';
import * as bot from "./bot";
import * as main from "./main";

export function router(app: any) {
  app.use(bot.router);
  app.use(main.router);
}

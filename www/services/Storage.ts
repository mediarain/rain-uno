import { DynamoDB } from "aws-sdk";
import { LambdaLog } from "lambda-log";

export class Storage {
  public client: DynamoDB.DocumentClient;
  public log: LambdaLog;
  public table: string;

  constructor(tableName: string | undefined) {
    if (tableName === undefined) {
      throw "Please specify a proper table name"
    }
    this.client = new DynamoDB.DocumentClient();
    this.table = tableName;
  }

  public async scan() {
    const item = await this.client
    .scan({
      TableName: this.table
    })
    .promise();

    return item.Items || [];
  }

  public async get(key) {
    const item = await this.client
      .get({
        Key: key,
        TableName: this.table
      })
      .promise();

    return item.Item || {};
  }

  public async put(data: any) {
    if (!data.createdDate) {
      data.createdDate = (new Date()).toISOString();
    }

    data.modifiedDate =(new Date()).toISOString();
    return this.client
      .put({
        Item: data,
        TableName: this.table
      })
      .promise();
  }
}

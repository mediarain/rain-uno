export class Player {
  public userId: string;
  public name: string;
  public email: string
  public score: number;

  constructor(data: any) {
    this.userId = data.userId;
    this.score = data.score;
    this.email = data.email;
    this.name = data.name;
  }
}

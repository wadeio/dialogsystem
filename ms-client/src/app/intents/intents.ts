export interface Intents {
    id: number;
  text: string;
  intent:string;
  entities:object;
  hash:string;
  annotation:{user:string,time:string};

}

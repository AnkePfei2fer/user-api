import { MongoClient } from 'mongodb';

let client; // Einstiegspunkt für Datenbank

export async function connectDatabase(url: string) {
  client = new MongoClient(url);
  await client.connect();
}

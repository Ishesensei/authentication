import db from './db';

export default async function createUser(email, password) {
console.log('✌️email, password --->', email, password);
  const results = db
    .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    .run(email, password);

  return results.lastInsertRowid;
}

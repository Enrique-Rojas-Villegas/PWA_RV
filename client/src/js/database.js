import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateDB')) {
        console.log('jateDB database already exists');
        return;
      }
      db.createObjectStore('jateDB', { keyPath: 'id', autoIncrement: true });
      console.log('jateDB database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jateDB', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('write-transaction', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jateDB');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jateDB', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('read-transaction', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jateDB');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  if(result.length > 0){
    console.log('result.value', result);
    console.log(result[0].content);
    return result[0].content
  }else{
    return null;
  }
  console.log('result.value', result);
  if (result === undefined) {
    return;
  } else {
  return result.value;
  }
}

initdb();

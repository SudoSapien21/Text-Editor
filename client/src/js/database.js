import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });// similar to this

// TODO: Add logic to a method that accepts some content and adds it to the database

  // Add text to indexedDB
export const putDb = async (content) => {
	console.log('Hello World');
	const jateDB = await openDB('jate', 1);
	const tx = jateDB.transaction('jate', 'readwrite');
	const store = tx.objectStore('jate');
	const request = store.add({ jate: content });
	const result = await request;
	console.log(result);
};


// TODO: Add logic for a method that gets all the content from the database

// Retrieve text from indexedDB
export const getALLDb = async (e) => {
	console.log("Get all DB")
	const jateDb = await openDB('jate', 1);
	const tx = jateDb.transaction('jate', 'readonly');
	const store = tx.objectStore('jate');
	const request = store.getAllDb();
	const result = await request;
	console.log(result.value, result);
	return result;
};
initdb();

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
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb(); // Initialize the database
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  // Create an object to store in the database
  const data = { content, timestamp: Date.now() };
  
  // Add the data to the object store
  const id = await store.add(data);
  
  await tx.complete;
  
  console.log(`Added content with ID ${id} to the database`);
}; 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initdb(); // Initialize the database
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  // Get all records from the object store
  const records = await store.getAll();
  
  await tx.complete;
  
  return records;
};
initdb();

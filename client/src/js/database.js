import { openDB } from 'idb';

// initiate a new indexedDB database called jate
const initdb = async () =>
  openDB('jate', 1, {
    // upgrade function is called when a new database is created or an existing database needs to be upgraded
    upgrade(db) {
      // check if object store with name 'jate' already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // create a new object store called 'jate'
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true }); 
      console.log('jate database created');
    },
  });

// Controller to handle updates to the editor
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  // create a new transaction in read-write mode for the 'jate' object store
  const tx = jateDb.transaction('jate', 'readwrite'); 
  const store = tx.objectStore('jate');
  // create a put request with the content and id
  const request = store.put({content: content, id: 1}); 
  const result = await request;
  console.log('Data saved in database', result);
};

// controller to get data from the jate database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // create a get request with the id
  const request = store.get(1);
  const result = await request;
  if (result){
    // if the result is not null, return the content of the first object
    return result['content']; 
  }
  // if the result is null, return an empty string
  return '' 
};

// initialize the database when the module is loaded
initdb();

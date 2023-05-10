import { openDB } from 'idb';
import { header } from './header.js';

const initdb = async () => {
  const jateDb = await openDB('jate', 1, {
    upgrade(db) {
      db.createObjectStore('jate');
    },
  });
};

// Controller to handle updates to the editor
export const putDb = async (content) => {
  console.log('putDb implemented');
  // Find if the content already exists in the database
  const contents = await getDb();
  if (contents.some((item) => item.content === content)) {
    console.log('Content already in the database.');
    return; // If the content already exists, return without adding it again
  }

  const tx = jateDb.transaction('jate', 'readwrite'); // Create a new transaction in read-write mode for the `jate` object store
  const store = tx.objectStore('jate'); // Get a reference to the `jate` object store
  const request = store.put({ content: content, id: 1 }); // Put the given content in the `jate` object store with a new ID 
  await request;
  console.log('Data saved to the database');
};

// Controller to get data from the jate database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const savedContent = await request;
  console.log('Acquired content from the database:', savedContent);
  if (savedContent) {
    return savedContent.content;
  }
  return '';
};

console.log(header);
initdb();

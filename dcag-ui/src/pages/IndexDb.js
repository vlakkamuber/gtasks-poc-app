const DB_NAME = 'audioDB';
const STORE_NAME = 'recordings';

export  const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      reject('Error opening database');
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
  });
};

export const saveRecordingToIndexedDB = (blob,taskId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const request = await store.put(blob,taskId);
      request.onsuccess = (event) => {
        setTimeout(()=>{
          resolve(event.target.result);
        },2000)
        
      };
      request.onerror = () => {
        reject('Error saving recording to IndexedDB');
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const getRecordingsFromIndexedDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
    
      const request = store.getAll();
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = () => {
        reject('Error getting recordings from IndexedDB');
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const getRecordingsFromIndexedDBByKeyStore = (keyToRetrieve) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME);
        const objectStore = transaction.objectStore(STORE_NAME);
  
        const getRequest = await objectStore.get(keyToRetrieve);
  
        getRequest.onsuccess = (event) => {
          const data = event.target.result;
          if (data) {
            resolve(data);
          } else {
            reject(`Data not found for key: ${keyToRetrieve}`);
          }
        };
  
        getRequest.onerror = (event) => {
          reject(`Error getting data: ${event.target.error}`);
        };
      } catch (error) {
        reject(`Error opening database: ${error}`);
      }
    });
  };

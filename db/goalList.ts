export default class GoalListDB {
  dbName: string;
  dbVersion: number;
  db: null | IDBDatabase;

  constructor() {
    this.dbName = "goal-list-db";
    this.dbVersion = 1;
    this.db = null;
  }

  init(callback: any) {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onerror = () => {
      console.log("Error opening db", request.error);
      callback(request.error);
    };

    request.onsuccess = () => {
      this.db = request.result;
      callback(null, this.db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "id" });
      }
    };
  }

  saveSettings(settings: any, callback: any) {
    if (!this.db) {
      callback(new Error("Database not initialized"));
      return;
    }

    const transaction = this.db.transaction(["settings"], "readwrite");
    const store = transaction.objectStore("settings");
    const request = store.put(settings);

    // todo make good use of request
    console.log(request);

    transaction.oncomplete = () => {
      callback(null);
    };

    transaction.onerror = () => {
      callback(transaction.error);
    };
  }

  saveAllSettings(settings: any[], callback: any) {
    if (!this.db) {
      callback(new Error("Database not initialized"));
      return;
    }

    const transaction = this.db.transaction(["settings"], "readwrite");
    const store = transaction.objectStore("settings");

    let completed = 0;
    let hasError = false;

    settings.forEach((setting) => {
      const request = store.put(setting);

      request.onsuccess = () => {
        completed++;
        if (completed === settings.length && !hasError) {
          callback(null);
        }
      };

      request.onerror = () => {
        hasError = true;
        callback(request.error);
      };
    });

    transaction.oncomplete = () => {
      if (!hasError && completed === settings.length) {
        callback(null);
      }
    };

    transaction.onerror = () => {
      callback(transaction.error);
    };
  }

  loadSettings(callback: any) {
    if (!this.db) {
      callback(new Error("Database not initialized"));
      return;
    }

    const transaction = this.db.transaction(["settings"], "readonly");
    const store = transaction.objectStore("settings");
    const request = store.getAll();

    request.onsuccess = () => {
      callback(null, request.result);
    };

    request.onerror = () => {
      callback(request.error);
    };
  }
}

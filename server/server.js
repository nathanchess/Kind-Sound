const dotenv = require('dotenv')

const express = require('express')
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc} = require('firebase/firestore');
const backend = express()

const analyzeText = require("./nlp");

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const fireBaseApp = initializeApp(firebaseConfig);
const db = getFirestore(fireBaseApp);

backend.get("/api/", (req, res) => {
    res.json({"api": "running"});
});

backend.get("/api/random_phrase/", (req, res) => {
    getCurrentPhrases().then((phrases) => {
        const keys = Object.keys(phrases);
        const randomIdx = Math.floor(Math.random() * keys.length);
        res.json({"phrase": phrases[keys[randomIdx]][0]})
    });
});

backend.put('/api/add_phrase/', (req, res) => {
    const phrase = req.headers["phrase"];
    analyzeText(phrase, process.env.OPENAI_KEY).then(sentiment => {
        if (!sentiment) {
            console.log(`Forbidden: Unsafe phrase ${phrase} passed in`);
            res.append("Appropriate", false);
            res.sendStatus(403); // Forbidden
            res.setMaxListeners
            throw new Error("Forbidden: Unsafe phrase");
        } else {
            res.append("Appropriate", true);
            res.send('PUT request received at /api/add_phrase');
        }
    }).then(() => {
        const phrases = doc(db, "main/phrases", "");
        getPhrasesDocumentSnapshot(phrases).then((snapshot) => {
            const key = generateRandomPhraseKey(6);
            const addPhrase = {}
            addPhrase[generateRandomPhraseKey(6)] = [phrase, 0, 0];
            updateDoc(phrases, addPhrase);
            console.log(`Added new phrase ${phrase}`);
        });
    }).catch((err) => {
        return;    
    });
})

backend.listen(5000, () => {
    console.log("Backend Server started on Port 5000");
});

async function getCurrentPhrases () {
    const main = collection(db, 'main');
    const documents = await getDocs(main);
    const phrases = documents.docs.map(doc => doc.data())[0];
    return phrases
}

async function getPhrasesDocumentSnapshot(phrases) {
    const main = collection(db, 'main');
    const documents = await getDocs(main);
    return documents.docs[0];
}
function generateRandomPhraseKey(length) {
   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   const charLength = chars.length;
   var result = '';
   for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment");

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.generateSamplePack = functions.https.onCall(async (data, context) => {
  const samplePackDB = db.collection("sample_packs");
  const sampleLibrary = db.collection("samples");

  const docRefs = await sampleLibrary.listDocuments();
  const sampleIDs = docRefs.map((docRef) => docRef.id);
  const randomSamples = [];

  for (let i = 0; i < 5; i++) {
    const randomNum = Math.trunc(Math.random() * sampleIDs.length);
    const randomSample = sampleIDs[randomNum];
    sampleIDs.splice(randomNum, 1);
    randomSamples.push(randomSample);
  }

  const samplePackData = {
    userID: data,
    samples: randomSamples,
    packName: moment().format("MM-DD-YYYY_HH:mm:ss"),
  };

  const newDoc = await samplePackDB.add(samplePackData);
  return newDoc.id;
});

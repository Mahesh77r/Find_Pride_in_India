const fs = require('fs');
const { IncomingForm } = require('formidable');
const { initializeApp } = require("firebase/app");

const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { basename } = require('path');

const firebaseConfig = {
  apiKey: "AIzaSyCUj5UdA4Bs6lpK1YfU4Z257BzpJD-Pm8M",
  authDomain: "finding-pride-in-india-9035a.firebaseapp.com",
  projectId: "finding-pride-in-india-9035a",
  storageBucket: "finding-pride-in-india-9035a.appspot.com",
  messagingSenderId: "627739821407",
  appId: "1:627739821407:web:7f9c603b210660df6d62ea",
  measurementId: "G-G7EKHXV3FL"
};

// Initialize Firebase
const server = initializeApp(firebaseConfig);

const asyncParse = async (req) => {

  return new Promise((resolve, reject) => {

    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

}
function extractFilenameFromUrl(url) {
  const fullPath = new URL(url).pathname;
  const decodedPath = decodeURIComponent(fullPath);
  const pathParts = decodedPath.split('/');
  return pathParts[pathParts.length - 1];
}
// Function to Upload Image to storage
async function uploadSingleFile(file, folderName) {
  return new Promise((resolve, reject) => {
    try {
      // Get a reference to the storage service, which is used to create references in your storage bucket
      const storage = getStorage(server);

      // Create a storage reference from our storage service
      const storageRef = ref(storage, `${folderName}/${file[0].originalFilename}`);
      // Assuming 'image.filepath' is the local file path
      uploadBytes(storageRef, fs.readFileSync(file[0].filepath)).then((snapshot) => {

        getDownloadURL(storageRef)
          .then((url) => {
            resolve(url);
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

// Function to Upload Images to storage
async function UploadMultipleFiles(files, folderName) {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = getStorage(); // Initialize Firebase Storage
      const uploadPromises = [];

      for (const file of files) {
        const storageRef = ref(storage, `${folderName}/${file.originalFilename}`);

        const uploadPromise = uploadBytes(storageRef, fs.readFileSync(file.filepath))
          .then((snapshot) => getDownloadURL(storageRef))
          .then((url) => url)
          .catch((error) => {
            console.error('Error uploading file:', error);
            throw error;
          });

        uploadPromises.push(uploadPromise);
      }

      const urls = await Promise.all(uploadPromises);
      resolve(urls);
    } catch (error) {
      console.error('Error uploading files:', error);
      reject(error);
    }
  });
}

async function deleteImageByUrl(imageUrl, folderName) {
  const fileName = extractFilenameFromUrl(imageUrl);
  const storage = getStorage(server);
  console.log(fileName)
  const storageRef = ref(storage, `${folderName}/${fileName}`);

  try {
    await deleteObject(storageRef);
    console.log(`File ${folderName}/${fileName} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting file ${folderName}/${fileName}:`, error);
    throw error;
  }
}
module.exports = { asyncParse, UploadMultipleFiles, uploadSingleFile, deleteImageByUrl }
const router = require('express').Router();
const fs = require('fs');
const { IncomingForm } = require('formidable');
const { initializeApp } = require("firebase/app");

const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
// const { firebaseConfig } = require('../config/Firebase');

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


// Function to Upload Image to storage
async function uploadSingleImage( image) {
    return new Promise((resolve, reject) => {
        try {
            // Get a reference to the storage service, which is used to create references in your storage bucket
            const storage = getStorage(server);

            // Create a storage reference from our storage service
            const storageRef = ref(storage,image[0].originalFilename);
            // Assuming 'image.filepath' is the local file path
            uploadBytes(storageRef, fs.readFileSync(image[0].filepath)).then((snapshot) => {

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
async function uploadMultipleImages(images) {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = getStorage(); // Initialize Firebase Storage
        const uploadPromises = [];
  
        for (const image of images) {
          const storageRef = ref(storage, image.originalFilename);
  
          const uploadPromise = uploadBytes(storageRef, fs.readFileSync(image.filepath))
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

const FirebaseUploadImage = async (req, res) => {
    // console.log(req)
    let parseData = await asyncParse(req)
    let ImageInformation = parseData.files.file
    let data = JSON.parse(parseData.fields.data)
    try {

        // Assuming you have data and file in the form data
        await uploadSingleImage(ImageInformation).then((response) => { data.imagePath = response })

        res.status(200).json({
            success: true,
            data: data,
            // data: { txt: JSON.parse(data), file: result },
        });
    } catch (error) {
        
        res.status(500).json({
            success: false,
            data: ImageInformation,
            msg: `Error: ${error.message}`,
        });
    }
};

router.post('/practice', FirebaseUploadImage);

module.exports = router;










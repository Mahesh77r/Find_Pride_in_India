import React, { useState } from 'react';
import { imgDB } from '../services/FirebaseConfig';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import { Alert } from '../components/alert';

export const Practice = () => {
  // show and hide alert
  const [showalert, setShowalert] = useState(false);
  const handleCloseAlert = () => {
    setShowalert(false);
  };
  // Function to handle file upload
  const handleUpload = async (e) => {
    try {
      // Create a reference to the location where you want to store the file in Firebase Storage.
      const imgRef = storageRef(imgDB, `imgs/${e.target.files[0].name}`);
      console.log(e.target.files[0].name)
      console.log(e.target.files[0])
      // Upload the selected file to the specified location.
      const data = await uploadBytes(imgRef, e.target.files[0]);

      // Retrieve the download URL from the imgRef reference
      // const downloadURL = await getDownloadURL(imgRef);

      // Log the download URL
      // console.log("Download URL:", downloadURL);

      console.log(data, "Uploaded successfully.");
    } catch (error) {
      console.error("Firebase Storage Error:", error);
    }
  }

  return (
    <>
   <Alert
        bgcolor={"red"}
        title={"Login Failed"}
        desc={"Unauthorized User"}
        bool={showalert}
        onClose={handleCloseAlert}
      />
      <div className='container flex items-center justify-center mt-10'>
        <button onClick={() => setShowalert(true)}>Show Alert</button>
        <div>
          <input type='file' onChange={(e) => handleUpload(e)} />
        </div>
      </div>
    </>
  )
}

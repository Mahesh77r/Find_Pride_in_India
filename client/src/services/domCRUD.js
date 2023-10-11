import axios from 'axios';

const URL = 'http://localhost:8080/dom';

export const addDOM = async(file,inputformData) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(inputformData));

    try {
      await axios.post(`${URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Form uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
};
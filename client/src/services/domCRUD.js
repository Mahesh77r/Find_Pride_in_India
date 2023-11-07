import axios from 'axios';

const URL = 'https://finding-pride-in-india.onrender.com/dom';

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

export const fetchProduct = async(name) =>{

    // id can be null if we need to view all user
    name = name || '';
    try{
       return await axios.get(`${URL}/getproducts/${name}`);
    }
    catch(err){
        console.log("Error occurs while running fetching Products function",err);
    }
};
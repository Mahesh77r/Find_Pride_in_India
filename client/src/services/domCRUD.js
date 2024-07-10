import axios from 'axios';

// const URL = 'https://finding-pride-in-india.onrender.com/dom';
const URL = 'http://localhost:8080/dom';


// DOM Register
export const addDOM = async(formData) => {
  
    try {
     return await axios.post(`${URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
};
export const getDOM = async() =>{
  try {
    return await axios.get(`${URL}/dom/getplaces/`)
  } catch (error) {
    console.log(`Error occur during fetching destination ${error}`)
  }
}
// product Crud

export const addProduct = async(formdata) =>{
  try{
    console.log(formdata)

    return await axios.post(`${URL}/addproducts`,formdata)
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding Prodcut ${err}`)
  }
}
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
export const updateProduct = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${URL}/updateproducts/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating product ${err}`)
  }
};
export const deleteProduct = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteproducts/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching products function",err);
  }
};

export const addClue = async(formdata) =>{
  try{
    return await axios.post(`${URL}/addclues`,formdata);
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding clues ${err}`)
  }
}
export const fetchClue = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.get(`${URL}/getclues/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching artists function",err);
  }
};
export const updateclue = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${URL}/updateclues/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating clues ${err}`)
  }
};
export const deleteClue = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteclues/${id}`);
  }
  catch(err){
      console.log("Error occurs while running deleting clues function",err);
  }
};


// guide CRUD
export const addGuide = async(formdata) =>{
  try{
    console.log(formdata)

    return await axios.post(`${URL}/addguides`,formdata)
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding Prodcut ${err}`)
  }
}
export const fetchGuide = async(name) =>{

  // id can be null if we need to view all user
  name = name || '';
  try{
     return await axios.get(`${URL}/getguides/${name}`);
  }
  catch(err){
      console.log("Error occurs while running fetching guides function",err);
  }
};
export const updateGuide = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${URL}/updateguides/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating guide ${err}`)
  }
};
export const deleteGuide = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteguides/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching guide function",err);
  }
};

// facilities CRUD

export const addFacility = async(formdata) =>{
  try{
    console.log(formdata)

   return await axios.post(`${URL}/addfacilities`,formdata)
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding facility ${err}`)
  }
}
export const fetchFacility = async(name) =>{

  // id can be null if we need to view all user
  name = name || '';
  try{
     return await axios.get(`${URL}/getfacilities/${name}`);
  }
  catch(err){
      console.log("Error occurs while running fetching facility function",err);
  }
};
export const updateFacility = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${URL}/updatefacilities/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating Facility ${err}`)
  }
};
export const deleteFacility = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${URL}/deletefacilities/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during deleting Facility ${err}`)
  }
};

// events CRUD

export const addEvent = async(formdata) =>{
  try{
    console.log(formdata)

    return await axios.post(`${URL}/addevents`,formdata)
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding events ${err}`)
  }
}
export const fetchEvents = async(name) =>{

  // id can be null if we need to view all user
  name = name || '';
  try{
     return await axios.get(`${URL}/getevents/${name}`);
  }
  catch(err){
      console.log("Error occurs while running fetching events function",err);
  }
};
export const updateEvents = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${URL}/updateevents/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating events ${err}`)
  }
};
export const deleteEvents = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteevents/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching event function",err);
  }
};

// artist CRUD

export const addArtist = async(formdata) =>{
  try{
    return await axios.post(`${URL}/addartists`,formdata);
  }
  catch(err){
      console.log(formdata)
    console.log(`Error occur during adding artists ${err}`)
  }
}
export const fetchArtist = async(name) =>{
  // id can be null if we need to view all user
  name = name || '';
  try{
     return await axios.get(`${URL}/getartists/${name}`);
  }
  catch(err){
      console.log("Error occurs while running fetching artists function",err);
  }
};
export const updateArtist = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${URL}/updateartists/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during updating artists ${err}`)
  }
};
export const deleteArtist = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.delete(`${URL}/deleteartists/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching artists function",err);
  }
};

// order apis

export const fetchOrder = async(id) =>{
  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.get(`${URL}/getorderfordest/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching orders function",err);
  }
};
export const updateShippedStatus = async(id,formdata) =>{
  try{
    id = id || '';
    console.log(id)
    return await axios.put(`${URL}/ordershipped/${id}`,formdata)
    
  }
  catch(err){
    console.log(`Error occur during shipping order ${err}`)
  }
};

export const deleteOrder = async (id, cancellation_reason) => {
  id = id || '';
  console.log(cancellation_reason);

  try {
    return await axios.delete(`${URL}/ordercancle/${id}`, {
      data: { cancellation_reason }, // Include the data in the request body
    });
  } catch (err) {
    console.log("Error occurs while running canceling order function", err);
  }
};
export const fetchSummary = async(id) =>{

  // id can be null if we need to view all user
  id = id || '';
  try{
     return await axios.get(`${URL}/getplaces/${id}`);
  }
  catch(err){
      console.log("Error occurs while running fetching summary function",err);
  }
};
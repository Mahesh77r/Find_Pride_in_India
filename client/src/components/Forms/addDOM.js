import React, { useState } from 'react';
import { addDOM } from '../../services/domCRUD';
import { Toaster, toast } from 'react-hot-toast'

export default function AddDOM() {
  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    mobileNumber: '',
    destinationName: '',
    summary:'',
    city: '',
    state: '',
    address: '',
    // location: '',
    // hidden
    // destination_id: '',
  });

  // form data
  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };
  // file
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // Handle form submission here  
    let loadingToast
    try {
      loadingToast = toast.loading("Processing...");
      const DOMData = {
        ...formData,
        image:selectedFile
      }
      console.log(DOMData)
      const res = await addDOM(DOMData);
      if(res.status === 200){
        toast.success("Destination Register successfully");
      }
      else{
        toast.error("Failed to Register");
      }
    } catch (error) {
      
    }finally{
      toast.dismiss(loadingToast);
    }
    

  };

  return (
    <>
    <Toaster position='top-center'/>
      <h2 className="md:text-4xl text-xl my-3 text-center font-semibold mb-4">
        Register <span className='text-indigo-500'>Destination Organization Management</span>
      </h2>
      <div className="w-full border mx-auto p-6 bg-white rounded-md ">
        <form onSubmit={handleSubmit}>
          <div className='md:grid md:grid-rows-3'>
            {/* first row */}
            <div className="my-2 md:grid  md:grid-flow-col gap-2">
              {/* destination Name */}
              <div>
                <label htmlFor="placeName" className="block text-gray-600">Destination Name</label>
                <input
                  type="text"
                  name="destinationName"
                  value={formData.destinationName}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              {/* Admin Name */}
              <div>
                <label htmlFor="adminName" className="block text-gray-600">Admin Name</label>
                <input
                  type="text"
                  id="adminName"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            </div>
            {/* second row */}
            <div className="my-2 md:grid  md:grid-flow-col gap-2">
              {/* State */}
              <div>
                <label htmlFor="state" className="block text-gray-600">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              {/* City */}
              <div>
                <label htmlFor="City" className="block text-gray-600">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              {/* address */}
              <div className='col-span-2'>
                <label htmlFor="Address" className="block text-gray-600">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            </div>
            {/* third row */}
            <div className="my-2 md:grid  md:grid-flow-col gap-2">
              {/* mobileNumber */}
              <div>
                <label htmlFor="mobileNumber" className="block text-gray-600">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              {/* email */}
              <div>
                <label htmlFor="email" className="block text-gray-600">E-Mail Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              
            </div>
            {/* summary */}
            <div>
            <label htmlFor="adminName" className="block text-gray-600">Summay about Destination</label>
              <textarea type="text"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required></textarea>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="placeImages" className="block text-gray-600">Place Images</label>
            <input
              type="file"
              onChange={handleFileChange}
              name='image'
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"  >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};



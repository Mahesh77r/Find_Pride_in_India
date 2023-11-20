import React from 'react'

export const TopNavbar = () => {
  // fixed navbar
  const navbarStyle = {
    position: 'sticky',
    top: 0,
    left: 0,
    width: '100%',
    paddingBottom: '5px',
    backgroundColor: 'white', // You can set the background color as needed
    zIndex: 1000, // You can adjust the z-index as needed
  };
  return (
    <>
    <div style={navbarStyle} className="flex space-x-4 justify-evenly h-20">
  <img
    src="https://tourism.gov.in/modules/cmf/cmf_design/images/G20img.jpg"
    alt="tourism 1"
    className=" aspect-w-2 aspect-h-2 object-cover"
  />
  <img
    src="https://tourism.gov.in/modules/cmf/cmf_design/images/utsav_logo1.jpg"
    alt="tourism 2"
    className=" aspect-w-3 aspect-h-2 object-cover"
  />
  <img
    src="https://tourism.gov.in/modules/cmf/cmf_design/images/visit_india_2023_new.jpg"
    alt="tourism 3"
    className=" aspect-w-3 aspect-h-2 object-cover"
  />
  <img
    src="https://tourism.gov.in/modules/cmf/cmf_design/images/swach-bharat.png"
    alt="tourism 4"
    className=" aspect-w-3 aspect-h-2 object-cover"
  />
</div>



    </>
  )
}

import Guide1 from "../images/Guide1.jpg";
import Guide2 from "../images/Guide2.jpg";
import Guide3 from "../images/guides/guide3.jpeg";
import Guide4 from "../images/guides/guide2.jpeg";

import PlaceImg from "../images/BapuKuti.webp";
import PlaceImg2 from "../images/Events/Bajajwadi.jpg";
import PlaceImg3 from "../images/Events/vishwa-shanti-stupa.jpg";
import PlaceImg4 from "../images/Events/Magan-Sangrahalaya.jpg";
import PlaceImg5 from "../images/Events/gitai_mandir.jpeg";
import Prod1 from "../images/Prod1.jpg";
import Prod2 from "../images/Prod2.jpg";
import Prod3 from "../images/products/pottery.jpeg";
import Prod4 from "../images/products/soap.jpg";
import Prod5 from "../images/products/spices.jpeg";

import facility1 from "../images/facilities/parking.jpeg"
import facility2 from "../images/facilities/hospital.jpeg"
import facility3 from "../images/facilities/hotel.jpg"
import facility4 from "../images/facilities/police-station.jpeg"

export const GuideData = [
    {
      guidename: "Ganesh Golhar",
      img_url: Guide1,
      fees: 1000,
      contact_number: 7556945211,
    },
    {
      guidename: "John Doe",
      img_url: Guide2,
      fees: 1200,
      contact_number: 1234567890,
    },
    {
      guidename: "Will Smith",
      img_url: Guide3,
      fees: 1500,
      contact_number: 9876543210,
    },
    {
      guidename: "Jane Smith",
      img_url: Guide2,
      fees: 1500,
      contact_number: 9876543210,
    },
    {
      guidename: "Alice Johnson",
      img_url: Guide4,
      fees: 900,
      contact_number: 5551234567,
    },
  ];

  export  const FamousPlaces = [
    {
      imgURL: PlaceImg,
      eventName: "Sevagram Ashram",
      descrip:
        "Founded by Mahatma Gandhi in 1936, this ashram played a vital role in India's struggle for independence.",
      date : "2 october 2002",
    },
    {
      imgURL: PlaceImg2,
      eventName: "Bajajwadi",
      descrip:
        "The ancestral home of the Bajaj family, a prominent industrialist family in India.",
        Date : "10 december 2007",
    },
    {
      imgURL: PlaceImg3,
      eventName: "Vishwa Shanti Stupa",
      descrip:
        "A Buddhist stupa dedicated to world peace and non-violence, offering serene surroundings and panoramic views.",
        Date : "12 january 2020",
    },
    {
      imgURL: PlaceImg4,
      eventName: "Magan Sangrahalaya",
      descrip:
        "A museum exhibiting the life and work of Maganlal Gandhi, a close associate of Mahatma Gandhi.",
        Date : "30 june 2000",
    },
    {
      imgURL: PlaceImg5,
      eventName: "Gitai Mandir",
      descrip:
        "A temple dedicated to Lord Krishna, known for its beautiful architecture and serene ambiance.",
        Date : "19 april 2012",
    },
  ];

  export const WardhaProducts = [
    {
      product_name: "Handwoven Wardha Saree",
      product_price: 1000,
      product_descp:
        "A traditional handwoven saree, known for its intricate designs and vibrant colors.",
      prod_img_url: Prod1,
      quantity_available: 50,
    },
    {
      product_name: "Wardha Goras Pak",
      product_price: 250,
      product_descp:
        "Delicious Goras Pak made from locally Wardha Ghee Cookies.",
      prod_img_url: Prod2,
      quantity_available: 100,
    },
    {
      product_name: "Wardha Pottery Set",
      product_price: 800,
      product_descp:
        "A set of beautifully crafted pottery items, including mugs, bowls, and vases.",
      prod_img_url: Prod3,
      quantity_available: 20,
    },
    {
      product_name: "Wardha Herbal Soap",
      product_price: 50,
      product_descp:
        "Handmade herbal soap with natural ingredients, perfect for skin care.",
      prod_img_url: Prod4,
      quantity_available: 200,
    },
    {
      product_name: "Wardha Spices Collection",
      product_price: 300,
      product_descp:
        "A collection of locally sourced spices, including chili powder, turmeric, and cumin.",
      prod_img_url: Prod5,
      quantity_available: 75,
    },
  ];

  export const Facilities= [
    {
      facility_name: "Parking",
      contact_detail: "123-456-7890",
      img_url: facility1,
      location_url: "https://maps.google.com/?q=Parking"
    },
    {
      facility_name: "Hospital",
      contact_detail: "987-654-3210",
      img_url: "https://example.com/hospital.jpg",
      location_url: "https://maps.google.com/?q=Hospital"
    },
    {
      facility_name: "Hotel",
      contact_detail: "456-789-0123",
      img_url: "https://example.com/hotel.jpg",
      location_url: "https://maps.google.com/?q=Hotel"
    },
    {
      facility_name: "Police Station",
      contact_detail: "555-123-4567",
      img_url: "https://example.com/police_station.jpg",
      location_url: "https://maps.google.com/?q=Police+Station"
    }
  ]
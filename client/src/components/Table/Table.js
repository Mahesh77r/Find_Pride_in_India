import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Table() {

  const customStyles = {
    rows: {
        style: {
            // override the row height
            minHeight: '48px'

        },
    },
    headRow: {
        style: {
            backgroundColor: '#fa8057',

        }
    },
    headCells: {
        style: {
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "uppercase",
            borderStyle: 'solid',
            borderWidth: '1px',
            color: 'white'
            
        }
    },
    cells: {
        style: {
            fontSize: "15px",
            wordBreak: 'break-word',
            borderStyle: 'solid',
            borderWidth: '1px',
            color: '#1c8c59'

        }
    }
}


  const columns = [
    {
      name: "Point Number",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Point Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Text Data",
      selector: (row) => row.Tdata,
      sortable: true,
    },
    
    {
      name: "Images",
      selector: (row) => row.imgno,
      sortable: true,
    },
    {
      name: "Audio",
      selector: (row) => row.audno,
      sortable: true,
    },
    {
      name: "Number of Visits per day",
      selector: (row) => row.visits,
      sortable: true,
    },
    {
      name: "Actions", // Add a new column for actions
      cell: (row) => (
        <div>
          <button
            // onClick={() => handleEdit(row)} // Replace handleEdit with your edit function
            className="btn btn-warning btn-sm"
            style={{ marginRight: "5px" }}
          >
            Edit
          </button>
          <button
            // onClick={() => handleDelete(row.id)} // Replace handleDelete with your delete function
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      )
    },
    
  ];
  const data = [
    
      {
        id: 1,
        number: "1",
        name: "Bapu Kuti",
        Tdata: "The cadence of prayers at brahma-.......................",
        imgno: "4",
        audno: "2",
        visits :"20"
      },
      {
        "id": 2,
        "number": "2",
        "name": "Mystic Falls",
        "Tdata": "Nestled in the heart of the ancient forest, Mystic Falls is a place of serene beauty...",
        "imgno": "7",
        "audno": "3",
        "visits": "35"
      },
      {
        "id": 3,
        "number": "3",
        "name": "Sunset Beach",
        "Tdata": "Sunset Beach offers a breathtaking view of the crimson skies...",
        "imgno": "5",
        "audno": "1",
        "visits": "42"
      },
      {
        "id": 4,
        "number": "4",
        "name": "Mountain Peak Retreat",
        "Tdata": "Elevate your spirits at the Mountain Peak Retreat, where solitude meets majesty...",
        "imgno": "6",
        "audno": "2",
        "visits": "18"
      },
      {
        "id": 5,
        "number": "5",
        "name": "Historic Castle",
        "Tdata": "Step back in time and explore the grandeur of the historic castle...",
        "imgno": "9",
        "audno": "4",
        "visits": "28"
      },
      {
        "id": 6,
        "number": "6",
        "name": "Tropical Paradise",
        "Tdata": "Relax on the sandy shores of the Tropical Paradise and let the gentle waves embrace you...",
        "imgno": "3",
        "audno": "1",
        "visits": "56"
      },
      {
        "id": 7,
        "number": "7",
        "name": "Enchanted Forest",
        "Tdata": "Discover the wonders hidden deep within the Enchanted Forest...",
        "imgno": "8",
        "audno": "2",
        "visits": "23"
      },
      {
        "id": 8,
        "number": "8",
        "name": "Lighthouse Cove",
        "Tdata": "The Lighthouse Cove beckons with its guiding light and tales of the sea...",
        "imgno": "4",
        "audno": "2",
        "visits": "31"
      },
      {
        "id": 9,
        "number": "9",
        "name": "Azure Waters",
        "Tdata": "Dive into the azure waters and explore the vibrant marine life...",
        "imgno": "6",
        "audno": "3",
        "visits": "39"
      },
      {
        "id": 10,
        "number": "10",
        "name": "Serenity Falls",
        "Tdata": "Serenity Falls, where tranquility flows in harmony with nature...",
        "imgno": "5",
        "audno": "1",
        "visits": "27"
      },
      {
        "id": 11,
        "number": "11",
        "name": "Moonlit Meadow",
        "Tdata": "In the embrace of the Moonlit Meadow, discover the magic of the night...",
        "imgno": "7",
        "audno": "2",
        "visits": "16"
      },
      {
        "id": 12,
        "number": "12",
        "name": "Golden Sands",
        "Tdata": "The Golden Sands shimmer in the sunlight, inviting you to bask in their warmth...",
        "imgno": "4",
        "audno": "1",
        "visits": "45"
      },
      {
        "id": 13,
        "number": "13",
        "name": "Whispering Pines",
        "Tdata": "Amongst the Whispering Pines, find solace in the gentle murmur of the woods...",
        "imgno": "8",
        "audno": "3",
        "visits": "22"
      },
      {
        "id": 14,
        "number": "14",
        "name": "Crystal Caves",
        "Tdata": "Journey into the depths of the Crystal Caves, where crystals illuminate your path...",
        "imgno": "6",
        "audno": "4",
        "visits": "30"
      },
      {
        "id": 15,
        "number": "15",
        "name": "Majestic Castle",
        "Tdata": "Marvel at the grandeur of the Majestic Castle, an architectural masterpiece...",
        "imgno": "9",
        "audno": "2",
        "visits": "37"
      }
    
  ];
  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div className="container " style={{ padding: "2% ", backgroundColor: "white", backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png");' , color : "#1c8c59"  }}>
      <div className="text-end" style={{display:"flex",justifyContent:"left",padding:"0.2% 0.2% "}}>
          <input
            type="text"
            placeholder="Search Point Name"
            className=" border-bottom border-success mb-3 bg-white custumShadow p-2 px-2 inputField text-center"
            onChange={handleFilter}
          />
        </div>
          
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
          customStyles={customStyles}  style={{color : "#1c8c59" }}
        ></DataTable>
    </div>
  );
}

export default Table;


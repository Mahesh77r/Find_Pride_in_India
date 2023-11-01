
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphData = [
  {
    name:"John Doe",
    email: "john.doe@example.com",
    password: "secret123",
    country: "United States",
    state: "California",
    age: 30,
    gender: "Male",
    work: "Software Engineer"
  },
  {
    name:"Jane Smith",
    email: "jane.smith@example.com",
    password: "secure456",
    country: "Canada",
    state: "Ontario",
    age: 28,
    gender: "Female",
    work: "Student"
  },
  {
    name:"David Johnson",
    email: "david.j@example.com",
    password: "mypass789",
    country: "United Kingdom",
    state: "London",
    age: 35,
    gender: "Male",
    work: "Traveler"
  },
  {
    name:"Sarah Williams",
    email: "sarah.w@example.com",
    password: "pass1234",
    country: "Australia",
    state: "New South Wales",
    age: 29,
    gender: "Female",
    work: "Vlogger"
  },
  {
    name:"Michael Brown",
    email: "michael.b@example.com",
    password: "pwd5678",
    country: "Germany",
    state: "Bavaria",
    age: 32,
    gender: "Male",
    work: "Professor"
  },
  {
    name:"Emily Davis",
    email: "emily.d@example.com",
    password: "securepass",
    country: "France",
    state: "Île-de-France",
    age: 27,
    gender: "Female",
    work: "Traveler"
  },
  {
    name:"Robert Wilson",
    email: "robert.w@example.com",
    password: "password123",
    country: "Canada",
    state: "Alberta",
    age: 31,
    gender: "Male",
    work: "Engineer"
  },
  {
    name:"Linda Davis",
    email: "linda.d@example.com",
    password: "12345678",
    country: "United States",
    state: "New York",
    age: 26,
    gender: "Female",
    work: "Teacher"
  },
  {
    name:"Chris Evans",
    email: "chris.e@example.com",
    password: "pass123",
    country: "United Kingdom",
    state: "Manchester",
    age: 34,
    gender: "Male",
    work: "Doctor"
  },
  {
    name:"Amy Johnson",
    email: "amy.j@example.com",
    password: "amy12345",
    country: "Australia",
    state: "Victoria",
    age: 29,
    gender: "Female",
    work: "Artist"
  },
  {
    name:"Richard Brown",
    email: "richard.b@example.com",
    password: "brown789",
    country: "Canada",
    state: "Ontario",
    age: 30,
    gender: "Male",
    work: "Designer"
  },
  {
    name:"Catherine Lee",
    email: "catherine.l@example.com",
    password: "cathy123",
    country: "United States",
    state: "Texas",
    age: 27,
    gender: "Female",
    work: "Student"
  },
  {
    name:"Daniel Lee",
    email: "daniel.l@example.com",
    password: "daniel123",
    country: "Canada",
    state: "British Columbia",
    age: 32,
    gender: "Male",
    work: "Architect"
  },
  {
    name:"Olivia Johnson",
    email: "olivia.j@example.com",
    password: "olivia456",
    country: "Australia",
    state: "New South Wales",
    age: 28,
    gender: "Female",
    work: "Researcher"
  },
  {
    name:"Sophia Smith",
    email: "sophia.s@example.com",
    password: "sophia789",
    country: "United Kingdom",
    state: "London",
    age: 33,
    gender: "Female",
    work: "Consultant"
  }
]

export function Chart() {
  const [selectedField, setSelectedField] = useState('age');

  const calculateData = (field) => {
    const dataMap = {};
    GraphData.forEach((item) => {
      const value = item[field];
      if (!dataMap[value]) {
        dataMap[value] = 1;
      } else {
        dataMap[value] += 1;
      }
    });

    const labels = Object.keys(dataMap);
    const data = Object.values(dataMap);

    return {
      labels,
      data,
    };
  };

  const { labels, data } = calculateData(selectedField);

  const chartData = {
    labels,
    datasets: [
      {
        label: selectedField,
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='w-80 h-80'>
      <select onChange={(e) => setSelectedField(e.target.value)}>
        {Object.keys(GraphData[0]).map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <Pie data={chartData} />
    </div>
  );
}


// import React, { useState } from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const GraphData = [
//   {
//     name:"John Doe",
//     email: "john.doe@example.com",
//     password: "secret123",
//     country: "United States",
//     state: "California",
//     age: 30,
//     gender: "Male",
//     work: "Software Engineer"
//   },
//   {
//     name:"Jane Smith",
//     email: "jane.smith@example.com",
//     password: "secure456",
//     country: "Canada",
//     state: "Ontario",
//     age: 28,
//     gender: "Female",
//     work: "Student"
//   },
//   {
//     name:"David Johnson",
//     email: "david.j@example.com",
//     password: "mypass789",
//     country: "United Kingdom",
//     state: "London",
//     age: 35,
//     gender: "Male",
//     work: "Traveler"
//   },
//   {
//     name:"Sarah Williams",
//     email: "sarah.w@example.com",
//     password: "pass1234",
//     country: "Australia",
//     state: "New South Wales",
//     age: 29,
//     gender: "Female",
//     work: "Vlogger"
//   },
//   {
//     name:"Michael Brown",
//     email: "michael.b@example.com",
//     password: "pwd5678",
//     country: "Germany",
//     state: "Bavaria",
//     age: 32,
//     gender: "Male",
//     work: "Professor"
//   },
//   {
//     name:"Emily Davis",
//     email: "emily.d@example.com",
//     password: "securepass",
//     country: "France",
//     state: "Île-de-France",
//     age: 27,
//     gender: "Female",
//     work: "Traveler"
//   },
//   {
//     name:"Robert Wilson",
//     email: "robert.w@example.com",
//     password: "password123",
//     country: "Canada",
//     state: "Alberta",
//     age: 31,
//     gender: "Male",
//     work: "Engineer"
//   },
//   {
//     name:"Linda Davis",
//     email: "linda.d@example.com",
//     password: "12345678",
//     country: "United States",
//     state: "New York",
//     age: 26,
//     gender: "Female",
//     work: "Teacher"
//   },
//   {
//     name:"Chris Evans",
//     email: "chris.e@example.com",
//     password: "pass123",
//     country: "United Kingdom",
//     state: "Manchester",
//     age: 34,
//     gender: "Male",
//     work: "Doctor"
//   },
//   {
//     name:"Amy Johnson",
//     email: "amy.j@example.com",
//     password: "amy12345",
//     country: "Australia",
//     state: "Victoria",
//     age: 29,
//     gender: "Female",
//     work: "Artist"
//   },
//   {
//     name:"Richard Brown",
//     email: "richard.b@example.com",
//     password: "brown789",
//     country: "Canada",
//     state: "Ontario",
//     age: 30,
//     gender: "Male",
//     work: "Designer"
//   },
//   {
//     name:"Catherine Lee",
//     email: "catherine.l@example.com",
//     password: "cathy123",
//     country: "United States",
//     state: "Texas",
//     age: 27,
//     gender: "Female",
//     work: "Student"
//   },
//   {
//     name:"Daniel Lee",
//     email: "daniel.l@example.com",
//     password: "daniel123",
//     country: "Canada",
//     state: "British Columbia",
//     age: 32,
//     gender: "Male",
//     work: "Architect"
//   },
//   {
//     name:"Olivia Johnson",
//     email: "olivia.j@example.com",
//     password: "olivia456",
//     country: "Australia",
//     state: "New South Wales",
//     age: 28,
//     gender: "Female",
//     work: "Researcher"
//   },
//   {
//     name:"Sophia Smith",
//     email: "sophia.s@example.com",
//     password: "sophia789",
//     country: "United Kingdom",
//     state: "London",
//     age: 33,
//     gender: "Female",
//     work: "Consultant"
//   }
// ]

// export function Chart() {
//   const [selectedFields, setSelectedFields] = useState(['age', 'gender', 'country']);

//   const calculateData = (fields) => {
//     const dataMap = {};

//     GraphData.forEach((item) => {
//       const key = fields.map((field) => item[field]).join('-');

//       if (!dataMap[key]) {
//         dataMap[key] = 1;
//       } else {
//         dataMap[key] += 1;
//       }
//     });

//     const labels = Object.keys(dataMap);
//     const data = Object.values(dataMap);

//     return {
//       labels,
//       data,
//     };
//   };

//   const { labels, data } = calculateData(selectedFields);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: selectedFields.join('-'),
//         data,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className='w-80 h-80'>
//       <select
//         multiple
//         onChange={(e) => {
//           const selected = Array.from(e.target.selectedOptions, (option) => option.value);
//           setSelectedFields(selected);
//         }}
//       >
//         {Object.keys(GraphData[0]).map((field) => (
//           <option key={field} value={field}>
//             {field}
//           </option>
//         ))}
//       </select>
//       <Pie data={chartData} />
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const GraphData = [
//   {
//     name:"John Doe",
//     email: "john.doe@example.com",
//     password: "secret123",
//     country: "United States",
//     state: "California",
//     age: 30,
//     gender: "Male",
//     work: "Software Engineer"
//   },
//   {
//     name:"Jane Smith",
//     email: "jane.smith@example.com",
//     password: "secure456",
//     country: "Canada",
//     state: "Ontario",
//     age: 28,
//     gender: "Female",
//     work: "Student"
//   },
//   {
//     name:"David Johnson",
//     email: "david.j@example.com",
//     password: "mypass789",
//     country: "United Kingdom",
//     state: "London",
//     age: 35,
//     gender: "Male",
//     work: "Traveler"
//   },
//   {
//     name:"Sarah Williams",
//     email: "sarah.w@example.com",
//     password: "pass1234",
//     country: "Australia",
//     state: "New South Wales",
//     age: 29,
//     gender: "Female",
//     work: "Vlogger"
//   },
//   {
//     name:"Michael Brown",
//     email: "michael.b@example.com",
//     password: "pwd5678",
//     country: "Germany",
//     state: "Bavaria",
//     age: 32,
//     gender: "Male",
//     work: "Professor"
//   },
//   {
//     name:"Emily Davis",
//     email: "emily.d@example.com",
//     password: "securepass",
//     country: "France",
//     state: "Île-de-France",
//     age: 27,
//     gender: "Female",
//     work: "Traveler"
//   },
//   {
//     name:"Robert Wilson",
//     email: "robert.w@example.com",
//     password: "password123",
//     country: "Canada",
//     state: "Alberta",
//     age: 31,
//     gender: "Male",
//     work: "Engineer"
//   },
//   {
//     name:"Linda Davis",
//     email: "linda.d@example.com",
//     password: "12345678",
//     country: "United States",
//     state: "New York",
//     age: 26,
//     gender: "Female",
//     work: "Teacher"
//   },
//   {
//     name:"Chris Evans",
//     email: "chris.e@example.com",
//     password: "pass123",
//     country: "United Kingdom",
//     state: "Manchester",
//     age: 34,
//     gender: "Male",
//     work: "Doctor"
//   },
//   {
//     name:"Amy Johnson",
//     email: "amy.j@example.com",
//     password: "amy12345",
//     country: "Australia",
//     state: "Victoria",
//     age: 29,
//     gender: "Female",
//     work: "Artist"
//   },
//   {
//     name:"Richard Brown",
//     email: "richard.b@example.com",
//     password: "brown789",
//     country: "Canada",
//     state: "Ontario",
//     age: 30,
//     gender: "Male",
//     work: "Designer"
//   },
//   {
//     name:"Catherine Lee",
//     email: "catherine.l@example.com",
//     password: "cathy123",
//     country: "United States",
//     state: "Texas",
//     age: 27,
//     gender: "Female",
//     work: "Student"
//   },
//   {
//     name:"Daniel Lee",
//     email: "daniel.l@example.com",
//     password: "daniel123",
//     country: "Canada",
//     state: "British Columbia",
//     age: 32,
//     gender: "Male",
//     work: "Architect"
//   },
//   {
//     name:"Olivia Johnson",
//     email: "olivia.j@example.com",
//     password: "olivia456",
//     country: "Australia",
//     state: "New South Wales",
//     age: 28,
//     gender: "Female",
//     work: "Researcher"
//   },
//   {
//     name:"Sophia Smith",
//     email: "sophia.s@example.com",
//     password: "sophia789",
//     country: "United Kingdom",
//     state: "London",
//     age: 33,
//     gender: "Female",
//     work: "Consultant"
//   }
// ]

// export function Chart() {
//   const [selectedFields, setSelectedFields] = useState(['age', 'gender', 'country']);

//   const calculateData = (fields) => {
//     const dataMap = {};

//     GraphData.forEach((item) => {
//       const key = fields.map((field) => item[field]).join('-');

//       if (!dataMap[key]) {
//         dataMap[key] = 1;
//       } else {
//         dataMap[key] += 1;
//       }
//     });

//     const labels = Object.keys(dataMap);
//     const data = Object.values(dataMap);

//     return {
//       labels,
//       data,
//     };
//   };

//   const { labels, data } = calculateData(selectedFields);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: selectedFields.join('-'),
//         data,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className='w-80 h-80'>
//       <select
//         multiple
//         onChange={(e) => {
//           const selected = Array.from(e.target.selectedOptions, (option) => option.value);
//           if (selected.length === 3) {
//             setSelectedFields(selected);
//           }
//         }}
//       >
//         {Object.keys(GraphData[0]).map((field) => (
//           <option key={field} value={field}>
//             {field}
//           </option>
//         ))}
//       </select>
//       <Pie data={chartData} />
//     </div>
//   );
// }

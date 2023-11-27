
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement, } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale,
  PointElement,
  LineElement, Legend);

const GraphData = [
  {
    name:"John Doe",
    email: "john.doe@example.com",
    password: "secret123",
    country: "United States",
    state: "California",
    age: 30,
    gender: "Male",
    work: "Software Engineer",
    Date: "30 may 2010"
  },
  {
    name:"Jane Smith",
    email: "jane.smith@example.com",
    password: "secure456",
    country: "Canada",
    state: "Ontario",
    age: 28,
    gender: "Female",
    work: "Student",
    Date: "3 may 2011"
  },
  {
    name:"David Johnson",
    email: "david.j@example.com",
    password: "mypass789",
    country: "United Kingdom",
    state: "London",
    age: 35,
    gender: "Male",
    work: "Traveler",
    Date: "30 april 2010"
  },
  {
    name:"Sarah Williams",
    email: "sarah.w@example.com",
    password: "pass1234",
    country: "Australia",
    state: "New South Wales",
    age: 29,
    gender: "Female",
    work: "Vlogger",
    Date: "30 may 2010"
  },
  {
    name:"Michael Brown",
    email: "michael.b@example.com",
    password: "pwd5678",
    country: "Germany",
    state: "Bavaria",
    age: 32,
    gender: "Male",
    work: "Professor",
    Date: "30 may 2010"
  },
  {
    name:"Emily Davis",
    email: "emily.d@example.com",
    password: "securepass",
    country: "France",
    state: "Île-de-France",
    age: 27,
    gender: "Female",
    work: "Traveler",
    Date: "30 sep 2012"
  },
  {
    name:"Robert Wilson",
    email: "robert.w@example.com",
    password: "password123",
    country: "Canada",
    state: "Alberta",
    age: 31,
    gender: "Male",
    work: "Engineer",
    Date: "30 sep 2012"
  },
  {
    name:"Linda Davis",
    email: "linda.d@example.com",
    password: "12345678",
    country: "United States",
    state: "New York",
    age: 26,
    gender: "Female",
    work: "Teacher",
    Date: "10 jan 2008"
  },
  {
    name:"Chris Evans",
    email: "chris.e@example.com",
    password: "pass123",
    country: "United Kingdom",
    state: "Manchester",
    age: 34,
    gender: "Male",
    work: "Doctor",
    Date: "30 jan 2002"
  },
  {
    name:"Amy Johnson",
    email: "amy.j@example.com",
    password: "amy12345",
    country: "Australia",
    state: "Victoria",
    age: 29,
    gender: "Female",
    work: "Artist",
    Date: "19 april 2002"
  },
  {
    name:"Richard Brown",
    email: "richard.b@example.com",
    password: "brown789",
    country: "Canada",
    state: "Ontario",
    age: 30,
    gender: "Male",
    work: "Designer",
    Date: "30 feb 2015"
  },
  {
    name:"Catherine Lee",
    email: "catherine.l@example.com",
    password: "cathy123",
    country: "United States",
    state: "Texas",
    age: 27,
    gender: "Female",
    work: "Student",
    Date: "30 may 2014"
  },
  {
    name:"Daniel Lee",
    email: "daniel.l@example.com",
    password: "daniel123",
    country: "Canada",
    state: "British Columbia",
    age: 32,
    gender: "Male",
    work: "Architect",
    Date: "30 may 2010"
  },
  {
    name:"Olivia Johnson",
    email: "olivia.j@example.com",
    password: "olivia456",
    country: "Australia",
    state: "New South Wales",
    age: 28,
    gender: "Female",
    work: "Researcher",
    Date: "30 feb 2015"
  },
  {
    name:"Sophia Smith",
    email: "sophia.s@example.com",
    password: "sophia789",
    country: "United Kingdom",
    state: "London",
    age: 33,
    gender: "Female",
    work: "Consultant",
    Date: "30 may 2010"
  }
]

export function Chart() {
  const [selectedField1, setSelectedField1] = useState('age');
  const [selectedField2, setSelectedField2] = useState('gender');

  const calculateData = (field1, field2) => {
    const dataMap = {};
    GraphData.forEach((item) => {
      const value1 = item[field1];
      const value2 = item[field2];
      const key = `${value1}-${value2}`;

      if (!dataMap[key]) {
        dataMap[key] = 1;
      } else {
        dataMap[key] += 1;
      }
    });

    const labels = Object.keys(dataMap);
    const data = Object.values(dataMap);

    return {
      labels,
      data,
    };
  };

  const { labels, data } = calculateData(selectedField1, selectedField2);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${selectedField1} & ${selectedField2}`,
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

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const linelabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
   const lineChartdata = {
    labels: GraphData.map(item => item.Date),
    datasets: [
      {
        label: 'Dataset 1',
        data: GraphData.map(item => item[selectedField1]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: GraphData.map(item => item[selectedField2]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  const calculateCountryData = () => {
    const countryDataMap = {};
  
    GraphData.forEach((item) => {
      const country = item['country'];
  
      if (!countryDataMap[country]) {
        countryDataMap[country] = 1;
      } else {
        countryDataMap[country] += 1;
      }
    });
  
    const countryLabels = Object.keys(countryDataMap);
    const countryData = Object.values(countryDataMap);
  
    return {
      countryLabels,
      countryData,
    };
  };
  
  const { countryLabels, countryData } = calculateCountryData();
  
  const areaChartData = {
    labels: countryLabels,
    datasets: [
      {
        label: 'Visitors by Country',
        data: countryData,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };
  
  const areaChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Visitors by Country',
      },
    },
  };

  return (
    <div className='flex'>
   <div className='w-96 h-3/4 mt-24 mb-6 ml-36'>
      <select onChange={(e) => setSelectedField1(e.target.value)}
      className='border border-black rounded-xl text-center ml-12'>
        {Object.keys(GraphData[0]).filter(field => field !== 'name' && field !== 'email' && field !== 'password').map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <select
      onChange={(e) => setSelectedField2(e.target.value)}
      className='ml-3 mb-3 border border-black rounded-xl text-center'>
        {Object.keys(GraphData[0]).filter(field => field !== 'name' && field !== 'email' && field !== 'password').map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <Pie data={chartData} width={300} height={300}/>
    </div>

    {/* <div className='mt-40 ml-60 max-w-xl h-4/6 w-auto'>
    <Line options={options} data={lineChartdata} />
    </div> */}
    <div className='mt-40 h-max w-1/2 ml-48'>
          <Bar options={areaChartOptions} data={areaChartData} />
    </div>
    </div>
  );
}



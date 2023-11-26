import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const ChartData = [

    {
        "tourist_name": "Ashwini Ukhalkar",
        "age_group": "18-25",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2018-05-20",
        "city": "Mumbai",
        "state": "Maharashtra",
        "country": "India",
        "dest_name": "Gateway of India"
    },
    {
        "tourist_name": "John Smith",
        "age_group": "26-35",
        "gender": "Male",
        "visit_type": "Virtual",
        "Date": "2020-09-12",
        "city": "New York",
        "state": "NY",
        "country": "USA",
        "dest_name": "Central Park"
    },
    {
        "tourist_name": "Sophie Johnson",
        "age_group": "36-50",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2019-07-30",
        "city": "London",
        "state": "England",
        "country": "UK",
        "dest_name": "Tower of London"
    },
    {
        "tourist_name": "Akio Yamamoto",
        "age_group": "18-25",
        "gender": "Male",
        "visit_type": "Virtual",
        "Date": "2021-11-05",
        "city": "Tokyo",
        "state": "Tokyo",
        "country": "Japan",
        "dest_name": "Tokyo Disneyland"
    },
    {
        "tourist_name": "Mia Andersson",
        "age_group": "26-35",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2018-12-18",
        "city": "Stockholm",
        "state": "Stockholm",
        "country": "Sweden",
        "dest_name": "Vasa Museum"
    },
    {
        "tourist_name": "Diego Fernandez",
        "age_group": "36-50",
        "gender": "Male",
        "visit_type": "Virtual",
        "Date": "2022-04-30",
        "city": "Buenos Aires",
        "state": "CABA",
        "country": "Argentina",
        "dest_name": "La Recoleta Cemetery"
    },
    {
        "tourist_name": "Ananya Gupta",
        "age_group": "18-25",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2019-10-15",
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "dest_name": "Qutub Minar"
    },
    {
        "tourist_name": "Marko Petrovic",
        "age_group": "26-35",
        "gender": "Male",
        "visit_type": "Virtual",
        "Date": "2020-06-22",
        "city": "Belgrade",
        "state": "Central Serbia",
        "country": "Serbia",
        "dest_name": "Belgrade Zoo"
    },
    {
        "tourist_name": "Lila Chen",
        "age_group": "36-50",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2021-02-08",
        "city": "Beijing",
        "state": "Beijing",
        "country": "China",
        "dest_name": "Forbidden City"
    },
    {
        "tourist_name": "Carlos Rodriguez",
        "age_group": "18-25",
        "gender": "Male",
        "visit_type": "Virtual",
        "Date": "2022-08-10",
        "city": "Mexico City",
        "state": "CDMX",
        "country": "Mexico",
        "dest_name": "Chapultepec Castle"
    },
    // ... 40 more entries ...
    {
        "tourist_name": "Sakura Tanaka",
        "age_group": "26-35",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2019-03-14",
        "city": "Osaka",
        "state": "Osaka",
        "country": "Japan",
        "dest_name": "Osaka Castle"
    },
    {
        "tourist_name": "Dmitri Ivanov",
        "age_group": "36-50",
        "gender": "Male",
        "visit_type": "Virtual",
        "Date": "2022-01-28",
        "city": "Moscow",
        "state": "Central Federal District",
        "country": "Russia",
        "dest_name": "Saint Basil's Cathedral"
    },
    {
        "tourist_name": "Yuki Kato",
        "age_group": "18-25",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2023-05-03",
        "city": "Kyoto",
        "state": "Kyoto",
        "country": "Japan",
        "dest_name": "Fushimi Inari Shrine"
    },
    {
        "tourist_name": "Lucas Silva",
        "age_group": "26-35",
        "gender": "Male",
        "visit_type": "Virtual",
        "Date": "2022-09-20",
        "city": "Rio de Janeiro",
        "state": "Rio de Janeiro",
        "country": "Brazil",
        "dest_name": "Christ the Redeemer"
    },
    {
        "tourist_name": "Aisha Al-Farsi",
        "age_group": "36-50",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2018-07-07",
        "city": "Muscat",
        "state": "Muscat",
        "country": "Oman",
        "dest_name": "Royal Opera House Muscat"
    },
    {
        "tourist_name": "Andrei Popov",
        "age_group": "18-25",
        "gender": "Male",
        "visit_type": "Virtual",
        "Date": "2020-03-12",
        "city": "Saint Petersburg",
        "state": "Northwestern Federal District",
        "country": "Russia",
        "dest_name": "Hermitage Museum"
    },
    {
        "tourist_name": "Leila Khatami",
        "age_group": "26-35",
        "gender": "Female",
        "visit_type": "On-site",
        "Date": "2021-10-28",
        "city": "Tehran",
        "state": "Tehran",
        "country": "Iran",
        "dest_name": "Azadi Tower"
    },   

  {
      "tourist_name": "Ashwini Ukhalkar",
      "age_group": "18-25",
      "gender": "Female",
      "visit_type": "On-site",
      "Date": "2022-10-02",
      "city": "Wardha",
      "state": "Maharashtra",
      "country": "India",
      "dest_name": "Bapu kuti"
  },
  {
      "tourist_name": "Rahul Deshmukh",
      "age_group": "26-35",
      "gender": "Male",
      "visit_type": "Off-site",
      "Date": "2022-11-15",
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "dest_name": "Shaniwar Wada"
  },
  {
      "tourist_name": "Priya Sharma",
      "age_group": "18-25",
      "gender": "Female",
      "visit_type": "On-site",
      "Date": "2022-09-05",
      "city": "Jaipur",
      "state": "Rajasthan",
      "country": "India",
      "dest_name": "Hawa Mahal"
  },
  
  {
      "tourist_name": "Amit Patel",
      "age_group": "36-50",
      "gender": "Male",
      "visit_type": "Off-site",
      "Date": "2023-02-20",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "dest_name": "Gateway of India"
  },

  {
    "tourist_name": "John Smith",
    "age_group": "36-50",
    "gender": "Male",
    "visit_type": "Off-site",
    "Date": "2023-02-20",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "dest_name": "Statue of Liberty"
},
{
    "tourist_name": "Maria Rodriguez",
    "age_group": "26-35",
    "gender": "Female",
    "visit_type": "On-site",
    "Date": "2023-05-12",
    "city": "Barcelona",
    "state": "Catalonia",
    "country": "Spain",
    "dest_name": "Sagrada Familia"
},

{
    "tourist_name": "Hiroshi Tanaka",
    "age_group": "26-35",
    "gender": "Male",
    "visit_type": "On-site",
    "Date": "2023-04-18",
    "city": "Tokyo",
    "state": "Tokyo",
    "country": "Japan",
    "dest_name": "Tokyo Tower"
},


]

export function ChartPlaceAdmin() {

    const getAgeGroups = () => {
        const ageGroups = ChartData.map((entry) => entry.age_group);
        return [...new Set(ageGroups)];
      };
      
      const countByAgeAndGender = () => {
        const ageGroups = getAgeGroups();
        const genderCounts = {};
      
        ageGroups.forEach((ageGroup) => {
          genderCounts[ageGroup] = { Male: 0, Female: 0 };
        });
      
        ChartData.forEach((entry) => {
          const { age_group, gender } = entry;
          genderCounts[age_group][gender]++;
        });
      
        return ageGroups.map((ageGroup) => ({
          ageGroup,
          maleCount: genderCounts[ageGroup].Male,
          femaleCount: genderCounts[ageGroup].Female,
        }));
      };
      
      const ageGenderData = countByAgeAndGender();

       const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Age VS Gender graph',
          },
        },
      };

       const options1 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Visits per Month',
          },
        },
      };
      
      
      const labels = ageGenderData.map((entry) => entry.ageGroup);
      
        const data = {
          labels,
          datasets: [
            {
              label: 'Male',
              data: ageGenderData.map((entry) => entry.maleCount),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Female',
              data: ageGenderData.map((entry) => entry.femaleCount),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        };

        // Extract unique months from the ChartData
const uniqueMonths = [...new Set(ChartData.map(entry => entry.Date.substring(0, 7)))];

const data1 = {
  labels: uniqueMonths,
  datasets: [
    {
      label: 'Virtual visit',
      data: uniqueMonths.map(month => ChartData.filter(entry => entry.Date.startsWith(month) && entry.visit_type === 'Virtual').length),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'On-site visit',
      data: uniqueMonths.map(month => ChartData.filter(entry => entry.Date.startsWith(month) && entry.visit_type === 'On-site').length),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

        
        
return (
  <div className='flex h-screen'>
    <div style={{ width: '50%', paddingRight: '10px' }}>
      <Bar options={options} data={data} />
    </div>
    <div style={{ width: '50%', paddingLeft: '10px' }}>
      <Line options={options1} data={data1} />
    </div>
  </div>
);
}
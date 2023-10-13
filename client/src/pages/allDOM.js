import React from 'react'
import './ScollCard.css';
import AddDOM from '../components/Forms/addDOM.js';
import { GuideCards, AddCards } from '../components/Cards/Cards';
// import Table from './components/Table/Table';

export default function AllDOM() {

  const GuideData = [
    { guidename: 'Ganesh Golhar', fees: 1000, contact_number: 7556945211 },
    { guidename: 'John Doe', fees: 1200, contact_number: 1234567890 },
    { guidename: 'Jane Smith', fees: 1500, contact_number: 9876543210 },
    { guidename: 'Jane Smith', fees: 1500, contact_number: 9876543210 },
    { guidename: 'Jane Smith', fees: 1500, contact_number: 9876543210 },
    { guidename: 'Alice Johnson', fees: 900, contact_number: 5551234567 },
  ];

  return (
    <>
      {/* <AddDOM/>  */}
      <div className='container'>

{/* Tourist Guide*/}
        <div className="scroll-container">
          <div className="scroll-content ">
            {GuideData.map((guide, index) => (
              <div key={index} className="min-w-[300px] p-4">
                <GuideCards
                  guidename={guide.guidename}
                  fees={guide.fees}
                  contact_number={guide.contact_number}
                />
              </div>
            ))}
            <div className="min-w-[300px] flex items-center p-4">
              <AddCards DataName="Tourist Guide" />
            </div>
          </div>
        </div>

      </div>







    </>
  )
}


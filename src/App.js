import './App.css';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import BarChart from 'react-bar-chart'
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Select from 'react-select';
import Modal from 'react-modal';
import { PieChart } from 'react-minimal-pie-chart';
import ReactSvgPieChart from "react-svg-piechart"




const App = () => {
  const [completeData, setCompleteData] = useState([])
  const [selectedCarDetailsArr, setSelectedCarDetailsArr] = useState([])
  const [itemSelected, setItemSelected] = useState(false)
  const[completeData2,setCompleteData2]=useState([])
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root');

  let barData = [] //this for barchart
  let PieChartData = []//this is for piechart
  let FilteredData=[]
  //call the generate User function on mount 
  useEffect(() => {
    generateUsers() //generates random users
  }, [])
  const India = Object.values(completeData).filter(item => {
    return item.address === 'India';
  });
  const Australia = Object.values(completeData).filter(item => {
    return item.address === 'Australia'
  })
  const England = Object.values(completeData).filter(item => {
    return item.address === "England"
  })
  if (India.length) {
    barData.push({
      "text": "India",
      "value": India.length
    })
  }
  if (Australia.length) {
    barData.push({
      "text": "Australia",
      "value": Australia.length
    })
  }
  if (England.length) {
    barData.push({
      "text": "England",
      "value": England.length
    })
  }
  function generateUsers() {
    let users = []
    for (let id = 1; id <= 1000; id++) {
      let username = faker.name.firstName();
      let address = faker.helpers.arrayElement(["India", "Australia", "England"])
      let email = faker.internet.email();
      let age = faker.helpers.arrayElement([25, 20, 30, 35])
      let phone = faker.phone.phoneNumber()
      let occupation = faker.helpers.arrayElement(["Teacher", "Driver", "Engineer", "Zoo-keeper"])
      const vehicle = faker.helpers.arrayElement(["Mahindra", "Tata", "Kia", "Toyota", "Tesla"])
      const carMaker = faker.helpers.arrayElement(["Ford", "Bmw", "Audi", "volkswagan"])
      users.push({
        "id": id,
        "username": username,
        "address": address,
        "email": email,
        "age": age,
        "phoneNumber": phone,
        "occupation": occupation,
        "vehicle": vehicle,
        "carMaker": carMaker

      });
    }
    return setCompleteData(users),setCompleteData2(users)
  }
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const techCompanies = [
    { label: "Mahindra", value: 1 },
    { label: "Tata", value: 2 },
    { label: "Kia", value: 3 },
    { label: "Toyota", value: 4 },
    { label: "Tesla", value: 5 },
  ];
  const handleChange = (selectedOption) => {
    const selectedCarDetails = Object.values(completeData).filter(item => {
      return item.vehicle === selectedOption.label && item.age === 20 || item.age === 25
    })
    setSelectedCarDetailsArr(selectedCarDetails)
  }

  const handleSingleDetails = (person) => {
    openModal()
    setItemSelected(person)
  }

  //pie chart filters
  const ford = Object.values(completeData).filter((item) => item.carMaker === "Ford")
  const bmw = Object.values(completeData).filter((item) => item.carMaker === "Bmw")

  const audi = Object.values(completeData).filter((item) => item.carMaker === "Audi")
  const volkswagan = Object.values(completeData).filter((item) => item.carMaker === "volkswagan")

  if (ford.length) {
    PieChartData.push({
      title: "Ford",
      value: ford.length,
      color: "#E38627"
    })
  }
  if (bmw.length) {
    PieChartData.push({
      title: "Bmw",
      value: bmw.length,
      color: "#C13C37"
    })
  }
  if (audi.length) {
    PieChartData.push({
      title: "Audi",
      value: audi.length,
      color: "#6A2135"
    })
  }
  if (volkswagan.length) {
    PieChartData.push({
      title: "volkswagen",
      value: audi.length,
      color: "#2d2d2d"
    })
  }

  console.log(ford, "ford")
  console.log(completeData, "complete")
  console.log(PieChartData, "piechart dats")

  return (
    <div className="App">
      <h2>Q1 : Bar chart According to which country users belongs to </h2>
      <div className='bar-chart'>
        <BarChart ylabel='Quantity'
          width={400}
          height={500}
          margin={margin}
          data={barData} />
      </div>
      <div className='piechart-container'>
        <div className='piechart'>
          <h2>Q2. Pie chart for car models on the basis of car maker</h2>
          <ReactSvgPieChart
            data={PieChartData}
            // If you need expand on hover (or touch) effect
            expandOnHover
            // If you need custom behavior when sector is hovered (or touched)
            onSectorHover={(d, i, e) => {
              if (d) {
                console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
              } else {
                console.log("Mouse leave - Index:", i, "Event:", e)
              }
            }}
          />
        </div>
      </div>
      <div className='filter'>
        <h2>Q4 : Create filter option for car models and cars age chart according to user Age range</h2>
        <Select options={techCompanies}
          onChange={handleChange}
        />
        {selectedCarDetailsArr && selectedCarDetailsArr.map((item) => {
          return (
            <div className='selectedCarDetails'>
              <div className='wrapper'>
                <h3> {item.username}</h3>
              </div>

            </div>
          )
        })}

      </div>
      <div className='virtualized'>
        <h2>Q5: virtualized List of Users with theri user namr and age</h2>
        <p>Here we are showing user name and country, when we click this , we are popping the modal and showing user complete details</p>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={50}
              rowCount={completeData.length}
              rowRenderer={({ key, index, style, parent }) => {
                const person = completeData[index];//assigning single single variable to person
                return <div className='item-list' key={key} onClick={() => handleSingleDetails(person)}>
                  <h3>{person.username}</h3>
                  <h6>{person.address}</h6>
                </div>
              }}
            />
          )}
        </AutoSizer>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='itemDetails'>
          <div className='item'>User Name :{itemSelected.username}</div>
          <div className='item'>Age:{itemSelected.age}</div>
          <div className='item'>vehicle:{itemSelected.vehicle}</div>
          <div className='item'>Occupation: {itemSelected.occupation}</div>
          <div className='item'>PhoneNumber:{itemSelected.phoneNumber}</div>
          <div className='close-container'>
            <div className='close' onClick={closeModal}>
              Close
            </div>
          </div>
        </div>
      </Modal>
    </div>

  );
}

export default App;

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
 
function Cabins() {

  const[showForm,setShowForm]=useState(true);
  // useEffect(function(){
  //   getCabins().then((data)=>console.log(data))
  // },[])
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Fillter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={()=>setShowForm((show)=>!show)}>Add New Cabine</Button>
        {!showForm && <CreateCabinForm/>} 
      </Row>
    </>
  );
}

export default Cabins;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateStudent(){
  const[id,setId]=useState("");
  const[name,setName]=useState("");
  const[place,setPlace]=useState("");
  const[phone,setPhone]=useState("");
  const[validation,setValidation]=useState(false);
  const navigate=useNavigate();

  // Function to check if input contains only letters and spaces
  const containsOnlyLetters = (text) => {
    return /^[A-Za-z\s]+$/.test(text);
  };

  // Function to check if input is a number
  const isNumeric = (text) => {
    return /^\d+$/.test(text);
  };
  
  // Function to check if phone is exactly 10 digits
  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSubmit=(e)=>{ 
    e.preventDefault(); 
    
    // Validate before submitting
    if(id.trim() === "" || !isNumeric(id)) {
      setValidation(true);
      return;
    }
    
    if(name.trim() === "" || !containsOnlyLetters(name)) {
      setValidation(true);
      return;
    }
    
    if(place.trim() === "" || !containsOnlyLetters(place)) {
      setValidation(true);
      return;
    }
    
    if(phone.trim() === "" || !isValidPhone(phone)) {
      setValidation(true);
      return;
    }
    
    const studentData={
      id: Number(id),
      name,
      place,
      phone
    };
    
    console.log(studentData);
    
    fetch("http://localhost:8000/students",{
      method:'POST',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(studentData)
    })
    .then((res)=>{
      if(!res.ok) {
        throw new Error("Failed to save student data");
      }
      alert("Student data saved successfully");
      navigate("/");
    })
    .catch((err)=>{
      alert("Error: " + err.message);
      console.log(err.message);
    })
  }

  return (
    <div className="container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input 
          type="text" 
          id="id" 
          name="id" 
          required 
          value={id} 
          onChange={e=>setId(e.target.value)}
          onFocus={()=>setValidation(true)}
        />
        {id.length===0 && validation && <span className="errorMsg">Please enter an ID</span>}
        {id.length > 0 && !isNumeric(id) && validation && <span className="errorMsg">ID must be a number</span>}
        
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          value={name} 
          onChange={e=>setName(e.target.value)}
          onFocus={()=>setValidation(true)}
        />
        {name.length===0 && validation && <span className="errorMsg">Please enter a name</span>}
        {name.length > 0 && !containsOnlyLetters(name) && validation && <span className="errorMsg">Name must contain only letters</span>}
        
        <label htmlFor="place">Place:</label>
        <input 
          type="text" 
          id="place" 
          name="place" 
          required 
          value={place} 
          onChange={e=>setPlace(e.target.value)}
          onFocus={()=>setValidation(true)}
        />
        {place.length===0 && validation && <span className="errorMsg">Please enter a place</span>}
        {place.length > 0 && !containsOnlyLetters(place) && validation && <span className="errorMsg">Place must contain only letters</span>}
        
        <label htmlFor="phone">Phone:</label>
        <input 
          type="text" 
          id="phone" 
          name="phone" 
          placeholder="10-digit number" 
          required 
          value={phone} 
          onChange={e=>setPhone(e.target.value)}
          onFocus={()=>setValidation(true)}
          maxLength={10}
        />
        {phone.length===0 && validation && <span className="errorMsg">Please enter a phone number</span>}
        {phone.length > 0 && !isNumeric(phone) && validation && <span className="errorMsg">Phone must contain only numbers</span>}
        {phone.length > 0 && isNumeric(phone) && phone.length !== 10 && validation && 
          <span className="errorMsg">Phone number must be exactly 10 digits</span>}
        
        <div>
          <button className="btn btn-save">Save</button>
          <Link to="/" className="btn btn-back">Back</Link>
        </div>
      </form>
    </div>
  )
}
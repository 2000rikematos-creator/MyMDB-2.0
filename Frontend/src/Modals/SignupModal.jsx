import React, {useState} from "react";
import Modal from "./Modal";
import FormInput from "../Components/Shared/FormInput";
import sendRequest from "../Hooks/HttpRequest"
import { v4 as uuidv4 } from 'uuid';
import "./SignupModal.css"

function SignupModal(props){

  const [formData, setFormData] = useState({email:"", username:"", password:""})
  const [loadingState, setloadingState] = useState(false)
  function onCloseHandler(){
    props.onClose()
    setFormData({email:"", username:"", password:""})
  }

  function handleChange(event){
      setFormData((prevValues)=>{
        return {...prevValues, [event.target.name]:event.target.value}
      })
  }

 async function handleSubmit(event){
    event.preventDefault();
    setloadingState(true)
    try{
    const response = await sendRequest(`${process.env.VITE_SERVER_URL}/api/users/signup`, "POST", formData)
    setloadingState(false)
    setFormData({email:"", username:"", password:""})
    props.onSuccess("signup", response)
    }catch(error){
      setloadingState(false)  
      props.onFailure("signup", error.message)
      console.log(error.message)
    }
    
  }

  if (!props.isOpen) return null;

 return <Modal onClose={props.onClose} title="Signup">
 {!loadingState ? <form className="signup-form" onSubmit={handleSubmit}>
    <div className="form-inputs">
      <FormInput className="input email-input" onChange={handleChange} type="text" placeholder="email" name="email" value={formData.email}/>
    <FormInput className="input username-input"  onChange={handleChange} type="text" placeholder="username" name="username" value={formData.username}/>
    <FormInput className="input password-input" onChange={handleChange} type="password" placeholder="password" name="password" value={formData.password}/>
    </div>
    
    <div className="signup-button-container">
      <FormInput className="button signup-button" disabled={loadingState} onChange={handleChange} type="submit" value="Signup"/>
    <button className="button cancel-signup-button" onClick={onCloseHandler}>Cancel</button>
     </div>
  </form> : <h1>Creating User</h1>} 
 </Modal>
}


export default SignupModal;
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import FormInput from '../Components/Shared/FormInput';
import sendRequest from '../Hooks/HttpRequest';
import LoadingModal from './LoadingModal';
import { jwtDecode } from 'jwt-decode';

const LoginModal = (props) => {

  const [formData, setFormData] = useState({email:"", password:""})
  const [loadingState, setLoadingState] = useState(false);

  function handleChange(event){
    setFormData((prevValues)=>{
      return {...prevValues, [event.target.name]:event.target.value}
    })
  }

 async function handleSubmit(event){
  event.preventDefault();
  setLoadingState(true)
  try{
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/login`,{method:"POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(formData)})
    
    const responseData = await response.json()
    if(!response.ok || !responseData.user){throw new Error({message:"could not login",error: responseData})}

    const userToken = responseData.user
    const storeToken = localStorage.setItem("token", userToken)
    
    const userDecoded = jwtDecode(userToken)
    const userData = userDecoded.data
    setFormData({email:"", password:""})
    setLoadingState(false)
    props.onSuccess("login",userData)
  }catch(error){
    console.log(error)
    setLoadingState(false)
    props.onFailure("login", error)
    console.log(error.message)
  }
   
  }

  function handleOnClose(){
    props.onClose()
    setFormData({email:"", password:""})
  }

 if(!props.isOpen) return null 
 
 return <Modal onClose={props.onClose} title="Login">
  {!loadingState ? <form className="signup-form" onSubmit={handleSubmit} >
    <div className='form-inputs'>
      <FormInput className="input email-input" onChange={handleChange} type="text" placeholder="email" name="email" value={formData.email}/>
      <FormInput className="input password-input" onChange={handleChange} type="password" placeholder="password" name="password" value={formData.password}/>
    </div>
      
      
     <div className='signup-button-container'> 
      <FormInput className="button signup-button" disabled={loadingState} onChange={handleChange} type="submit" value="login"/>
     <button className='button cancel-signup-button' onClick={handleOnClose}>Cancel</button>
      </div> 
      
    </form> : <LoadingModal />}
    
  </Modal>
 
};

export default LoginModal;
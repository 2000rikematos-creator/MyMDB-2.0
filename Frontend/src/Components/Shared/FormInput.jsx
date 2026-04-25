import React from "react"

function FormInput(props){
return <input className={props.className} value={props.value} onChange={props.onChange} type={props.type} placeholder={props.placeholder} disabled={props.disabled} name={props.placeholder} required={props.isRequired}  />
}

export default FormInput
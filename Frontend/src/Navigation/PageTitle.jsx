import React from "react"
import "./PageTitle.css"

function PageTitle(props){
   return <div className="page-title-container"><h1 className="where">{props.where}</h1></div>
}

export default PageTitle
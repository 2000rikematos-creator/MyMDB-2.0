import { Menu } from 'lucide-react';
import "./MenuSVG.css"

function MenuIcon(props){
  return (
    <Menu className='menu-icon' onClick={props.onClick}/>
  );
};

export default MenuIcon;
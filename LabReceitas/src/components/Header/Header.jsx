import logo from "../../assets/logoHeader.png"
import "./Header.css"

export function Header(){
    return (
        <header>
            <img src={logo} alt="Logo da página" width="90px" /> 
            <h1>LabReceitas</h1>
        </header>
    )
}
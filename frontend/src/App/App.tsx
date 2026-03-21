import '../App.css'
import { Router } from './Router';


function App() {
  const token = localStorage.getItem("token");

  return (
    <Router token={token}/>
  )
}

export default App;

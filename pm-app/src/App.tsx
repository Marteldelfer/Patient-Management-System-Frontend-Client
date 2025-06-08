import './index.css'
import { PatientScreen } from './screens/PatientScreen'
import { NavBar } from './components/Navbar'

function App() {

  return (
    <div>
      <NavBar></NavBar>
      <PatientScreen></PatientScreen>
    </div>
  )
}

export default App

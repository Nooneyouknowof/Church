import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import Schedule from './components/schedule.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-gray-100 p-10">
        <Home />
        {/* <Schedule /> */}
      </div>
    </>
  )
}

export default App

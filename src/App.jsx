import { useEffect, useState } from "react";
import home from "./components/home.jsx";
import Navbar from './components/navbar.jsx';

function App() {
  const [page, setPage] = useState(home);
  function pg(element) {return setPage(element)};

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbxQudTzhG5dOVVpVSgpVUro54GsK085XxiEkB5Z7TCZXCOood7i614NHjII5Kbq-enr/exec?endpoint=schedule")
    .then((res) => res.json())
    .then((json) => {
      setData(json);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch data:", err);
      setLoading(false);
    });
  }, []);

  return (<>
    <Navbar props={{pg, data, loading}}></Navbar>
    <div className="flex justify-center items-center bg-gray-100 p-10">
      {page}
    </div>
  </>);
}

export default App

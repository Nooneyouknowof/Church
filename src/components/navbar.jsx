import { useEffect, useState } from "react"
import home from "./home";
import Schedule from "./schedule";
import Pastor from "./Pastor";

export default function Navbar(props) {
    const [tabs, setTabs] = useState(["Home", "Sermons", "Eventos", "Pastor"])
    const [link, setLink] = useState([home, "", <Schedule props={props.props}></Schedule>, Pastor]);

    useEffect(() => {
        console.log(props);
        setLink([home, "", <Schedule props={props.props}></Schedule>, Pastor]);
    }, [props])

    return (
        <>
        <div className="flex items-center gap-5 bg-gray-900 p-4 text-white text-shadow">
            <img src="/adventist_logo.png" alt="Public image" className="h-15"/>
            <div className="flex justify-end items-center w-1000 gap-5">
                {tabs.map((tab, i) => <button onClick={() => {props.props.pg(link[i])}} className="text-2xl font-bold" key={i}>{tab}</button>)}
            </div>
            {/* <div className="text-2xl font-bold">&#9776;</div> */}
        </div>
        </>
    )
}
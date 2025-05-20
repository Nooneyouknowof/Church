import { useEffect, useState } from "react";

export default () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://script.google.com/macros/s/AKfycbxQudTzhG5dOVVpVSgpVUro54GsK085XxiEkB5Z7TCZXCOood7i614NHjII5Kbq-enr/exec?endpoint=schedule") // Replace with your Apps Script URL
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

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    if (loading) return <div className="p-4 text-gray-600">Loading...</div>;

    return (
        <div className="p-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
            <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Director</th>
                <th className="border px-4 py-2">Audio</th>
                <th className="border px-4 py-2">Camera</th>
                <th className="border px-4 py-2">Notified</th>
            </tr>
            </thead>
            <tbody>
            {data.map((entry, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{formatDate(entry.Date)}</td>
                <td className="border px-4 py-2">{entry.Status}</td>
                <td className="border px-4 py-2">{entry.Director?.Name}</td>
                <td className="border px-4 py-2">{entry.Audio?.Name}</td>
                <td className="border px-4 py-2">{entry.Camera?.Name}</td>
                <td className="border px-4 py-2">
                    {entry.Notified ? "✅" : "❌"}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
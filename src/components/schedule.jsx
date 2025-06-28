import { useEffect } from "react";
export default (props) => {
    const {loading, data} = props.props
    useEffect(() => {
        console.log(props);
    }, [props]);

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
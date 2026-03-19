import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const data = {
    labels: ["Bookings", "Revenue", "Users"],
    datasets: [
      {
        label: "Analytics",
        data: [120, 50000, 80]
      }
    ]
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="bg-white p-4 rounded shadow mt-4">
        <Bar data={data} />
      </div>
    </div>
  );
}
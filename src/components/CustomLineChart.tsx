import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "27 Jul", value1: 200, value2: 200 },
  { date: "28 Jul", value1: 400, value2: 300 },
  { date: "29 Jul", value1: 250, value2: 200 },
  { date: "30 Jul", value1: 200, value2: 250 },
];

export default function CustomLineChart() {
  return (
    <div className="w-full h-60 bg-white rounded-lg shadow-md p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="value1" stroke="#0080ff" strokeWidth={2} />
          <Line type="monotone" dataKey="value2" stroke="#00a000" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

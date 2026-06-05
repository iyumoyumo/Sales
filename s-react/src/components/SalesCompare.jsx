import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesCompare() {
  const sales = [
    { id: 1, employee: "山田太郎", date: "2024-06-01", amount: 50000 },
    { id: 2, employee: "佐藤花子", date: "2024-06-02", amount: 30000 },
    { id: 3, employee: "鈴木一郎", date: "2024-06-03", amount: 45000 },
    { id: 4, employee: "山田太郎", date: "2024-06-10", amount: 60000 },
    { id: 5, employee: "佐藤花子", date: "2024-07-01", amount: 70000 },
  ];

  const [mode, setMode] = useState("month"); // week | month | year

  const getYear = (d) => d.split("-")[0];

  const getMonth = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

  // ★ 月内の第◯週（あなた仕様）
  const getWeek = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const firstDay = new Date(year, month - 1, 1);
    const firstWeekDay = firstDay.getDay();
    const day = date.getDate();

    const weekNumber = Math.ceil((day + firstWeekDay) / 7);

    return `${year}年${month}月 第${weekNumber}週`;
  };

  // 集計
  const grouped = {};
  sales.forEach((s) => {
    const key =
      mode === "week"
        ? getWeek(s.date)
        : mode === "month"
        ? getMonth(s.date)
        : getYear(s.date);

    if (!grouped[key]) grouped[key] = 0;
    grouped[key] += s.amount;
  });

  const summary = Object.entries(grouped);

  // ★ グラフ用データ
  const chartData = {
    labels: summary.map(([period]) => period),
    datasets: [
      {
        label: "売上金額",
        data: summary.map(([_, total]) => total),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-2xl font-bold mb-4">売上比較</h2>

      {/* 切り替え */}
      <div className="flex space-x-3 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            mode === "week" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("week")}
        >
          週
        </button>

        <button
          className={`px-4 py-2 rounded ${
            mode === "month" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("month")}
        >
          月
        </button>

        <button
          className={`px-4 py-2 rounded ${
            mode === "year" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("year")}
        >
          年
        </button>
      </div>

      {/* 比較テーブル */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">期間</th>
            <th className="border p-2">売上合計</th>
          </tr>
        </thead>
        <tbody>
          {summary.map(([period, total]) => (
            <tr key={period} className="hover:bg-gray-100">
              <td className="border p-2">{period}</td>
              <td className="border p-2">{total.toLocaleString()} 円</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ★ 下部に縦棒グラフ */}
      <div className="h-80">
        <Bar data={chartData} />
      </div>
    </div>
  );
}

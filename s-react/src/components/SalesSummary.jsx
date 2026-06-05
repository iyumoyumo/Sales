import { useState } from "react";

export default function SalesSummary() {
  // ダミー売上データ（後で Laravel API に置き換える）
  const sales = [
    { id: 1, employee: "山田太郎", date: "2024-06-01", amount: 50000 },
    { id: 2, employee: "佐藤花子", date: "2024-06-02", amount: 30000 },
    { id: 3, employee: "鈴木一郎", date: "2024-06-03", amount: 45000 },
    { id: 4, employee: "山田太郎", date: "2024-06-10", amount: 60000 },
    { id: 5, employee: "佐藤花子", date: "2024-07-01", amount: 70000 },
  ];

  const [mode, setMode] = useState("month"); // "week" | "month" | "year"

  // 日付 → 年月週の計算
  const getYear = (d) => d.split("-")[0];
  const getMonth = (d) => d.slice(0, 7); // YYYY-MM
  const getWeek = (d) => {
    const date = new Date(d);
    const first = new Date(date.getFullYear(), 0, 1);
    const diff = Math.floor((date - first) / (24 * 60 * 60 * 1000));
    return `${date.getFullYear()}-W${Math.ceil(diff / 7)}`;
  };

  // 集計処理
  const grouped = {};
  sales.forEach((s) => {
    let key =
      mode === "week"
        ? getWeek(s.date)
        : mode === "month"
        ? getMonth(s.date)
        : getYear(s.date);

    if (!grouped[key]) grouped[key] = 0;
    grouped[key] += s.amount;
  });

  const summary = Object.entries(grouped);

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-2xl font-bold mb-4">売上集計</h2>

      {/* 集計モード切り替え */}
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

      {/* 集計結果テーブル */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">
              {mode === "week"
                ? "週"
                : mode === "month"
                ? "月"
                : "年"}
            </th>
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
    </div>
  );
}

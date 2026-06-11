import { useState, useEffect } from "react";

export default function SalesSummary() {
  const [sales, setSales] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("month"); // "week" | "month" | "year"

  // 🔥 API から sales / employees を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesRes = await fetch("http://localhost:8000/api/sales");
        const empRes = await fetch("http://localhost:8000/api/employees");

        const salesData = await salesRes.json();
        const empData = await empRes.json();

        setSales(salesData);
        setEmployees(empData);
      } catch (error) {
        console.error("API取得エラー:", error);
      }
    };

    fetchData();
  }, []);

  // 日付 → 年月週の計算
  const getYear = (d) => d.split("-")[0];
  const getMonth = (d) => d.slice(0, 7); // YYYY-MM

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

  // 🔥 集計処理（DBデータでそのまま動く）
  const grouped = {};
  sales.forEach((s) => {
    let key =
      mode === "week"
        ? getWeek(s.sale_date)
        : mode === "month"
        ? getMonth(s.sale_date)
        : getYear(s.sale_date);

    if (!grouped[key]) grouped[key] = 0;
    grouped[key] += Number(s.amount);
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
              {mode === "week" ? "週" : mode === "month" ? "月" : "年"}
            </th>
            <th className="border p-2">売上合計</th>
          </tr>
        </thead>

        <tbody>
          {summary.map(([period, total]) => (
            <tr key={period} className="hover:bg-gray-100">
              <td className="border p-2">{period}</td>
              <td className="border p-2">{Number(total).toLocaleString()} 円</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

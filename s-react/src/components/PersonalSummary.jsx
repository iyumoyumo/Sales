import { useState } from "react";

export default function PersonalSummary() {
  const sales = [
    { id: 1, employee: "山田太郎", date: "2024-06-01", amount: 50000 },
    { id: 2, employee: "山田太郎", date: "2025-02-10", amount: 60000 },
    { id: 6, employee: "山田太郎", date: "2024-07-01", amount: 3000 },
    { id: 7, employee: "山田太郎", date: "2024-08-10", amount: 20000 },
    { id: 8, employee: "山田太郎", date: "2024-09-01", amount: 1000 },
    { id: 9, employee: "山田太郎", date: "2024-10-10", amount: 100000 },
    { id: 3, employee: "佐藤花子", date: "2024-11-02", amount: 30000 },
    { id: 4, employee: "鈴木一郎", date: "2024-12-03", amount: 45000 },
    { id: 5, employee: "佐藤花子", date: "2025-01-01", amount: 70000 },
  ];

  const employees = ["山田太郎", "佐藤花子", "鈴木一郎"];
  const [selected, setSelected] = useState("");
  const [mode, setMode] = useState("month");

  const getYear = (d) => d.split("-")[0];

  const getMonth = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

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


  const filtered = sales.filter((s) => s.employee === selected);

  const grouped = {};
  filtered.forEach((s) => {
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

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-2xl font-bold mb-4">売上集計（個人別）</h2>

      <select
        className="border p-2 mb-4"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">社員を選択</option>
        {employees.map((e) => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>

      {selected && (
        <>
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
                  <td className="border p-2">{total.toLocaleString()} 円</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

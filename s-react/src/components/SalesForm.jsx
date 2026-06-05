import { useState } from "react";

export default function SalesForm() {
  // ダミー社員データ（後で Laravel API に置き換える）
  const employees = [
    { id: 1, name: "山田太郎" },
    { id: 2, name: "佐藤花子" },
    { id: 3, name: "鈴木一郎" },
  ];

  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    amount: "",
    memo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("売上登録データ: " + JSON.stringify(form));
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">売上登録</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* 社員選択 */}
        <div>
          <label className="block font-semibold mb-1">社員</label>
          <select
            name="employee_id"
            className="w-full border p-2 rounded"
            value={form.employee_id}
            onChange={handleChange}
            required
          >
            <option value="">選択してください</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* 日付 */}
        <div>
          <label className="block font-semibold mb-1">日付</label>
          <input
            type="date"
            name="date"
            className="w-full border p-2 rounded"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* 金額 */}
        <div>
          <label className="block font-semibold mb-1">売上金額</label>
          <input
            type="number"
            name="amount"
            className="w-full border p-2 rounded"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        {/* メモ */}
        <div>
          <label className="block font-semibold mb-1">メモ（任意）</label>
          <textarea
            name="memo"
            className="w-full border p-2 rounded"
            rows="3"
            value={form.memo}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          登録
        </button>
      </form>
    </div>
  );
}

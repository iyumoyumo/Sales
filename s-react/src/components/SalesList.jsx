export default function SalesList() {
  // ダミー売上データ（後で Laravel API に置き換える）
  const sales = [
    { id: 1, employee: "山田太郎", date: "2024-06-01", amount: 50000, memo: "新規契約" },
    { id: 2, employee: "佐藤花子", date: "2024-06-02", amount: 30000, memo: "更新契約" },
    { id: 3, employee: "鈴木一郎", date: "2024-06-03", amount: 45000, memo: "" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-2xl font-bold mb-4">売上一覧</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">社員</th>
            <th className="border p-2">日付</th>
            <th className="border p-2">金額</th>
            <th className="border p-2">メモ</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((s) => (
            <tr key={s.id} className="hover:bg-gray-100">
              <td className="border p-2">{s.id}</td>
              <td className="border p-2">{s.employee}</td>
              <td className="border p-2">{s.date}</td>
              <td className="border p-2">{s.amount.toLocaleString()} 円</td>
              <td className="border p-2">{s.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

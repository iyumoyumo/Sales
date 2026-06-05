export default function EmployeeList() {
  // ダミーデータ（後で Laravel API に置き換える）
  const employees = [
    { id: 1, name: "山田太郎", email: "taro@example.com", department: "営業" },
    { id: 2, name: "佐藤花子", email: "hanako@example.com", department: "総務" },
    { id: 3, name: "鈴木一郎", email: "ichiro@example.com", department: "開発" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-2xl font-bold mb-4">社員一覧</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">名前</th>
            <th className="border p-2">メール</th>
            <th className="border p-2">部署</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-100">
              <td className="border p-2">{emp.id}</td>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

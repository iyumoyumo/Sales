import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("社員取得エラー:", err));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">社員一覧</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">名前</th>
            <th className="border p-2">操作</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-100">
              <td className="border p-2">{emp.id}</td>
              <td className="border p-2">{emp.name}</td>

              <td className="border p-2 space-x-2">
                {/* 編集ボタン → 編集画面へ遷移 */}
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => navigate(`/employees/${emp.id}/edit`)}
                >
                  編集
                </button>

                {/* 削除ボタン → 削除確認画面へ遷移 */}
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => navigate(`/employees/${emp.id}/delete`)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

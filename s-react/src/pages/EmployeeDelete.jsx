import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔵 削除対象の社員データ取得
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employees/${id}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("社員取得エラー:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>読み込み中...</div>;
  if (!employee) return <div>データが見つかりません</div>;

  // 🔵 削除処理（DELETE）
  const handleDelete = async () => {
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await axios.delete(`http://localhost:8000/api/employees/${id}`);

      alert("削除しました");
      navigate("/employees"); // 一覧へ戻る
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4">社員削除</h2>

      <p className="mb-4">以下の社員を削除しますか？</p>

      <div className="mb-4 p-3 border rounded bg-gray-50">
        <p>ID: {employee.id}</p>
        <p>名前: {employee.name}</p>
      </div>

      <button
        className="px-4 py-2 bg-red-600 text-white rounded"
        onClick={handleDelete}
      >
        削除する
      </button>
    </div>
  );
}

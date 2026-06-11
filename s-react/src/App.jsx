import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./pages/EmployeeEdit";
import EmployeeDelete from "./pages/EmployeeDelete";

import SalesForm from "./components/SalesForm";
import SalesList from "./components/SalesList";


import PersonalSummary from "./components/PersonalSummary";
import PersonalCompare from "./components/PersonalCompare";
import SalesSummary from "./components/SalesSummary";
import SalesCompare from "./components/SalesCompare";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        
        {/* 左メニュー */}
        <aside className="w-60 bg-gray-800 text-white p-4 space-y-3">
          <h2 className="text-xl font-bold mb-4">メニュー</h2>

          <Link className="block w-full text-left hover:bg-gray-700 p-2" to="/employees/new">
            社員登録
          </Link>

          <Link className="block w-full text-left hover:bg-gray-700 p-2" to="/employees">
            社員一覧
          </Link>

          <Link className="block w-full text-left hover:bg-gray-700 p-2" to="/sales/new">
            売上登録
          </Link>

          <Link className="block w-full text-left hover:bg-gray-700 p-2" to="/sales">
            売上一覧
          </Link>

          <Link className="block w-full text-left hover:bg-gray-700 p-2" to="/summary/personal">
            売上集計（個人別）
          </Link>

          <Link className="block w-full text-left hover:bg-gray-700 p-2" to="/compare/personal">
            売上比較（個人別）
          </Link>

          <Link className="block w-full text-left hover:bg-gray-700 p-2" to="/summary">
            売上集計（週・月・年）
          </Link>

          <Link className="block w-full text-left hover:bg-gray-700 p-2" to="/compare">
            売上比較（週・月・年）
          </Link>
        </aside>

        {/* 右側コンテンツ */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>

            {/* 社員 */}
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/new" element={<EmployeeForm />} />
            <Route path="/employees/:id/edit" element={<EmployeeEdit />} />
            <Route path="/employees/:id/delete" element={<EmployeeDelete />} />

            {/* 売上 */}
            <Route path="/sales" element={<SalesList />} />
            <Route path="/sales/new" element={<SalesForm />} />
            

            {/* 集計・比較 */}
            <Route path="/summary/personal" element={<PersonalSummary />} />
            <Route path="/compare/personal" element={<PersonalCompare />} />
            <Route path="/summary" element={<SalesSummary />} />
            <Route path="/compare" element={<SalesCompare />} />

            {/* デフォルト */}
            <Route path="*" element={<EmployeeList />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import SalesForm from "./components/SalesForm";
import SalesList from "./components/SalesList";
import PersonalSummary from "./components/PersonalSummary";
import PersonalCompare from "./components/PersonalCompare";
import SalesSummary from "./components/SalesSummary";
import SalesCompare from "./components/SalesCompare";

export default function App() {
  const [screen, setScreen] = useState("employeeList");

  return (
    <div className="flex h-screen">
      {/* 左メニュー */}
      <aside className="w-60 bg-gray-800 text-white p-4 space-y-3">
        <h2 className="text-xl font-bold mb-4">メニュー</h2>

        <button className="block w-full text-left hover:bg-gray-700 p-2"
          onClick={() => setScreen("employeeForm")}>
          社員登録
        </button>

        <button className="block w-full text-left hover:bg-gray-700 p-2"
          onClick={() => setScreen("employeeList")}>
          社員一覧
        </button>

        <button className="block w-full text-left hover:bg-gray-700 p-2"
          onClick={() => setScreen("salesForm")}>
          売上登録
        </button>

        <button className="block w-full text-left hover:bg-gray-700 p-2"
          onClick={() => setScreen("salesList")}>
          売上一覧
        </button>

          <button className="block w-full text-left hover:bg-gray-700 p-2"
            onClick={() => setScreen("personalSummary")}>
            売上集計（個人別）
        </button>

        <button className="block w-full text-left hover:bg-gray-700 p-2"
            onClick={() => setScreen("personalCompare")}>
            売上比較（個人別）
        </button>

        <button className="block w-full text-left hover:bg-gray-700 p-2"
          onClick={() => setScreen("summary")}>
          売上集計（週・月・年）
        </button>

        <button className="block w-full text-left hover:bg-gray-700 p-2"
          onClick={() => setScreen("compare")}>
          売上比較（週・月・年）
        </button>

      </aside>

      {/* 右側コンテンツ */}
      <main className="flex-1 p-6 bg-gray-100">
        {screen === "employeeForm" && <EmployeeForm />}
        {screen === "employeeList" && <EmployeeList />}
        {screen === "salesForm" && <SalesForm />}
        {screen === "salesList" && <SalesList />}
        {screen === "personalSummary" && <PersonalSummary />}
        {screen === "personalCompare" && <PersonalCompare />}
        {screen === "summary" && <SalesSummary />}
        {screen === "compare" && <SalesCompare />}
      </main>
    </div>
  );
}

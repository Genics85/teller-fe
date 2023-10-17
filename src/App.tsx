import AddCustomer from "./pages/AddCustomer";
import AddTeller from "./pages/AddTeller";
import AddTransaction from "./pages/AddTransaction";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import TransactionsTable from "./pages/TransactionsTable";

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen bg-orange-200">
        <Routes>
          <Route path="" element={<Navigate replace to={"/login"} />} />
          <Route path="login" element={<Login />} />
          <Route path="teller" element={<AddTeller />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="add-customer" element={<AddCustomer />} />
            <Route path="transaction" element={<AddTransaction />} />
            <Route path="today-transactions" element={<TransactionsTable />} />
            <Route path="home" element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function ProtectedRoutes() {
  let id = sessionStorage.getItem("teller-id");
  return id ? <Outlet /> : <Navigate to={"/login"}/>;
}
export default App;

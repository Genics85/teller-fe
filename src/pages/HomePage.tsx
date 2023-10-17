import {Link} from "react-router-dom"

function HomePage() {
  return (
    <div className="w-full h-full  text-white flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4">
        <Link to={"/transaction"} className="w-full h-20 bg-red-600 shadow-sm font-bold text-xl p-4 flex rounded-md">
            Transaction
        </Link>
        <Link to={"/add-customer"} className="w-full h-20 bg-red-600 shadow-sm font-bold text-xl p-4 flex rounded-md">
            Add customer
        </Link>
        <Link to={"/today-transactions"} className="w-full h-20 bg-red-600 shadow-sm font-bold text-xl p-4 flex rounded-md">
            Todays Report
        </Link>
        {/* <Link to={"/user-info"} className="w-full h-20 bg-red-600 shadow-sm font-bold text-xl p-4 flex rounded-md">
            customer Details
        </Link> */}
        
      </div>
    </div>
  );
}

export default HomePage;

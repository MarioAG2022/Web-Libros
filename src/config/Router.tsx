import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from "../components/Footer";

const Home = lazy(() => import("../pages/home"));
const Register = lazy(() => import("../pages/register"));
const User = lazy(() => import("../pages/userProfile"));

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow bg-gray-100 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userProfile" element={<User />} />
          </Routes>
        </div>
      </div>

    </>
  );
};



const Router = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Layout />
			</Suspense>
		</BrowserRouter>
	);
};

export default Router;

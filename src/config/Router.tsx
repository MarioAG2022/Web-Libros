import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from "../components/Footer";

const Home = lazy(() => import("../pages/home"));
const Register = lazy(() => import("../pages/register"));

const Layout = () => {
	return (
		<>
			
			<div
				className="flex flex-col "
				
			>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Register" element={<Register />} />
				</Routes>
			</div>
			{/* <Footer /> */}
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

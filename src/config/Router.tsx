import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "../components/Footer";

const Home = lazy(() => import("../pages/home"));
const BookDetails = lazy(() => import("../pages/bookDetails"));

const Layout = () => {
	return (
		<>
			{/* <Navbar /> */}
			<div
				className="flex flex-col "
				// style={{ height: "100vh", width: "100vw" }}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/book-details" element={<BookDetails />} />
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

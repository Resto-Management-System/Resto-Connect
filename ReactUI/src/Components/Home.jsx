import { Link } from "react-router";
import React from "react";

const Home = () => {
	return (
		<div>
			<h1>Resto Connect</h1>
		<h1 className="back">Best Restaurants in City</h1>

			{/* <Link className="btn btn-primary" to="/login">
				Login Here
			</Link> */}
			<Link className="btn btn-primary" to="/register">
				Register Here
			</Link>
		</div>
	);
};

export default Home;

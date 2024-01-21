import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { UserOutlined } from "@ant-design/icons";

// import "../../styles/HeaderStyles.css";

const Header = () => {
	const [loginUser, setLoginUser] = useState('')
	const navigate = useNavigate()
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			setLoginUser(user)
		}
	}, [])

	const logOut = () => {
		localStorage.removeItem('user')
		message.success('Logout Successfully')
		navigate('/login')
	}
	return (
		<>
			<div className="container-fluid  px-0 wow fadeIn" data-wow-delay="0.1s">
				<nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
					<a href="index.html" className="navbar-brand ms-4 ms-lg-0">
						<h1 className="display-5 text-primary m-0">Khatabook</h1>
					</a>
					<button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
						data-bs-target="#navbarCollapse">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<div className="navbar-nav ms-auto p-4 p-lg-0">
							<Link to="/" className="nav-item nav-link active">Home</Link>
							<Link to="/login" className="nav-item nav-link" onClick={logOut}>Logout</Link>
							<Link to="/" className="nav-item nav-link text-capitalize font-weight-bold "> <UserOutlined className='text-success' /> {loginUser && loginUser.name}</Link>
							
						</div>						
					</div>
				</nav>
			</div>

			<div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
				<div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img className="w-100" src="img/carousel-1.jpg" alt="Image" />
							<div className="carousel-caption">
								<div className="container">
									<div className="row justify-content-start">
										<div className="col-lg-8">
											<p
												className="d-inline-block border border-white rounded text-primary fw-semi-bold py-1 px-3 animated slideInDown">
												Welcome to khatabook</p>
											<h1 className="display-1 mb-4 animated slideInDown">Your Transaction Status Is Our Goal
											</h1>											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="carousel-item">
							<img className="w-100" src="img/carousel-2.jpg" alt="Image" />
							<div className="carousel-caption">
								<div className="container">
									<div className="row justify-content-start">
										<div className="col-lg-7">
											<p
												className="d-inline-block border border-white rounded text-primary fw-semi-bold py-1 px-3 animated slideInDown">
												Welcome to khatabook</p>
											<h1 className="display-1 mb-4 animated slideInDown">True Transaction Support For You</h1>
											
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>





		</>
	);
}

export default Header;

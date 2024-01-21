import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <>
            <div class="container-fluid bg-dark text-light footer mt-5 py-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container py-2 ">
                    <div class="row g-4">
                        <div class="col-lg-4 col-md-6">
                            <h4 class="text-white mb-4">Our Office</h4>
                            <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Noida sec-63 Uttarpradesh</p>
                            <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@example.com</p>
                            <div class="d-flex pt-2">
                                <Link class="btn btn-square btn-outline-light rounded-circle me-2" to=""><i
                                    class="fab fa-twitter"></i></Link>
                                <Link class="btn btn-square btn-outline-light rounded-circle me-2" to=""><i
                                    class="fab fa-facebook-f"></i></Link>
                                <Link class="btn btn-square btn-outline-light rounded-circle me-2" to=""><i
                                    class="fab fa-youtube"></i></Link>
                                <Link class="btn btn-square btn-outline-light rounded-circle me-2" to=""><i
                                    class="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <h4 class="text-white mb-4">Services</h4>
                            <Link class="btn btn-link" to="/">Transaction Planning</Link>
                            <Link class="btn btn-link" to="/">Cash Investment</Link>
                            <Link class="btn btn-link" to="/">Financial Consultancy</Link>
                            <Link class="btn btn-link" to="/">Income Analysis</Link>
                        </div>

                        <div class="col-lg-4 col-md-2">
                            <h4 class="text-white mb-4">Newsletter</h4>
                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's leap into electronic typesetting, remaining essentially unchanged. It</p>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Footer;

import React from 'react';

const CategoriesPage = () => {
    return (
        <div className="container my-5">
            <h1>Kategorien</h1>
            <div className="d-flex flex-wrap mb-3">
                <button className="btn btn-outline-secondary me-2 mb-2">Chemie</button>
                <button className="btn btn-outline-secondary me-2 mb-2">Mathematik</button>
                <button className="btn btn-outline-success me-2 mb-2">Physik</button>
                <button className="btn btn-outline-secondary me-2 mb-2">Biologie</button>
                <button className="btn btn-outline-secondary me-2 mb-2">Kino</button>
                <button className="btn btn-outline-secondary me-2 mb-2">Umwelt</button>
                <button className="btn btn-outline-secondary me-2 mb-2">Raum</button>
                <button className="btn btn-outline-secondary me-2 mb-2">Technologie</button>
            </div>

            <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/800x400" className="card-img-top" alt="Widerstände" />
                        <div className="card-body">
                            <h5 className="card-title">Alles, was Sie über Widerstände wissen müssen</h5>
                            <p className="card-text">20.04.2024 • 875 Ansichten</p>
                            <p className="card-text">Alles, was Sie über Widerstände wissen müssen</p>
                            <div className="d-flex justify-content-between">
                                <span></span>
                                <div>
                                    <a href="#facebook" className="me-2"><i className="bi bi-facebook"></i></a>
                                    <a href="#twitter" className="me-2"><i className="bi bi-twitter"></i></a>
                                    <a href="#linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 mb-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/800x400" className="card-img-top" alt="Türkischer Physiker" />
                        <div className="card-body">
                            <h5 className="card-title">Die Erinnerung eines türkischen Physikers: Furkan Öztürk und biologische Homochiralität</h5>
                            <p className="card-text">19.04.2024 • 1.4K Ansichten</p>
                            <p className="card-text">Die Erinnerung eines türkischen Physikers: Furkan Öztürk und biologische Homochiralität</p>
                            <div className="d-flex justify-content-between">
                                <span></span>
                                <div>
                                    <a href="#facebook" className="me-2"><i className="bi bi-facebook"></i></a>
                                    <a href="#twitter" className="me-2"><i className="bi bi-twitter"></i></a>
                                    <a href="#linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 mb-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/800x400" className="card-img-top" alt="Wissenschaftler" />
                        <div className="card-body">
                            <h5 className="card-title">Wissenschaftler erfinden ein neues Material, das bei Schlägen hart wird</h5>
                            <p className="card-text">14.04.2024 • 1.1K Ansichten</p>
                            <p className="card-text">Wissenschaftler der University of California, Merced, haben ein neues Material erfunden, das sich bei Schlägen verhärtet und für tragbare Geräte und Sensoren verwendet werden kann.</p>
                            <div className="d-flex justify-content-between">
                                <span></span>
                                <div>
                                    <a href="#facebook" className="me-2"><i className="bi bi-facebook"></i></a>
                                    <a href="#twitter" className="me-2"><i className="bi bi-twitter"></i></a>
                                    <a href="#linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CategoriesPage;

import React from 'react';
import CategoriesPage from "./CategoriesPage";
import BlockItem from "../components/BlockItem";
const HomePage = () => {
    return (
        <>
    <div>

        <div className="container my-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card">
                        <BlockItem></BlockItem>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="list-group">
                        <a href="#artikel1" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Nahegelegene Supernova-Explosionen könnten das Leben auf der Erde bedrohen</h5>
                                <small>10 Min.</small>
                            </div>
                            <small>Raum</small>
                        </a>
                        <a href="#artikel2" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Die Erde wurde vor Millionen Jahren wahrscheinlich von einer interstellaren Anomalie betroffen</h5>
                                <small>20 Min.</small>
                            </div>
                            <small>Raum</small>
                        </a>
                        <a href="#artikel3" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Langstreckenflüge: Was passiert wirklich mit deinem Körper?</h5>
                                <small>30 Min.</small>
                            </div>
                            <small>Biologie</small>
                        </a>
                        <a href="#artikel4" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">DNA-Analyse entkräftet Mythen über Kinderopfer-Rituale der Maya</h5>
                                <small>40 Min.</small>
                            </div>
                            <small>Nachrichten</small>
                        </a>
                        <a href="#artikel5" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Seltsames Radiosignal aus dem tiefen Weltraum verblüfft Wissenschaftler</h5>
                                <small>50 Min.</small>
                            </div>
                            <small>Raum</small>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <CategoriesPage />
        </>
);
};



export default HomePage;

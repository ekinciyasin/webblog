function Filter({ setSelectedTypHandler, setSelectedLandHandler }) {
    return (
        <div className="custom-filter">
            <select
                id="cardList-form"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                    setSelectedTypHandler(e.target.value);
                }}
            >
                <option className="custom-option" value="all" selected>
                    Reisetyp
                </option>
                <option className="custom-option" value="trekking">Trekking</option>
                <option className="custom-option" value="safari">Safari</option>
                <option className="custom-option" value="kulturreise">Kulturreise</option>
            </select>
            <select
                id="cardList-form"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                    setSelectedLandHandler(e.target.value);
                }}
            >
                <option value="all" selected>
                    Land
                </option>
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
            </select>
        </div>
    );
}

export default Filter;

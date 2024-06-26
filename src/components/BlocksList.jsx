import React, {useState} from 'react';
import blocks from "../db.json";
import BlockItem from "./BlockItem";
import Filter from "./Filter";

const BlocksList = ({userRole}) => {
    const [selectedTyp, setSelectedTyp] = useState("all");
    const [selectedLand, setSelectedLand] = useState("all");

    function setSelectedTypHandler(value) {
        setSelectedTyp(value);
    }

    function setSelectedLandHandler(value) {
        setSelectedLand(value);
    }



    return (
        <div>
            <div className="blocks-container">
                <Filter
                    setSelectedTypHandler={setSelectedTypHandler}
                    setSelectedLandHandler={setSelectedLandHandler}
                />
                {blocks.filter((blog) => selectedTyp === "all" ? blog !== null : blog.blockReiseTyp === selectedTyp).filter((blog) => selectedLand === "all"? blog !== null : blog.blockLand === selectedLand).map((b, index) => (
                    <div key={b.blockId}>
                        <BlockItem
                            userRole={userRole}
                            title={b.blockTitle}
                            url={b.blockBild}
                            blockland={b.blockLand}
                            blockDate={b.blockDatum}
                            blockText={b.blockText}
                            blockId={b.blockId}
                            blockbeschreibung={b.blockBeschreibung}
                            swap={index % 2 === 1} // Pass swap prop to indicate if the positions should be swapped
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlocksList;

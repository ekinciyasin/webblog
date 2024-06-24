import React from 'react';
import blocks from "../db.json";
import BlockItem from "./BlockItem";

const BlocksList = () => {
    return (
        <div>
            <div className="blocks-container">
                {blocks.map((b, index) => (
                    <div key={b.blockId}>
                        <BlockItem
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

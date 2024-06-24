import React from 'react';
import blocks from "../db.json";


const BlocksList = () => {
    return (
        <div>
            <div className="blocks-container">
                {/*{blocks.map((b) => (
                        <Block
                            title={b.blockTitle}
                            url={b.blockBuild}
                            beschreibung={b.blockBeschreibung}
                            blockDate={b.blockDate}
                        />
                    ))}*/}
            </div>
        </div>
    );
};

export default BlocksList;
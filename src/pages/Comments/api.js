import axios from "axios";

export async function getCommentsByBlockId(blockId) {
    const  response =  await  axios.get(`http://localhost:3005/articles?blockId=${blockId}`)
    const {blockKommentare} = response.data[0];
    console.log("Kommentare", blockKommentare);
    return blockKommentare;
}
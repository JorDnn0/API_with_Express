import express, {response} from "express";
import {MarsPhoto, MarsPhotoResponse, RoversResponse} from "./APIDataTypes";

//env setup
require('dotenv').config()

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

// Get all rovers data
app.get("/rovers", function (req, res) {

    httpGet("https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=" + process.env.API_KEY)
        .then((data: RoversResponse) => {
            res.send(data);
        })
})

// Get specific rover and camera images
app.get("/rovers/:rover/photos/:camera", function (req, res) {

    const rover = req.params.rover;
    const camera = req.params.camera;

    //const camera = req.query.camera;
    httpGet(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?camera=${camera}&sol=1000&api_key=${process.env.API_KEY}`)
        .then((data: any) => {
            let images = getImages(data)
            res.send(images);
        })

})

function httpGet(url: string):any  {
    return new Promise(function(resolve) {
        fetch(url).then(response => response.json())
            .then(data => {
                console.log(data)
                resolve(data)
            })
            .catch(error => {
                // Handle errors
                console.error(error)
            })
    });
}

function getImages(data:MarsPhotoResponse) {
    return data.photos.map((imgData: MarsPhoto) => imgData.img_src)
}


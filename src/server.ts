import express, {response} from "express";

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
app.get("/rovers", function (req, res) {

    let responseData = httpGet("https://api.nasa.gov/mars-photos/api/v1/rovers?api_key="+process.env.API_KEY)
    res.json(responseData);

})



function httpGet(url: string)  {
    fetch(url).then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
        .catch(error => {
            // Handle errors
            console.log(url)
            console.error(error)
        })
}




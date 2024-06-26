const http = require('http');
const express = require('express');
const cloudinary = require('cloudinary').v2;
const upload = require('./utils/mulerConfig.js');
const app = express();
const connectToMongoDB = require('./db/connectToMongoDb');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// .env dosyasını yükle
dotenv.config();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// Cloudinary yapılandırması
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Orta katmanlar
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', // React uygulamanızın URL'si
    credentials: true,
};

app.use(cors(corsOptions));

// Rotalar
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

const kullaniciRoute = require('./routes/kullanici.js');
const soruRoute = require('./routes/soru');

app.use('/kullanici', kullaniciRoute);
app.use('/soru', soruRoute);






// Sunucuyu başlat
const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server Running on Port ${port}`);
    console.log(`Open http://localhost:${port} in your browser`);
});

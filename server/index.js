import express from "express" ;
import dotenv from 'dotenv' ;
import morgan from "morgan" ;
import cors from "cors";
import connectdb from "./config/db.js";
import authRouter from './routes/userAuth.js';
import categoryRouter from './routes/categoryRou.js';
import produtsRouetr from './routes/productRou.js';

// configure dotenv
dotenv.config()

// connection db
connectdb()

// server
const app = express() ;

//middleware
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

// routers
app.use('/api/v1/userauth', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', produtsRouetr);

//rest api
app.get('/', (req, res)=>{
   res.status(200).send('<h2>Hallo, I am server</h2>')
})

// PORT 
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`I am connect on ${PORT} port`);
})

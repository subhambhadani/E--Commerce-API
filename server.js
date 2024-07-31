// 1. Import express
import "./env.js"
import express from 'express';
import swagger, { serve } from 'swagger-ui-express';
import cors from 'cors'



// import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import apiDocs from './swagger.json' assert {type:'json'} ;
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectToMongoDB} from './src/config/mongodb.js';
import orderRouter from "./src/features/order/order.router.js";


// 2. Create Server
const server = express();

// load all the environments variable in an application

var corsOptions = {
    origin: "http://127.0.0.1:3000"
  }
  server.use(cors(corsOptions));

server.use(loggerMiddleware);


server.use(express.json());

// server.use(bodyParser.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
server.use("/api/orders", jwtAuth, orderRouter);
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use("/api/products",jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems" ,jwtAuth,cartRouter);

// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

// Error handler middleware
server.use((err, req, res, next) =>{
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    // server error
    res.status(500).send('Something went wrong, please try again later')
})

// 4. Middleware to handle 404 requests.
server.use((req,res) =>{
    res.status(404).send("API not found.")
})

// 5. Specify port.
server.listen(3200,()=>{
    console.log("Server is running at 3200");
    connectToMongoDB();
});


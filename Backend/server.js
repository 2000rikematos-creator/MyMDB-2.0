import "dotenv/config";
import express from "express"
import moviesRoutes from "./routes/movies-routes.js"
import usersRoutes from "./routes/users-routes.js"
import cors from "cors"
import mongoose from "mongoose"
import HttpError from "./utils/errorHelper.js"

const port = process.env.PORT

const app = express()
app.set('trust proxy', 1);

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  credentials: true,               
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());


   async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('database connected');
  } catch (error) {
    throw error
  }
};




app.use("/api/movies",moviesRoutes)
app.use("/api/users",usersRoutes)


app.use((err,req,res,next)=>{
   const errorStatus = err.status || 500;
   const message = err.message || "internal server error"
   res.status(errorStatus).json({message: message})
})

try{
  await connectDB()
  app.listen(port,()=>{console.log(`listening on port ${port}`)})
}catch(error){
  console.error(500, "Internal server error");
  process.exit(1);
}

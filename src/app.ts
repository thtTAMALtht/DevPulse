import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/user/user.auth";
import cors from 'cors'
const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:5000',

}

//middleware
app.use(express.json());
app.use(cors(corsOptions))

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "DevPulse API is running",
  });
});

app.use("/api/auth",userRoute)


export default app;

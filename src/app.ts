import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

//middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "DevPulse API is running",
  });
});

export default app;

import express, { Request, Response } from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

// Create Redis client
const client = createClient();

// Redis error handling
client.on("error", (err) => console.log("Redis Client Error", err));

// Input validation middleware
const validateSubmission = (req: Request, res: Response, next: Function) => {
  const { problemId, code, language } = req.body;

  if (!problemId || !code || !language) {
    res
      .status(400)
      .send("All fields (problemId, code, language) are required.");
    return;
  }
  next();
};

// POST route to handle code submission
app.post(
  "/submit",
  validateSubmission,
  async (req: Request, res: Response): Promise<void> => {
    const { problemId, code, language } = req.body;

    try {
      if (!client.isOpen) {
        res.status(500).send("Redis connection is not available.");
        return;
      }

      // Push the submission to the Redis list
      await client.lPush(
        "problems",
        JSON.stringify({ code, language, problemId })
      );

      res.status(200).send("Submission received and stored.");
    } catch (error) {
      console.error("Redis error:", error);

      res.status(500).send("Failed to store submission.");
    }
  }
);

// Function to start the server
async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to Redis", error);
    process.exit(1); // Exit the process if Redis connection fails
  }

  // Graceful shutdown
  process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    await client.disconnect();
    process.exit(0);
  });
}

startServer();

import { createClient } from "redis";

const client = createClient();

async function processSubmission(submission: string) {
  try {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${problemId}.`);
  } catch (error) {
    console.error("Error processing submission:", error);
    // Consider logging or handling invalid JSON format issues here
  }
}

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");

    while (true) {
      try {
        const submission = await client.brPop("problems", 0);

        // Ensure submission is properly formatted
        if (submission && submission.element) {
          await processSubmission(submission.element);
        } else {
          console.warn("Received empty submission or bad data format.");
        }
      } catch (error) {
        console.error("Error processing submission:", error);
        // Implement your error handling logic here
        // You may want to re-push the submission onto the queue or log the error
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }

  // Graceful shutdown handling
  process.on("SIGINT", async () => {
    console.log("Shutting down worker...");
    await client.disconnect();
    process.exit(0);
  });
}

startWorker();

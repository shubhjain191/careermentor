import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "careermentor", 
    name: "CareerMentor",
    credentials: {
        gemini: {
          apiKey: process.env.GEMINI_API_KEY,
        },
      },
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); 
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "", 
});

app.use(bodyParser.json());

app.use(cors());

app.post("/api/your-endpoint", async (req, res) => {
  const { question } = req.body;
  const params = `
  Provide an ayurvedic solution to the question.
  User: How can I improve my digestion?
  Solution: Try drinking a glass of warm water with lemon juice and honey in the morning. Including spices like ginger, cumin and fennel in your meals. Avoid overeating and consume freshly prepared, warm, and easily digestable foods.
  User: What can I do to reduce stress and anxiety?
  Solution: Practice deep breathin exercises and meditation daily. Consider incorporating adaptogenic herbs like Ashwaganda and Brahmi into your routine. Yoga and regular exercise can also help alleviate stress.
  User: I have trouble sleeping. Are there any ayurvedic remedies for insomia?
  Solution: Develop a bedtime routine that includes calming activities like drinking warm milk with a pinch of nutmeg, taking a warm bath, and performing gentle yoga or meditation before sleep. You can also try herbal teas with ingrediants like chamomile or velerian root.
  User: {question}
  Solution: 
  `

  const message = [
    {
      role: "system", content: "Provide an ayurvedic solution to the question"
    },
  ]


  const response = await openai.chat.completions.create({
    model : "gpt-3.5-turbo",
    messages : message
  })
  console.log("response:", response.choices[0].message.content);

  const answer = response.choices[0].message.content;

  console.log("Received data:");
  console.log("Question:", question);


  res.send({ message: answer });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

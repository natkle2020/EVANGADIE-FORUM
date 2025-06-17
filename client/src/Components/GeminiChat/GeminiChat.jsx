import React, { useState } from "react";
import styles from "./GeminiChat.module.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LuBotMessageSquare } from "react-icons/lu";
import { Button } from "react-bootstrap";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePrompt = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([input]);
      const text = result.response.text();
      setResponse(text);
    } catch (error) {
      console.error("Gemini Error:", error);
      setResponse(`Error:  ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatCard}>
        <h2 className={styles.title}><LuBotMessageSquare /> Ask Gemini</h2>
        <textarea
          className={styles.textarea}
          placeholder="Ask something interesting..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
    
        <Button variant="primary"
        onClick={handlePrompt}
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </Button>
        {response && (
          <div className={styles.responseBox}>
            <p className={styles.responseLabel}>Gemini says:</p>
            <div className={styles.responseText}>{response}</div>
          </div>
        )}
      </div>
    </div>
  );
};

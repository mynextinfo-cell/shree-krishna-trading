"use client";

import { useState } from "react";

export default function AIAssistant() {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<any[]>([]);

  const askAI = async () => {

    if (!question) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    // SIMPLE AI RESPONSES
    let response =
      "Focus on risk management and disciplined execution.";

    const lower =
      question.toLowerCase();

    if (
      lower.includes("loss")
    ) {
      response =
        "Reduce position size and avoid revenge trading.";
    }

    if (
      lower.includes("profit")
    ) {
      response =
        "Book partial profits and trail stop-loss systematically.";
    }

    if (
      lower.includes("psychology")
    ) {
      response =
        "Trading psychology improves through journaling and emotional discipline.";
    }

    if (
      lower.includes("strategy")
    ) {
      response =
        "Backtest your strategy on at least 100 trades before scaling.";
    }

    const aiMessage = {
      role: "assistant",
      content: response,
    };

    setMessages((prev) => [
      ...prev,
      aiMessage,
    ]);

    setQuestion("");
  };

  return (

    <div className="bg-[#050816] border border-zinc-900 rounded-3xl p-6 md:p-8 mt-14">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-8">
        AI Trading Assistant
      </h2>

      {/* CHAT */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto mb-8">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`p-4 rounded-2xl ${
              msg.role === "user"
                ? "bg-violet-600 ml-auto max-w-[80%]"
                : "bg-[#07122b] border border-zinc-800 max-w-[80%]"
            }`}
          >

            {msg.content}

          </div>
        ))}

      </div>

      {/* INPUT */}
      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Ask AI about trading..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="flex-1 bg-[#07122b] border border-zinc-800 rounded-2xl p-5 outline-none"
        />

        <button
          onClick={askAI}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 rounded-2xl font-bold"
        >
          Ask
        </button>

      </div>

    </div>
  );
}
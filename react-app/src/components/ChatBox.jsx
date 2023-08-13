import { useState } from "react";
import axios from "axios";
import agent_png from "../assets/call-center-service.png";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messageSender, setMessageSender] = useState("user");
  const [overallSentiment, setOverallSentiment] = useState(0);
  const [chatEnded, setChatEnded] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMessageSenderChange = () => {
    setMessageSender((prevSender) =>
      prevSender === "user" ? "respondee" : "user"
    );
  };

  const sentimentControl = (sentiment) => {
    if (sentiment === "negative") {
      return -2;
    } else if (sentiment === "positive") {
      return 2;
    } else {
      return 1;
    }
  };

  const overallSentimentString = (sentiment_score) => {
    if (sentiment_score > 0) {
      return "positive";
    } else if (sentiment_score < 0) {
      return "negative";
    } else {
      return "neutral";
    }
  };

  const handleMessageColor = (sentiment) => {
    if (sentiment === "negative") {
      return "bg-red-600";
    } else if (sentiment === "positive") {
      return "bg-green-600";
    } else {
      return "bg-sky-500";
    }
  };

  const performSentimentAnalysis = async (text) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict_sentiment",
        { text }
      );
      console.log(response.data.customer_sentiment);
      return response.data.customer_sentiment; // Assuming the API returns sentiment in the response
    } catch (error) {
      console.error("Error performing sentiment analysis:", error);
      return "unknown"; // Default to 'unknown' sentiment for error cases
    }
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();

    if (inputValue) {
      const sentiment = await performSentimentAnalysis(inputValue);

      let messageColor;
      let sentimentModifier = 0;

      if (messageSender == "user") {
        messageColor = handleMessageColor(sentiment);
        sentimentModifier = sentimentControl(sentiment);
      } else {
        messageColor = "bg-purple-600";
      }
      // console.log(messageColor);

      setOverallSentiment((prevSentiment) => prevSentiment + sentimentModifier);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: messageSender, content: inputValue, color: messageColor },
      ]);
    }

    console.log(overallSentiment);
    setInputValue("");
  };

  const handleEndChat = () => {
    setChatEnded(true);
  };

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6 bg-gray-700">
      <div className="items-center gap-8 lg:grid lg:grid-cols-1  xl:gap-16">
        <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Chatbot
        </h2>
      </div>

      <div className="p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-md ${message.color} text-white
                          ${
                            message.sender === "user"
                              ? "self-start"
                              : "self-end"
                          } rounded-lg p-2`}
            >
              <p
                className="max-w-1xl 
                font-medium
              text-slate-50 md:text-normal lg:text-normal dark:text-slate-50"
              >
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleInputSubmit}>
          <label className="sr-only">Your message</label>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            {/* agent - customer toggle */}
            <label className="inline-flex relative items-center mr-5 cursor-pointer">
              <input
                disabled={chatEnded}
                type="checkbox"
                className="sr-only peer"
                // checked={messageSender}
                onChange={handleMessageSenderChange}
                readOnly
              />
              <div
                onClick={() => {}}
                className="w-11 h-6 bg-gray-500 rounded-full peer  peer-focus:ring-purple-600  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"
              ></div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                <img
                  className="hidden w-6 mb-0 ml-3 rounded-lg lg:mb-0 lg:flex"
                  src={agent_png}
                />
              </span>
            </label>

            {/* chat text */}
            <textarea
              id="chat"
              rows="1"
              disabled={chatEnded}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border
            border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message here ..."
              value={inputValue}
              onChange={handleInputChange}
            ></textarea>

            {/* submit button */}
            <button
              disabled={chatEnded}
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>

            <button
              onClick={handleEndChat}
              disabled={chatEnded}
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />{" "}
              </svg>
            </button>
          </div>
        </form>

        {chatEnded && (
          <>
            <br />
            <hr />
            <br />
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Agent Perfomance Stats:
            </h2>
            <br />
            {/* {(overallSentimentString(overallSentiment))} */}

            <div>
              {console.log(
                handleMessageColor(overallSentimentString(overallSentiment))
              )}

              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Overall Customer Sentiment
              </h3>
              <p
                className={`text-white
                             ${handleMessageColor(
                               overallSentimentString(overallSentiment)
                             )}
                             hover:bg-opacity-80
                             focus:ring-4
                             focus:ring-purple-300
                             font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             dark: ${handleMessageColor(
                               overallSentimentString(overallSentiment)
                             )} dark:hover:bg-opacity-80 focus:outline-none dark:focus:ring-purple-800
                             capitalize`}
              >
                {overallSentimentString(overallSentiment)}
              </p>
            </div>
            <br />
            <div>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Experience Points
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <p
                  className={`text-white
                             ${handleMessageColor(
                               overallSentimentString(overallSentiment)
                             )}
                             hover:bg-opacity-80
                             focus:ring-4
                             focus:ring-purple-300
                             font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             dark: ${handleMessageColor(
                               overallSentimentString(overallSentiment)
                             )} dark:hover:bg-opacity-80 focus:outline-none dark:focus:ring-purple-800
                             capitalize`}
                >
                  {overallSentiment}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbox;

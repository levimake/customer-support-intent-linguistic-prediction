import { useState, useEffect } from "react";
import axios from "axios";
import agent_png from "../assets/call-center-service.png";

import { useLocation } from "react-router-dom";

//Chatbox Components
import Message from "./ChatComponents/Message";
import InnerCard from "./ChatComponents/InnerCard";
import PerfomanceBar from "./ChatComponents/PerfomanceBar";

const Chatbox = () => {
  //read the props from the router
  const location = useLocation();
  const data = location.state;

  //message variables
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messageSender, setMessageSender] = useState("user");

  const [chatEnded, setChatEnded] = useState(false);

  // agent perfomance variables
  const [overallSentiment, setOverallSentiment] = useState(0);
  const [timeScore, setTimeScore] = useState(0);

  // const [totalMinutes, setTotalMinutes] = useState(0);

  // run this just once when the page loads
  // therefore, dependency array is kept empty
  useEffect(() => {
    // console.log("logging this here")
    const customerQuery = data[1];

    //currentTime
    const time = new Date();

    // This is now an async function
    async function fetchSentiment() {
      const msgSentiment = await performSentimentAnalysis(customerQuery);
      console.log(msgSentiment);

      setOverallSentiment(() => sentimentControl(msgSentiment.sentiment));

      setMessages(() => [
        {
          sender: messageSender,
          content: customerQuery,
          color: msgSentiment.color,
          postedAt: time,
        },
      ]);
    }

    fetchSentiment();

    // console.log(customerQuery);
  }, []);

  //handle the inputChange on chat textBox
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //handles the toggle for switching between user and agent
  const handleMessageSenderChange = () => {
    setMessageSender((prevSender) =>
      prevSender === "user" ? "respondee" : "user"
    );
  };

  //returns the sentiment score based on the sentiment
  // -2 if negative
  // +2 if positive
  // +1 if neutral
  const sentimentControl = (sentiment) => {
    if (sentiment === "negative") {
      return -2;
    } else if (sentiment === "positive") {
      return 2;
    } else {
      return 1;
    }
  };

  //returns the sentiment for the overall sentiment score
  // positive if > 0
  // negative if < 0
  // netural  if = 0
  const overallSentimentString = (sentiment_score) => {
    if (sentiment_score > 0) {
      return "positive";
    } else if (sentiment_score < 0) {
      return "negative";
    } else {
      return "neutral";
    }
  };

  // handles the colors of the chatbubble based on the sentiment of the message
  // red if negative
  // green if positive
  // blue if neutral
  const handleMessageColor = (sentiment) => {
    if (sentiment === "negative") {
      return "bg-red-600";
    } else if (sentiment === "positive") {
      return "bg-green-600";
    } else {
      return "bg-sky-500";
    }
  };

  //function to perform sentiment analysis
  // todo: add isLoading isError states
  const performSentimentAnalysis = async (text) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict_sentiment",
        { text }
      );

      const sentiment = response.data.customer_sentiment;
      const color = handleMessageColor(sentiment);

      return { sentiment, color }; // Assuming the API returns sentiment and color in the response
    } catch (error) {
      console.error("Error performing sentiment analysis:", error);
      return "unknown"; // Default to 'unknown' sentiment for error cases
    }
  };

  // handles the set of events when a message is sent
  // if sent by user, gather its sentiment and color
  // for agent, api server is not called
  const handleInputSubmit = async (e) => {
    e.preventDefault();

    if (inputValue) {
      let messageColor;
      let sentimentModifier = 0;

      if (messageSender == "user") {
        const msgSentiment = await performSentimentAnalysis(inputValue);
        messageColor = handleMessageColor(msgSentiment.sentiment);
        sentimentModifier = sentimentControl(msgSentiment.color);
      } else {
        messageColor = "bg-purple-600";
      }
      // console.log(messageColor);

      setOverallSentiment((prevSentiment) => prevSentiment + sentimentModifier);

      // to compute the time when message is posted
      const time = new Date();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: messageSender,
          content: inputValue,
          color: messageColor,
          postedAt: time,
        },
      ]);
    }

    console.log(overallSentiment);
    setInputValue("");
  };

  // handles when the chat is ended
  // based on the complexity, compute a score based on the total time taken
  const handleEndChat = () => {
    const complexity = data[0].issue_complexity;

    const endTime = messages[messages.length - 1].postedAt;
    const startTime = messages[0].postedAt;

    const difference = endTime - startTime;
    const minutes = Math.floor(difference / 1000 / 60);

    if (complexity == "low") {
      if (minutes < 10) {
        setTimeScore((prevScore) => prevScore + 1);
      }
    }

    if (complexity == "medium") {
      if (minutes < 30) {
        setTimeScore((prevScore) => prevScore + 3);
      }
    }

    if (complexity == "high") {
      if (minutes < 60) {
        setTimeScore((prevScore) => prevScore + 5);
      }
    }

    setChatEnded(true);
  };

  const totalTurnaroundTime = (messages) => {
    const endTime = messages[messages.length - 1].postedAt;
    const startTime = messages[0].postedAt;

    const difference = endTime - startTime;
    const minutes = Math.floor(difference / 1000 / 60);
    // const seconds = Math.floor((difference / 1000) % 60);

    return minutes;
  };

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6 bg-gray-700">
      <div className="items-center gap-8 lg:grid lg:grid-cols-1  xl:gap-2">
        <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Helpdesk
        </h2>
      </div>

      <div className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Customer Query Analysis
        </h5>

        <InnerCard
          queryData="Language Tone"
          queryValue={data[0].language_tone}
        />
        <InnerCard
          queryData="Customer Intent"
          queryValue={data[0].customer_intent}
        />
        <InnerCard
          queryData="Communication Style"
          queryValue={data[0].communication_style}
        />
        <InnerCard
          queryData="Language Formality"
          queryValue={data[0].language_formality}
        />
        <InnerCard
          queryData="Query Category"
          queryValue={data[0].utterance_category}
        />
        <InnerCard
          queryData="Issue Complexity"
          queryValue={data[0].issue_complexity}
        />
      </div>

      {/* MESSAGES */}
      <div className="p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </div>
      </div>

      {/* MESSAGE SENDING AREA */}
      <div className="p-4">
        {" "}
        {!chatEnded && (
          <>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </>
        )}
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

            <PerfomanceBar
              header="Overall Customer Sentiment"
              value={overallSentimentString(overallSentiment)}
              color={handleMessageColor(
                overallSentimentString(overallSentiment)
              )}
            />

            <PerfomanceBar
              header="Total Turnaround Time (in minutes)"
              value={totalTurnaroundTime(messages)}
              color={handleMessageColor(
                overallSentimentString(overallSentiment)
              )}
            />

            <PerfomanceBar
              header="Experience Points"
              value={overallSentiment + timeScore}
              color={handleMessageColor(
                overallSentimentString(overallSentiment)
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbox;

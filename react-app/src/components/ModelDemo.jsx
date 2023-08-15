import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PerfomanceBar from "./ChatComponents/PerfomanceBar";

function Demo() {
  const [query, setQuery] = useState("");

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isError, setError] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(false);
      const url = "http://localhost:8000/predict";
      const body = { text: query };
      const response = await axios.post(url, body);
      setPrediction(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const handlePredictionColor = (value) => {
    console.log(value);
    if (value === "high") {
      return "bg-red-600";
    } else if (value === "low") {
      return "bg-green-600";
    } else {
      return "bg-sky-500";
    }
  };

  const agentDescription = (issue_complexity) => {
    console.log(issue_complexity);
    if (issue_complexity == "low") {
      return " handles customer inquiries independently, possess solid troubleshooting skills, and seek guidance from more experienced team members when needed.";
    } else if (issue_complexity == "high") {
      return " confidently handles complex customer issues, excel in de-escalation, and possess the ability to empathize with customers, providing them with effective solutions and support.";
    } else {
      return " proficient in resolving diverse customer inquiries, with a strong ability to troubleshoot and solve complex issues independently. Provides confident customer support, effectively addressing challenging situations.";
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900" id="demo">
        <div
          className="items-center 
          max-w-screen-xl px-4 py-8 mx-auto 
          lg:grid 
          lg:grid-cols-4 
          lg:gap-16 
          xl:gap-24 
          lg:py-24 
          lg:px-6"
        >
          <div className="col-span-2 mb-8">
            <h1
              className="max-w-2xl mb-4 text-4xl font-extrabold 
                leading-none tracking-tight 
                md:text-5xl xl:text-5xl dark:text-white"
            >
              Try Now
            </h1>

            <hr />
            <br />

            <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
              Send Your Customer Query and Extract Features from the API Server
            </p>

            <br />

            <div
              className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50
                 dark:bg-gray-700 dark:border-gray-600"
            >
              {/* User Query Form */}

              <form onSubmit={handleFormSubmit}>
                <div
                  className="px-4 py-2 
                      bg-white rounded-t-lg dark:bg-gray-800"
                >
                  <label className="sr-only">
                    Your customer query (max length: 128-150)
                  </label>
                  <textarea
                    value={query}
                    onChange={handleInputChange}
                    id="comment"
                    rows="6"
                    className="w-full px-0 text-base text-gray-900 bg-white border-0 
                        dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-200"
                    placeholder="Your customer query (max length: 128-150)"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white
                                bg-purple-700
                                hover:bg-purple-800
                                focus:ring-4
                                focus:ring-purple-300
                                font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                                dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800
                                capitalize"
                  >
                    {isLoading && !isError && (
                      <>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Loading...
                      </>
                    )}
                    {!isLoading && !isError && <>Send Your Query</>}
                    {isError && <> Error!</>}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            {/* If prediction response is received from API server, display*/}
            {prediction && (
              <>
                <PerfomanceBar
                  header="Language Tone"
                  value={prediction.language_tone}
                  color={handlePredictionColor(prediction.issue_complexity)}
                />

                <PerfomanceBar
                  header="Customer Intent"
                  value={prediction.customer_intent}
                  color={handlePredictionColor(prediction.issue_complexity)}
                />

                <PerfomanceBar
                  header="Communication Style"
                  value={prediction.communication_style}
                  color={handlePredictionColor(prediction.issue_complexity)}
                />

                <PerfomanceBar
                  header="Language Formality"
                  value={prediction.language_formality}
                  color={handlePredictionColor(prediction.issue_complexity)}
                />

                <PerfomanceBar
                  header="Issue Category"
                  value={prediction.utterance_category}
                  color={handlePredictionColor(prediction.issue_complexity)}
                />

                <PerfomanceBar
                  header="Issue Complexity"
                  value={prediction.issue_complexity}
                  color={handlePredictionColor(prediction.issue_complexity)}
                />
              </>
            )}
          </div>

          {prediction && (
            <>
              <div className="col-span-5 mb-8">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-5xl dark:text-white">
                  Agent Selection
                </h1>
                <hr />
                <br />
                <p className="font-medium text-gray-500 sm:text-xl dark:text-slate-50 mb-4">
                  The issue requires a customer representative who
                  {agentDescription(prediction.issue_complexity)}
                </p>
                {/* <a href="/chat"> */}

                <Link to="/chat" state={[prediction, query]}>
                  <button
                    className={`text-white
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85
                             focus:ring-4
                             focus:ring-purple-300
                             font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             dark:${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85 focus:outline-none dark:focus:ring-purple-800
                             capitalize`}
                  >
                    Connect with the agent
                  </button>
                </Link>
                {/* </a> */}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Demo;

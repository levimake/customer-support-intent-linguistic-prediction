import { useState } from "react";
import axios from "axios";


function Demo() {
  const [query, setQuery] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:8000/predict";
      const body = { text: query };
      const response = await axios.post(url, body);
      setPrediction(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
                    Send Your Query
                  </button>
                </div>
              </form>
            </div>
          </div>

      
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            {/* If prediction response is received from API server, display*/}
            {prediction && (
              <>
              
                <div>
                  <h3 className="mb-2 text-2xl font-bold dark:text-white">
                    Language Tone
                  </h3>
                  <p
                    className={`text-white
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85
                             focus:ring-4
                             focus:ring-purple-300
                             font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             dark:${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85
                             focus:outline-none
                             dark:focus:ring-purple-800
                             capitalize`}
                  >
                    {prediction.language_tone}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold dark:text-white">
                    Customer Intent
                  </h3>
                  <p
                    className={`text-white
                            ${handlePredictionColor(
                              prediction.issue_complexity
                            )} hover:bg-opacity-85
                            focus:ring-4
                            focus:ring-purple-300
                            font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                            dark:${handlePredictionColor(
                              prediction.issue_complexity
                            )} hover:bg-opacity-85 
                            focus:outline-none dark:focus:ring-purple-800
                            capitalize`}
                  >
                    {prediction.customer_intent}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold dark:text-white">
                    Communication Style
                  </h3>
                  <p
                    className={`text-white
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85
                             focus:ring-4
                             focus:ring-purple-300
                             font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85 
                             focus:outline-none dark:focus:ring-purple-800
                             capitalize`}
                  >
                    {prediction.communication_style}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold dark:text-white">
                    Language Formality
                  </h3>
                  <p
                    className={`text-white
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85
                             focus:ring-4
                             focus:ring-purple-300
                             font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85 
                             focus:outline-none dark:focus:ring-purple-800
                             capitalize`}
                  >
                    {prediction.language_formality}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold dark:text-white">
                    Issue Category
                  </h3>
                  <p
                    className={`text-white
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85
                             focus:ring-4
                             focus:ring-purple-300
                             font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85 
                             focus:outline-none dark:focus:ring-purple-800
                             capitalize`}
                  >
                    {prediction.utterance_category}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold dark:text-white">
                    Issue Complexity
                  </h3>
                  <p
                    className={`text-white
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85
                             focus:ring-4
                             focus:ring-purple-300
                             font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             ${handlePredictionColor(
                               prediction.issue_complexity
                             )} hover:bg-opacity-85 
                             focus:outline-none dark:focus:ring-purple-800
                             capitalize`}
                  >
                    {prediction.issue_complexity}
                  </p>
                </div>
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
                <a href="/chat">
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
                </a>
              </div>
            </>
          )}
        </div>
      </section>
      
    </>
  );
}

export default Demo;

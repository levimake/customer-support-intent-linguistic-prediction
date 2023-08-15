import heroImage1 from "../assets/customer-agent-main1.png";
import mlImage1 from "../assets/machine_learning_vector1.png";

import ModelDemo from "../components/ModelDemo";
import SimpleTextCard from "../components/HomeComponents/SimpleTextCard";
import RightArrow from "../components/svgs/RightArrow";
import VioletCheckMark from "../components/svgs/VioletCheckMark";

const Home = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Predictive Call Routing <br /> for agent selection
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Improve customer experience by utilizing predictive call/chat
              routing to connect customers with the most qualified
              representative, based on previous successful resolutions of
              similar cases or behavioral compatibility.
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a
                href="#demo"
                className="xl:text-3xl text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-extrabold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
              >
                Try Now
              </a>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={heroImage1} alt="hero image" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800" id="about">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          {/* Row */}
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img
              className="hidden w-85 h-85 mb-4 rounded-lg lg:mb-0 lg:flex"
              src={mlImage1}
              alt="feature image 2"
            />
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                About
              </h2>
              <hr />
              <br />
              <p className="mb-8 font-medium lg:text-xl">
                The project is implementing a predictive chat routing system
                that uses supervised Machine Learning to match customers with
                the best available agent. It uses historical data to predict
                issue category and query linguistic paremeters to route queries
                accordingly.
              </p>

              <ul
                role="list"
                className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
              >
                <li className="flex space-x-3">
                  <VioletCheckMark />
                  <span className="text-lg font-medium leading-tight text-gray-900 dark:text-white">
                    Multi Task Classification
                  </span>
                </li>
                <li className="flex space-x-3">
                  <VioletCheckMark />
                  <span className="text-lg font-medium leading-tight text-gray-900 dark:text-white">
                    Realtime Sentiment Analysis
                  </span>
                </li>
                <li className="flex space-x-3">
                  <VioletCheckMark />
                  <span className="text-lg font-medium leading-tight text-gray-900 dark:text-white">
                    Seamless Integration
                  </span>
                </li>
              </ul>
              <p className="mb-8 font-medium lg:text-xl">
                The system uses one model to perform several multilabel and
                multiclass classification tasks on different groups of
                categories for improved response-time and reduced resource
                consumption.{" "}
              </p>

              <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <a
                    href="#more"
                    className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
                  >
                    Read More
                    <RightArrow />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End block */}

      {/* Try the model */}
      <ModelDemo />

      {/* Start block */}
      <section className="bg-white dark:bg-gray-800" id="more">
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="col-span-2 mb-8">
            <p className="text-lg font-medium text-purple-600 dark:text-purple-500">
              smaller, faster, cheaper and lighter BERT
            </p>

            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Finetuned DistilBERT Model
            </h2>
            <hr />
            <br />
            <p className="font-medium text-gray-500 sm:text-2xl dark:text-gray-400">
              Our tool improves customer satisfaction by minimizing wait times
              and resolving issues more efficiently. It matches customers with
              agents who are best suited for their needs, ensuring faster ticket
              resolutions and reducing agent workload.
            </p>
          </div>
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <SimpleTextCard
              header="Improved Accuracy"
              data="The model is trained to predict the issue category, language
                features and issue complexity all at the same by modelling
                everything within a multilabel classification problem by
                optimizing one binary cross-entropy loss function."
            />

            <SimpleTextCard
              header="FAST API Backend"
              data="Python’s FastAPI framework enables engineers to rapidly build
              new applications with its easy-to-use interface and the ability
              to create powerful functions with minimal coding."
            />

            <SimpleTextCard
              header="React Frontend"
              data="Reacts popularity and usage are increasing day by day for good
              reason. As a developer, coding in React makes you better at
              JavaScript, a language that holds nearly 90% of the web
              development share today."
            />

            <SimpleTextCard
              header="Trained with Cusomer Queries"
              data="Model has been trained with the Bitext - Customer Service Tagged
              Training Dataset containing 8,100 utterances(300 per intent)"
            />
          </div>
        </div>
      </section>
      {/* End block */}
    </>
  );
};

export default Home;

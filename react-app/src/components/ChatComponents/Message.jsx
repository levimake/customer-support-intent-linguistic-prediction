import PropTypes from "prop-types";

const Message = ({ message, index }) => {
    // const time = new Date().toLocaleTimeString();
    // const hourAndMinute = time.substring(0, 4);

    const senderClass =
      message.sender === "user"
        ? "flex w-full mt-2 space-x-3 max-w"
        : "flex w-full mt-2 space-x-3 max-w ml-auto justify-end";

    return (
      <>
        <div className={`${senderClass}`}>
          {message.sender === "user" ? (
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-sky-500">
              <svg
                className="absolute w-12 h-12 text-sky-100 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500">
              <svg
                className="absolute w-12 h-12 text-gray-200 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          )}
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

            <span className="text-xs text-gray-300 leading-none">
              {message.postedAt.toLocaleTimeString().substring(0, 4)}
            </span>
          </div>
        </div>
      </>
    );
  };

export default Message;
Message.propTypes = { message: PropTypes.node.isRequired };
Message.propTypes = { index: PropTypes.node.isRequired };
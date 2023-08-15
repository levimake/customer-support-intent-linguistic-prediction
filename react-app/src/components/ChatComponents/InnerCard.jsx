import PropTypes from "prop-types";

const InnerCard = ({ queryData, queryValue }) => {
    return (
      <>
        <div className="flex flex-row">
          <svg
            className="w-5 h-5 ml-1 fill-gray-400 mr-2"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="font-normal text-xl text-gray-700 dark:text-gray-300 capitalize">
            {queryData}: <b>{queryValue}</b>
          </p>
        </div>
      </>
    );
  };

InnerCard.propTypes = { queryData: PropTypes.node.isRequired };
InnerCard.propTypes = { queryValue: PropTypes.node.isRequired };

export default InnerCard;
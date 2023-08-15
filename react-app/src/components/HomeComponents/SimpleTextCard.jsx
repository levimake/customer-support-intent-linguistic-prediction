import PropTypes from "prop-types";

const SimpleTextCard = ({ header, data }) => {
  return (
    <>
      <div>
        <h3 className="mb-2 text-3xl font-bold dark:text-white">{header}</h3>
        <p className="font-medium text-gray-500 dark:text-gray-400">{data}</p>
      </div>
    </>
  );
};

SimpleTextCard.propTypes = { header: PropTypes.node.isRequired };
SimpleTextCard.propTypes = { data: PropTypes.node.isRequired };

export default SimpleTextCard;

import PropTypes from "prop-types";

const PerfomanceBar = ({header, value, color}) => {
    return (<>
    
    <div className="mb-5">

    <h3 className="mb-2 text-2xl font-bold dark:text-white">
      {header}
    </h3>
    <p
      className={`text-white
                   ${color}
                   hover:bg-opacity-80
                   focus:ring-4
                   focus:ring-purple-300
                   font-bold rounded-lg text-bs px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                   dark: ${color} dark:hover:bg-opacity-80 focus:outline-none dark:focus:ring-purple-800
                   capitalize`}
    >
      {value}
    </p>
  </div>
  </>);
  }

PerfomanceBar.propTypes = { header: PropTypes.node.isRequired };
PerfomanceBar.propTypes = { value: PropTypes.node.isRequired };
PerfomanceBar.propTypes = { color: PropTypes.node.isRequired };

export default PerfomanceBar;
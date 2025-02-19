import React from "react";
// import "./style.css";
import './signUp.css'; // Optional: add CSS for basic button styling


// import PropTypes from "prop-types";
// import drag2 from "./drag-2.svg";
// import drag3 from "./drag-3.svg";
// import drag4 from "./drag-4.svg";
// import drag5 from "./drag-5.svg";
// import "./globalStyles.css";

// export const TextareaField = ({
//   value = "Value",
//   hasDescription = false,
//   description = "Description",
//   label = "Label",
//   error = "Hint",
//   hasError = false,
//   hasLabel = true,
//   state,
//   valueType,
//   className,
//   divClassName,
//   textareaClassName,
//   divClassNameOverride,
//   dragClassName,
//   drag = "image.svg",
// }) => {
//   return (
//     <div className={`textarea-field ${className}`}>
//       {hasLabel && (
//         <div className={`label ${state} ${divClassName}`}>{label}</div>
//       )}

//       <div className={`textarea state-${state} ${textareaClassName}`}>
//         <div
//           className={`value state-0-${state} value-type-${valueType} ${divClassNameOverride}`}
//         >
//           {value}
//         </div>

//         <img
//           className={`drag ${dragClassName}`}
//           alt="Drag"
//           src={
//             state === "default" && valueType === "default"
//               ? drag
//               : state === "error" && valueType === "placeholder"
//                 ? drag2
//                 : state === "error" && valueType === "default"
//                   ? drag3
//                   : state === "disabled" && valueType === "default"
//                     ? drag4
//                     : state === "disabled" && valueType === "placeholder"
//                       ? drag5
//                       : drag
//           }
//         />
//       </div>
//     </div>
//   );
// };

// TextareaField.propTypes = {
//   value: PropTypes.string,
//   hasDescription: PropTypes.bool,
//   description: PropTypes.string,
//   label: PropTypes.string,
//   error: PropTypes.string,
//   hasError: PropTypes.bool,
//   hasLabel: PropTypes.bool,
//   state: PropTypes.oneOf(["disabled", "error", "default"]),
//   valueType: PropTypes.oneOf(["placeholder", "default"]),
//   drag: PropTypes.string,
// };



// src/components/Button.js

const Button = ({ labelText, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {labelText}
    </button>
  );
};


export const Filter = ({ label, className }) => {
return (
    <div className={`filter ${className}`}>
      <div className="overlap-group">
        <div className="text-wrapper">{label}</div>
      </div>
    </div>
  );
};
// export default Filter;

export const DetailsFrame = () => {
    // Details data
    const details = [
      { title: 'Provided', text: 'wet suit, booties, helmet, kayak, PFD' },
      { title: 'Bring', text: 'water bottle, non-cotton clothing' },
      { title: 'Leader(s)', text: 'Sammy Rago, Dara Casey, Soni Mbesa' },
      { title: 'Location', text: 'Hartlands, VT' },
      { title: 'Capacity', text: '10/14' },
    ];
  
    return (
      <div className="details-frame">
        <h2 className="details-title">Details</h2>
  
        {/* Replacing LinearIndeterminate with simple div lines */}
        <div className="details-indicators">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="simple-line" />
          ))}
        </div>
  
        <div className="details-list">
          {details.map(({ title, text }, index) => (
            <p key={index} className="details-item">
              <span className="details-item-title">{title}</span>: {text}
            </p>
          ))}
        </div>
      </div>
    );
  };
  
//   export default DetailsFrame;


export default Button;


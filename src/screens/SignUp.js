// Author: Muthoni Mbesa

import React from "react";
import '../styles/globalStyles.css'; // Import global styles
// import TripCard from '../components/tripCard'; // Import the TripCard component
import '../components/signUp';

import Button from "../components/signUp";
import Filter from "../components/signUp";
import DetailsFrame from "../components/signUp";

// import { LinearIndeterminate } from "./LinearIndeterminate";
// import { Logo } from "./Logo";
// import { Size48 } from "./Size48";
// import { TextareaField } from "./TextareaField";
// import { TripTypeFilter } from "./TripTypeFilter";
// import image5 from "./image-5.png";
// import image from "./image.png";
// import screenshot20241016At123920PmRemovebgPreview1 from "./screenshot-2024-10-16-at-12-39-20-PM-removebg-preview-1.png";
// import "./style.css";
// import track1 from "./track-1.svg";
// import track2 from "./track-2.svg";
// import userIcon from "./user-icon.png";

export const SignUpIndividual = () => {
    // <div className="sign-up-individual">
    //   <div className="div-2">
    //     <div className="details-frame">
    //       <div className="details-title">Details</div>

    //       <div className="overlap">
    //         <div className="details-bar">
    //           <div className="overlap-group-2">
    //             <div className="rectangle-3" />

    //             <LinearIndeterminate
    //               className="linear-indeterminate-progress-indicator"
    //               step="one"
    //               trackClassName="linear-indeterminate-instance"
    //               trackShapeClassName="linear-indeterminate-progress-indicator-instance"
    //             />
    //             <LinearIndeterminate
    //               className="design-component-instance-node"
    //               step="one"
    //               trackClassName="linear-indeterminate-instance"
    //               trackShapeClassName="linear-indeterminate-progress-indicator-instance"
    //             />
    //             <LinearIndeterminate
    //               className="linear-indeterminate-2"
    //               step="one"
    //               trackClassName="linear-indeterminate-3"
    //               trackShapeClassName="linear-indeterminate-progress-indicator-instance"
    //             />
    //             <LinearIndeterminate
    //               className="linear-indeterminate-4"
    //               step="one"
    //               trackClassName="linear-indeterminate-5"
    //               trackShapeClassName="linear-indeterminate-progress-indicator-instance"
    //             />
    //             <LinearIndeterminate
    //               className="linear-indeterminate-6"
    //               step="one"
    //               trackClassName="linear-indeterminate-3"
    //               trackShapeClassName="linear-indeterminate-progress-indicator-instance"
    //             />
    //           </div>
    //         </div>

    //         <div className="details-text-tab">
    //           <p className="provided-tab">
    //             <span className="span">Provided</span>

    //             <span className="text-wrapper-4">
    //               : wet suit, booties, helmet, kayak, PFD
    //             </span>
    //           </p>

    //           <p className="bring-item-tab">
    //             <span className="span">Bring</span>

    //             <span className="text-wrapper-4">
    //               : water bottle, non-cotton clothing
    //               <br />
    //             </span>
    //           </p>

    //           <p className="leader-s-tab">
    //             <span className="span">Leader(s)</span>

    //             <span className="text-wrapper-4">
    //               : <br />
    //               Sammy Rago, Dara Casey, Soni Mbesa
    //               <br />
    //             </span>
    //           </p>

    //           <p className="location-tab">
    //             <span className="span">Location</span>

    //             <span className="text-wrapper-4">
    //               :<br />
    //               Hartlands, VT
    //             </span>
    //           </p>

    //           <p className="capacity-tab">
    //             <span className="span">Capacity</span>

    //             <span className="text-wrapper-4">
    //               :<br /> 10/14
    //             </span>
    //           </p>
    //         </div>
    //       </div>
    //     </div>

   
    //     <img className="image" alt="Image" src={image} />

    //     <LinearIndeterminate
    //       className="header-line"
    //       step="one"
    //       trackClassName="header-line-2"
    //       trackShapeClassName="linear-indeterminate-progress-indicator-instance"
    //     />
    //     <TextareaField
    //       className="description-text"
    //       divClassName="textarea-field-instance"
    //       divClassNameOverride="description-text-3"
    //       drag="drag-2.svg"
    //       dragClassName="description-text-4"
    //       label="Description"
    //       state="default"
    //       textareaClassName="description-text-2"
    //       value={
    //         <>
    //           <br />
    //           We&#39;ll be meeting at the river access point in Hartland, VT,
    //           where our friendly guides will provide a safety briefing and a
    //           quick paddle skills workshop to get everyone comfortable. All
    //           gear, including life vests, helmets, and paddles, will be
    //           provided. Just bring a swimsuit, a sense of adventure, and a
    //           change of clothes!
    //           <br />
    //           <br />
    //           After the paddle, we’ll have a casual picnic by the river, so feel
    //           free to bring snacks or a packed lunch. This is a great
    //           opportunity to connect with other outdoor enthusiasts, make new
    //           friends, and experience the beauty of Vermont&#39;s waterways.
    //           Hope to see you there!
    //         </>
    //       }
    //       valueType="default"
    //     />
    return (
        <div className="sign-up-individual">
            <div className="div-2">
                <Filter label="Archery" className="subclub-filter" />
                <Filter label="Beginner" className="difficulty-filter" />
                <Filter label="Day Trip" className="trip-type-filter-instance" />
                {/* Other components here */}
            </div>

            <DetailsFrame />

            <Button
                className="sign-up-button"
                labelText="Sign Up!"
                labelTextClassName="sign-up-button-2"
                showIcon={false}
                stateLayerClassName="button-instance"
                style="filled"
            />
            </div>
      );
};
    //     <div className="sidebar">
    //       <div className="icons">
    //         <img className="user-icon" alt="User icon" src={userIcon} />

    //         <div className="archive-icon">
    //           <img
    //             className="screenshot"
    //             alt="Screenshot"
    //             src={screenshot20241016At123920PmRemovebgPreview1}
    //           />
    //         </div>

    //         <div className="notifications-icon">
    //           <Size48 className="bell" />
    //         </div>

    //         <div className="trips-icon">
    //           <img className="image-2" alt="Image" src={image5} />
    //         </div>
    //       </div>

    //       <Logo className="logo-instance" />
    //     </div>

    //     <p className="trip-title">White Water Kayaking in Hartlands</p>

    //     <img className="track-2" alt="Track" src={track2} />

    //     <img className="track-3" alt="Track" src={track1} />
    //   </div>
    // </div>
 

export default SignUpIndividual;


// // import React from "react";
// import React, { useState } from 'react';
// import '../styles/globalStyles.css'; // Import global styles
// // import { Button } from "./Button";
// // import { LinearIndeterminate } from "./LinearIndeterminate";
// // // import { Size48 } from "./Size48";
// // import { TextareaField } from "./TextareaField";
// // import image5 from "./image-5.png";
// // import image15 from "./image-15.png";
// // import image from "./image.svg";
// // import line11 from "./line-11.svg";
// // import line12 from "./line-12.svg";
// // import screenshot20241016At123920PmRemovebgPreview1 from "./screenshot-2024-10-16-at-12-39-20-PM-removebg-preview-1.png";
// import "../styles/signUp.css";
// // import subtract from "./subtract.svg";
// // import userIcon from "./user-icon.png";
// // import vector from "./vector.svg";

// export const SignUpIndividual = () => {
//   return (
//     <div className="sign-up-individual">
//       <div className="div">
//         <div className="overlap">
//           <p className="text-wrapper">White Water Kayaking in Hartlands</p>

//           <div className="filter-labels">
//             <div className="date">
//               <div className="overlap-group">
//                 <div className="text-wrapper-2">Day Trip</div>
//               </div>
//             </div>
//           </div>

//           <div className="overlap-wrapper">
//             <div className="div-wrapper">
//               <div className="text-wrapper-3">Beginner</div>
//             </div>
//           </div>

//           <div className="overlap-group-wrapper">
//             <div className="overlap-2">
//               <div className="text-wrapper-2">Subclub</div>
//             </div>
//           </div>
//         </div>

//         <img className="image" alt="Image" src={image15} />

//         <LinearIndeterminate
//           className="linear-indeterminate-progress-indicator"
//           step="one"
//           trackClassName="linear-indeterminate-instance"
//           trackShapeClassName="linear-indeterminate-progress-indicator-instance"
//         />
//         <TextareaField
//           className="textarea-field-instance"
//           divClassName="design-component-instance-node"
//           divClassNameOverride="textarea-field-3"
//           drag="drag-2.svg"
//           dragClassName="textarea-field-4"
//           label="Description"
//           state="default"
//           textareaClassName="textarea-field-2"
//           value={
//             <>
//               <br />
//               We&#39;ll be meeting at the river access point in Hartland, VT,
//               where our friendly guides will provide a safety briefing and a
//               quick paddle skills workshop to get everyone comfortable. All
//               gear, including life vests, helmets, and paddles, will be
//               provided. Just bring a swimsuit, a sense of adventure, and a
//               change of clothes!
//               <br />
//               <br />
//               After the paddle, we’ll have a casual picnic by the river, so feel
//               free to bring snacks or a packed lunch. This is a great
//               opportunity to connect with other outdoor enthusiasts, make new
//               friends, and experience the beauty of Vermont&#39;s waterways.
//               Hope to see you there!
//             </>
//           }
//           valueType="default"
//         />
//         <Button
//           className="button-instance"
//           labelText="Sign Up!"
//           labelTextClassName="button-3"
//           showIcon={false}
//           stateLayerClassName="button-2"
//           style="filled"
//         />
//         <div className="group">
//           <div className="sidebar">
//             <img className="user-icon" alt="User icon" src={userIcon} />

//             <div className="screenshot-wrapper">
//               <img
//                 className="screenshot"
//                 alt="Screenshot"
//                 src={screenshot20241016At123920PmRemovebgPreview1}
//               />
//             </div>

//             <div className="bell-wrapper">
//               <Size48 className="bell" />
//             </div>

//             <div className="image-wrapper">
//               <img className="img" alt="Image" src={image5} />
//             </div>
//           </div>

//           <div className="logo">
//             <div className="overlap-group-2">
//               <img className="subtract" alt="Subtract" src={subtract} />

//               <img className="subtract-2" alt="Subtract" src={image} />

//               <img className="vector" alt="Vector" src={vector} />

//               <div className="rectangle" />

//               <div className="rectangle-2" />

//               <div className="text-wrapper-4">uni</div>

//               <div className="text-wrapper-5">trek</div>
//             </div>
//           </div>
//         </div>

//         <img className="line" alt="Line" src={line11} />

//         <img className="line-2" alt="Line" src={line12} />

//         <div className="overlap-3">
//           <LinearIndeterminate
//             className="linear-indeterminate-2"
//             step="one"
//             trackClassName="linear-indeterminate-3"
//             trackShapeClassName="linear-indeterminate-progress-indicator-instance"
//           />
//           <div className="group-wrapper">
//             <div className="group-2">
//               <div className="overlap-4">
//                 <div className="group-3">
//                   <div className="group-4">
//                     <div className="overlap-group-3">
//                       <div className="rectangle-3" />

//                       <p className="leader-s-sammy-rago">
//                         <span className="span">
//                           <br />
//                         </span>

//                         <span className="text-wrapper-6">
//                           <br />
//                           Leader(s)
//                         </span>

//                         <span className="text-wrapper-7">
//                           : <br />
//                           Sammy Rago, Dara Casey, Soni Mbesa
//                           <br />
//                           <br />
//                         </span>

//                         <span className="text-wrapper-6">Location</span>

//                         <span className="text-wrapper-7">
//                           :<br /> Hartlands, VT
//                           <br />
//                           <br />
//                         </span>

//                         <span className="text-wrapper-6">Capacity</span>

//                         <span className="text-wrapper-7">
//                           :<br /> 10/14
//                           <br />
//                           <br />
//                         </span>

//                         <span className="text-wrapper-6">Bring</span>

//                         <span className="text-wrapper-7">
//                           : water bottle, non-cotton clothing
//                           <br />
//                           <br />
//                         </span>

//                         <span className="text-wrapper-6">Provided</span>

//                         <span className="text-wrapper-7">
//                           : wet suit, booties, helmet, kayak, PFD
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <LinearIndeterminate
//                   className="linear-indeterminate-4"
//                   step="one"
//                   trackClassName="linear-indeterminate-5"
//                   trackShapeClassName="linear-indeterminate-progress-indicator-instance"
//                 />
//                 <LinearIndeterminate
//                   className="linear-indeterminate-6"
//                   step="one"
//                   trackClassName="linear-indeterminate-3"
//                   trackShapeClassName="linear-indeterminate-progress-indicator-instance"
//                 />
//                 <LinearIndeterminate
//                   className="linear-indeterminate-7"
//                   step="one"
//                   trackClassName="linear-indeterminate-3"
//                   trackShapeClassName="linear-indeterminate-progress-indicator-instance"
//                 />
//                 <LinearIndeterminate
//                   className="linear-indeterminate-8"
//                   step="one"
//                   trackClassName="linear-indeterminate-3"
//                   trackShapeClassName="linear-indeterminate-progress-indicator-instance"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-wrapper-8">Details</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpIndividual;
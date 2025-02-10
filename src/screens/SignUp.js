// Author: Muthoni Mbesa

import React from "react";
import '../styles/globalStyles.css'; // Import global styles
// import TripCard from '../components/tripCard'; // Import the TripCard component
import '../components/signUp';

import Button from "../components/signUp";
import Filter from "../components/signUp";
import DetailsFrame from "../components/signUp";


export const SignUpIndividual = () => {
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
    
 

export default SignUpIndividual;



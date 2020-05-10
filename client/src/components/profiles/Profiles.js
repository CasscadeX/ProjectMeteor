import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Spinners from "../layout/Spinners";
import ProfilesItem from "./ProfilesItem";
import {connect} from 'react-redux';
import {getProfiles} from "../../actions/profile";


const Profiles = ({getProfiles, profile:{profiles, loading}}) => {

    useEffect(()=>{
        getProfiles();
    },[getProfiles])

    return (
        <Fragment>
            {loading ? <Spinners /> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead"><i className="fab fa-connectdevelop"/> Browse and Connect with the developer</p>
                <div id='profiles'>
                    {profiles.length>0 ? profiles.map(profile => (
                        <ProfilesItem key={profile._id} profile={profile} />
                    )): <h4>No Profiles Found</h4>}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles);
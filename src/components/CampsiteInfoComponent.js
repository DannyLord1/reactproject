import React, { Component } from 'react';

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (CampsiteInfo.campsite) {
            return() {
                <div className="row">
                </div>
            }
        }
    }
}

export default CampsiteInfo;
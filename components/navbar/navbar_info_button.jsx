// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import MessageWrapper from 'components/message_wrapper.jsx';

import Constants from 'utils/constants.jsx';

export default class NavbarInfoButton extends React.PureComponent {
    static propTypes = {
        channel: PropTypes.object,
        showEditChannelHeaderModal: PropTypes.func.isRequired
    };

    showEditChannelHeaderModal = () => {
        this.refs.headerOverlay.hide();

        this.props.showEditChannelHeaderModal();
    }

    hide = () => {
        this.refs.headerOverlay.hide();
    }

    render() {
        let popoverContent = null;
        if (this.props.channel) {
            if (this.props.channel.header) {
                popoverContent = (
                    <MessageWrapper
                        message={this.props.channel.header}
                        options={{singleline: true, mentionHighlight: false}}
                    />
                );
            } else {
                const link = (
                    <a
                        href='#'
                        onClick={this.showEditChannelHeaderModal}
                    >
                        <FormattedMessage
                            id='navbar.click'
                            defaultMessage='Click here'
                        />
                    </a>
                );

                popoverContent = (
                    <div>
                        <FormattedMessage
                            id='navbar.noHeader'
                            defaultMessage='No channel header yet.{newline}{link} to add one.'
                            values={{
                                newline: (<br/>),
                                link
                            }}
                        />
                    </div>
                );
            }
        }

        const popover = (
            <Popover
                bsStyle='info'
                placement='bottom'
                id='header-popover'
            >
                {popoverContent}
                <div
                    className='close visible-xs-block'
                    onClick={this.hide}
                >
                    {'×'}
                </div>
            </Popover>
        );

        return (
            <OverlayTrigger
                ref='headerOverlay'
                trigger='click'
                placement='bottom'
                overlay={popover}
                className='description'
                rootClose={true}
            >
                <div className='navbar-toggle navbar-right__icon navbar-info-button pull-right'>
                    <span
                        className='icon icon__info'
                        dangerouslySetInnerHTML={{__html: Constants.INFO_ICON_SVG}}
                        aria-hidden='true'
                    />
                </div>
            </OverlayTrigger>
        );
    }
}

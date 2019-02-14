import React from "react";
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { withLocalize } from "react-localize-redux";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/LanguageOutlined';

class LanguageToggle extends React.Component {
    state = {
        anchorEl: null,
    };
    
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
        
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const open = Boolean(this.state.anchorEl);
        return (        
            <div>
                <IconButton
                    aria-owns={open ? 'lang-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <LanguageIcon />
                </IconButton>
                <Menu
                    id="lang-appbar"
                    anchorEl={this.state.anchorEl}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    {
                        this.props.languages.map(lang => (
                            <MenuItem
                                key={lang.code}
                                onClick={() => { 
                                    this.props.setActiveLanguage(lang.code); 
                                    this.handleClose();
                                }
                            }>
                                {lang.name}
                            </MenuItem>
                        ))
                    }
                </Menu>
            </div>
        );
    } 
}

// LanguageToggle.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withLocalize(LanguageToggle);
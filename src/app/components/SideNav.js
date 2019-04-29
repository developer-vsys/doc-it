import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect  } from 'react-redux';
import {SHOW_MOBILE, HIDE_MOBILE} from '../constants/ui';

import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';
import TopLevelMenuItem from './NavigationMenuItem';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';
import pxIcon from "../icons/pxblue.png";
import pxLogo from "../icons/pxblue.svg";
import eatongrey from "../icons/eatongrey.svg";
import {PX_BLUE_VERSION} from '../constants/ui';

import * as Colors from '@pxblue/colors';

const styles = theme => ({
  sidenav: {
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%'
  },
  largeImage:{
    height: 'auto', 
    width: '300px',
    marginLeft: '-5px', 
    transition:'all 150ms ease-in-out'
  },
  smallImage:{
    height: '38px', 
    width: 'auto', 
    margin: '8px', 
    transition:'all 150ms ease-in-out'
  },
  chip:{
    height: 'auto',
    backgroundColor: theme.palette.primary[500],
    color: 'white'
  },
  float: {
    position: 'absolute',
    top: '12px',
    right: '46px'
  },
  routes:{
    overflowY: 'auto', 
    overflowX: 'hidden',
    marginLeft: '64px',
    flexGrow: 1
  },
  eaton:{
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    background: Colors.gray[50]
  }
});

class SideNav extends Component {
  render(){
    const {classes} = this.props;

    return(
    <div className={classes.sidenav}>
      <Link to="/" style={{textDecoration: 'none'}} onClick={() => this.props.hideMobile()}>
        <Toolbar style={{height: 64}}>
          <Hidden smDown>
              <img className={classes.largeImage} src={pxLogo} alt="Power Xpert Blue"/>
            <Chip color={'primary'} className={classes.chip + ' ' + classes.float} label={`v${PX_BLUE_VERSION}`}/>
          </Hidden>
          <Hidden mdUp>
            <img className={classes.smallImage} src={pxIcon} alt=""/>
            <Typography variant="h6">
              Power Xpert <strong>Blue</strong>&nbsp;
            </Typography>
            <Chip className={classes.chip} label={`v${PX_BLUE_VERSION}`}/>
          </Hidden>
          <Divider absolute/>
        </Toolbar>
      </Link>
      <List className={classes.routes}>
        {this.props.pages.map((page, index) =>
          <TopLevelMenuItem key={page.displayName+index} config={page}/>
        )}
      </List>
      <Divider/>
      <div className={classes.eaton}>
        <img src={eatongrey} alt="Eaton Logo" height={50} width={'auto'} />
      </div>
    </div>);
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showMobile: () => {dispatch({type: SHOW_MOBILE})},
    hideMobile: () => {dispatch({type: HIDE_MOBILE})}
  };
};
export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(SideNav)));
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LandingPage } from '../pages';
import { DrawerLayout } from '@pxblue/react-components';
import { SharedToolbar } from '../components';
import { NavigationDrawer } from './navigationDrawer';
import { AppState } from '../redux/reducers';
import { Menu } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

import { pageDefinitions } from '../../__configuration__/navigationMenu/navigation';
import { AppBar, Toolbar, Typography, makeStyles, createStyles, useTheme, useMediaQuery } from '@material-ui/core';
import * as Colors from '@pxblue/colors';
import { TOGGLE_DRAWER } from '../redux/actions';

const buildRoutes = (routes: any[], url: string): JSX.Element[] => {
    let ret: any[] = [];
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].component) {
            ret.push(
                <Route exact path={`${url}${routes[i].url}`} key={`${url}/${routes[i].url}`}>
                    {routes[i].component}
                </Route>
            );
        }
        if (routes[i].pages) {
            ret = ret.concat(buildRoutes(routes[i].pages, `${url}${routes[i].url}`));
        }
    }
    return ret;
};

const useStyles = makeStyles(() =>
    createStyles({
        footer: {
            zIndex: 0,
            backgroundColor: Colors.black[900],
            textAlign: 'center',
            marginTop: '50vh',
            transform: 'inherit',
        },
    })
);

export const MainRouter = (): JSX.Element => {
    const title = useSelector((state: AppState) => state.app.pageTitle);
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const dispatch = useDispatch();

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="*">
                    <div style={{ height: '100vh' }}>
                        <DrawerLayout drawer={<NavigationDrawer />}>
                            <>
                                <SharedToolbar
                                    title={title}
                                    navigationIcon={<Menu onClick={(): void => {
                                        dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen })
                                    }
                                    } />}
                                />
                                <div style={isMobile ? { minHeight: 'calc(50vh - 102px)' } : { minHeight: 'calc(50vh - 128px)' }}>
                                    <Switch>
                                        {buildRoutes(pageDefinitions, '')}

                                        {/* Catch-All Redirect to Landing Page */}
                                        <Route path="*">
                                            <Redirect to={'/'} />
                                        </Route>
                                    </Switch>
                                </div>
                                {/* Footer Section */}
                                <AppBar position={'static'} className={classes.footer} elevation={0}>
                                    <Toolbar variant={'dense'}>
                                        <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                                            {`Copyright ${new Date().getFullYear()} Eaton. Licensed under BSD-3-Clause.`}
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </>
                        </DrawerLayout>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
};

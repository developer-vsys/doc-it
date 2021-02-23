import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerNavGroup, DrawerFooter, DrawerHeader, NavItem } from '@pxblue/react-components';
import { PxblueSmall } from '@pxblue/icons-mui';
import * as Colors from '@pxblue/colors';
import color from 'color';

import { pageDefinitions, SimpleNavItem } from '../../__configuration__/navigationMenu/navigation';
import { EatonTagline } from '../assets/icons';
import { Typography, useTheme, useMediaQuery, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { TOGGLE_DRAWER } from '../redux/actions';
import { getScheduledSiteConfig } from '../../__configuration__/themes';
import { DRAWER_WIDTH } from '../shared';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navItemRoot: {
            height: theme.spacing(6),
            paddingTop: theme.spacing(0.5),
            paddingBottom: theme.spacing(0.5),
        },
        infoListItemRoot: {
            height: theme.spacing(5),
        },
        active: {
            height: theme.spacing(5),
            top: 4,
        },
    })
);

export const NavigationDrawer = (): JSX.Element => {
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const location = useLocation();
    const history = useHistory();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const isLandingPage = history.location.pathname === '/';
    const activeDrawerFade = getScheduledSiteConfig().drawerActiveBackgroundFade;

    const createNavItems = useCallback((navData: SimpleNavItem[], parentUrl: string, depth: number): NavItem[] => {
        const convertedItems: NavItem[] = [];
        for (let i = 0; i < navData.length; i++) {
            const item = navData[i];
            if (item.hidden) {
                continue;
            }
            const fullURL = `${parentUrl}${item.url}`;
            convertedItems.push({
                title: item.title,
                icon: depth === 0 ? item.icon : undefined,
                classes: {
                    root: classes.navItemRoot,
                    active: classes.active,
                    infoListItemRoot: classes.infoListItemRoot,
                },
                itemID: fullURL,
                // To add a on hover effect to the ExpandMore chevron for NavItems
                // with sub pages and a landing page (e.g., Design Patterns)
                //
                // expandIcon:
                //     item.pages && item.component ? (
                //         <IconButton>
                //             <ExpandMore />
                //         </IconButton>
                //     ) : (
                //         undefined
                //     ),
                onClick: item.component
                    ? (): void => {
                          history.push(fullURL);
                          dispatch({ type: TOGGLE_DRAWER, payload: false });
                      }
                    : undefined,
                items: item.pages ? createNavItems(item.pages, `${parentUrl}${item.url}`, depth + 1) : undefined,
            });
        }
        return convertedItems;
    }, []);

    useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location.pathname]);

    const [menuItems] = useState(createNavItems(pageDefinitions, '', 0));

    return (
        <Drawer
            open={drawerOpen}
            width={DRAWER_WIDTH}
            ModalProps={{
                onBackdropClick: (): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                },
            }}
            activeItemBackgroundShape={'round'}
            variant={isMobile || isLandingPage ? 'temporary' : 'permanent'}
            nestedBackgroundColor={theme.palette.type === 'light' ? undefined : Colors.darkBlack[500]}
            activeItemBackgroundColor={
                activeDrawerFade
                    ? color(theme.palette.primary.main)
                          .fade(activeDrawerFade)
                          .string()
                    : theme.palette.type === 'light'
                    ? undefined
                    : color(theme.palette.primary.main)
                          .fade(0.8)
                          .string()
            }
            activeItemFontColor={theme.palette.type === 'light' ? undefined : theme.palette.primary.light}
            activeItemIconColor={theme.palette.type === 'light' ? undefined : theme.palette.primary.light}
            itemFontColor={theme.palette.text.primary}
            divider={false}
            activeItem={activeRoute}
            hidePadding
        >
            <DrawerHeader
                icon={<PxblueSmall />}
                onIconClick={(): void => {
                    if (isMobile) {
                        dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                    } else {
                        history.push('/');
                        dispatch({ type: TOGGLE_DRAWER, payload: false });
                    }
                }}
                titleContent={
                    <div
                        style={{
                            alignSelf: 'stretch',
                            flex: '1 1 0px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: theme.palette.primary.contrastText,
                        }}
                        onClick={(): void => {
                            history.push('/');
                            dispatch({ type: TOGGLE_DRAWER, payload: false });
                        }}
                    >
                        <Typography>
                            Power Xpert <b>Blue</b>
                        </Typography>
                    </div>
                }
            />
            <DrawerBody>
                <DrawerNavGroup items={menuItems} />
            </DrawerBody>
            <DrawerFooter>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        background: theme.palette.background.default,
                        padding: 16,
                        cursor: 'pointer',
                    }}
                    onClick={(): void => {
                        window.open('https://eaton.com', 'blank');
                    }}
                >
                    <EatonTagline style={{ fontSize: 150, height: 48 }} />
                </div>
            </DrawerFooter>
        </Drawer>
    );
};

import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerNavGroup, DrawerFooter, DrawerHeader, NavItem } from '@pxblue/react-components';
import { PxblueSmall } from '@pxblue/icons-mui';

import * as Colors from '@pxblue/colors';
import { pageDefinitions, SimpleNavItem } from '../../__configuration__/navigationMenu/navigation';
import { Eaton } from '../assets/icons';
import { Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { TOGGLE_DRAWER } from '../redux/actions';

export const NavigationDrawer = (): JSX.Element => {
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const location = useLocation();
    const history = useHistory();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const dispatch = useDispatch();

    const createNavItems = useCallback((navData: SimpleNavItem[], parentUrl: string, depth: number): NavItem[] => {
        const convertedItems: NavItem[] = [];
        for (let i = 0; i < navData.length; i++) {
            const item = navData[i];
            const fullURL = `${parentUrl}${item.url}`;
            convertedItems.push({
                title: item.title,
                icon: depth === 0 ? item.icon : undefined,
                itemID: fullURL,
                onClick: item.component
                    ? (): void => {
                        history.push(fullURL);
                        setActiveRoute(fullURL);
                    }
                    : undefined,
                items: item.pages ? createNavItems(item.pages, `${parentUrl}${item.url}`, depth + 1) : undefined,
            });
        }
        return convertedItems;
    }, []);

    const [menuItems] = useState(createNavItems(pageDefinitions, '', 0));

    return (
        <Drawer
            open={drawerOpen}
            width={270}
            ModalProps={{
                onBackdropClick: (): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                },
            }}
            variant={isMobile ? 'temporary' : 'permanent'}
        >
            <DrawerHeader
                backgroundColor={Colors.blue[500]}
                fontColor={Colors.white[50]}
                icon={<PxblueSmall />}
                onIconClick={(): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen })
                }
                }
                titleContent={
                    <div
                        style={{
                            height: '100%',
                            flex: '1 1 0px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={(): void => {
                            history.push('/');
                        }}
                    >
                        <Typography>
                            Power Xpert <b>Blue</b>
                        </Typography>
                    </div>
                }
            />
            <DrawerBody>
                <DrawerNavGroup hidePadding activeItem={activeRoute} items={menuItems} />
            </DrawerBody>
            <DrawerFooter>
                <div style={{ display: 'flex', justifyContent: 'center', background: Colors.gray[50] }}>
                    <Eaton style={{ fontSize: 92 }} />
                </div>
            </DrawerFooter>
        </Drawer>
    );
};

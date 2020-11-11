import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import * as BrandingColors from '@pxblue/colors-branding';
import Diwali from '../../app/assets/themes/diwali-banner.jpg';
import diwaliCursor from '../../app/assets/themes/diwali-cursor.png';
import AppBarTile from '../../app/assets/themes/diwali-appbar-tile.png';
import { Schedule } from './types';

export const DiwaliSchedule: Schedule = {
    start: new Date(0, 10, 11), // Nov 11
    end: new Date(0, 10, 16), // Nov 16
    config: {
        theme: {
            ...PXBThemes.blue,
            palette: {
                ...PXBThemes.blue.palette,
                type: 'light',
                primary: {
                    light: BrandingColors.wine[300],
                    main: BrandingColors.wine[400],
                    dark: BrandingColors.wine[900],
                },
                secondary: {
                    light: Colors.gold[300],
                    main: Colors.gold[500],
                    dark: Colors.gold[900],
                },
            },
            overrides: {
                ...PXBThemes.blue.overrides,
                MuiAppBar: {
                    ...PXBThemes.blue.overrides?.MuiAppBar,
                    colorSecondary: {
                        color: Colors.white[50],
                        backgroundColor: BrandingColors.wine[500],
                        '& .MuiInputBase-root': {
                            color: Colors.white[50],
                        },
                        '& .MuiSelect-icon': {
                            color: Colors.white[50],
                        },
                    },
                },
                MuiButton: {
                    ...PXBThemes.blue.overrides?.MuiButton,
                    outlined: {},
                    outlinedPrimary: {},
                },
            },
        },
        drawerActiveBackgroundFade: 0.75,
        landingPageBanner: {
            backgroundImage: `url(${Diwali})`,
            backgroundSize: '300px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 65%',
            backgroundColor: BrandingColors.wine[900],
            cursor: `url("${diwaliCursor}") 0 25, auto`,
            textShadow: `0 0 4px black`,
        },
        className: 'christmas-eve',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '30%',
            backgroundPosition: 'left 75%',
        },
    },
};
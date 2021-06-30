import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import * as BrandingColors from '@pxblue/colors-branding';
import IndependenceDay from '../../app/assets/themes/independence-day/independence-day-bg.png';
import IndependenceDayCursor from '../../app/assets/themes/independence-day/flag-cursor.png';
import AppBarTile from '../../app/assets/themes/independence-day/independence-day-appbar-tile.png';
import { Schedule } from './types';

export const IndependenceDaySchedule: Schedule = {
    start: new Date(0, 6, 2), // July 2
    end: new Date(0, 6, 8), // July 7
    config: {
        theme: {
            ...PXBThemes.blue,
            palette: {
                ...PXBThemes.blue.palette,
                type: 'light',
                primary: {
                    light: BrandingColors.blue[300],
                    main: BrandingColors.blue[500],
                    dark: BrandingColors.blue[700],
                },
                secondary: {
                    light: Colors.red[300],
                    main: Colors.red[500],
                    dark: Colors.red[900],
                },
            },
            overrides: {
                ...PXBThemes.blue.overrides,
                MuiAppBar: {
                    ...PXBThemes.blue.overrides?.MuiAppBar,
                    colorSecondary: {
                        color: Colors.white[50],
                        backgroundColor: BrandingColors.blue[500],
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
        drawerActiveBackgroundFade: 0.85,
        landingPageBanner: {
            backgroundImage: `url(${IndependenceDay})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 25%',
            backgroundColor: BrandingColors.blue[700],
            textShadow: `0 0 5px black`,
            cursor: `url("${IndependenceDayCursor}") 0 0, auto`,
        },
        className: 'independence-day',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '600px',
            backgroundPosition: 'left 25%',
        },
        landingPageTagline: 'Happy 4th!',
    },
};

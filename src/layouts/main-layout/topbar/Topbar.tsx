import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import sitemap, { MenuItem } from 'routes/sitemap'; // Make sure to import the MenuItem type
import IconifyIcon from 'components/base/IconifyIcon';
import Search from 'components/common/Search';
import ElevationScroll from './ElevationScroll';
import AccountDropdown from './AccountDropdown';
import SettingsMenu from './SettingsMenu';
import Notification from './Notification';

interface TopbarProps {
  drawerWidth: number;
  onHandleDrawerToggle: () => void;
}

const Topbar = ({ drawerWidth, onHandleDrawerToggle }: TopbarProps) => {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const findPageTitle = (items: MenuItem[]): string => {
      // Specify the return type as string
      for (const item of items) {
        if (item.path === location.pathname) {
          return item.name;
        }
        if (item.items) {
          const nestedTitle: string | undefined = findPageTitle(item.items); // Explicitly define the type
          if (nestedTitle) return nestedTitle;
        }
      }
      return '';
    };

    return findPageTitle(sitemap);
  }, [location]);

  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: '90px',
          bgcolor: 'background.default',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 5 },
            minHeight: '90px',
            bgcolor: 'background.default',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            columnGap={{ xs: 1, sm: 2 }}
            sx={{ display: { lg: 'none' } }}
          >
            <IconButton color="inherit" aria-label="open drawer" onClick={onHandleDrawerToggle}>
              <IconifyIcon icon="mdi:hamburger-menu" sx={{ fontSize: { xs: 8, sm: 10 } }} />
            </IconButton>

            <IconButton aria-label="search-icon" sx={{ display: { md: 'none' } }}>
              <IconifyIcon
                icon="gravity-ui:magnifier"
                sx={{ color: 'primary.main', fontSize: 12 }}
              />
            </IconButton>
          </Stack>

          {/* Only show the title if there's a match */}
          {pageTitle && (
            <Typography
              variant="h3"
              color="primary.darker"
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              {pageTitle}
            </Typography>
          )}

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={{ xs: 1, sm: 2 }}
            width={1}
          >
            <Search
              size="small"
              sx={{
                display: { xs: 'none', md: 'block' },
                minWidth: 100,
                maxWidth: 200,
                bgcolor: 'background.paper',
              }}
            />
            <SettingsMenu />
            <Notification />
            <AccountDropdown />
          </Stack>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Topbar;

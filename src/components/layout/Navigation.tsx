import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {
  HistoryIconNav,
  HomeIconNav,
  ProfileIconNav,
  SupportIconNav,
} from "../../icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useNavigation } from "../../contexts/NavigationContext";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isIOS = Telegram.WebApp.platform === "ios";
  const { isNavigationVisible } = useNavigation();

  const { isHome, isHistory, isProfile } = useMemo(
    () => ({
      isHome: location.pathname === "/",
      isHistory: location.pathname === "/history",
      isProfile: location.pathname === "/profile",
    }),
    [location.pathname]
  );

  const navLinks = useMemo(
    () => [
      {
        label: "Главная",
        icon: <HomeIconNav selected={isHome} />,
        path: "/",
        isSelected: isHome,
      },
      {
        label: "История",
        icon: <HistoryIconNav selected={isHistory} />,
        path: "/history",
        isSelected: isHistory,
      },
      {
        label: "Профиль",
        icon: <ProfileIconNav selected={isProfile} />,
        path: "/profile",
        isSelected: isProfile,
      },
      {
        label: "Поддержка",
        icon: <SupportIconNav selected={false} />,
        path: "support",
        isSelected: false,
      },
    ],
    [isHome, isHistory, isProfile]
  );

  const handleClick = (path: string) => {
    if (path === "support") {
      Telegram.WebApp.openTelegramLink("https://t.me/alfin_manager");
    } else {
      navigate(path);
    }
  };

  const bottomPadding = isIOS
    ? "calc(env(safe-area-inset-bottom) + 20px)"
    : "20px";

  const isMaintenancePage = location.pathname === "/maintenance";

  if (isMaintenancePage) {
    return null;
  }

  return (
    <>
      {/* Bottom gradient overlay */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: `calc(${bottomPadding} + 62px + 15px + 60px)`,
          zIndex: 99996,
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.00) 100%)",
          pointerEvents: "none",
          transform: isNavigationVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      />
      {/* Blur layer */}
      <Box
        sx={{
          position: "fixed",
          bottom: `calc(${bottomPadding} + 5px)`,
          left: 32,
          right: 32,
          zIndex: 99997,
          minHeight: `61px`,
          borderRadius: "60px;",
          background: "rgba(20, 20, 21, 0.40);",

          boxShadow:
            "0 5px 30px 0 rgba(0, 0, 0, 0.25), -0.5px 0.5px 1px 0 rgba(0, 0, 0, 0.30) inset, 0.5px -0.5px 1px 0 rgba(0, 0, 0, 0.30) inset, 0.5px 0.5px 1px 0 rgba(255, 255, 255, 0.30) inset, -0.5px -0.5px 1px 0 rgba(255, 255, 255, 0.30) inset;",
          backdropFilter: "blur(7.5px);",
          transform: isNavigationVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      />
      {/* Content layer */}
      <Box
        component="nav"
        sx={{
          position: "fixed",

          bottom: `calc(${bottomPadding} + 5px)`,

          left: "32px",
          right: "32px",
          zIndex: 99999,
          height: `61px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: "2px", sm: "4px" },
          paddingTop: "0px",
          marginTop: "0px",
          background: "transparent",
          transform: isNavigationVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out",
          gap: { xs: "2px", sm: "4px" },
        }}
      >
        {navLinks.map((link) => (
          <IconButton
            key={link.label}
            onClick={() => handleClick(link.path)}
            disableRipple
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              color: "inherit",
              padding: { xs: "6px 8px", sm: "8px 16px" },
              height: "54px",
              borderRadius: "14px",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              userSelect: "none",
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              flex: { xs: "1 1 0", sm: "0 0 auto" },
              minWidth: 0,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(125, 125, 130, 0.20)"
                    : "rgba(0, 0, 0, 0.05)",
                borderRadius: "40px",
                paddingInline: "8px",
                opacity: link.isSelected ? 1 : 0,
                transition:
                  "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                willChange: "opacity, transform",
              },
              "@media (hover: hover)": {
                "&:hover": {
                  "&::before": {
                    opacity: 1,
                  },
                },
              },
              "@media (hover: none)": {
                "&:active": {
                  transform: "scale(0.95) translateZ(0)",
                },
              },
            }}
          >
            <Box
              className="nav-icon"
              sx={{
                height: "24px",
                width: "24px",
                transition: "transform 0.2s ease-in-out",
                transform: "scale(1) translateZ(0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform",
                opacity: 1,
                flexShrink: 0,
                "& svg": {
                  maxHeight: "100%",
                  maxWidth: "100%",
                  width: "auto",
                  height: "auto",
                },
              }}
            >
              {link.icon}
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                fontSize: "10px",
                lineHeight: { xs: "11px", sm: "12px" },
                color: link.isSelected
                  ? "primary.main"
                  : theme.palette.mode === "dark"
                  ? "rgba(235, 235, 245, 0.6)"
                  : "rgba(0, 0, 0, 0.6)",
                transition: "color 0.2s ease-in-out",
                display: "block",
                opacity: 1,
                pb: 0.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {link.label}
            </Typography>
          </IconButton>
        ))}
      </Box>
    </>
  );
}

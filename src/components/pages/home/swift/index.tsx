import { Box, Typography, useTheme } from "@mui/material";
import { Block, Button } from "../../../shared";
import { useNavigate } from "react-router-dom";

export function SwiftBlock() {
  const navigate = useNavigate();
  const theme = useTheme();
  const supportUrl = `https://t.me/alfin_manager?text=Хочу оплатить инвойс/перевод Swift`;
  return (
    <Block sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          position: "relative",
          maxWidth: "100%",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="12" fill="#3377FF" />
              <path
                d="M15.3661 30C15.8543 30 16.25 29.6043 16.25 29.1161V26.25L28.75 26.25C29.4404 26.25 30 25.6904 30 25C30 24.3096 29.4404 23.75 28.75 23.75L16.25 23.75L16.25 20.8839C16.25 20.3957 15.8543 20 15.3661 20C15.1317 20 14.9069 20.0931 14.7411 20.2589L10.7071 24.2929C10.3166 24.6834 10.3166 25.3166 10.7071 25.7071L14.7411 29.7411C14.9069 29.9069 15.1317 30 15.3661 30Z"
                fill="white"
              />
              <path
                d="M24.6339 20C24.1457 20 23.75 19.6043 23.75 19.1161V16.25L11.25 16.25C10.5596 16.25 10 15.6904 10 15C10 14.3096 10.5596 13.75 11.25 13.75L23.75 13.75V10.8839C23.75 10.3957 24.1457 10 24.6339 10C24.8683 10 25.0931 10.0931 25.2589 10.2589L29.2929 14.2929C29.6834 14.6834 29.6834 15.3166 29.2929 15.7071L25.2589 19.7411C25.0931 19.9069 24.8683 20 24.6339 20Z"
                fill="white"
              />
            </svg>
          </Box>
          <Typography sx={{ fontSize: 15, fontWeight: 500, pt: 0.5 }}>
            Оплата ссылок, SWIFT, Invoice
          </Typography>
          <Box sx={{ mt: "1.25rem" }}>
            <Button
              disableGlassEffect
              onClick={() => Telegram.WebApp.openTelegramLink(supportUrl)}
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                borderRadius: "40px",
                padding: "0px 10px",
                fontSize: "11px",
                fontWeight: "500",
                width: "120px",
                minHeight: "35px",
                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                },
              }}
            >
              Оплатить
            </Button>
          </Box>
        </Box>
      </Box>
    </Block>
  );
}

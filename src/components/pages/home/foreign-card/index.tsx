import { Box, Typography, useTheme } from "@mui/material";
import { Block, Button } from "../../../shared";
import { useNavigate } from "react-router-dom";

export function ForeignCardBlock() {
  const theme = useTheme();
  const navigate = useNavigate();

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
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box
            component="img"
            src="/ffcard.png"
            sx={{
              objectFit: "contain",
              height: "40px",
            }}
          />
          <Typography sx={{ fontSize: 15, fontWeight: 500, pt: 0.5 }}>
            Открытие карт
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              opacity: 0.5,
              lineHeight: "1.2",
              pt: 0.5,
              pb: 1.2,
            }}
          >
            Именные карты зарубежных банков
          </Typography>
          <Box>
            <Button
              disableGlassEffect
              onClick={() => navigate("/foreign-card")}
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                borderRadius: "40px",
                padding: "0px 10px",
                fontSize: "11px",
                fontWeight: "500",
                width: "auto",
                minHeight: "35px",
                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                },
              }}
            >
              Выбрать карту
            </Button>
          </Box>
        </Box>
      </Box>
    </Block>
  );
}

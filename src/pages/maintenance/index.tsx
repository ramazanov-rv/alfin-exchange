import { Box, Fade, Typography, useTheme } from "@mui/material";
import { Block, Title } from "../../components/shared";
import { ConstructionRounded } from "@mui/icons-material";

export function MaintenancePage() {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          marginBottom: "100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "secondary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <ConstructionRounded
              sx={{
                fontSize: "64px",
                color: "primary.main",
              }}
            />
          </Box>

          <Title>Идут технические работы</Title>

          <Block
            sx={{
              display: "grid",
              rowGap: "16px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              В настоящее время проводятся технические работы
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: 1.6,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
              }}
            >
              Мы работаем над улучшением сервиса. Пожалуйста, зайдите позже.
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: 1.6,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
                mt: 1,
              }}
            >
              Приносим извинения за временные неудобства.
            </Typography>
          </Block>
        </Box>
      </Box>
    </Fade>
  );
}


import { Box, Typography } from "@mui/material";
import { Block, Button } from "../../../shared/";

export function ApplePayBlock() {
  const supportUrl = `https://t.me/alfin_manager?text=Хочу привязать карту к Apple Pay/Google Pay`;
  return (
    <Block
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        component="img"
        src="/apple-pay-background.png"
        sx={{
          position: "absolute",
          top: 0,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: "99",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          sx={{
            margin: "1.25rem 0 1rem 0",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            borderRadius: "6px",
          }}
          component="img"
          src="/apple-pay.svg"
        />

        <Box sx={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            Аренда карты Apple Pay
          </Typography>
          <Typography sx={{ fontWeight: "300" }}>
            Пользуйтесь зарубежными картами с поддержкой Apple Pay без лимитов
            на вывод и пополнением баланса в любое время
          </Typography>
        </Box>

        <Button
          onClick={() => {
            Telegram.WebApp.openTelegramLink(supportUrl);
          }}
        >
          Арендовать карту
        </Button>

        <Typography
          sx={{ fontSize: "12px", opacity: ".6", paddingTop: ".75rem" }}
        >
          Поддержка 24/7 и время выполнения до 20 минут
        </Typography>
      </Box>
    </Block>
  );
}

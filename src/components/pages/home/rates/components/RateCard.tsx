import { Box, Typography } from "@mui/material";

interface RateCard {
  title: string;
  rate?: number | null;
  icon: string;
  symbol: string;
}

export function RateCard({ title, rate, icon, symbol }: RateCard) {
  return (
    <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
      {icon ? (
        <Box
          component="img"
          src={icon}
          alt={`${title} icon`}
          style={{
            width: "32px",
            height: "16px",
            objectFit: "cover",
          }}
        />
      ) : (
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: "700",
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          {symbol}
        </Typography>
      )}
      <Typography sx={{ fontWeight: "500" }}>
        {title}
        {rate != null ? (
          <>
            {" • "}
            {rate}
            {symbol === "RUB" ? "₮" : "₽"}
          </>
        ) : null}
      </Typography>
    </Box>
  );
}

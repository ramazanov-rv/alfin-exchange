import { Box, CircularProgress } from "@mui/material";
import { RateCard } from "./components/RateCard";
import { Block } from "../../../shared";
import { useQuery } from "react-query";
import {
  getCurrenciesPairs,
  getRates,
} from "../../../../services/currencies/pairs";

export function RatesBlock() {
  const { data, isLoading } = useQuery({
    queryFn: () => getRates(),
  });

  const rates = Array.isArray(data)
    ? data.filter((rate) => rate.rate != null && !isNaN(rate.rate))
    : [];

  return (
    <Block
      sx={{
        display: "grid",
        gridTemplateColumns: isLoading ? "100%" : "50% 50%",
        columnGap: "10px",
        rowGap: "12px",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={30} />
        </Box>
      ) : (
        rates.map((rate) => (
          <RateCard
            key={rate.id}
            title={rate.title}
            rate={rate.rate}
            icon={rate.icon}
            symbol={rate.symbol}
          />
        ))
      )}
    </Block>
  );
}

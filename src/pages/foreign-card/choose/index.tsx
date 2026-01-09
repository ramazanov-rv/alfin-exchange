import { CircularProgress, Fade, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button, Title } from "../../../components/shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTelegram } from "../../../hooks/useTelegram";
import { useQuery } from "react-query";
import { getForeignCardInfo } from "../../../services/foreign-card";
import { formatNumber } from "../../../utils";

export function ForeignCardChoosePage() {
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const { data: cardsData, isLoading } = useQuery(
    "foreign-card-info",
    getForeignCardInfo
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/`));
    };
  }, [navigate, tg]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress size={35} />
      </Box>
    );
  }

  return (
    <Fade in>
      <Box sx={{ width: "100%", marginBottom: "100px" }}>
        <Title>Открыть карту иностранного банка</Title>
        <Box sx={{ display: "grid", gap: "12px" }}>
          {/* First card */}
          <Box
            sx={{
              bgcolor: "secondary.main",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            {/* Image */}
            <Box
              component="img"
              src="/ffcard.png"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow:
                  "0px 10px 20px 0px #00000026, inset 0px -1px 0px 0px #00000040, inset 0px 1px 0px 0px #FFFFFF0D",
              }}
            />

            {/* Content */}

            {/* Card name */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                mt: 2.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: "100%",
                  letterSpacing: "-1px",
                  color: "text.primary",
                }}
              >
                Freedom Казахстан
              </Typography>
              <Typography
                sx={{
                  opacity: 0.5,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "-0.5px",
                  color: "text.primary",
                }}
              >
                Казахстан
              </Typography>
            </Box>

            {/* Card Advantages */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginBlock: 3,
              }}
            >
              {/* First item */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "11px" }}>
                {/* Icon */}
                <Box
                  sx={{
                    backgroundColor: "secondary.light",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.87407e-08 5.61331C-0.000152701 6.91651 0.451346 8.17941 1.2775 9.18664C2.10365 10.1939 3.2533 10.883 4.53038 11.1367C4.60393 10.33 4.81074 9.54118 5.14237 8.80232C4.15688 8.46901 3.5235 7.71229 3.375 6.63803H2.8125V6.15833H3.33675V5.66962C3.336 5.61707 3.3375 5.56639 3.34125 5.5176H2.8125V5.03677H3.38737C3.6405 3.63144 4.73962 2.79816 6.39113 2.79816C6.74663 2.79816 7.05487 2.83307 7.3125 2.89387V3.71928C7.01154 3.65268 6.70381 3.62169 6.39563 3.62694C5.36175 3.62694 4.66537 4.15169 4.44487 5.03677H6.6015V5.5176H4.374C4.371 5.57015 4.36987 5.62533 4.37063 5.68313V6.15833H6.6015V6.63916H4.42125C4.554 7.31705 4.94775 7.799 5.55188 8.02309C6.14423 7.04112 6.95888 6.21225 7.9301 5.60334C8.90132 4.99444 10.0019 4.62254 11.1431 4.51766C10.8672 3.15007 10.094 1.93364 8.97337 1.10401C7.85269 0.274383 6.46428 -0.109404 5.07708 0.0269937C3.68988 0.163392 2.40262 0.810266 1.46465 1.84231C0.526683 2.87436 0.00476663 4.21813 3.87407e-08 5.61331ZM18 11.8067C18 13.4492 17.3481 15.0245 16.1877 16.186C15.0273 17.3475 13.4535 18 11.8125 18C10.1715 18 8.59766 17.3475 7.43728 16.186C6.2769 15.0245 5.625 13.4492 5.625 11.8067C5.625 10.1641 6.2769 8.58878 7.43728 7.4273C8.59766 6.26583 10.1715 5.61331 11.8125 5.61331C13.4535 5.61331 15.0273 6.26583 16.1877 7.4273C17.3481 8.58878 18 10.1641 18 11.8067ZM9.28125 13.2953C9.35888 14.2356 10.1205 14.9675 11.4907 15.0542V15.7479H12.0982V15.0497C13.5146 14.9529 14.3438 14.2164 14.3438 13.1467C14.3438 12.1726 13.7104 11.6715 12.5775 11.4125L12.0982 11.2999V9.41265C12.7057 9.48021 13.0928 9.80339 13.185 10.2516H14.2515C14.1728 9.34621 13.3751 8.63792 12.0982 8.56022V7.86544H11.4907V8.57373C10.2802 8.68972 9.45675 9.39801 9.45675 10.4002C9.45675 11.2864 10.0688 11.8506 11.088 12.0814L11.4907 12.1771V14.1815C10.8675 14.0914 10.4558 13.7581 10.3624 13.2953H9.28125ZM11.4862 11.1614C10.8877 11.0263 10.5638 10.7515 10.5638 10.3371C10.5638 9.87546 10.9136 9.52751 11.4907 9.42616V11.1603H11.4851L11.4862 11.1614ZM12.186 12.337C12.9116 12.5003 13.2469 12.7649 13.2469 13.2334C13.2469 13.7671 12.8306 14.1342 12.0994 14.2018V12.3168L12.186 12.337Z"
                      fill="#3377FF"
                    />
                  </svg>
                </Box>
                {/* Subtitle */}
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "100%",
                  }}
                >
                  Мультивалютная
                </Typography>
              </Box>

              {/* Second item */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "11px" }}>
                {/* Icon */}
                <Box
                  sx={{
                    backgroundColor: "secondary.light",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.666 0.333008H2.33268C1.41352 0.333008 0.666016 1.08051 0.666016 1.99967V11.9997C0.666016 12.9188 1.41352 13.6663 2.33268 13.6663H15.666C16.5852 13.6663 17.3327 12.9188 17.3327 11.9997V1.99967C17.3327 1.08051 16.5852 0.333008 15.666 0.333008ZM9.41602 10.333C8.86348 10.333 8.33358 10.1135 7.94288 9.72281C7.55218 9.33211 7.33268 8.80221 7.33268 8.24967C7.33268 7.69714 7.55218 7.16724 7.94288 6.77654C8.33358 6.38583 8.86348 6.16634 9.41602 6.16634C9.86824 6.16739 10.3075 6.31733 10.666 6.59301C10.1627 6.97301 9.83268 7.57051 9.83268 8.24967C9.83268 8.92884 10.1627 9.52634 10.666 9.90634C10.3075 10.182 9.86824 10.332 9.41602 10.333ZM12.7493 10.333C12.1968 10.333 11.6669 10.1135 11.2762 9.72281C10.8855 9.33211 10.666 8.80221 10.666 8.24967C10.666 7.69714 10.8855 7.16724 11.2762 6.77654C11.6669 6.38583 12.1968 6.16634 12.7493 6.16634C13.3019 6.16634 13.8318 6.38583 14.2225 6.77654C14.6132 7.16724 14.8327 7.69714 14.8327 8.24967C14.8327 8.80221 14.6132 9.33211 14.2225 9.72281C13.8318 10.1135 13.3019 10.333 12.7493 10.333Z"
                      fill="#3377FF"
                    />
                  </svg>
                </Box>
                {/* Subtitle */}
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "100%",
                  }}
                >
                  Привязывается к Apple Pay и Google Pay
                </Typography>
              </Box>

              {/* Third item */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "11px" }}>
                {/* Icon */}
                <Box
                  sx={{
                    backgroundColor: "secondary.light",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.37435 10.0413L13.791 8.08301C13.9993 8.02745 14.1557 7.89912 14.2602 7.69801C14.3646 7.4969 14.3888 7.2919 14.3327 7.08301C14.2766 6.87412 14.1552 6.71801 13.9685 6.61467C13.7818 6.51134 13.5838 6.4869 13.3743 6.54134L11.3327 7.08301L7.99935 3.95801L6.83268 4.24967L8.83268 7.74967L6.83268 8.24967L5.79102 7.45801L4.99935 7.66634L6.37435 10.0413ZM15.666 13.6663H2.33268C1.87435 13.6663 1.48213 13.5033 1.15602 13.1772C0.829905 12.8511 0.666571 12.4586 0.666016 11.9997V8.66634C1.12435 8.66634 1.51685 8.50329 1.84352 8.17717C2.17018 7.85106 2.33324 7.45856 2.33268 6.99967C2.33213 6.54079 2.16907 6.14856 1.84352 5.82301C1.51796 5.49745 1.12546 5.33412 0.666016 5.33301V1.99967C0.666016 1.54134 0.829349 1.14912 1.15602 0.823008C1.48268 0.496897 1.8749 0.333563 2.33268 0.333008H15.666C16.1243 0.333008 16.5168 0.496341 16.8435 0.823008C17.1702 1.14967 17.3332 1.5419 17.3327 1.99967V11.9997C17.3327 12.458 17.1696 12.8505 16.8435 13.1772C16.5174 13.5038 16.1249 13.6669 15.666 13.6663Z"
                      fill="#3377FF"
                    />
                  </svg>
                </Box>
                {/* Subtitle */}
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "100%",
                  }}
                >
                  Срок действия: 5 лет
                </Typography>
              </Box>
            </Box>

            {/* Price and Deadline */}
            <Box
              sx={{ display: "flex", gap: "32px", alignItems: "flex-start" }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: "100%",
                    color: "text.primary",
                  }}
                >
                  15 000
                  ₽
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "100%",
                    color: "text.primary",
                    opacity: 0.5,
                    pt: 0.25,
                  }}
                >
                  стоимость
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: "100%",
                    color: "text.primary",
                  }}
                >
                  1-3 рабочих дня
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "100%",
                    color: "text.primary",
                    opacity: 0.5,
                    pt: 0.25,
                  }}
                >
                  сроки открытия
                </Typography>
              </Box>
            </Box>

            {/* Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                onClick={() =>
                  navigate("/foreign-card/apply", {
                    state: { card: "ibt-card" },
                  })
                }
              >
                Оформить заявку
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

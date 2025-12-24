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
              src="/ibt-card.png"
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
                {cardsData?.cards[0].name}
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
                Таджикистан
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
                  Можно пополнять
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
                  Работает в Европе
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
                  {formatNumber(
                    (cardsData?.cards[0]?.final_price || 0).toString()
                  )}
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
                  {cardsData?.cards[0].issue_days}
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

          {/* Second card */}
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
              src="/alfa-card.png"
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
                {cardsData?.cards[1].name}
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
                Беларусь
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
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.83398 0.333008H17.1673C17.6978 0.333008 18.2065 0.543722 18.5815 0.918794C18.9566 1.29387 19.1673 1.80257 19.1673 2.33301V11.6663C19.1673 12.1968 18.9566 12.7055 18.5815 13.0806C18.2065 13.4556 17.6978 13.6663 17.1673 13.6663H2.83398C2.30355 13.6663 1.79484 13.4556 1.41977 13.0806C1.0447 12.7055 0.833984 12.1968 0.833984 11.6663V2.33301C0.833984 1.80257 1.0447 1.29387 1.41977 0.918794C1.79484 0.543722 2.30355 0.333008 2.83398 0.333008ZM3.33398 4.49967C3.33398 4.27866 3.42178 4.0667 3.57806 3.91042C3.73434 3.75414 3.9463 3.66634 4.16732 3.66634H8.33398C8.555 3.66634 8.76696 3.75414 8.92324 3.91042C9.07952 4.0667 9.16732 4.27866 9.16732 4.49967C9.16732 4.72069 9.07952 4.93265 8.92324 5.08893C8.76696 5.24521 8.555 5.33301 8.33398 5.33301H4.16732C3.9463 5.33301 3.73434 5.24521 3.57806 5.08893C3.42178 4.93265 3.33398 4.72069 3.33398 4.49967ZM4.16732 6.16634C3.9463 6.16634 3.73434 6.25414 3.57806 6.41042C3.42178 6.5667 3.33398 6.77866 3.33398 6.99967C3.33398 7.22069 3.42178 7.43265 3.57806 7.58893C3.73434 7.74521 3.9463 7.83301 4.16732 7.83301H8.33398C8.555 7.83301 8.76696 7.74521 8.92324 7.58893C9.07952 7.43265 9.16732 7.22069 9.16732 6.99967C9.16732 6.77866 9.07952 6.5667 8.92324 6.41042C8.76696 6.25414 8.555 6.16634 8.33398 6.16634H4.16732ZM4.16732 8.66634C3.9463 8.66634 3.73434 8.75414 3.57806 8.91042C3.42178 9.0667 3.33398 9.27866 3.33398 9.49967C3.33398 9.72069 3.42178 9.93265 3.57806 10.0889C3.73434 10.2452 3.9463 10.333 4.16732 10.333H8.33398C8.555 10.333 8.76696 10.2452 8.92324 10.0889C9.07952 9.93265 9.16732 9.72069 9.16732 9.49967C9.16732 9.27866 9.07952 9.0667 8.92324 8.91042C8.76696 8.75414 8.555 8.66634 8.33398 8.66634H4.16732ZM13.0898 9.25551L16.4232 5.92217C16.575 5.76501 16.6589 5.5545 16.657 5.33601C16.6551 5.11751 16.5675 4.9085 16.413 4.75399C16.2585 4.59949 16.0495 4.51185 15.831 4.50995C15.6125 4.50805 15.402 4.59204 15.2448 4.74384L12.5007 7.48801L11.4232 6.41051C11.266 6.25871 11.0555 6.17471 10.837 6.17661C10.6185 6.17851 10.4095 6.26615 10.255 6.42066C10.1005 6.57517 10.0128 6.78418 10.0109 7.00267C10.009 7.22117 10.093 7.43167 10.2448 7.58884L11.9115 9.25551C12.0678 9.41173 12.2797 9.4995 12.5007 9.4995C12.7216 9.4995 12.9335 9.41173 13.0898 9.25551Z"
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
                  Просто выпускается
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
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.00065 0.666992C1.55862 0.666992 1.1347 0.842587 0.82214 1.15515C0.509579 1.46771 0.333984 1.89163 0.333984 2.33366V15.667C0.333984 16.109 0.509579 16.5329 0.82214 16.8455C1.1347 17.1581 1.55862 17.3337 2.00065 17.3337H12.0007C12.4427 17.3337 12.8666 17.1581 13.1792 16.8455C13.4917 16.5329 13.6673 16.109 13.6673 15.667V2.33366C13.6673 1.89163 13.4917 1.46771 13.1792 1.15515C12.8666 0.842587 12.4427 0.666992 12.0007 0.666992H2.00065ZM7.00065 3.16699C8.10572 3.16699 9.16553 3.60598 9.94693 4.38738C10.7283 5.16878 11.1673 6.22859 11.1673 7.33366C11.1673 8.43873 10.7283 9.49854 9.94693 10.2799C9.16553 11.0613 8.10572 11.5003 7.00065 11.5003C5.89558 11.5003 4.83577 11.0613 4.05437 10.2799C3.27297 9.49854 2.83398 8.43873 2.83398 7.33366C2.83398 6.22859 3.27297 5.16878 4.05437 4.38738C4.83577 3.60598 5.89558 3.16699 7.00065 3.16699ZM7.00065 4.00033C6.65898 4.51699 6.37565 5.07533 6.20065 5.66699H7.80065C7.62169 5.07344 7.35182 4.51122 7.00065 4.00033ZM5.91732 4.18366C5.15065 4.44199 4.50065 4.97533 4.11732 5.66699H5.33398C5.48398 5.15033 5.66732 4.65033 5.91732 4.18366ZM8.07565 4.18366C8.32565 4.65033 8.51732 5.15033 8.66732 5.66699H9.88398C9.50065 4.97533 8.84232 4.45033 8.07565 4.18366ZM3.77565 6.50033C3.70898 6.76699 3.66732 7.04199 3.66732 7.33366C3.66732 7.62533 3.70898 7.90033 3.77565 8.16699H5.18398C5.15065 7.89199 5.12565 7.61699 5.12565 7.33366C5.12565 7.05033 5.15065 6.77533 5.18398 6.50033H3.77565ZM6.02565 6.50033C5.98398 6.76699 5.95898 7.05033 5.95898 7.33366C5.95898 7.61699 5.98398 7.89199 6.02565 8.16699H7.97565C8.00898 7.89199 8.04232 7.61699 8.04232 7.33366C8.04232 7.05033 8.00898 6.76699 7.97565 6.50033H6.02565ZM8.81732 6.50033C8.85065 6.77533 8.87565 7.05033 8.87565 7.33366C8.87565 7.61699 8.85065 7.89199 8.81732 8.16699H10.2257C10.2923 7.90033 10.334 7.62533 10.334 7.33366C10.334 7.04199 10.2923 6.76699 10.2257 6.50033H8.81732ZM4.11732 9.00033C4.50065 9.69199 5.15065 10.217 5.91732 10.4837C5.66732 10.017 5.48398 9.52533 5.33398 9.00033H4.11732ZM6.20065 9.00033C6.37565 9.60033 6.65898 10.1503 7.00065 10.667C7.35065 10.1503 7.62565 9.60033 7.80065 9.00033H6.20065ZM8.66732 9.00033C8.51732 9.52533 8.32565 10.017 8.07565 10.4837C8.84232 10.217 9.50065 9.69199 9.88398 9.00033H8.66732ZM2.83398 13.167H11.1673V14.8337H2.83398V13.167Z"
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
                  Доступна без визы
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
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.41 5.19438C13.8248 5.19438 15 4.01914 15 2.59735C15 1.17492 13.8321 0 12.41 0C10.9803 0 9.81275 1.17524 9.81275 2.59735C9.81275 4.01946 10.9803 5.19438 12.41 5.19438ZM3.9967 14.9997H9.63328C10.9056 14.9997 11.9834 14.8799 12.747 14.1167C13.5105 13.3534 13.6226 12.2902 13.6226 11.0102V5.99566C13.2346 6.13956 12.8239 6.2131 12.41 6.21282C10.4192 6.21282 8.78731 4.58089 8.78731 2.59767C8.78731 2.17101 8.86236 1.75903 9.00447 1.38506H3.97435C2.71673 1.38506 1.63892 1.50482 0.875665 2.26809C0.112412 3.03136 0 4.10185 0 5.35183V11.0109C0 12.2906 0.112093 13.3534 0.875665 14.117C1.63892 14.8802 2.71673 14.9997 3.9967 14.9997Z"
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
                  Нет пластика
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
                  {formatNumber(
                    (cardsData?.cards[1]?.final_price || 0).toString()
                  )}
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
                  {cardsData?.cards[1].issue_days}
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
                    state: { card: "alfa-card" },
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

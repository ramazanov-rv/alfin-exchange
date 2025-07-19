import {
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Fade,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ServicePaymentInfoBlock } from "../../components/pages/home/services-payment/info-block";
import { Block, Button } from "../../components/shared";
import { SelectArrowsIcon } from "../../icons";
import { useState, MouseEvent, useMemo, useCallback, useEffect } from "react";
import { useNavigation } from "../../contexts/NavigationContext";
import * as yup from "yup";
import { useMutation, useQuery } from "react-query";
import {
  createPayment,
  getServiceRate,
  getServices,
} from "../../services/service-payment";
import { Service } from "../../services/service-payment/interface";
import { useTelegram } from "../../hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";

interface MenuComponentProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  items: Service[];
  onSelect: (item: Service) => void;
}

const priceSchema = yup.object().shape({
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(10, "Введите сумму от $10 до $2000")
    .max(2000, "Введите сумму от $10 до $2000")
    .required("Введите сумму от $10 до $2000"),
});

function MenuComponent({
  anchorEl,
  open,
  onClose,
  items,
  onSelect,
}: MenuComponentProps) {
  const isDark = Telegram.WebApp.colorScheme === "dark";

  return (
    <Menu
      id="subscription-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        sx: {
          backgroundColor: "secondary.main",
          paddingBlock: "0 !important",
          maxHeight: "200px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: isDark ? "#3C3C3F" : "#EFEFF3",
            borderRadius: "2px",
          },
        },
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            margin: "0",
            maxHeight: "200px",
          },
        },
      }}
      anchorOrigin={{ vertical: "center", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      {items.map((item, index) => (
        <Box key={item.id}>
          <MenuItem
            sx={{ paddingBlock: "0", marginBlock: "0" }}
            onClick={() => onSelect(item)}
          >
            <Typography>{item.name}</Typography>
          </MenuItem>
          {index < items.length - 1 && (
            <Divider
              sx={{
                margin: "0 !important",
                borderColor: `${isDark ? "#3C3C3F" : "#EFEFF3"}`,
              }}
            />
          )}
        </Box>
      ))}
    </Menu>
  );
}

interface LocationState {
  selectedService?: string;
  amount?: number;
  currency?: string;
}

export function ServicePaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { tg } = useTelegram();
  const { setIsNavigationVisible } = useNavigation();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Service | null>(null);
  const [subscriptionPrice, setSubscriptionPrice] = useState<string>("");
  const [customServiceName, setCustomServiceName] = useState<string>("");
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isPriceFieldTouched, setIsPriceFieldTouched] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { data: services, isLoading } = useQuery("services", getServices);
  const { data: serviceRate } = useQuery("services-rate", getServiceRate);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userData = {
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    phone: userInfo.phone_number,
  };

  // Handle initial state from transaction repeat
  useEffect(() => {
    if (state?.selectedService && services) {
      const service = services.find((s) => s.name === state.selectedService);
      if (service) {
        setSelectedSubscription(service);
        if (state.amount && state.currency === "USDT") {
          setSubscriptionPrice(state.amount.toString());
          setIsPriceFieldTouched(true);
          validatePrice(state.amount.toString());
        }
      }
    }
  }, [state, services]);

  // Вычисляем итоговую сумму в рублях
  const totalAmountInRubles = useMemo(() => {
    if (!serviceRate?.show_rate || !subscriptionPrice) return 0;
    const priceInUsd = parseFloat(subscriptionPrice);
    if (isNaN(priceInUsd)) return 0;
    return priceInUsd * serviceRate.show_rate;
  }, [subscriptionPrice, serviceRate?.show_rate]);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (item: Service) => {
    setSelectedSubscription(item);
    if (item.name !== "Другой сервис") {
      setCustomServiceName("");
    }
    handleMenuClose();
  };

  const validatePrice = async (price: string) => {
    try {
      await priceSchema.validate({ price: Number(price) });
      setPriceError("");
      return true;
    } catch (error) {
      setPriceError("Введите сумму от $10 до $2000");
      return false;
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем только цифры и точку
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setSubscriptionPrice(value);
      if (isPriceFieldTouched || isFormSubmitted) {
        validatePrice(value);
      }
    }
  };

  const { mutate: createPaymentMutation, isLoading: isCreatingPayment } =
    useMutation(createPayment, {
      onSuccess: (data) => {
        console.log("Payment created successfully:", data);
        tg.close();
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 422) {
          enqueueSnackbar("Пожалуйста, заполните ваш номер телефона", {
            variant: "error",
          });
          navigate("/personal-data", {
            state: {
              from: "/service-payment",
            },
          });
        } else {
          enqueueSnackbar("Не удалось создать платеж", {
            variant: "error",
          });
        }
      },
    });

  const handleSubmit = async () => {
    setIsFormSubmitted(true);

    // Проверяем, заполнено ли название сервиса для "Другой сервис"
    if (
      selectedSubscription?.name === "Другой сервис" &&
      !customServiceName.trim()
    ) {
      enqueueSnackbar("Введите название сервиса", {
        variant: "error",
      });
      return;
    }

    const isValid = await validatePrice(subscriptionPrice);
    if (isValid) {
      createPaymentMutation({
        service_name:
          selectedSubscription?.name === "Другой сервис"
            ? customServiceName.trim()
            : selectedSubscription?.name || "",
        amount_usd: parseFloat(subscriptionPrice),
        amount_rub: totalAmountInRubles,
        exchange_rate: serviceRate?.show_rate ?? 0,
        payment_link: paymentLink || "",
      });
    }
  };

  const handlePriceFieldFocus = () => {
    setIsPriceFieldTouched(true);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const clearStorage = () => {
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("bankCardName");
    localStorage.removeItem("accountId");
    localStorage.removeItem("phoneNumber");
  };

  const handleBackButton = useCallback(() => {
    navigate(-1);
    clearStorage();
  }, [navigate]);

  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", handleBackButton);

    return () => {
      tg.offEvent("backButtonClicked", handleBackButton);
      tg.BackButton.hide();
      setIsNavigationVisible(true);
    };
  }, [tg, handleBackButton, setIsNavigationVisible]);

  useEffect(() => {
    setIsNavigationVisible(!isInputFocused);
  }, [isInputFocused, setIsNavigationVisible]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
        Оплата подписки за 2 минуты
      </Typography>

      <ServicePaymentInfoBlock />
      <Block sx={{ mt: 2 }}>
        <Box component="form">
          {/* Service Selection */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography>Выберите подписку</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  color: "primary.main",
                  cursor: isLoading ? "default" : "pointer",
                  paddingRight: "3px",
                }}
                onClick={!isLoading ? handleMenuOpen : undefined}
              >
                {isLoading
                  ? "..."
                  : selectedSubscription?.name || "Выберите подписку"}
              </Typography>
              <SelectArrowsIcon />
            </Box>
          </Box>
          <Divider sx={{ margin: "12px 0px" }} />

          {/* Custom Service Name Input */}
          {selectedSubscription?.name === "Другой сервис" && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Typography>Название сервиса</Typography>
                <TextField
                  placeholder="Введите название"
                  value={customServiceName}
                  onChange={(e) => setCustomServiceName(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  sx={{
                    width: "60%",
                    input: {
                      paddingBlock: "2px",
                      paddingLeft: "10px",
                      textAlign: "right",
                    },
                    "& fieldset": { border: "none" },
                  }}
                />
              </Box>
              <Divider sx={{ margin: "12px 0px" }} />
            </>
          )}

          {/* Payment Link Input */}
          {selectedSubscription?.supports_link_payment && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 400, width: "100%" }}
                >
                  Ссылка на оплату
                </Typography>
                <TextField
                  placeholder="Если есть"
                  value={paymentLink}
                  onChange={(e) => setPaymentLink(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  sx={{
                    width: "60%",
                    input: {
                      paddingBlock: "2px",
                      paddingLeft: "10px",
                      textAlign: "right",
                    },
                    "& fieldset": { border: "none" },
                  }}
                />
              </Box>
              <Divider sx={{ margin: "12px 0px" }} />
            </>
          )}

          {/* Price Input */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                Стоимость подписки
              </Typography>
              {priceError && (isPriceFieldTouched || isFormSubmitted) && (
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "error.main",
                    mt: 0.5,
                  }}
                >
                  {priceError}
                </Typography>
              )}
            </Box>
            <TextField
              placeholder="Введите сумму"
              value={subscriptionPrice}
              onChange={handlePriceChange}
              onFocus={(e) => {
                handlePriceFieldFocus();
                handleInputFocus();
              }}
              onBlur={handleInputBlur}
              error={!!priceError && (isPriceFieldTouched || isFormSubmitted)}
              sx={{
                width: "49%",
                input: {
                  paddingBlock: "0px",
                  paddingLeft: "10px",
                  textAlign: "right",
                },
                "& fieldset": { border: "none" },
              }}
              InputProps={{
                endAdornment: <Typography sx={{ ml: 0.5 }}>$</Typography>,
              }}
            />
          </Box>
        </Box>
      </Block>

      <Block sx={{ mt: 2 }}>
        <Box component="form">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 400, width: "100%" }}>
              Итого к оплате
            </Typography>
            <Typography>{totalAmountInRubles.toFixed(2)}₽</Typography>
          </Box>

          <Button
            sx={{ width: "100%", mt: 2 }}
            onClick={handleSubmit}
            disabled={
              !selectedSubscription ||
              !subscriptionPrice ||
              !!priceError ||
              isCreatingPayment
            }
          >
            {isCreatingPayment ? (
              <CircularProgress size={20} />
            ) : (
              "Оплатить подписку"
            )}
          </Button>
        </Box>
      </Block>

      {services && (
        <MenuComponent
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          items={services}
          onSelect={handleSelection}
        />
      )}
    </Box>
  );
}

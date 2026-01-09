import { Box, TextField, Typography, Divider, Fade } from "@mui/material";
import { Title, Block, Button } from "../../../components/shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { isPhoneComplete } from "../../../utils";
import { useMutation } from "react-query";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useTelegram } from "../../../hooks/useTelegram";
import { applyForForeignCard } from "../../../services/foreign-card";

type FormData = {
  full_name: string;
  birth_date: string;
  phone: string;
  email: string;
  delivery_address?: string;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidDate = (dateString: string): boolean => {
  // Check if the string matches the expected format
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);

  // Check if the numbers are in valid ranges
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  // Check if the date actually exists
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
};

export function ForeignCardApplyFormPage() {
  const navigate = useNavigate();
  const { tg } = useTelegram();
  const { state } = useLocation();
  const { card } = state;
  const title = (card === "kz-card" && "Freedom Казахстан") || "";
  const { enqueueSnackbar } = useSnackbar();
  const isIbtCard = card === "ibt-card";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      full_name: "",
      birth_date: "",
      phone: "",
      email: "",
      delivery_address: "",
    },
  });

  const validateBirthDate = (date: string) => {
    if (!date) return;

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      enqueueSnackbar("Дата должна быть в формате ДД/ММ/ГГГГ", {
        variant: "error",
      });
      return;
    }

    const [day, month, year] = date.split("/").map(Number);

    if (month < 1 || month > 12) {
      enqueueSnackbar("Месяц должен быть от 1 до 12", { variant: "error" });
      return;
    }

    if (day < 1 || day > 31) {
      enqueueSnackbar("День должен быть от 1 до 31", { variant: "error" });
      return;
    }

    if (year < 1900 || year > new Date().getFullYear()) {
      enqueueSnackbar(
        `Год должен быть между 1900 и ${new Date().getFullYear()}`,
        { variant: "error" }
      );
      return;
    }

    const dateObj = new Date(year, month - 1, day);
    if (
      dateObj.getDate() !== day ||
      dateObj.getMonth() !== month - 1 ||
      dateObj.getFullYear() !== year
    ) {
      enqueueSnackbar("Указанная дата не существует", { variant: "error" });
    }
  };

  const { mutate: applyForForeignCardMutation, isLoading } = useMutation({
    mutationFn: applyForForeignCard,
    onSuccess: () => {
      tg.close();
    },
  });

  const onSubmit = (formData: FormData) => {
    applyForForeignCardMutation({
      full_name: formData.full_name,
      birth_date: formData.birth_date,
      phone_number: formData.phone,
      email: formData.email,
      delivery_address: formData.delivery_address || "",
      card_type_id: 3,
    });
  };

  const isPhoneValid = isPhoneComplete(watch("phone"));
  const isEmailValid = isValidEmail(watch("email") || "");
  const isBirthDateValid = isValidDate(watch("birth_date") || "");

  const requiredFieldsCount = isIbtCard ? 5 : 4;
  const isFormValid =
    Object.keys(dirtyFields).length === requiredFieldsCount &&
    isPhoneValid &&
    isBirthDateValid &&
    isEmailValid;

  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/foreign-card/`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/foreign-card/`));
    };
  }, [navigate, tg]);

  return (
    <Fade in>
      <Box sx={{ width: "100%", marginBottom: "100px" }}>
        <Title>{title}</Title>

        <Block>
          <Box component="form">
            {/* Full Name Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>ФИО</Typography>
              <TextField
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("full_name", {
                  required: "Обязательное поле",
                })}
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
                placeholder="Обязательное поле"
              />
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Birth Date Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Дата рождения</Typography>
              <InputMask
                mask="99/99/9999"
                value={watch("birth_date") || ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setValue("birth_date", newValue, { shouldDirty: true });
                  if (newValue.replace(/[^0-9]/g, "").length === 8) {
                    validateBirthDate(newValue);
                  }
                }}
              >
                <TextField
                  placeholder="ДД/ММ/ГГГГ"
                  inputMode="numeric"
                  inputProps={{
                    pattern: "[0-9]*",
                  }}
                  sx={{
                    width: "60%",
                    input: {
                      paddingBlock: "2px",
                      paddingLeft: "10px",
                      textAlign: "right",
                    },
                    "& fieldset": { border: "none" },
                  }}
                  error={!!errors.birth_date}
                  helperText={errors.birth_date?.message}
                />
              </InputMask>
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Phone Number Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Номер телефона</Typography>
              <InputMask
                mask="+7 (999) 999-99-99"
                value={watch("phone") || ""}
                onChange={(e) =>
                  setValue("phone", e.target.value, { shouldDirty: true })
                }
              >
                <TextField
                  placeholder="+7 (000) 000-00-00"
                  type="tel"
                  inputMode="numeric"
                  sx={{
                    width: "60%",
                    input: {
                      paddingBlock: "2px",
                      paddingLeft: "10px",
                      textAlign: "right",
                    },
                    "& fieldset": { border: "none" },
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </InputMask>
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Email Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Email</Typography>
              <TextField
                type="email"
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("email", {
                  required: "Обязательное поле",
                  validate: (value) =>
                    isValidEmail(value) || "Некорректный формат email",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                placeholder="example@mail.com"
              />
            </Box>

            {/* Delivery Address Input - Only for IBT Bank */}
            {isIbtCard && (
              <>
                <Divider sx={{ margin: "12px 0px" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography>Адрес доставки</Typography>
                  <TextField
                    sx={{
                      width: "60%",
                      input: {
                        paddingBlock: "2px",
                        paddingLeft: "10px",
                        textAlign: "right",
                      },
                      "& fieldset": { border: "none" },
                    }}
                    {...register("delivery_address", {
                      required: "Обязательное поле",
                    })}
                    error={!!errors.delivery_address}
                    helperText={errors.delivery_address?.message}
                    placeholder="Обязательное поле"
                  />
                </Box>
              </>
            )}
          </Box>

          <Button
            onClick={handleSubmit(onSubmit)}
            sx={{ marginTop: "1.75rem" }}
            disabled={!isFormValid}
            fullWidth
          >
            {isLoading ? (
              <CircularProgress size={25} sx={{ color: "#fff" }} />
            ) : (
              "Оставить заявку"
            )}
          </Button>
        </Block>
      </Box>
    </Fade>
  );
}

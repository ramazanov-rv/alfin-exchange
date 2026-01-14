import InputMask from "react-input-mask";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Fade,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Block, Button, Title } from "../../components/shared";
import { isPhoneComplete } from "../../utils"; // Assuming this utility function exists
import { useMutation, useQueryClient } from "react-query";
import { editPersonalData } from "../../services/me/edit";
import { EditPersonalDataTypes } from "../../services/me/interface";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { WhatsappIcon } from "../../icons";
import { useTelegram } from "../../hooks";
import { useEffect } from "react";

type FormData = {
  first_name: string;
  last_name: string;
  phone: string;
};

export function PersonalDataForm() {
  const navigate = useNavigate();

  const { tg } = useTelegram();
  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/profile`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/profile`));
    };
  }, [navigate, tg]);

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const data = {
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    phone: userInfo.phone_number,
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
    },
  });

  const { mutate: editPersonalDataMutation, isLoading } = useMutation({
    mutationFn: editPersonalData,
    mutationKey: ["edit-personal"],
    onSuccess() {
      queryClient.invalidateQueries(["user-info"]);
      navigate("/profile");
      enqueueSnackbar("Личные данные были успешно изменены ", {
        variant: "success",
      });
    },
    onError() {
      enqueueSnackbar("Что-то пошло не так, попробуйте позже", {
        variant: "error",
      });
    },
  });

  const onSubmit = (formData: FormData) => {
    const payload: EditPersonalDataTypes = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone_number: formData.phone,
    };

    editPersonalDataMutation(payload);
  };

  const isPhoneValid = isPhoneComplete(watch("phone"));

  const isModified =
    dirtyFields.first_name || dirtyFields.last_name || dirtyFields.phone;

  return (
    <Fade in>
      <Box sx={{ width: "100%", marginBottom: "100px" }}>
        <Title>Личные данные</Title>

        <Block>
          <Box component="form">
            {/* Name Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Ваше имя</Typography>
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
                {...register("first_name", {
                  required: "Обязательное поле *",
                })}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                fullWidth
              />
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Ваша фамилия</Typography>
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
                {...register("last_name", {
                  required: "Обязательное поле *",
                })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                fullWidth
              />
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
              <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <Typography sx={{ fontSize: "14px" }}>Телефон</Typography>
                <WhatsappIcon />
              </Box>

              <InputMask
                mask="+7 999 999 99 99"
                value={watch("phone")}
                onChange={(e) =>
                  setValue("phone", e.target.value, { shouldDirty: true })
                }
              >
                <TextField
                  placeholder="+7 900 000-00-00"
                  type="tel"
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
                  fullWidth
                />
              </InputMask>
            </Box>
          </Box>
        </Block>

        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{ marginTop: "1.5rem" }}
          type="submit"
          disabled={!isModified || !isPhoneValid}
        >
          {isLoading ? (
            <CircularProgress size={25} sx={{ color: "#fff" }} />
          ) : (
            "Сохранить изменения"
          )}
        </Button>
      </Box>  
    </Fade>
  );
}

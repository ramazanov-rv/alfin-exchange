import {
  AccountBalanceRounded,
  AddCardOutlined,
  BedOutlined,
  PaymentsRounded,
  PersonPinCircleRounded,
  ReplayRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
  soon?: boolean;
}

export const services: Service[] = [
  {
    icon: <PaymentsRounded sx={{ width: "20px" }} color="primary" />,
    title: "Оплата инвойсов/Swift перевод",
    description: "Лиры, тенге, дирхамы, евро",
    link: "https://t.me/alfin_manager?text=Хочу оплатить инвой или сделать перевод Swift",
  },
  {
    icon: <PersonPinCircleRounded sx={{ width: "20px" }} color="primary" />,
    title: "Выдача наличных заграницей (перестановка)",
    description: "Перестановка валюты в разных странах",
    link: "https://t.me/alfin_manager?text=Нужна выдача наличных заграницей",
  },
  {
    icon: <BedOutlined sx={{ width: "20px" }} color="primary" />,
    title: "Оплата отелей",
    description: "",
    link: "https://t.me/alfin_manager?text=Хочу оплатить отель",
  },
  {
    icon: <ShoppingCartOutlined sx={{ width: "20px" }} color="primary" />,
    title: "Оплата интернет покупок",
    description: "",
    link: "https://t.me/alfin_manager?text=Хочу оплатить покупку в интернете",
  },
  {
    icon: <AddCardOutlined sx={{ width: "20px" }} color="primary" />,
    title: "Открытие иностранной карты",
    description: "",
    link: "https://t.me/alfin_manager?text=Хочу открыть иностранную карту",
  },
];

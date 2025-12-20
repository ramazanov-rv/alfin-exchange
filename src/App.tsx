import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./components/layout/layout";
import {
  AboutPage,
  AddCardForm,
  AmlPage,
  AmlResultPage,
  BankCardsPage,
  FAQPage,
  Home,
  PaymentForm,
  PersonalDataForm,
  ProfilePage,
  ReferralPage,
  ServicePaymentPage,
  SuccessPaymentPage,
  TransactionHistoryPage,
  WithdrawlPage,
  ForeignCardChoosePage,
  ForeignCardApplyFormPage,
  MaintenancePage,
} from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/payment", element: <PaymentForm /> },
        { path: "/history", element: <TransactionHistoryPage /> },
        { path: "/personal-data", element: <PersonalDataForm /> },
        { path: "/bank-cards", element: <BankCardsPage /> },
        { path: "/add-card", element: <AddCardForm /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/faq", element: <FAQPage /> },
        { path: "/referral", element: <ReferralPage /> },
        { path: "/aml", element: <AmlPage /> },
        { path: "/withdrawl", element: <WithdrawlPage /> },
        { path: "/aml-result", element: <AmlResultPage /> },
        { path: "/service-payment", element: <ServicePaymentPage /> },
        { path: "/success-payment", element: <SuccessPaymentPage /> },
        { path: "/foreign-card", element: <ForeignCardChoosePage /> },
        { path: "/foreign-card/apply", element: <ForeignCardApplyFormPage /> },
        { path: "/maintenance", element: <MaintenancePage /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

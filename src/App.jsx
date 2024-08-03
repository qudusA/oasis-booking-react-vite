import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Carbins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export default function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to={"/dashboard"} replace />} />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Account />} path="/account" />
            <Route element={<Bookings />} path="/bookings" />
            <Route element={<Carbins />} path="/carbins" />
            <Route element={<Users />} path="/users" />
            <Route element={<Settings />} path="/settings" />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={15}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

// const router = createBrowserRouter([
//   {
//     element: <Account />,
//     path: "/account",
//   },
//   {
//     element: <Bookings />,
//     path: "/booking",
//   },
//   {
//     element: <Carbins />,
//     path: "/carbin",
//   },
//   {
//     element: <Bookings />,
//     path: "/checkin/:bookingId",
//   },
//   {
//     element: <Dashboard />,
//     path: "/dashboard",
//   },
//   {
//     element: <Login />,
//     path: "/login",
//   },
//   {
//     element: <Settings />,
//     path: "/settings",
//   },
//   {
//     element: <Users />,
//     path: "/users",
//   },
//   {
//     element: <PageNotFound />,
//     path: "*",
//   },
// ]);

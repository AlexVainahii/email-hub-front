import { Suspense, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  selectIsFetchingCurrentUser,
  selectIsLoggedIn,
} from 'redux/auth/selectors';
import { getCurrentUser } from 'redux/auth/operations';

import MainLayout from './MainLayout/MainLayout';

import { ChoosedMonth } from './Calendar/ChoosedMonth/ChoosedMonth';
import { ChoosedDay } from './Calendar/ChoosedDay/ChoosedDay';
import ImageAnimation from './Bandero-goose/ImageAnimation';
import { ContainerR, override } from './Bandero-goose/ImageAnimation.styled';
import ListBox from './ListBox';
import Mail from './Mail';
import NewMail from './NewMail';
import { MoonLoader } from 'react-spinners';

const MainPage = lazy(() => import('pages/MainPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const AccountPage = lazy(() => import('pages/AccountPage'));
const CalendarPage = lazy(() => import('pages/CalendarPage'));
const StatisticsPage = lazy(() => import('pages/StatisticsPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));
const VerifyEmail = lazy(() => import('pages/VerifyPage'));
const MailsPage = lazy(() => import('pages/MailsPage'));
const PasswordRecoveryPage = lazy(() => import('pages/PasswordRecoveryPage'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsFetchingCurrentUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return isRefreshing ? (
    <ContainerR>
      <MoonLoader color="#fff" loading={true} css={override} size={100} />
    </ContainerR>
  ) : (
    <Suspense fallback={<ImageAnimation />}>
      <Routes>
        <Route
          path="/"
          element={
            <RestrictedRoute component={<MainPage />} navigateTo="/emails" />
          }
        />

        <Route
          path="/register"
          element={
            <RestrictedRoute
              component={<RegisterPage />}
              navigateTo="/calendar"
            />
          }
        />

        <Route
          path="/login"
          element={
            <RestrictedRoute component={<LoginPage />} navigateTo="/emails" />
          }
        />

        <Route
          path="/password_recovery"
          element={
            <RestrictedRoute
              component={<PasswordRecoveryPage />}
              navigateTo="/calendar"
            />
          }
        />

        <Route path="/" element={<MainLayout />}>
          <Route
            path="account"
            element={
              <PrivateRoute component={<AccountPage />} navigateTo="/" />
            }
          />

          <Route
            path="calendar/"
            element={
              <PrivateRoute component={<CalendarPage />} navigateTo="/" />
            }
          >
            <Route
              path="month/:currentDate"
              element={
                <PrivateRoute component={<ChoosedMonth />} navigateTo="/" />
              }
            />
            <Route
              path="day/:currentDate"
              element={
                <PrivateRoute component={<ChoosedDay />} navigateTo="/" />
              }
            />
          </Route>

          <Route
            path="emails/"
            element={<PrivateRoute component={<MailsPage />} navigateTo="/" />}
          >
            <Route
              path="mailbox/:_id"
              element={<PrivateRoute component={<ListBox />} navigateTo="/" />}
            />
            <Route
              path="mail/:uid"
              element={<PrivateRoute component={<Mail />} navigateTo="/" />}
            />
            <Route
              path="newmail/:uids"
              element={<PrivateRoute component={<NewMail />} navigateTo="/" />}
            />
          </Route>
          <Route
            path="statistics"
            element={
              <PrivateRoute component={<StatisticsPage />} navigateTo="/" />
            }
          />
        </Route>

        <Route path="/verify/:verifyToken" element={<VerifyEmail />} />

        <Route
          path="*"
          element={
            <RestrictedRoute component={<NotFoundPage />} navigateTo="/" />
          }
        />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};

function RestrictedRoute({ component, navigateTo = '/' }) {
  const isLogged = useSelector(selectIsLoggedIn);

  return isLogged ? <Navigate to={navigateTo} /> : component;
}

function PrivateRoute({ component, navigateTo = '/' }) {
  const isLogged = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectIsFetchingCurrentUser);

  return !isLogged && !isFetching ? <Navigate to={navigateTo} /> : component;
}

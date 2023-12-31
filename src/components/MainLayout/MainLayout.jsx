import { Outlet } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser } from 'redux/auth/selectors';
import { getCurrentUser } from 'redux/auth/operations';

import {
  Container,
  Overlay,
  Main,
  Wrapper,
  PageWrapper,
} from './MainLayout.styled';

import Header from '../Header';
import SideBar from '../SideBar';
// import Spinner from '../Spiner';
import { loadLocal } from '../ThemeToggler/localStorage';

import { override } from 'components/Bandero-goose/ImageAnimation.styled';
import { MoonLoader } from 'react-spinners';

const thema = loadLocal('isLightTheme') ?? true;

const MainLayout = () => {
  const [isLightTheme, setIsLightTheme] = useState(thema);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const openSidebar = () => {
    setSidebarVisible(true);
    document.body.style.overflow = 'hidden';
  };
  const closeSidebar = () => {
    setSidebarVisible(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <Container>
      {sidebarVisible && <Overlay onClick={closeSidebar} />}

      <Wrapper>
        <SideBar closeSidebar={closeSidebar} sidebarVisible={sidebarVisible} />
        <PageWrapper>
          <Header
            openSidebar={openSidebar}
            isLightTheme={isLightTheme}
            setIsLightTheme={setIsLightTheme}
          />
          <Main>
            <Suspense
              fallback={
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MoonLoader
                    color="#fff"
                    loading={true}
                    css={override}
                    size={100}
                  />
                </div>
              }
            >
              <Outlet context={[isLightTheme]} />
            </Suspense>
          </Main>
        </PageWrapper>
      </Wrapper>
    </Container>
  );
};

export default MainLayout;

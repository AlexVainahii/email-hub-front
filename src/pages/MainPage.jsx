import AuthSection from '../components/AuthSection/';
import Description from '../components/Description/';
import ReviewsSlider from '../components/ReviewsSlider/';

const MainPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'inherit',
      }}
    >
      <AuthSection />
      <Description />
      <ReviewsSlider />
    </div>
  );
};

export default MainPage;

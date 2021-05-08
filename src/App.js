import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Navigation from './components/navigation/Navigation';
import ScrollToTop from './components/navigation/ScrollToTop';
import { loadInitialAppData } from './store/app/actions';
import Loader from './components/shared/Loader';

const App = ({isAppInitialDataLoaded, loadInitialAppData}) => {
  useEffect(() => {
    loadInitialAppData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <LastLocationProvider>
          { isAppInitialDataLoaded ? (
            <Navigation />
            ) : (
              <div className="full-page-content-centered">
                <Loader size="massive" />
              </div>
            )
          }
        </LastLocationProvider>
      </BrowserRouter>
  </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAppInitialDataLoaded: state.app.isInitialDataLoaded,
  }
}

const mapDispatchToProps = {
  loadInitialAppData,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

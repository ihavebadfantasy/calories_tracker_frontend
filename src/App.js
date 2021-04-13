import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Navigation from './components/navigation/Navigation';
import ScrollToTop from './components/navigation/ScrollToTop';
import { loadInitialAppData } from './store/app/actions';

const App = ({isAppInitialDataLoaded, loadInitialAppData}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    loadInitialAppData();

    setIsInitialLoad(false);
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <LastLocationProvider>
          { isAppInitialDataLoaded ? (
            <Navigation />
          ) : (
            <div className="content-centered">
              <p>Loading data...</p>
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

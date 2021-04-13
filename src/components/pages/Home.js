import { useTranslation } from 'react-i18next';

const Home = () => {
  const [ t ] = useTranslation('homepage');

  return (
    <div className="content-centered">
      <h1>{t('welcome')}</h1>

    </div>
  );
}


export default Home;

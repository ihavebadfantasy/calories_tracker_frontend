import { useTranslation } from 'react-i18next';

const Home = () => {
  const [ t ] = useTranslation('homepage');

  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  );
}


export default Home;

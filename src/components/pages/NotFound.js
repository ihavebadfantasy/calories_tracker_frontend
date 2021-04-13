import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const [ t ] = useTranslation('notFoundPage');

  return (
    <div className="content-centered">
      <h1>{t('notFound')}</h1>

    </div>
  );
}


export default NotFound;

import Form from '../forms/Form';
import Input from '../forms/Input';
import { useTranslation } from 'react-i18next';
import { LOGIN_URL } from '../../api/urls';

const Login = () => {
  const [t] = useTranslation('loginPage');

  return (
    <div>
      <Form url={LOGIN_URL} >
        {
          (onInputChange) => {
            return (
              <>
                <Input
                  type="email"
                  placeholder={t('form.inputs.email.placeholder')}
                  label={t('form.inputs.email.label')}
                  required={true}
                  name="email"
                  onInputChange={onInputChange}
                />

                <Input
                  type="password"
                  placeholder={t('form.inputs.password.placeholder')}
                  label={t('form.inputs.password.label')}
                  required={true}
                  name="password"
                  onInputChange={onInputChange}
                />

                <button className="ui button" type="submit">
                  { t('form.submitBtn') }
                </button>
              </>
            );
          }
        }
        {/*{*/}
        {/*  (onInputChange) => {*/}
        {/*   return <Input*/}
        {/*      type="email"*/}
        {/*      placeholder={t('form.inputs.email.placeholder')}*/}
        {/*      label={t('form.inputs.email.label')}*/}
        {/*      required={true}*/}
        {/*      name="email"*/}
        {/*      onInputChange={onInputChange}*/}
        {/*    />*/}
        {/*  }*/}
        {/*}*/}

        {/*{*/}
        {/*  (onInputChange) => {*/}
        {/*    return <Input*/}
        {/*      type="password"*/}
        {/*      placeholder={t('form.inputs.password.placeholder')}*/}
        {/*      label={t('form.inputs.password.label')}*/}
        {/*      required={true}*/}
        {/*      name="password"*/}
        {/*      onInputChange={onInputChange}*/}
        {/*    />*/}
        {/*  }*/}
        {/*}*/}

        {/*<button className="ui button" type="submit">*/}
        {/*  { t('form.submitBtn') }*/}
        {/*</button>*/}
      </Form>
    </div>
  );
}

export default Login;

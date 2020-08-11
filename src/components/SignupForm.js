/** @jsx jsx */
import React from 'react';
import { jsx, Button, Input, Flex, Spinner } from 'theme-ui';
import emailValidator from 'email-validator';
import { useTranslation } from 'react-i18next';

import SvgIcon from './SvgIcon';

const initialFormState = {
  pending: false,
  success: false,
  failure: false,
  failureCode: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'pending':
      return {
        ...state,
        pending: true,
        success: false,
        failure: false,
        failureCode: null
      };
    case 'failure':
      return {
        ...state,
        pending: false,
        success: false,
        failure: true,
        failureCode: action.payload
      };
    case 'success':
      return {
        ...state,
        pending: false,
        success: true,
        failure: false,
        failureCode: null
      };
    default:
      throw new Error();
  }
}

const SignupForm = ({ sx, ...props }) => {
  const { t } = useTranslation('common');
  const [email, setEmail] = React.useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = React.useState(false);
  const [formState, dispatch] = React.useReducer(reducer, initialFormState);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();

      dispatch({ type: 'pending' });

      fetch('.netlify/functions/newsletter-signup', {
        method: 'POST',
        body: JSON.stringify({
          email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          const error = new Error(response.statusText);
          error.code = response.status;
          throw error;
        })
        .then(() => {
          dispatch({ type: 'success' });
        })
        .catch(error => {
          dispatch({ type: 'failure', payload: error.code });
        });
    },
    [email]
  );

  React.useEffect(() => {
    setIsSubmitEnabled(email && emailValidator.validate(email));
  }, [email]);

  if (formState.failure) {
    return (
      <div
        sx={{
          variant: 'styles.p',
          mb: 0,
          color: 'red.7',
          display: 'flex',
          alignItems: 'baseline'
        }}
      >
        <SvgIcon
          pathData={
            'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
          }
          sx={{ position: 'relative', top: '0.125em', mr: 1 }}
        />
        {formState.failureCode === 422
          ? t('newsletter.exists')
          : t('newsletter.error')}
      </div>
    );
  }

  if (formState.success) {
    return (
      <div
        sx={{
          variant: 'styles.p',
          mb: 0,
          color: 'green.7',
          display: 'flex',
          alignItems: 'baseline'
        }}
      >
        <SvgIcon sx={{ position: 'relative', top: '0.125em', mr: 1 }}>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
          />
        </SvgIcon>
        {t('newsletter.success')}
      </div>
    );
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      sx={{ alignItems: 'center', ...sx }}
      {...props}
    >
      <Input
        sx={{ flexGrow: 1 }}
        placeholder={t('newsletter.placeholder')}
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <div sx={{ flexShrink: 0, ml: [2, null, 3] }}>
        <Button disabled={!isSubmitEnabled || formState.pending}>
          {formState.pending ? (
            <Spinner
              size={28}
              variant="styles.spinner"
              sx={{ display: 'block' }}
            />
          ) : (
            t('newsletter.submit')
          )}
        </Button>
      </div>
    </Flex>
  );
};

export default SignupForm;

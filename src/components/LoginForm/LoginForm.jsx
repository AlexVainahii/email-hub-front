import { useTranslation, Trans } from 'react-i18next';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  StyledForm,
  InputGroupe,
  LinksContainer,
  FormName,
  InputWrapper,
  Button,
  ButtonText,
  ItemIcon,
  Label,
  Input,
  ShowHideButton,
  InputWrapperWithIcon,
  InputList,
  Error,
  ErrorIcon,
  ContainerErrorIcon,
  PictureWrapper,
  SuccessIcon,
} from './LoginForm.styled';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import loginElements from 'images/login-elements.png';
import loginElementsRetina from 'images/login-elements@2x.png';
import AuthNavigate from 'components/AuthNavigate/AuthNavigate';

import {
  ContainerR,
  override,
} from 'components/Bandero-goose/ImageAnimation.styled';

const LoginForm = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const emailRegexp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(emailRegexp, t('recovery.err1'))
      .required(t('recovery.err2')),
    password: yup
      .string()
      .min(6, t('recovery.err3'))
      .required(t('recovery.err2')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,

    onSubmit: async values => {
      try {
        const formData = {
          email: values.email,
          password: values.password,
        };

        setShowAnimation(true);

        setTimeout(() => {
          setShowAnimation(false);
        }, 3000);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await dispatch(logIn(formData));

        if (response.payload.message === 'success') {
          formik.resetForm();

          navigate('/emails');
        }
        return response;
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
  });

  return (
    <>
      <Container>
        <StyledForm onSubmit={formik.handleSubmit}>
          <InputGroupe>
            <FormName>
              <Trans i18nKey="inout.login">Log In</Trans>
            </FormName>
            <InputList>
              <InputWrapper isEmail={'email'}>
                <Label
                  htmlFor="email"
                  className={
                    formik.touched.email
                      ? formik.errors.email
                        ? 'invalid-input'
                        : 'valid-input'
                      : ''
                  }
                >
                  {t('inout.email')}
                </Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="true"
                  value={formik.values.email}
                  placeholder={t('inout.emailhold')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.email
                      ? formik.errors.email
                        ? 'invalid-input'
                        : 'valid-input'
                      : ''
                  }
                />
                {formik.touched.email ? (
                  formik.errors.email ? (
                    <ContainerErrorIcon>
                      <Error className="invalid">{formik.errors.email}</Error>
                      <ErrorIcon />
                    </ContainerErrorIcon>
                  ) : (
                    <ContainerErrorIcon>
                      <Error className="valid">{formik.errors.email}</Error>
                      <SuccessIcon />
                    </ContainerErrorIcon>
                  )
                ) : null}
              </InputWrapper>
              <InputWrapper isPassword={'password'}>
                <Label
                  htmlFor="password"
                  className={
                    formik.touched.password
                      ? formik.errors.password
                        ? 'invalid-input'
                        : 'valid-input'
                      : ''
                  }
                >
                  {t('inout.pass')}
                </Label>
                <InputWrapperWithIcon>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    placeholder={t('inout.passhold')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.password
                        ? formik.errors.password
                          ? 'invalid-input'
                          : 'valid-input'
                        : ''
                    }
                  />
                  {!formik.errors.password && (
                    <ShowHideButton
                      type="button"
                      onClick={() => setShowPassword(show => !show)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </ShowHideButton>
                  )}
                </InputWrapperWithIcon>
                {formik.touched.password ? (
                  formik.errors.password ? (
                    <ContainerErrorIcon>
                      <Error className="invalid">
                        {formik.errors.password}
                      </Error>
                      <ErrorIcon />
                    </ContainerErrorIcon>
                  ) : (
                    <ContainerErrorIcon>
                      <Error className="valid">{formik.errors.password}</Error>
                      <SuccessIcon />
                    </ContainerErrorIcon>
                  )
                ) : null}
              </InputWrapper>
            </InputList>
            <Button type="submit">
              <ButtonText> {t('inout.login')}</ButtonText>
              <ItemIcon />
            </Button>
          </InputGroupe>
          <LinksContainer>
            <AuthNavigate />
          </LinksContainer>
        </StyledForm>
        <PictureWrapper>
          <picture>
            <source
              type="image/png"
              media="(min-width: 1440px)"
              srcSet={`${loginElements} 1x, ${loginElementsRetina} 2x`}
            />
            <img
              src={`${loginElements}`}
              alt="Let go of the past and focus on the present"
              width={368}
              height={521}
            />
          </picture>
        </PictureWrapper>
      </Container>
      {showAnimation && (
        <ContainerR>
          <MoonLoader color="#fff" loading={true} css={override} size={100} />
        </ContainerR>
      )}
    </>
  );
};

export default LoginForm;

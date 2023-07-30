import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../components/Button';
import Layout from '../../components/Forms/Layout';
import { FieldType } from '../../utils/enums';
import { loginAccount } from '../../queries/auth/auth';
import { getItem, setItem } from '../../utils/localstorage';
import apiService from '../../utils/apiService';

interface IForm {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .strict()
    .trim('Email cannot contain spaces')
    .matches(
      /^[\w!#$%&'*+\-/=?^_`{|}~\.]+@([\w-]+\.)+[\w-]{2,4}(\S+)?$/,
      'Please enter a valid email address'
    )
    .required(),
  password: yup.string().required()
});

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const authToken = searchParams.get('token');

  const login = async (formData: IForm) => {
    const response = await loginAccount(formData);
    console.log('response 1111:', response);
    if (response?.token) {
      setItem('token', response.token);
      setUser(response.user);
      return response;
    }
    return null;
  };

  const setAuthToken = async (token: string) => {
    setItem('token', token);
    apiService.setTokenGenerator(token);
    return null;
  };

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      apiService.setTokenGenerator(token);
    } else {
      apiService.setTokenGenerator(() => null);
    }
  }, []);

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const loginMutation = useMutation((formData: IForm) => login(formData), {
    onSuccess: (res: any) => {
      if (res) {
        console.log(res);
        return navigate('/home');
      }
    },
    onError: (err: any) => {
      if (err) {
        console.log(err);
      }
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>({ resolver: yupResolver(schema) });

  const fields = [
    {
      label: 'Email address',
      className: 'font-medium',
      type: FieldType.Input,
      placeholder: 'Enter email address',
      error: errors.email?.message,
      dataTestId: 'register-email',
      ...register('email')
    },
    {
      label: 'Password',
      className: 'font-medium',
      type: FieldType.Input,
      placeholder: 'Enter password',
      error: errors.password?.message,
      dataTestId: 'register-password',
      ...register('password')
    }
  ];

  const onSubmit: SubmitHandler<IForm> = async (formData) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex justify-center" data-testid="onboarding-hero-image">
      <div className="flex flex-col items-center inset-x-2/4">
        <div className="z-50 bg-cover sm:mt-12 lg:mt-24 object-fit" />

        <img
          className="w-10 h-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553"
          alt="Twitter Logo"
        />
        <div className="w-full p-8 mt-6 bg-white border border-solid rounded ">
          <h3
            className="mb-8 text-2xl font-bold text-center"
            data-testid="sign-in-head"
          >
            Sign in
          </h3>

          <div className="flex items-center mt-4 ">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-4 font-medium text-gray-500">OR</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
          <form
            className="mt-6"
            onSubmit={handleSubmit(onSubmit)}
            data-testid="login-form"
          >
            <Layout fields={fields} />

            <Button
              label="Sign in"
              className="w-full bg-blue-500"
              loading={loginMutation.isLoading}
              data-testid="sign-in-button"
            />
          </form>
          <div
            className="mt-4 font-medium text-center cursor-pointer text-text-primary"
            data-testid="back-to-register-button"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Don't have an account yet?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

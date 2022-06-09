import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

import { useDispatch } from 'react-redux';
import { logout } from '@/redux/modules/customer';

import usePassword from '@/hooks/usePassword';

import { LeaveButton } from './styles';

import { Button, Form, Input } from '@/components/@shared';
import PageLayout from '@/components/PageLayout';

import { getCookie } from '@/utils';

import axios from 'axios';

function UserInfo() {
  const [userName, setUserName] = useState('');
  const {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  } = usePassword();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLeave = () => {
    if (!window.confirm('정말 탈퇴하시겠습니까? 🥲')) return;

    axios.delete(`${process.env.REACT_APP_API_URL}/api/customers/me`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });

    document.cookie = 'accessToken=';

    dispatch(logout());
    navigate(routes.home);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.put(
      `${process.env.REACT_APP_API_URL}/api/customers/me`,
      { password, userName },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      }
    );

    navigate(routes.home);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/customers/me`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });

      setUserName(data.userName);
    };

    getUser();
  }, []);

  return (
    <PageLayout>
      <h1>회원 정보 수정</h1>
      <Form onSubmit={onSubmit}>
        <Input htmlFor="userinfo-id" label="아이디" value={userName} disabled={true} />
        <Input
          type="password"
          htmlFor="userinfo-password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          maxLength={20}
          isValid={!passwordErrorMessage}
          message={password && passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="userinfo-password-confirm"
          label="비밀번호 확인"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          maxLength={20}
          isValid={!passwordConfirmErrorMessage}
          message={passwordConfirmErrorMessage}
        />
        <Button>확인</Button>
      </Form>
      <LeaveButton onClick={onClickLeave}>회원 탈퇴</LeaveButton>
    </PageLayout>
  );
}

export default UserInfo;

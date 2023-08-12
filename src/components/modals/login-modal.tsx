'use client';

import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import log from '@/lib/log';
import { cn } from '@/lib/utils';
import Response from '@/types/server';
import Input from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import useLoginModal from '@/hooks/use-login-modal';
import { createAccount } from '@/services/client/auth';
import { AuthSchema, authSchema } from '@/schemas/authSchema';

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const { isOpen, onClose, toggleStatus, status } = useLoginModal();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, status]);

  const onSubmit = async (formData: AuthSchema) => {
    setLoading(true);
    try {
      if (status == 'login') {
        await login(formData);
      } else {
        await signup(formData);
      }
    } catch (err) {
      log.exception(err, 'login-modal');
      toast.error(Response.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData: AuthSchema) => {
    const callback = await signIn('credentials', {
      ...formData,
      redirect: false,
    });
    if (callback?.error) {
      return toast.error(callback.error);
    }
    toast.success(`Successfully logged in!`);
  };

  const signup = async (formData: AuthSchema) => {
    await createAccount(formData.email, formData.password);
    toast.success(
      `Successfully created an account! Please log into your new account.`
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={status == 'login' ? 'Sign In' : 'Sign Up'}
      subtitle={
        status == 'login'
          ? 'Log into your account to continue'
          : 'Create an account to continue'
      }
      className="max-w-lg"
    >
      <button
        className="btn bg-black/20 btn-block gap-3 rounded-md h-12"
        disabled={loading}
      >
        <FaGithub className="text-xl" /> Sign in with GitHub
      </button>
      <div className="divider">OR</div>
      <div className="space-y-12">
        <form className="space-y-8">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Email address"
            disabled={loading}
            error={errors.email?.message}
            full
            {...register('email')}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            disabled={loading}
            error={errors.password?.message}
            full
            {...register('password')}
          />
        </form>
        <div className="space-y-4">
          <button
            className="btn btn-block rounded-md btn-primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {status == 'login' ? 'Sign In' : 'Create an account'}
          </button>
          <button
            className={cn('text-sm underline w-full opacity-60', {
              'opacity-30': loading,
            })}
            type="button"
            disabled={loading}
            onClick={toggleStatus}
          >
            {status == 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}{' '}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;

import useUser from './use-user';

const usePremium = () => {
  const user = useUser();

  return user?.isPremium;
};

export default usePremium;

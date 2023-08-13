'use client';

interface WelcomeHeaderProps {}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({}) => {
  const date = new Date();
  const currentHours = date.getHours();

  return (
    <div className="text-4xl font-bold">
      {currentHours < 12 ? (
        <h1>Good morning</h1>
      ) : currentHours < 18 ? (
        <h1>Good afternoon</h1>
      ) : (
        <h1>Good evening</h1>
      )}
    </div>
  );
};

export default WelcomeHeader;

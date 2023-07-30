import { useNavigate } from 'react-router-dom';

const SignUpSuccessfully = () => {
  const nav = useNavigate();
  const handleNavigate = () => {
    nav('/home');
  };

  return (
    <div className="flex flex-col items-center mt-36">
      <div className="mt-10 text-3xl font-bold text-center text-gray-900">
        Signed Up Successfully
      </div>
      <div className="mt-8 text-base font-normal text-center text-gray-900">
        Thank you for signing up to Reveal. You’re all set to continue!
      </div>
      <button
        className="px-4 py-2 mt-8 text-white rounded-lg"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default SignUpSuccessfully;

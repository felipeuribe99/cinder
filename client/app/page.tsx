import { User } from './utils/interfaces';
import currentUser from '../services/auth/profile';
import Unauthorized from './components/errors/401';

const Home = async () => {
  const user = (await currentUser()) as User;

  if (!user) {
    return <Unauthorized />;
  }

  return (
    <div className="flex flex-col items-center text-dark">
      Bienvenido {user?.email}
    </div>
  );
};

export default Home;

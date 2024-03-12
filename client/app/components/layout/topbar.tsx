import AuthorizedNavigation from './authorized';
import UnauthorizedNavigation from './unauthorized';
import currentUser from '../../../services/auth/profile';
import { User } from '../../utils/interfaces';

const Topbar = async () => {
  const user = (await currentUser()) as User;

  return (
    <div className="sticky top-0 z-50 shadow-lg h-16 w-full">
      <div className="flex gap-8 justify-between items-center h-full px-4 text-secondary-900">
        <div className="text-primary-900 text-lg font-semibold">Cinder</div>
        {user ? <AuthorizedNavigation /> : <UnauthorizedNavigation />}
      </div>
    </div>
  );
};

export default Topbar;

import { Organization, User } from './utils/interfaces';
import currentUser from '../services/auth/profile';
import Unauthorized from './components/errors/401';
import findAll from '../services/organizations/findAll';
import { SecondaryButton } from './components/ui/button';
import CreateOrganizationForm from './components/forms/create-organization';

import { cookies } from 'next/headers';
import ApplyOrganizationForm from './components/forms/apply-organization';

const Home = async () => {
  const token = cookies().get('token')?.value;
  const user = (await currentUser()) as User;
  const organizations = (await findAll()) as Organization[];

  if (!user) {
    return <Unauthorized />;
  }

  return (
    <div className="flex flex-col items-center text-dark gap-6">
      <h1 className='text-lg font-semibold'>Welcome {user.name}</h1>
      {user.organization ? (
        <h1 className='text-lg font-semibold'>Your organization: {user.organization.name}</h1>
      ) : (
        <div className="flex flex-col items-center gap-16">
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-lg font-semibold'>You can apply to the following organizations:</h1>
            <ApplyOrganizationForm token={token} userId={user?._id} organizations={organizations} />
          </div>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-lg font-semibold'>¿Don't you like any of them? Create your own organization</h1>
            <CreateOrganizationForm token={token} />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Home;

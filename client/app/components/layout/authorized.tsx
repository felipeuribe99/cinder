import { User } from "../../utils/interfaces";

const AuthorizedNavigation = ({ user }: { user: User }) => {
  return (
    <div className="flex gap-4">
      {user.organization && user.isApproved && (
        <a href="/rooms">Rooms</a>
      )}
      <a href="/auth/signout">Sign out</a>
    </div>
  );
};

export default AuthorizedNavigation;

const AuthorizedNavigation = () => {
  return (
    <div className="flex gap-4">
      <a href="/">Your Profile</a>
      <a href="/auth/signout">Sign out</a>
    </div>
  );
};

export default AuthorizedNavigation;

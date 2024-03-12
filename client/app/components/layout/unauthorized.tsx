const UnauthorizedNavigation = () => {
  return (
    <div className="flex gap-4">
      <a href="/auth/login">Sign in</a>
      <a href="/auth/signup">Sign up</a>
    </div>
  );
};

export default UnauthorizedNavigation;

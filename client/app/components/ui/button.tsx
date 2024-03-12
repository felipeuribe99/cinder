interface ButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'button';
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const PrimaryButton = ({
  children,
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary-400 text-neutral-100 rounded-md py-2 px-6 hover:opacity-80 ${
        loading ? 'opacity-50' : ''
      }`}
      disabled={loading || disabled}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};


export const SecondaryButton = ({
  children,
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-secondary-400 text-neutral-100 rounded-md py-2 px-6 hover:opacity-80 ${
        loading ? 'opacity-50' : ''
      }`}
      disabled={loading || disabled}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

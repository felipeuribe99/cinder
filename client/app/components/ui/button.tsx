interface ButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'button';
  onClick?: () => void;
  loading?: boolean;
}

const PrimaryButton = ({
  children,
  type = 'button',
  onClick,
  loading = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary-400 text-neutral-100 rounded-md p-2 hover:opacity-80 ${
        loading ? 'opacity-50' : ''
      }`}
      disabled={loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default PrimaryButton;

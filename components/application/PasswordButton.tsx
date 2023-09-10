import { Eye, EyeOff } from "lucide-react";

type Props = {
  isVisible: boolean;
  toggleVisibility: () => void;
};

export const PasswordButton = ({ isVisible, toggleVisibility }: Props) => {
  return (
    <button
      className="focus:outline-none"
      type="button"
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <Eye className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  );
};

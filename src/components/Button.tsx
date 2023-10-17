type ButtonPropType = {
  onClick?: () => void;
};

function Button({ onClick }: ButtonPropType) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="bg-black text-white rounded-md p-2 hover:bg-gray-800"
    >
      Continue
    </button>
  );
}

export default Button;

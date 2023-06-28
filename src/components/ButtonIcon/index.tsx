import { IconType } from "react-icons";

interface IButtonIcon {
  icon: IconType;
  onClick?: () => void;
}
export default function ButtonIcon(props: IButtonIcon) {
  const { icon: Icon, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex justify-center items-center rounded-md border w-full px-4 py-2 bg-white text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
}

import clsx from "clsx";

import CreateButton from "../components/CreateButton";
import { createStateModalId } from "./CreateStateModal";

interface IProps {
  className?: string;
}

const EditorMenu = (props: IProps) => {
  const { className } = props;

  return (
    <ul tabIndex={0} className={clsx("menu m-2 w-14", className)}>
      <CreateButton
        htmlFor={createStateModalId}
        className="tooltip-left"
        tooltip="Create New State"
      />
    </ul>
  );
};

export default EditorMenu;

import { PlusIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";

interface IProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
}

const CreateButton = (props: IProps) => {
  const { className, onClick, tooltip } = props;
  return (
    <div className={clsx("tooltip", className)} data-tip={tooltip}>
      <button className="btn btn-circle btn-outline" onClick={onClick}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default CreateButton;

import { PlusCircleIcon } from "@heroicons/react/24/outline";
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
      <button className="btn btn-circle btn-outline border-0" onClick={onClick}>
        <PlusCircleIcon />
      </button>
    </div>
  );
};

export default CreateButton;

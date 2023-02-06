import { PlusCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

interface IProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  tooltip?: string;
  htmlFor?: string;
}

const CreateButton = (props: IProps) => {
  const { className, onClick, tooltip, htmlFor } = props;
  return (
    <div className={clsx("tooltip", className)} data-tip={tooltip}>
      <label htmlFor={htmlFor} className="flex items-center" onClick={onClick}>
        <div className="btn btn-circle btn-outline border-0">
          <PlusCircleIcon />
        </div>
      </label>
    </div>
  );
};

export default CreateButton;

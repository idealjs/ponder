import { ErrorMessage } from "@hookform/error-message";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import Modal, { IModalRef } from "../components/Modal";
import {
  useSWRCreateState,
  useSwrManySchema,
} from "../generated/swr";
import { useSelectedSchemaId, useSetSelectedStateId } from "../store";
import schemaQuery from "./schemaQuery";

export const createStateModalId = "create-state-modal";

const CreateStateModal = () => {
  const { trigger } = useSWRCreateState();
  const { mutate } = useSwrManySchema(schemaQuery);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const setSelectedStateId = useSetSelectedStateId();
  const selectedSchemaId = useSelectedSchemaId();
  const modalRef = useRef<IModalRef>(null);

  return (
    <Modal id={createStateModalId} ref={modalRef}>
      <form
        action="post"
        onSubmit={handleSubmit(async (value: { name?: string }) => {
          if (value.name == null) {
            return;
          }
          const id = nanoid();
          await trigger({
            data: {
              id,
              schemaId: selectedSchemaId,
              name: value.name,
            },
          });
          await mutate();
          setSelectedStateId(id);
          modalRef.current?.close();
          reset();
        })}
      >
        <h3 className="font-bold text-lg">Create A New State</h3>
        <p className="py-4">You can set name after create.</p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", {
              required: "Must Have a Name",
            })}
            type="text"
            placeholder="name"
            className="input input-bordered"
          />
          <ErrorMessage errors={errors} name="name" />
        </div>

        <div className="modal-action">
          <input className="btn" type="submit" value={"Create"} />
        </div>
      </form>
    </Modal>
  );
};

export default CreateStateModal;

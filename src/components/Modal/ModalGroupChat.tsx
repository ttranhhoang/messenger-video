"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

interface IModalGroupChat {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}
const ModalGroupChat = (props: IModalGroupChat) => {
  const { isOpen, onClose, users } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");

  console.log("memebers", members);
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((err: any) => {
        console.log("error modal group chat", err);
        toast.error("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-5 flex flex-col gap-y-8">
              <Input
                id="name"
                label="Name"
                required
                register={register}
                errors={errors}
                disable={isLoading}
              />
              <Select
                label="Members"
                value={members}
                disable={isLoading}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end items-center gap-x-6">
          <Button onClick={onClose} disable={isLoading} secondary type="button">
            Cancel
          </Button>
          <Button disable={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalGroupChat;

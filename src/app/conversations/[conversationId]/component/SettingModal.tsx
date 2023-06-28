"use client";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface ISettingModal {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}
const SettingModal = (props: ISettingModal) => {
  const { isOpen, onClose, currentUser } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });
  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        onClose();
        router.refresh();
      })
      .catch((err: any) => {
        toast.error("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col px-2 pt-3 space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="text-sm leading-6 text-gray-600 mt-1">
              Edit your public information.
            </p>

            <div className="mt-5 flex flex-col gap-y-8">
              <Input
                id="name"
                label="Name"
                type="text"
                required
                register={register}
                errors={errors}
                disable={isLoading}
              />
              <div>
                <div className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </div>
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="relative md:h-8 md:w-8 rounded-full">
                    <Image
                      fill
                      src={
                        image || currentUser?.image || "/images/placeholder.jpg"
                      }
                      className="rounded-full"
                      alt="Avatar"
                    />
                  </div>
                  <CldUploadButton
                    options={{
                      maxFiles: 1,
                    }}
                    uploadPreset="ajypoeol"
                    onUpload={handleUpload}
                  >
                    <Button secondary type="button" disable={isLoading}>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 gap-x-6 flex justify-end items-center">
          <Button secondary disable={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button disable={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingModal;

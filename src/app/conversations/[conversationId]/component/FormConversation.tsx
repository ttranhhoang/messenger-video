"use client";
import useConversation from "@/app/hook/useConversation";
import Button from "@/components/Button";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import InputMessages from "./InputMessages";
import { CldUploadButton } from "next-cloudinary";
const FormConversation = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const submit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };
  const submitUploadImage = (results: any) => {
    console.log("rererere", results);
    axios.post("/api/messages", {
      image: results?.info?.secure_url,
      conversationId,
    });
  };
  return (
    <div className="w-full bg-white border-t flex items-center p-2 gap-2 lg:gap-4">
      <CldUploadButton
        onUpload={submitUploadImage}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="ajypoeol"
      >
        <HiPhoto size={32} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex items-center gap-2 lg:gap-4"
      >
        {/* <Input
        
          id="conversationInput"
          required
          register={register}
          errors={errors}
          label=""
        /> */}
        <InputMessages
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a Message"
        />
        <Button borderRadiusFull type="submit">
          <HiPaperAirplane size={18} className="text-white" />
        </Button>
      </form>
    </div>
  );
};

export default FormConversation;

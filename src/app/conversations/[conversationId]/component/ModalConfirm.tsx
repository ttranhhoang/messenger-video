"use client";
import useConversation from "@/app/hook/useConversation";
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
interface IModalConfirm {
  open: boolean;
  onClose: () => void;
}
const ModalConfirm = (props: IModalConfirm) => {
  const { open, onClose } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { conversationId } = useConversation();
  const router = useRouter();
  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch((err: any) => {
        console.log("error delete modal confirm", err);
        toast.error("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  }, [conversationId, router, onClose]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="sm:flex sm:items-start pt-2">
        <div className="mx-auto sm:mx-0 w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-red-100 flex justify-center items-center flex-shrink-0">
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button danger disable={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button secondary disable={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;

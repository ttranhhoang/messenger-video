"use client";
import React from "react";
import Modal from "./Modal";
import Image from "next/image";
interface IModalImage {
  src?: string | null;
  isOpen: boolean;
  onClose: () => void;
}
const ModalImage = (props: IModalImage) => {
  const { isOpen, src, onClose } = props;
  if (!src) return null;
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image src={src} alt="Image" fill className="object-contain" />
      </div>
    </Modal>
  );
};

export default ModalImage;

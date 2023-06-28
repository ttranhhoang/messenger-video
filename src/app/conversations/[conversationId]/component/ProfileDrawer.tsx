"use client";
import useOtherUser from "@/app/hook/useOtherUser";
import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import { RootState } from "@/store";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import { useSelector } from "react-redux";
import ModalConfirm from "./ModalConfirm";
interface IProfileDrawer {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}
const ProfileDrawer = (props: IProfileDrawer) => {
  const { data, onClose, isOpen } = props;
  const otherUser = useOtherUser(data);
  const members = useSelector((state: RootState) => state.members.members);
  const isActive = members.indexOf(otherUser.email!) !== -1;
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const titleHeader = () => data.name || otherUser.name;
  const statusText = () => {
    if (data.isGroup) return `${data.users.length} members`;
    return isActive ? "Active" : "Offline";
  };
  const joinedDate = () => {
    return format(new Date(otherUser.createdAt), "PP");
  };
  return (
    <>
      <ModalConfirm open={confirmOpen} onClose={() => setConfirmOpen(false)} />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog onClose={onClose} className="relative z-50" as="div">
          <Transition.Child
            as={Fragment}
            enter="transition duration-500 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-500 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40"></div>
          </Transition.Child>

          <div className="fixed inset-0">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-full max-w-md rounded bg-white absolute right-0 h-full shadow-xl">
                <div className="flex flex-col py-3 px-3">
                  <div className="flex items-center justify-end">
                    <button
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="button"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <IoClose size={24} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-2">
                        {data.isGroup ? (
                          <AvatarGroup users={data.users} />
                        ) : (
                          <Avatar user={otherUser} />
                        )}
                      </div>
                      <div className="text-sm font-semibold">
                        {titleHeader()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {statusText()}
                      </div>
                      <div
                        className="flex flex-col py-8 gap-3 items-center cursor-pointer hover:opacity-75"
                        onClick={() => setConfirmOpen(true)}
                      >
                        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                          <IoTrash size={18} />
                        </div>
                        <div className="text-sm font-light text-neutral-600">
                          Delete
                        </div>
                      </div>

                      <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                        {data.isGroup && (
                          <div className="text-sm font-medium w-full">
                            <div className="text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Emails
                            </div>
                            <div className="text-gray-900 sm:col-span-2">
                              {data.users.map((user) => user.email).join(", ")}
                            </div>
                          </div>
                        )}
                        {!data.isGroup && (
                          <div className="space-y-8 px-4 sm:space-y-3 sm:px-6">
                            <div className="text-sm font-medium w-full">
                              <div className="text-gray-500 sm:w-40 sm:flex-shrink-0">
                                Email
                              </div>
                              <div className="text-gray-900 sm:col-span-2">
                                {otherUser.email}
                              </div>
                            </div>
                            <hr />
                            <div className="text-sm font-medium w-full">
                              <div className="text-gray-500 sm:w-40 sm:flex-shrink-0">
                                Joined
                              </div>
                              <div className="text-gray-900 sm:col-span-2">
                                <time dateTime={joinedDate()}>
                                  {joinedDate()}
                                </time>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;

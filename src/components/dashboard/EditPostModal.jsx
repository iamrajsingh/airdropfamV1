import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { TiEdit } from "react-icons/ti";
import AddAirdropForm from "./AddAirdropForm";
import { MdDelete } from "react-icons/md";
import Button from "../Button";
import appwriteService from "../../appwrite/config";

const EditPostModal = ({
  post,
  isDelete = false,
  isEdit = false,
  heading,
  setRefresh,
  refresh,
}) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deletePost = async (id, banner) => {
    await appwriteService.deleteAirdrop(id).then((status) => {
      if (status) {
        appwriteService.deleteFile(banner);
      }
    });

    setIsOpen(false);
    setRefresh(!refresh);
  };

  return (
    <>
      {isEdit && (
        <div
          className=" absolute top-4 right-4 hover:scale-110 transition-all p-2 bg-green-600 text-white rounded-full text-xl cursor-pointer"
          onClick={openModal}
        >
          <TiEdit />
        </div>
      )}

      {isDelete && (
        <div
          className="absolute top-4 right-16 hover:scale-110 transition-all p-2 bg-red-600 text-white rounded-full text-xl cursor-pointer"
          onClick={openModal}
        >
          <MdDelete />
        </div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full ${isDelete && "max-w-[29rem]"} ${
                    isEdit && "max-w-[70rem]"
                  } transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    {heading}
                  </Dialog.Title>
                  {isEdit && <AddAirdropForm post={post} />}

                  {isDelete && (
                    <div className="flex flex-col gap-3">
                      <p className="text-lg font-palanquin font-semibold leading-5 text-red-500">
                        Are you sure you want to delete {post.title}?
                      </p>
                      <Button
                        className=" text-lg font-montserrat font-semibold text-white bg-red-400 px-3 py-2 text-nowrap rounded-2xl transition-all shadow-lift"
                        onClick={() => deletePost(post?.$id, post?.banner)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditPostModal;

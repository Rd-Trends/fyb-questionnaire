import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import React, { Fragment, useCallback, useRef } from "react";

type Props = {
  show: boolean;
  close: () => void;
  data: Record<string, any>;
};

const GenerateImageForAnswers = ({ show = false, close, data }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const generateImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `fyb.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center p-4 mx-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className=" w-fit min-h-[400px] h-auto flex flex-col justify-between transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900">
                      Question Details
                    </Dialog.Title>

                    <div className=" mt-4 space-y-4">
                      <div ref={ref}>
                        <section className=" bg-[url('/bg.jpg')] rounded-md p-4 w-[600px] text-white">
                          <div className="flex space-x-2 items-center justify-center mb-4">
                            <img
                              className=" w-10 h-8"
                              src="/delsu.png"
                              alt=""
                            />
                            <img
                              className=" w-10 aspect-square"
                              src="/nimeche.png"
                              alt=""
                            />
                          </div>
                          <div className=" flex flex-col items-center space-y-2 text-yellow-300 greatVibes">
                            <h1 className=" font-semibold text-3xl font-great-vibes">
                              Class of 23'
                            </h1>
                            <h1 className=" font-semibold text-3xl font-great-vibes">
                              Meet the FYBs
                            </h1>
                          </div>
                          <div className=" flex items-start justify-between mt-8">
                            <div className="w-1/2">
                              <img
                                className=" rounded-md w-full aspect-square object-cover object-top border-8 border-yellow-400"
                                src={`${data?.image}`}
                                alt=""
                              />
                              <div className="space-y-1 rounded-lg mt-8">
                                <h1 className=" text-lg font-medium flex flex-col">
                                  <span className=" bg-yellow-400 p-2 w-fit rounded-md text-black">
                                    FULL NAME{" "}
                                  </span>
                                  <strong className=" mt-1">
                                    {data?.fullName}
                                  </strong>
                                </h1>
                                {!!data?.nickName && (
                                  <h1 className="text-lg font-medium flex flex-col">
                                    <span className=" bg-yellow-400 p-2 w-fit rounded-md text-black">
                                      NICK NAME
                                    </span>
                                    <strong className=" mt-1">
                                      {data?.nickName}
                                    </strong>
                                  </h1>
                                )}
                              </div>
                            </div>

                            <div className=" space-y-4 h-full rounded-xl w-1/2 ml-12">
                              {!!data?.questions?.length &&
                                data?.questions?.map(
                                  (question: {
                                    question: string;
                                    answer: string;
                                  }) => {
                                    return (
                                      <div className=" space-y-1">
                                        <p className=" text-xl bg-yellow-400 p-2 text-black rounded-md">
                                          {question.question}
                                        </p>
                                        <p className="text-xl text-white font-semibold">
                                          {question.answer}
                                        </p>
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 self-end mt-8">
                    <button
                      className="py-2 px-4 border-none rounded-md bg-red-500 text-white hover:opacity-75 "
                      onClick={close}>
                      cancel
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        generateImage();
                      }}
                      className="py-2 px-4 border-none rounded-md bg-blue-500 text-white hover:opacity-75 ">
                      Download Image
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GenerateImageForAnswers;

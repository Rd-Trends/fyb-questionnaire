import { Question, questionSchema } from "@/schema";
import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment } from "react";
import {
  Controller,
  FieldValues,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export type AddquestionPropsType = {
  handleAddQuestion: (data: FieldValues) => void;
  isOpen: boolean;
  closeModal: () => void;
};

const AddQuestion = ({
  handleAddQuestion,
  isOpen,
  closeModal,
}: AddquestionPropsType) => {
  const { control, register, watch, handleSubmit, reset } = useForm({
    resolver: zodResolver(questionSchema),
  });
  const watchQuestionType = watch("type");

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "options",
  });

  const handleSubmitQuestion = handleSubmit((data: FieldValues) => {
    handleAddQuestion(data);
    reset();
    closeModal();
  });

  const addOption = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    append("");
  };

  const removeOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    remove(index);
  };

  const cancelSubmit = () => {
    reset();
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={cancelSubmit}>
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
          <div className="flex h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel
                as="form"
                onSubmit={handleSubmitQuestion}
                className="w-full min-h-[400px] max-h-[500px] overflow-y-auto max-w-md flex flex-col justify-between transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    Question Details
                  </Dialog.Title>

                  <div className=" mt-4 space-y-4">
                    <Input
                      label="Question"
                      placeholder="e.g what is your name?"
                      {...register("question")}
                    />
                    <Controller
                      render={({ field }) => (
                        <Select
                          options={questionType}
                          label="type"
                          placeholder="type of question"
                          onChange={field.onChange}
                        />
                      )}
                      name="type"
                      control={control}
                    />
                    {watchQuestionType == "select" && (
                      <div>
                        <span className="py-2">Options</span>
                        {fields.map((option, index) => {
                          return (
                            <div className="flex items-center justify-between space-x-2 mb-2">
                              <Input
                                key={option.id}
                                label=""
                                {...register(`options.${index}`)}
                              />
                              <button onClick={(e) => removeOption(e, index)}>
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          );
                        })}
                        <button
                          className="mb-4 flex items-center justify-center space-x-2 py-2 text-sm px-4 border-none rounded-md bg-blue-500 text-white hover:opacity-75 "
                          onClick={addOption}>
                          <PlusIcon className="h-3 w-3" />
                          <span>add option</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 self-end">
                  <button
                    className="py-2 px-4 border-none rounded-md bg-red-500 text-white hover:opacity-75 "
                    onClick={(e) => {
                      e.preventDefault();
                      cancelSubmit();
                    }}>
                    cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 border-none rounded-md bg-blue-500 text-white hover:opacity-75 ">
                    Add question
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddQuestion;

const questionType = [
  { label: "text", value: "text" },
  { label: "select", value: "select" },
  {
    label: "multiLineText",
    value: "multi line text",
  },
];

"use client";

import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FieldValue,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Question, createQuestionnaireSchema } from "@/schema";
import AddQuestion from "@/components/AddQuestion";

const CreateQuestionnaire = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { control, register, watch, handleSubmit } = useForm({
    resolver: zodResolver(createQuestionnaireSchema),
  });
  const questions: Question[] = watch("questions");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsOpen(true);
  }

  const addQuestion = (data: FieldValue<any>) => {
    append(data);
  };

  const handleCreateQuestion = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="">
      <form onSubmit={handleCreateQuestion} className="w-full space-y-4">
        <Input
          {...register("daysToSignOut")}
          label="How many days to sign out?"
          type="number"
        />
        {!!questions?.length &&
          fields.map((field, index) => {
            return (
              <div className="space-y-2">
                <h2>
                  <strong className=" font-semibold">Question: </strong>{" "}
                  {questions[index]?.question}
                </h2>
                <p>
                  <strong className=" font-semibold">Type: </strong>
                  {questions[index]?.type}
                </p>
                {!!questions[index]?.options?.length && (
                  <>
                    <p className="font-semibold">Options</p>
                    <ol className="ml-4 list-decimal space-y-1">
                      {questions[index]?.options?.map((option) => (
                        <li key={option}>{option}</li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            );
          })}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Add Question
          </button>
          {!!questions?.length && (
            <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ml-2">
              Create Questionaire
            </button>
          )}
        </div>
      </form>

      <AddQuestion
        isOpen={isOpen}
        closeModal={closeModal}
        handleAddQuestion={addQuestion}
      />
    </div>
  );
};

export default CreateQuestionnaire;

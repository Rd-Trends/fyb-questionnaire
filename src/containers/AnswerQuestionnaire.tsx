"use client";

import React, { useState } from "react";
import GenerateImageForquestions from "@/components/GenerateImageForAnswers";
import Input from "@/components/Input";
import Select, { Options } from "@/components/Select";
import TextArea from "@/components/TextArea";
import { useForm, Controller } from "react-hook-form";

const AnswerQuestionnaire = () => {
  const [image, setImage] = useState("");
  const [data, setData] = useState({});
  const { register, control, watch, handleSubmit } = useForm({});
  const [showPreview, setShowPreview] = useState(false);

  const questions = [
    {
      question: "Favourite Department?",
      type: "text",
      options: undefined,
    },
    {
      question: "Favourite Lecturer?",
      type: "text",
      options: undefined,
    },
    {
      question: "what is your hobby/skills?",
      type: "text",
      options: undefined,
    },
    {
      question: "Relationship Status?",
      type: "select",
      options: [
        "Single",
        "Married",
        "Divorced",
        "Widowed",
        "Complicated",
        "On God",
        "OYO Things",
        "Relatiomship with Jesus",
        "One with GOD is a majority",
      ],
    },
    {
      question: "If not engineering, what else?",
      type: "text",
      options: undefined,
    },
    {
      question: "Favourite moment in school/campus?",
      type: "text",
      options: undefined,
    },
    {
      question: "Worst moment in school/campus?",
      type: "text",
      options: undefined,
    },
    {
      question: "One word to descripe DELSU?",
      type: "text",
      options: undefined,
    },
  ];

  const handleSubmits = handleSubmit((data) => {
    const result = { image, fullName: data.fullName, nickName: data.nickName };
    const questions = Object.keys(data)
      .map((key) => {
        if (key !== "fullName" && key !== "nickName") {
          return { question: key, answer: data[key] as string };
        }
      })
      .filter((question) => !!question);
    setData({ ...result, questions });
    setShowPreview(true);
  });

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e?.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmits} className=" space-y-4">
        <label
          htmlFor="photo"
          className="uppercase text-sm font-medium text-[#828282] flex items-center cursor-pointer">
          <div className=" mr-4 relative">
            <img
              width={100}
              height={100}
              src={image ? image : "/photo.png"}
              className="rounded-lg w-[72px] h-[72px] object-center object-cover"
              alt=""
            />
          </div>
          <input
            type="file"
            id="photo"
            className=" w-[0.1px] h-[0.1px] opacity-0"
            onChange={onImageChange}
          />
          Upload Photo
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          label="Full name"
          {...register("fullName")}
        />
        <Input
          type="text"
          placeholder="JD"
          label="Nick name (Optional)"
          {...register("nickName")}
        />
        {!!questions.length &&
          questions.map((question, index) => {
            return (
              <>
                {question?.type === "text" && (
                  <Input
                    key={question.question}
                    {...register(question.question)}
                    label={question.question}
                  />
                )}
                {question?.type === "multiLine" && (
                  <TextArea
                    key={question.question}
                    label={question.question}
                    {...register(question.question)}
                  />
                )}
                {question?.type === "select" && (
                  <Controller
                    key={question.question}
                    control={control}
                    name={question.question}
                    render={({ field }) => (
                      <Select
                        options={convertstringToOptions(question.options!)}
                        label={question.question}
                        {...field}
                      />
                    )}
                  />
                )}
              </>
            );
          })}
        <button
          type="submit"
          className="mt-4 py-2 px-4 border-none rounded-md bg-blue-500 text-white hover:opacity-75">
          Preview image
        </button>
      </form>

      <GenerateImageForquestions
        show={showPreview}
        close={() => setShowPreview(false)}
        // daysToSignOut={36}
        data={data}
      />
    </div>
  );
};

const convertstringToOptions = (values: string[]): Options => {
  return values.map((value) => ({ label: value, value }));
};

export default AnswerQuestionnaire;

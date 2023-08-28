import AnswerQuestionnaire from "@/containers/AnswerQuestionnaire";
import CreateQuestionnaire from "@/containers/CreateQuestionnaire";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <AnswerQuestionnaire />
      {/* <CreateQuestionnaire /> */}
    </main>
  );
}

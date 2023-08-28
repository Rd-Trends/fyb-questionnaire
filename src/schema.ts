import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  type: z.enum(["text", "select", "textarea"]),
  options: z.array(z.string()).optional(),
});

export const createQuestionnaireSchema = z.object({
  daysToSignOut: z.coerce.number().optional(),
  questions: z.array(questionSchema).optional(),
});

export const answerQuestionnaire = z.object({
  fullName: z.string(),
  nickName: z.string().optional(),
  questions: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
});

export type Question = z.infer<typeof questionSchema>;

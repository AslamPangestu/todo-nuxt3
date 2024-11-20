import { z } from "zod";

export enum Status {
  TODO = 0,
  DONE = 1,
  CANCELLED = 2,
}

const StatusSchema = z.nativeEnum(Status);

export const NoteSchema = z.object({
  id: z.number(),
  title: z.string().min(8, "Must be at least 8 characters"),
  description: z.string().min(8, "Must be at least 8 characters"),
  activity_no: z.string().min(8, "Must be at least 8 characters"),
  status: StatusSchema,
});
export type NoteSchemaType = z.output<typeof NoteSchema>;

export const FormNoteSchema = NoteSchema.omit({
  id: true,
  activity_no: true,
  status: true,
});
export type FormNoteSchemaType = z.output<typeof FormNoteSchema>;

export const NoteResponseSchema = z.object({
  pagination: z.object({
    per_page: z.number(),
    current_page: z.number(),
    last_page: z.number(),
    total: z.number(),
    has_next: z.boolean(),
    has_prev: z.boolean(),
  }),
  data: z.array(NoteSchema),
});
export type NoteResponseSchemaType = z.output<typeof NoteResponseSchema>;

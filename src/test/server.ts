import { setupServer } from "msw/node";
import { handlers } from "@/test/handlres";

export const server = setupServer(...handlers);
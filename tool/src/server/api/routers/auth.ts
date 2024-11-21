import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}auth/sign-in`,
          input,
          { withCredentials: true },
        );
        console.log(response.data);
        return response.data; // Return the relevant data to the client
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // Handle Axios errors
          console.error("trpc-Axios error message: ", error.message);
          console.error("trpc-Response data:", error.response?.data);
        } else if (error instanceof Error) {
          // Handle generic errors
          console.error("trpc-Generic error message:", error.message);
        } else {
          // Handle unexpected errors
          console.error("trpc-Unexpected error:", error);
        }
      }
    }),
});

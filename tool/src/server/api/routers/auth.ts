import { TRPCError } from "@trpc/server";
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
        return {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }; // Return the relevant data to the client
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new TRPCError({
            code: error?.response?.status === 401 ? "UNAUTHORIZED" : "CONFLICT", // Map HTTP status to tRPC codes
            message: error?.response?.data?.message || "An error occurred",
          });
        }
        // Handle unexpected errors
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  apiRequestWithHttpCookie: publicProcedure.mutation(async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_B_LOGIC_MICROSERVICE_URL}products/access-token-test`,
        {}, // Body can be empty if cookies are sent via headers
        {
          withCredentials: true, // Ensure cookies are included in the request
        },
      );

      return {
        data: response.data,
      };
    } catch (error: unknown) {
      console.error(error, "======error in testAccessToken route");
      if (axios.isAxiosError(error)) {
        throw new TRPCError({
          code:
            error?.response?.status === 401 ? "UNAUTHORIZED" : "BAD_REQUEST",
          message:
            error?.response?.data?.message || "Failed to fetch access token.",
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong in the access token test route.",
      });
    }
  }),
});

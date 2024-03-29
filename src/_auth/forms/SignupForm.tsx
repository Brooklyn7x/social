import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { Instagram } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import {
  useCreateAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesMutation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  });

  const { mutateAsync: createUsersAccount, isLoading: isCreatingAccount } =
    useCreateAccount();

  const { mutateAsync: signInAccount, isLoading: isSigningInUser } =
    useSignInAccount();

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    try {
      const newUser = await createUsersAccount(values);
      if (!newUser) {
        throw new Error("Account creation failed");
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });
      if (!session) {
        throw new Error("Sign in failed after account creation");
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        throw new Error("Failed to verify authentication status");
      }
    } catch (error) {
      toast({ title: "An error occurred, please try again." });
    }
  }

  return (
    <div className="border w-[330px] p-5 md:w-[360px]">
      <Form {...form}>
        <div className="flex items-center justify-center flex-col gap-y-2">
          <Instagram />
          <h2 className="font-bold">Create a new account</h2>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="font-normal">
              {isCreatingAccount || isSigningInUser || isUserLoading ? (
                <div className="flex justify-center items-center">
                  Loading...
                </div>
              ) : (
                "Sign up"
              )}
            </Button>

            <p className="text-sm text-center">
              Have an account?
              <Link to="/sign-in" className="text-sky-500">
                {" "}
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};
export default SignupForm;

import { CustomButton } from "@/components/Custom/CustomButton";
import { CustomInput } from "@/components/Custom/CustomInput";

import { AuthRequest } from "@/services/auth/types";

import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const { mutate: login, isLoading: isLoginLoading } = useMutation({
    mutationFn: async (data: AuthRequest) => {
      return await authStore.login(data);
    },
    onSuccess: () => queryClient.invalidateQueries(["auth"]),
  });

  const { mutate: registration, isLoading: isRegistrationLoading } = useMutation({
    mutationFn: async (data: AuthRequest) => {
      return await authStore.registration(data);
    },
    onSuccess: () => queryClient.invalidateQueries(["auth"]),
  });

  const { register, handleSubmit } = useForm<AuthRequest>();

  function onLoginSubmit(data: AuthRequest) {
    login(data);
  }

  function onRegistrationSubmit(data: AuthRequest) {
    registration(data);
  }

  return (
    <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3">
      <h1 className="font-bold text-3xl text-center">Auth</h1>
      <CustomInput
        register={register}
        options={{ required: true }}
        name="email"
        placeholder="Email"
        styled
      />
      <CustomInput
        register={register}
        options={{ required: true }}
        type="password"
        name="password"
        placeholder="Password"
        styled
      />
      <div className="m-auto w-full text-center">
        <CustomButton
          full
          text="Log in"
          onClick={handleSubmit(onLoginSubmit)}
          isLoading={isLoginLoading || isRegistrationLoading}
        />
        <CustomButton
          full
          text="Register"
          onClick={handleSubmit(onRegistrationSubmit)}
          isLoading={isLoginLoading || isRegistrationLoading}
        />
      </div>
    </form>
  );
};

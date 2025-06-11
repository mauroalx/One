"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";


const schema = yup.object().shape({
  email: yup.string().required("O e-mail é obrigatório").email("E-mail inválido"),
  password: yup.string().required("A senha é obrigatória").min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function SignInForm() {
  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log("Dados do formulário:", data);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erro ao autenticar");

      const result = await res.json();

      login(result.access_token, result.user); // Chama a função de login do contexto AuthContext [lida com o token recebido]
    } catch (err) {
      console.error("Erro:", err);
    }
  };


  return (
    <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Autentique-se
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Insira seu e-mail e senha para entrar!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    E-mail <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input {...register("email")} placeholder="exemplo@gmail.com" />
                  {errors.email && <p className="text-error-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <Label>
                    Senha <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Insira sua senha"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                    
                  </div>
                  {errors.password && <p className="text-error-500 text-sm">{errors.password.message}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Permanecer logado
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Acessar
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Não tem uma conta? {""} Solicite ao seu administrador
                {/* <p></p> */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center">versão: 1.2.1.0</p>
    </div>
  );
}

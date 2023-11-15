import { Note } from "@/services/notes/types";
import { useNavbarStore } from "@/stores/navbar";
import classNames from "classnames";
import { InputHTMLAttributes, createElement, useEffect, useRef } from "react";
import {
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

type TextElement = "input" | "textarea";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  as?: TextElement;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  options?: RegisterOptions;
  register?: UseFormRegister<any>; // temp
  hidden?: boolean;
  disabled?: boolean;
  styled?: boolean;
  setValue?: UseFormSetValue<any>;
}

function useTextAutoResize(
  target: HTMLElement | (EventTarget & HTMLTextAreaElement)
) {
  target.style.height = "inherit";
  target.style.height = `${Math.max(target.scrollHeight, 32)}px`;
}

export function CustomInput({
  as = "input",
  register,
  options,
  type = "text",
  name,
  disabled,
  styled,
  setValue,
  ...props
}: Props) {
  const { isColumn } = useNavbarStore();
  const formRegister = register && name ? register(name, options) : null;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const classes = classNames({
    input: true,
    "pointer-events-none": disabled,
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500":
      styled,
  });

  useEffect(() => {
    if (textareaRef.current) useTextAutoResize(textareaRef.current);
  }, [textareaRef, isColumn]);

  return (
    <>
      {createElement(as, {
        className: classes,
        ...formRegister,
        ...props,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          if (setValue && name) setValue(name, e.target.value);
          useTextAutoResize(e.target);
        },
        ref: (e) => {
          if (e) {
            formRegister && formRegister.ref(e);
            useTextAutoResize(e);
          }
        },
      })}
    </>
  );
}

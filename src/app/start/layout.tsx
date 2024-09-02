"use client";
import Image from "next/image";
import React from "react";
import { BrainCircuit } from "lucide-react";
import { NightModeToggle } from "@/components/NightModeToggle";
import Logo from "@/app/_asset/logo.svg";
import { motion } from "framer-motion";

export default function Home({
  AuthorLogo = (
    <Image
      src={Logo}
      alt="author-logo"
      priority
      width="80"
      height="80"
      className="invert-in-dark-mode"
    />
  ),
  Name = "Converse",
  productLogo = <BrainCircuit className="size-10 text-black dark:text-white" />,
  children,
}: {
  AuthorLogo?: React.ReactNode;
  Name?: string;
  productLogo?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <main className="flex min-h-screen flex-col items-center justify-between px-10 small:p-24 bg-white dark:bg-gray-900 dark:text-white text-black">
        <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
          <div className="fixed left-0 px-2 top-0 flex lg:backdrop-blur-sm py-3 w-full justify-center pb-6 pt-8 dark:border-neutral-800 lg:static lg:w-auto">
            <div className="flex items-center gap-2">
              {productLogo}
              <span className="text-2xl font-semibold text-black dark:text-white">
                {Name}
              </span>
              <NightModeToggle />
            </div>
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://portfolio-jason-002251.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By {AuthorLogo}
            </a>
          </div>
        </div>

        <div className="container my-4 small:my-[30px] flex flex-row gap-2 justify-between">
          <div className="lg:w-[100%] hidden lg:block w-auto">
            <div className="log-in-bg fixed h-full left-0 top-0 bottom-0 lg:w-[40vw] w-auto border-r-2 border-gray-500/30" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-inherit w-full"
          >
            {children}
          </motion.div>
        </div>
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
      </main>
    </motion.div>
  );
}

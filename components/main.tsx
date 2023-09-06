"use client";
import React from "react";
import Image from "next/image";
import Register from "./Register";
import { motion } from "framer-motion";
import styles from "./main.module.css";
import Footer from "./Footer";

export default function Main() {
  return (
    <div className="bg-[#f2f3f6] flex">
      <div className="text-black w-[38.96%] h-[40.53%] absolute">
        <div className="mt-[20.23%] ms-[16%]">
        <h1 className="w-[566px] h-[82px] text-[60px] font-bold">
          League of Engineers
        </h1>
        <p className="w-[150px] h-[55px] text-[32px] font-semibold">
          Season <span className={`${styles.wrapper}`}>2</span>
        </p>
        <p className="my-[22px] w-[403px] h-auto text-[#667085] text-[20px]">
          Where Engineering Excellence Meets Football Fervor - Uniting Our
          Department&apos;s Best on the Pitch! Register now to become a part of the
          League of Engineers tournament as a player.
        </p>
        <div>
          <Register className="w-[202px] h-[60px] gap-[10px] py-[8px] px-[15px]"/>
        </div>
        </div>
      </div>
      <div className="ms-[36.27%] mt-[20.2%] h-[70.38%] w-[63.75%] bottom-[10rem] absolute">
        <Image
          src="/kicking.png"
          height={10000}
          width={10000}
          alt="Picture of the author"
        />
      </div>
      <Footer className="absolute bottom-0"/>
    </div>
  );
}

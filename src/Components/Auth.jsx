"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { formShema, Stringify } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const Auth = ({ type }) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();

    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();

      const valid = await formShema.validate(userData);

      if (valid) {
        console.log("UserData:", userData);
      } else {
        alert("error signing up");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" form-container">
      <div className=" left-side relative">
        <div className=" absolute bg-black opacity-30 inset-0"></div>
        <article className=" p-10 flex gap-1.5 items-cente">
          <Image
            src="/icons/logo.svg"
            width={25}
            height={25}
            alt="logo"
            className=" z-50"
          />
          <p className=" font-mont font-bold text-md text-white z-50 mt-3">
            Solacely
          </p>
        </article>
      </div>
      <div className=" form">
        {type === "sign-in" ? (
          <p className=" text-right text-xs font-mont font-semibold">
            Dont't have an account? {"  "}
            <Link href="/sign-up" className=" text-green-400">
              Sign-up for free
            </Link>
          </p>
        ) : (
          <p className=" text-right text-xs font-mont font-semibold">
            Already have an account? {"  "}
            <Link href="/sign-in" className=" text-green-400">
              Sign-in
            </Link>
          </p>
        )}

        <h1 className=" text-center text-3xl font-bold font-mont py-8">
          Get Started
        </h1>
        <article className=" flex gap-6 justify-center">
          <button className=" flex items-center justify-center gap-2 px-6 rounded-4xl ">
            <Image
              src="/icons/google.svg"
              width={15}
              height={15}
              alt="google"
            />{" "}
            Google
          </button>

          <button className=" flex items-center justify-center gap-2 px-6 bg-black rounded-4xl ">
            <Image src="/icons/whit-fb.svg" width={15} height={15} alt="fb" />{" "}
            Facebook
          </button>
        </article>
        <form onSubmit={handleSubmit} className=" form-wrapper">
          {type === "sign-in" ? (
            <div className=" input-wrapper p-10 mb-16">
              <CustomInput
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                handleChange={handleChange}
                label="Email"
              />
              <CustomInput
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                handleChange={handleChange}
                label="Password"
              />
            </div>
          ) : (
            <div className=" input-wrapper">
              <div className=" grid grid-cols-2 gap-2.5 mt-6">
                <CustomInput
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  handleChange={handleChange}
                  label="First Name"
                />
                <CustomInput
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  handleChange={handleChange}
                  label="Last Name"
                />
              </div>
              <CustomInput
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                handleChange={handleChange}
                label="Email"
              />
              <CustomInput
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="1234567890"
                handleChange={handleChange}
                label="Phone Number"
              />

              <CustomInput
                type="select"
                name="location"
                id="location"
                placeholder="Location"
                handleChange={handleChange}
                label="Location"
              />
              <CustomInput
                type="password"
                name="paswword"
                id="password"
                placeholder="Password"
                handleChange={handleChange}
                label="Password"
              />
              <CustomInput
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                handleChange={handleChange}
                label="Confirm Password"
              />
              <article className=" flex gap-1.5 mb-8">
                <CustomInput type="checkbox" name="agreement" id="agreement" />
                <p className=" text-sm font-mont">
                  By signing up I agree that i'm 18 years of age or older, to
                  the{" "}
                  <b>
                    User Agreements, Privacy Policy, Cookie Policy, E-Sign
                    Consent.
                  </b>
                </p>
              </article>
            </div>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="  w-full rounded-lg mb-4"
          >
            {isLoading ? (
              <div className=" flex items-center gap-2.5">
                <Loader2 className=" animate-spin " size={20} />
                <p> Loading... </p>
              </div>
            ) : type === "sign-in" ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;

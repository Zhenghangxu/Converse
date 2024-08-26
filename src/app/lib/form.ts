"use server";

export const SignUp = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
};

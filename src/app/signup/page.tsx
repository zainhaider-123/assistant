"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (res.ok) alert("Signup successful!");
    else alert("Error signing up!");
  };

  return (
    <div className= "max-w-md mx-auto mt-20 border rounded-xl p-6" >
    <h1 className="text-2xl font-bold mb-4" > Sign Up </h1>
      < form onSubmit = { handleSubmit(onSubmit) } className = "space-y-4" >
        <div>
        <input
            { ...register("email") }
  placeholder = "Email"
  className = "w-full border p-2 rounded"
    />
    { errors.email && <p className="text-red-500 text-sm"> { errors.email.message } </p> }
    </div>

    < div >
    <input
            { ...register("password") }
  placeholder = "Password"
  type = "password"
  className = "w-full border p-2 rounded"
    />
    { errors.password && <p className="text-red-500 text-sm"> { errors.password.message } </p> }
    </div>

    < button
  type = "submit"
  disabled = { isSubmitting }
  className = "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
    { isSubmitting? "Creating...": "Sign Up" }
    </button>
    </form>
    </div>
  );
}

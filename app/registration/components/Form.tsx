import React, { useMemo } from "react";
import FormItems from "./FormItems";
import { redirect } from "next/navigation";
import supabase from "@/config/supabase";

const Form = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    console.log(formData.get("image"));

    const file = formData.get("image");

    if (file) {
      const { data: imgData, error: imgError } = await supabase.storage
        .from("images")
        .upload("players/" + formData.get("id"), file);
    }

    const { data, error } = await supabase.from("form").insert([
      {
        name: formData.get("name"),
        id: formData.get("id"),
        department: formData.get("department"),
        email: formData.get("email"),
        pastTournament: formData.get("tournament"),
        position: formData.get("position"),
        transaction: formData.get("transaction"),
      },
    ]);
    const imageUrl = supabase.storage
      .from("images")
      .getPublicUrl("players/" + formData.get("id")).data.publicUrl;
    const { data: img, error: imgE } = await supabase
      .from("form")
      .update({ image: imageUrl })
      .eq("id", formData.get("id"));

    // Logic to save image in the storage -- Done

    // get the link of the image in the storge and set it in the database -- Done

    // Optional: Display a success message or perform any other actions

    // For now, let's just clear the form fields -- Kinda Done
    redirect("/registration");
  };
  var formItem = useMemo(
    () => [
      {
        label: "Name",
        placeHolder: "Enter your name",
        inputType: "text",
        name: "name",
      },
      {
        label: "ID",
        placeHolder: "Enter your IUB ID",
        inputType: "number",
        name: "id",
      },
      {
        label: "Email",
        placeHolder: "example@gmail.com",
        inputType: "email",
        name: "email",
      },
      {
        label: "Image",
        placeHolder: "",
        inputType: "file",
        accept: "image/*",
        name: "image",
      },
      {
        label: "Blood Group",
        placeHolder: "Enter your Department",
        inputType: "dropdown",
        itemList: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
        name: "bloodgroup",
      },
      {
        label: "Department",
        placeHolder: "Enter your Department",
        inputType: "dropdown",
        itemList: ["CSE", "EEE", "PS"],
        name: "department",
      },
      {
        label: "Past Tournaments",
        placeHolder: "Name your past tournment",
        inputType: "text",
        name: "tournament",
      },
      {
        label: "Preferred Position",
        placeHolder: "Enter your preferred playing position",
        inputType: "dropdown",
        itemList: ["Forward", "Midfielder", "Center Back", "Goal Keeper"],
        name: "position",
      },
      {
        label: "Rating",
        placeHolder: "Enter your preferred playing position",
        inputType: "dropdown",
        itemList: ["Icon", "A", "B", "C"],
        name: "rating",
        info: "If you were to rate yourself among these four catagories: ICON > A > B > C. What would you choose?",
      },
      {
        label: "Transaction",
        placeHolder: "Enter transaction ID",
        inputType: "text",
        name: "transaction",
      },
    ],
    []
  );
  return (
    <>
      <h1 className="text-center text-3xl font-bold my-[20px]">
        Player Registration Form
      </h1>
      <div className="flex flex-col justify-center">
        <div>
          <form
            action={handleSubmit}
            className="md:mx-auto mx-4 mb-5 grid md:grid-cols-2 md:text-lg text-md md:w-[40%]"
          >
            {formItem.map((item) => (
              <FormItems
                key={item.label}
                label={item.label}
                placeHolder={item.placeHolder}
                inputType={item.inputType}
                accept={item.accept}
                name={item.name}
                info={item.info}
                itemList={item.itemList || []}
              />
            ))}

            <div
              className="
            border 
            text-center 
            py-[8px] 
            mt-5 
            rounded-[5px] 
            bg-orange-300 
            text-xl 
            font-bold 
            col-span-2
            md:w-[30%] 
            w-[98%] 
            md:mx-auto"
            >
              <input type="submit" name="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;

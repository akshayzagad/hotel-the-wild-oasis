import supabase from "./supabase";

export async function getGuest() {
  let { data: guest, error } = await supabase.from("guest").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins not loaded");
  }
  return guest;
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from("guest")
    .insert([{ ...newGuest }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest is not created");
  }
  return data;
}

import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error);
    throw new Error("cabins not loaded")
  }
  return data; 
}

export async function createCabin(newCabin) {
/** https://mogncmpwzzznvddputnn.supabase.co/storage/v1/object/public/cabins-images//cabin-001.jpg */

  const imageName =`${Math.random()}-${newCabin.image.name}`.replaceAll("/","");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

  //1. Create Cabin
const { data, error } = await supabase
  .from('cabins')
  .insert([
    {...newCabin,image:imagePath}
  ])
  .select()
   if (error) {
    console.error(error);
    throw new Error("cabins not created")
  }

  // 2.Upload Image
const { error: storageError } = await supabase
  .storage
  .from('cabins-images')
  .upload(imageName, newCabin.image)

  //Delete the cabin If there was an error uplaoding error
  if (storageError) {
    await supabase
    .from('cabins')
    .delete()
    .eq('id', data.id);
     console.error(storageError);
    throw new Error("Cabin not created because image not uploaded")
  }
  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  if (error) {
    console.error(error);
    throw new Error("cabins not deleted")
  }
}

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

export async function createEditCabin(newCabin, id) {
  /** https://mogncmpwzzznvddputnn.supabase.co/storage/v1/object/public/cabins-images//cabin-001.jpg */
  const hasImagePath = newCabin.image?.startWith?.(supabase);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

  //1. Create/Edit Cabin
  let query = supabase.from('cabins');

  //A] CREATE
  if (!id)
    query
      .insert([
        { ...newCabin, image: imagePath }
      ]);

  //B] Edit 
  if (id)
    query.update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select()
  const { data, error } = await supabase.select().single();

  if (error) {
    console.error(error);
    throw new Error("cabins not created")
  }

  // 2.Upload Image
  const { error: storageError } = await supabase
    .storage
    .from('cabins-images')
    .upload(imageName, newCabin.image).select().single();

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

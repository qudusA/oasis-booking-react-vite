import supabase, { supabaseUrl } from "./supabase";

export async function getAllCabin() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("error occur while fetching cabins");

  return cabins;
}

export async function deleteACabinItemById(id) {
  let { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error)
    throw new Error(`error occur while deleting carbin item with id ${id}`);
}

export async function saveACarbin(cabin, id) {
  const hasImgPath = cabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random() + "-" + cabin.image?.name}`?.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImgPath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/carbinImage/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);

  if (id) query = query.update({ ...cabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) throw new Error(`error occur while saving to carbin`);
  if (hasImgPath) return data;

  const { error: uploadError } = await supabase.storage
    .from("carbinImage")
    .upload(imageName, cabin.image);

  if (uploadError) {
    if (!id) await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error(`carbin image failed to upload...`);
  }

  return data;
}

import supabase, { supabaseUrl } from "./supabase";

export async function getAllCabin() {
  let { data: carbins, error } = await supabase.from("carbins").select("*");

  if (error) return "error occur while fetching cabins";

  return carbins;
}

export async function deleteACabinItemById(id) {
  let { error } = await supabase.from("carbins").delete().eq("id", id);
  if (error)
    throw new Error(`error occur while deleting carbin item with id ${id}`);
}

export async function saveACarbin(cabin, id) {
  // https://hfzygplbfkpiklzemmsx.supabase.co/storage/v1/object/public/carbinImage/cabin-001.jpg

  console.log(cabin, id);
  const hasImgPath = cabin.image?.startsWith?.(supabaseUrl);

  console.log(hasImgPath);

  const imageName = `${Math.random() + "-" + cabin.image?.name}`?.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImgPath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/carbinImage/${imageName}`;

  let query = supabase.from("carbins");

  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);

  if (id) query = query.update({ ...cabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) throw new Error(`error occur while saving to carbin`);
  console.log(data);
  if (hasImgPath) return data;

  const { error: uploadError } = await supabase.storage
    .from("carbinImage")
    .upload(imageName, cabin.image);

  if (uploadError) {
    if (!id) await supabase.from("carbins").delete().eq("id", data[0].id);
    throw new Error(`carbin image failed to upload...`);
  }

  return data;
}

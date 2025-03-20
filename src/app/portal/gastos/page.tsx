import { getCategories } from "@/actions";
import { GastosFrom } from "./ui/GastosFrom";

export default async function Gastos() {

  const categories = await getCategories();

  return (
    <>
    <h1 className="text-2xl mb-6">Ingresar Gastos</h1>
    <GastosFrom categories={categories}/>  
    </>
  )
}

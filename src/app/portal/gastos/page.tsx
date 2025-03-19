import { getCategories } from "@/actions";
import { GastosFrom } from "./ui/GastosFrom";
import { getCost } from "@/actions/gastos/gastos";
import { GastosList } from "./ui/GastosList";




export default async function Gastos() {

  const categories = await getCategories();
  const cost = await getCost();

  return (
    <div className="grid md:grid-cols-2 gap-4">
    <GastosFrom categories={categories}/>  
    <GastosList costs={cost}/>
    </div>
  );
}

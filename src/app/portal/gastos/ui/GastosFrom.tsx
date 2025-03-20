
'use client';

import { getCost } from "@/actions/gastos/gastos";
import { postCost } from "@/actions/gastos/insert-gasto";
import moment from "moment";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
    nombre: string;
    valor: number;  
    comentario: string;
    categoria: string;
}

interface Category {
    id: string;
    name: string;
}


interface Props {
    categories: Category[];
}

interface Cost {
 
  id: string,
  createdDate: Date,
  name: string,
  value: number,
  annotation: string | null,
  nombreCategoria: string

}

export const GastosFrom = ({categories}: Props) => {


    const { register, handleSubmit } = useForm<FormInputs>();

    const [costs, setCosts] = useState<Cost[]>([]);
    
    const onSubmit: SubmitHandler<FormInputs> = async(data) => {
      await postCost({name: data.nombre, value: Number.parseFloat(data.valor.toString()), annotation: data.comentario, categoryId: data.categoria});
      getCostsDB();
    }

    async function getCostsDB() {
      const costDB = await getCost();
      setCosts(costDB);
    }

    useEffect(() => {

      getCostsDB();

    }, [])
    

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <form onSubmit={ handleSubmit( onSubmit ) }  className="flex flex-col">

          <label htmlFor="text">Categoria</label>
          <select 
              className="px-5 py-2 border bg-gray-200 rounded mb-5"
              {...register("categoria", { required: true })}>
            {categories.map(cat => 
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            )}

            
          </select>
  

          <label htmlFor="text">Concepto</label>
          <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            type="text"
            { ...register('nombre', { 
                required: {value: true, message: "El campo 'contraseña' es requerido."}} ) }
          />


          <label htmlFor="valor">Valor</label>
          <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            type="number"
            { ...register('valor', { 
                required: {value: true, message: "El campo 'contraseña' es requerido."}} ) }
          />

          <label htmlFor="comentario">Comentario</label>
          <textarea
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            { ...register('comentario', { 
                required: {value: true, message: "El campo 'contraseña' es requerido."}} ) }
          />
    
            <button className="btn-primary cursor-pointer bg-slate-950 text-white p-1 rounded-md hover:bg-slate-800">Registrar</button>
    </form>
    <div className="mt-10 md:mt-0 mb-10">
        <h2 className="text-bold text-slate-950 mb-2 font-bold text-xl">Gastos</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg ">
        <thead>
          <tr className="bg-slate-950 text-white rounded-lg">
            <th className="px-6 py-3 text-left">Fecha</th>
            <th className="px-6 py-3 text-left">Concepto</th>
            <th className="px-6 py-3 text-left">Valor</th>
            <th className="px-6 py-3 text-left">Categoría</th>
            <th className="hidden md:block px-6 py-3 text-left">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {costs.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-6 py-4">{moment(item.createdDate).format("DD MMMM")}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">${item.value}</td>
              <td className="px-6 py-4">{item.nombreCategoria}</td>
              <td className="hidden md:block px-6 py-4">{item.annotation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

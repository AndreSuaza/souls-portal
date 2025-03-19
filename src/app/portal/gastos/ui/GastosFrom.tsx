
'use client';

import { postCost } from "@/actions/gastos/insert-gasto";
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

export const GastosFrom = ({categories}: Props) => {


    const { register, handleSubmit } = useForm<FormInputs>();
    
    const onSubmit: SubmitHandler<FormInputs> = async(data) => {
     
    const result = await postCost({name: data.nombre, value: Number.parseFloat(data.valor.toString()), annotation: data.comentario, categoryId: data.categoria});
    
    console.log(result);
     
    }


  return (
    <div>
      <h2 className="text-bold text-slate-950 mb-2 font-bold text-xl mt-6">Ingresa el gasto</h2>
    <form onSubmit={ handleSubmit( onSubmit ) }  className="flex flex-col">

          <label htmlFor="text">Categoria</label>
          <select 
              className="px-5 py-2 border bg-gray-200 rounded mb-5"
              {...register("categoria", { required: true })}>
            {categories.map(cat => 
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            )}

            
          </select>
  

          <label htmlFor="text">Gasto</label>
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
    </div>
  )
}

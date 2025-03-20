
'use client';

import { getCost } from "@/actions/gastos/gastos";
import { postCost } from "@/actions/gastos/insert-gasto";
import clsx from "clsx";
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
    const [respState, setRespState] = useState(true);

    const onSubmit: SubmitHandler<FormInputs> = async(data) => {
      console.log('test')
      setRespState(false);
      await postCost({name: data.nombre, value: Number.parseFloat(data.valor.toLocaleString()), annotation: data.comentario, categoryId: data.categoria});
      getCostsDB();
      setRespState(true);
    }

    async function getCostsDB() {
      const costDB = await getCost();
      setCosts(costDB);
    }

    useEffect(() => {

      getCostsDB();

    }, [])
    

  return (
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Formulario */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg mb-8 h-fit">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Registrar Gasto
        </h2>
        <form onSubmit={ handleSubmit( onSubmit ) }  className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
            Concepto
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Ej: Compra de insumos"
              type="text"
              { ...register('nombre', { 
                  required: {value: true, message: "El campo 'nombre' es requerido."}} ) }
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Monto ($)
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Ej: 50000"
              type="number"
              { ...register('valor', { 
                  required: {value: true, message: "El campo 'Monto' es requerido."}} ) }
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Categoría
            </label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              {...register("categoria", { required: true })}>
              {categories.map(cat => 
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
              )}
            </select>
          </div>  
          <div>
            <label className="block text-gray-600 font-medium mb-1">Descripción</label>
            <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            { ...register('comentario', { 
                required: {value: true, message: "El campo 'contraseña' es requerido."}} ) }
          />
          </div>
          <button
            className={
              clsx({
                "w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300": respState,
                "w-full bg-gray-500 text-white py-2 rounded-lg font-semibold": !respState,
                }
              )
            }
            disabled={!respState}
          >
            Registrar
          </button>
        </form>
      </div>

      {/* Tabla de Gastos */}
      <div className="lg:col-span-2 w-full max-w-4xl bg-white shadow-md rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Historial de Gastos
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-500 text-white text-left">
                <th className="p-4">Fecha</th>
                <th className="p-4">Concepto</th>
                <th className="p-4">Monto</th>
                <th className="p-4">Categoría</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {costs.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100 transition duration-300">
                  <td className="p-4">{moment(item.createdDate).format("DD MMMM")}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">${item.value}</td>
                  <td className="p-4">{item.nombreCategoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

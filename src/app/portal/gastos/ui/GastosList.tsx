
interface Props {
    costs: {
    id: string,
    name: string,
    value: number,
    annotation: string | null,
    nombreCategoria: string
    }[]
}


export const GastosList = ({costs}:Props) => {
  console.log('GastosList', costs);
  return (
    <div className="mt-10">
        <h2 className="text-bold text-slate-950 mb-2 font-bold text-xl">Gastos</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg ">
        <thead>
          <tr className="bg-slate-950 text-white rounded-lg">
            <th className="px-6 py-3 text-left">Costo</th>
            <th className="px-6 py-3 text-left">Valor</th>
            <th className="px-6 py-3 text-left">Categoría</th>
            <th className="hidden md:block px-6 py-3 text-left">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {costs.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">${item.value}</td>
              <td className="px-6 py-4">{item.nombreCategoria}</td>
              <td className="hidden md:block px-6 py-4">{item.annotation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

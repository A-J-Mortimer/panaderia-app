import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const IngredienteForm = ({ ingrediente, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (ingrediente) {
      reset(ingrediente);
    }
  }, [ingrediente, reset]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {ingrediente ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            {...register('nombre', { required: 'El nombre es requerido' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            {...register('descripcion')}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Costo por Kg *
          </label>
          <input
            type="number"
            step="0.01"
            {...register('costoPorKg', { 
              required: 'El costo por kg es requerido',
              min: { value: 0, message: 'El costo debe ser mayor a 0' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
          />
          {errors.costoPorKg && (
            <p className="text-red-500 text-sm mt-1">{errors.costoPorKg.message}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-bakery-orange text-white px-6 py-2 rounded-lg hover:bg-bakery-brown transition-colors"
          >
            {ingrediente ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default IngredienteForm;

const ClienteCard = ({ cliente }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{cliente.nombre}</h3>
      <p className="text-gray-600 text-sm">{cliente.telefono}</p>
      <p className="text-gray-500 text-xs mt-2">
        {cliente.pedidos?.length || 0} pedidos
      </p>
    </div>
  );
};

export default ClienteCard;

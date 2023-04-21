import { formatearDinero } from '@/helpers';
import useQuiosco from '@/hooks/useQuiosco';
import ButtonDelete from '@/layout/ButtonDelete';
import ButtonEdit from '@/layout/ButtonEdit';
import Image from 'next/image';

const ResumenProducto = ({ producto }) => {
	const {
		handleEditarCantidades,
		handleEliminarProducto,
	} = useQuiosco();

	const pathImagen = `/assets/img/${producto.imagen}.jpg`;
	return (
		<div className='shadow p-5 mb-3 flex gap-10 items-center'>
			<div className='md:w-1/6'>
				<Image
					width={300}
					height={400}
					alt='Imagen producto'
					src={pathImagen}
				/>
			</div>
			<div className='md:w-4/6'>
				<p className='text-3xl font-bold'>
					{producto.nombre}
				</p>
				<p className='text-xl font-bold mt-2'>
					Cantidad: {producto.cantidad}
				</p>
				<p className='text-xl text-amber-500 font-bold mt-2'>
					Precio: {formatearDinero(producto.precio)}
				</p>

				<p className='text-sm text-gray-700 mt-2'>
					Subtotal:{' '}
					{formatearDinero(
						producto.precio * producto.cantidad,
					)}
				</p>
			</div>

			<div className='md:w-1/6'>
				<button
					className='bg-sky-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full '
					onClick={() =>
						handleEditarCantidades(producto.id)
					}>
					<ButtonEdit /> Editar
				</button>

				<button
					className='bg-red-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full mt-3'
					onClick={() =>
						handleEliminarProducto(producto.id)
					}>
					<ButtonDelete /> Eliminar
				</button>
			</div>
		</div>
	);
};

export default ResumenProducto;

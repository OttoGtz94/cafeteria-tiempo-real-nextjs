import { formatearDinero } from '@/helpers';
import useQuiosco from '@/hooks/useQuiosco';
import ButtonClose from '@/layout/ButtonClose';
import ButtonMinus from '@/layout/ButtonMinus';
import ButtonMore from '@/layout/ButtonMore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ModalProducto = () => {
	const {
		producto,
		pedido,
		handleChangeModal,
		handleAgregarPedido,
	} = useQuiosco();
	const [cantidad, setCantidad] = useState(1);
	const [edicion, setEdicion] = useState(false);

	const pathImage = `/assets/img/${producto.imagen}.jpg`;

	useEffect(() => {
		if (
			pedido.some(
				pedidoState => pedidoState.id === producto.id,
			)
		) {
			const productoEdicion = pedido.find(
				pedidoState => pedidoState.id === producto.id,
			);
			setEdicion(true);
			setCantidad(productoEdicion?.cantidad);
		}
	}, [producto, pedido]);

	return (
		<div className='md:flex gap-10'>
			<div className='md:w-1/3'>
				<Image
					width={300}
					height={400}
					alt={producto.nombre}
					src={pathImage}
				/>
			</div>

			<div className='md:w-2/3'>
				<div className='flex justify-end'>
					<button
						onClick={() => {
							handleChangeModal();
						}}>
						<ButtonClose />
					</button>
				</div>
				<h1 className='text-3xl font-bold-mt-5'>
					{producto.nombre}
				</h1>
				<p className='mt-5 font-black text-5xl text-amber-500'>
					{formatearDinero(producto.precio)}
				</p>

				<div className='flex gap-4 mt-5'>
					<button
						type='button'
						onClick={() => {
							if (cantidad <= 1) return;
							setCantidad(cantidad - 1);
						}}>
						<ButtonMinus />
					</button>
					<p className='text-3xl'>{cantidad}</p>
					<button
						type='button'
						onClick={() => {
							if (cantidad >= 9) return;
							setCantidad(cantidad + 1);
						}}>
						<ButtonMore />
					</button>
				</div>

				<button
					type='button'
					className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded'
					onClick={() =>
						handleAgregarPedido({
							...producto,
							cantidad,
						})
					}>
					{edicion
						? 'Guardar Cambios'
						: 'Añadir al pedido'}
				</button>
			</div>
		</div>
	);
};

export default ModalProducto;

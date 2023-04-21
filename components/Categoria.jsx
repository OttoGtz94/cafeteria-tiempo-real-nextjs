import Image from 'next/image';
import useQuiosco from '../hooks/useQuiosco';

const Categoria = ({ categoria }) => {
	const { nombre, icono, id } = categoria;
	const { categoriaActual, handleClickCategoria } =
		useQuiosco();

	const pathIcono = `/assets/img/icono_${icono}.svg`;
	return (
		<div
			className={`${
				categoriaActual?.id === id ? 'bg-amber-400' : ''
			} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
			<Image
				alt='icono'
				width={80}
				height={80}
				src={pathIcono}
				className='mr-5'
			/>

			<button
				type='button'
				className='text-2xl font-bold hover:cursor-pointer'
				onClick={() => handleClickCategoria(id)}>
				{nombre}
			</button>
		</div>
	);
};

export default Categoria;

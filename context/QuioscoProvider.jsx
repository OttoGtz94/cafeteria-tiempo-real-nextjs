import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
	const router = useRouter();

	const [categorias, setCategorias] = useState([]);
	const [categoriaActual, setCategoriaActual] = useState(
		{},
	);
	const [producto, setProducto] = useState({});
	const [modal, setModal] = useState(false);
	const [pedido, setPedido] = useState([]);
	//const [paso, setPaso] = useState(1);
	const [nombre, setNombre] = useState('');
	const [total, setTotal] = useState(0);

	const getCategorias = async () => {
		const { data } = await axios('/api/categorias');
		setCategorias(data);
	};

	useEffect(() => {
		getCategorias();
	}, []);

	useEffect(() => {
		setCategoriaActual(categorias[0]);
	}, [categorias]);

	useEffect(() => {
		const nuevoTotal = pedido.reduce(
			(total, producto) =>
				producto.precio * producto.cantidad + total,
			0,
		);
		setTotal(nuevoTotal);
	}, [pedido]);

	const handleClickCategoria = id => {
		const categoria = categorias.filter(
			cat => cat.id === id,
		);
		setCategoriaActual(categoria[0]);
		router.push('/');
	};

	const handleSetProducto = producto => {
		setProducto(producto);
	};

	const handleChangeModal = () => {
		setModal(!modal);
	};

	const handleAgregarPedido = ({
		categoriaId,

		...producto
	}) => {
		if (
			pedido.some(product => product.id === producto.id)
		) {
			const pedidoActualizado = pedido.map(product =>
				product.id === producto.id ? producto : product,
			);
			setPedido(pedidoActualizado);
			toast.success('Pedido Actualizado', {
				autoClose: 1000,
			});
		} else {
			setPedido([...pedido, producto]);
			toast.success('Agregado al pedido', {
				autoClose: 1000,
			});
		}

		setTimeout(() => {
			setModal(false);
		}, 250);
	};

	/* const handleChangePaso = paso => {
		setPaso(paso);
	}; */

	const handleEditarCantidades = id => {
		const productoActualizar = pedido.filter(
			producto => producto.id === id,
		);
		setProducto(productoActualizar[0]);
		setModal(!modal);
	};

	const handleEliminarProducto = id => {
		const pedidoActualizado = pedido.filter(
			producto => producto.id !== id,
		);
		setPedido(pedidoActualizado);
	};

	const colocarOrden = async e => {
		e.preventDefault();

		try {
			await axios.post('/api/ordenes', {
				pedido,
				nombre,
				total,
				fecha: Date.now().toString(),
			});

			toast.success(
				`${nombre} tu pedido fue realizado correctamente.`,
			);
			setCategoriaActual(categorias[0]);
			setPedido([]);
			setNombre('');
			setTotal(0);

			setTimeout(() => {
				router.push('/');
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<QuioscoContext.Provider
			value={{
				categorias,
				categoriaActual,
				producto,
				modal,
				pedido,
				//paso,
				nombre,
				total,
				setNombre,
				handleClickCategoria,
				handleSetProducto,
				handleChangeModal,
				handleAgregarPedido,
				//handleChangePaso,
				handleEditarCantidades,
				handleEliminarProducto,
				colocarOrden,
			}}>
			{children}
		</QuioscoContext.Provider>
	);
};

export { QuioscoProvider };

export default QuioscoContext;

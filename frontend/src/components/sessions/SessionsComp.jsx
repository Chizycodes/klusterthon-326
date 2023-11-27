'use client';
import React, { useState } from 'react';
import { useUser } from '@/context/context-provider';
import Link from 'next/link';
import moment from 'moment';
import { toast } from 'react-toastify';
import MoreIcon from '@/assets/icons/more.svg';
import Image from 'next/image';
import { getSessions } from '@/utils/api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '@/utils/axiosInterceptor';

const schema = yup.object().shape({
	title: yup.string().required('Title is required').min(3),
});

const SessionsComp = () => {
	const { state, setChatSessions } = useUser();
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState('');

	const {
		register,
		handleSubmit,
		resetField,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleDelete = async (id) => {
		try {
			setLoading(true);
			await Axios.delete(`/session/${id}`);
			toast.success('Session deleted');
			await getSessions(state.token, setChatSessions);
			reset({ title: '' });
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
		}
	};

	const handleRename = async (data) => {
		try {
			setLoading(true);
			await Axios.patch(`/session/${id}`, { title: data?.title });
			await getSessions(state.token, setChatSessions);
			toast.success('Session updated');
			setId('');
			setTitle('');
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
		}
	};
	return (
		<div className="flex flex-col gap-5 mt-5">
			{state?.chatSessions?.map((item, i) => (
				<div key={item?._id} className={`card shadow border dark:bg-gray-300 dark:text-primary-content`}>
					<Link href={`/${item?._id}`}>
						<div className="card-body">
							<h2 className="card-title text-gray-700 dark:text-white">{item?.title}</h2>
							<p className="text-gray-500 dark:text-white">
								{item?.createdAt && moment(item?.createdAt).format('MMMM D, YYYY')}
							</p>
						</div>
					</Link>
					<div className="dropdown dropdown-end absolute top-0 right-0">
						<div tabIndex={0} role="button" className="btn px-4 py-2 bg-transparent border-none">
							<Image src={MoreIcon} width={30} height={30} alt="more" />
						</div>

						<ul className="dropdown-content z-[1] menu p-2 border border-gray-300 shadow-md bg-gray-100 rounded-box w-52 dark:text-white text-gray-600 text-md">
							<li className="hover:bg-primary hover:text-white rounded-lg">
								<button
									disabled={loading}
									onClick={() => {
										setId(item?._id);
										document.getElementById('renameModal').showModal();
									}}
								>
									Rename
								</button>
							</li>
							<li className="hover:bg-primary hover:text-white rounded-lg">
								<button disabled={loading} onClick={() => handleDelete(item?._id)}>
									Delete
								</button>
							</li>
						</ul>
					</div>
				</div>
			))}
			<dialog id="renameModal" className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white">✕</button>
					</form>

					<h3 className="font-bold text-lg mb-5 dark:text-white text-gray-700">Rename Session</h3>
					<form onSubmit={handleSubmit(handleRename)}>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Enter title"
							className={`input-main ${errors.email ? 'border-red-500' : ''}`}
							{...register('title')}
						/>
						{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
						<button type="submit" disabled={loading} className="button-main mt-10">
							Save {loading && <span className="loading loading-spinner loading-md"></span>}
						</button>
					</form>
				</div>
			</dialog>
		</div>
	);
};

export default SessionsComp;

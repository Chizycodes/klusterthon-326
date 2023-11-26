'use client';
import React, { useState } from 'react';
import { useUser } from '@/context/context-provider';
import Link from 'next/link';
import moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';
import MoreIcon from '@/assets/icons/more.svg';
import Image from 'next/image';
import { getSessions } from '@/utils/api';

const SessionsComp = () => {
	const { state, setChatSessions } = useUser();
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');

	const handleDelete = async (id) => {
		try {
			setLoading(true);
			await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/session/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${state?.token}`,
				},
			});
			toast.success('Session deleted');
			await getSessions(state.token, setChatSessions);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
		}
	};

	const handleRename = async (id) => {
		try {
			setLoading(true);
			await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/session/${id}`,
				{ title },
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${state?.token}`,
					},
				}
			);
			await getSessions(state.token, setChatSessions);
			toast.success('Session deleted');
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
		}
	};
	return (
		<div className="flex flex-col gap-5 mt-5">
			{state?.chatSessions?.map((item, i) => (
				<div key={item?._id} className={`card text-primary-content bg-[#E9D7FA]`}>
					<Link href={`/${item?._id}`}>
						<div className="card-body">
							<h2 className="card-title">{item?.title}</h2>
							<p>{item?.createdAt && moment(item?.createdAt).format('MMMM D, YYYY')}</p>
						</div>
					</Link>
					<div className="dropdown dropdown-end absolute top-0 right-0">
						<div tabIndex={0} role="button" className="btn px-4 py-2 bg-transparent text-white border-none">
							<Image src={MoreIcon} width={30} height={30} alt="more" />
						</div>

						<ul className="dropdown-content z-[1] menu p-2 shadow bg-gray-600 rounded-box w-52 text-white text-lg">
							<li>
								<button disabled={loading} onClick={() => handleRename(item?._id)}>
									Rename
								</button>
							</li>
							<li>
								<button disabled={loading} onClick={() => handleDelete(item?._id)}>
									Delete
								</button>
							</li>
						</ul>
					</div>
				</div>
			))}
		</div>
	);
};

export default SessionsComp;

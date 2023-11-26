'use client';
import React from 'react';

const recommend = [
	{
		title: 'Having a headache?',
		recommend: 'Take some pills, you’re just stressed',
		color: '#B5E6D8',
	},
	{
		title: 'Or your chest hurts?',
		recommend: 'You need some excersise',
		color: '#F5D460',
	},
	{
		title: 'Is it abdominal pain?',
		recommend: 'Drink lots of water, it should be constipation',
		color: '#E9D7FA',
	},
	{
		title: 'A rash breakout?',
		recommend: 'Could be eczema, visit a dermatologist',
		color: '#BEEBFA',
	},
];

const StartSession = () => {
	return (
		<div className="w-full">
			<div className="text-center mt-5 mb-10">
				<h1 className="text-2xl font-bold mb-5">How are you feeling today?</h1>
				<p>Start a new session to chat with DiagnoSync AI</p>
			</div>
			<div className="w-full flex flex-col justify-center items-center mt-10">
				<div>
					<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
						{recommend.map((item, i) => (
							<div key={i} style={{ backgroundColor: item?.color }} className={`card text-primary-content`}>
								<div className="card-body">
									<h2 className="card-title">{item?.title}</h2>
									<p>{item?.recommend}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* <button className="button-main">Start a Session</button> */}
			</div>
		</div>
	);
};

export default StartSession;

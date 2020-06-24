import React from 'react';

const Rank = ({ user }) => {
	return (
		<div className ='mt4'>
			<div className='white f3'>
				{`${user.name}, you have processed`}
			</div>
			<div className='white f1'>
				{user.entries}
			</div>
			<div className='white f3 ma' style={{marginTop: '-0.3em'}}>
				{`images`}
			</div>
		</div>		
	);
}

export default Rank;
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
	render () {
		const { tweetsId } = this.props
		return (
			<div>
				<h3 className='center'>Your Timeline</h3>
				<ul className='list'>
					{tweetsId.map((id) => {
						return(
							<li key={id}>
							<div>Tweet id: {id}</div>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

function mapStateToProps ({ tweets }) {
	return {
		tweetsId: Object.keys(tweets)
			.sort( (a, b) => tweets[a].timestamp - tweets[b].timestamp)
	}
}

export default connect(mapStateToProps)(Dashboard)

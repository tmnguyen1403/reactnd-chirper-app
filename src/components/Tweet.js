import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'
class Tweet extends Component {
	render(){
		const { tweet } = this.props
		if (tweet === null) {
			return <p>This Tweet doesn't exist</p>
		}
		return (
			<div className="tweet">
			</div>
		)
	}
}

//id is extracted from this.props
function mapStateToProps({authedUser, users, tweets}, {id}) {
		const tweet = tweets[id]
		const parentTweet = tweet ? tweets[tweet.replyingTo] : null
		return {
			authedUser,
			tweet: tweet
				? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
				: null
		}
}
export default connect(mapStateToProps)(Tweet)

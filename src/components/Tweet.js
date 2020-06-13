import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleToggleTweet } from '../actions/tweets'
import {
	TiArrowBackOutline,
	TiHeartOutline,
	TiHeartFullOutline
} from 'react-icons/ti'

class Tweet extends Component {
	handleLike = (e) => {

		e.preventDefault()
		//todo: handle like Tweet
		const { dispatch, authedUser, tweet } = this.props
		const info = {
			id: tweet.id,
			hasLiked: tweet.hasLiked,
			authedUser,
		}
		console.log("handle like", info)
		handleToggleTweet(info)(dispatch)
	}
	toParent = (e, id) => {
		e.preventDefault()
		//todo: Redireact to parent tweet
	}
	render(){
		const { tweet } = this.props
		if (tweet === null) {
			return <p>This Tweet doesn't exist</p>
		}

		const {
			name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
		} = tweet

		return (
			<div className="tweet">
				<img
					src={avatar}
					alt={`Avatar of ${name}`}
					className='avatar'
				/>
				<div className='tweet-info'>
					<div>
						<span>{name}</span>
						<div>{formatDate(timestamp)}</div>
						{ parent && (
							<button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
								Replying to @{parent.author}
							</button>
						)
						}
						<p>{text}</p>
					</div>
					<div className="tweet-icons">
						<TiArrowBackOutline className="tweet-icons" />
						<span>{replies !== 0 && replies}</span>
						<button className='heart-button' onClick={(e) => this.handleLike(e)}>
							{hasLiked === true
								? <TiHeartFullOutline color='#e0245e' className='tweet-icon'/>
								: <TiHeartOutline className='tweet-icon'/>
							}
						</button>
						<span>{likes !== 0 && likes}</span>
					</div>
					</div>{/*tweet-info*/}
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

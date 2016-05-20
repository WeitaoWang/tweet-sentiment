# tweet-sentiment

Analyse sentiment of tweets about president election with real-time mapshowing

[Project Demo](http://tweet-sentiment-nyu.herokuapp.com/)

[Video Demo](https://vimeo.com/167437613)

## Dependencies

```js
"dependencies": {
    "express": "^4.13.4",
    "mongoose": "^4.4.11",
    "sentiment": "^1.0.6",
    "socket.io": "^1.4.5",
    "twit": "^2.2.3"
  }
```

[twit](https://github.com/ttezel/twit.git): Twitter API Client for node;                     
[express](https://github.com/strongloop/expressjs.com.git): node.js web application framework;             
[mongoose](https://github.com/Automattic/mongoose.git): MongoDB object modeling tool;                 
[sentime](https://github.com/thisandagain/sentiment.git): AFINN-based sentiment analysis for Node.js;  
[socket.io](https://github.com/socketio/socket.io.git): real-time engine;            

## Files

### dbConnection.js
connect mongodb, which will change if the project is deploied on Heroku

### tweet.js
mongoose model for tweet

```js
{
  id_str: String,
	candidates: String,
	created_at: String,
	text: String,
	is_quote_status: Boolean,
	quoted_text: String,
	lang: String,
	state: String,
	coordinates: String,
	sentiment: {
		score: Number,
		comparative: Number,
		tokens: [String],
		words: [String],
		positive: [String],
		negative: [String]
	}
}
```

### tweetSentiment.js
control the route

### stream.js
get the real-time tweets

### HistoricalTweet.js
get historicalTweet from mongodb

### sentimentAnalysis.js
analyse text of tweet

var mongoose = require('mongoose'),
	Tweet = require('./tweet'),
	SentimentResult = require('./sentimentResult'),
	db = require('./dbConnection');

var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
 "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", 
 "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
 "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
 "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", 
 "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
 "West Virginia", "Wisconsin", "Wyoming"];
var candidates = ["Donald Trump", "Hillary Clinton", "Ted Cruz", "Bernie Sanders"];
for(var i = 0; i < states.length; i ++) {
	for(var j = 0; j < candidates.length; j ++) {
		getTweetsOfStateOfCandidate(states[i], candidates[j], function(data) {
			if(data) {
				handleSentimentScore(data);
			}
		});
	}
}

function getTweetsOfStateOfCandidate(stateName, candidateName, callback) {
	Tweet.find({state : stateName, candidates : candidateName}).
		exec(function(err, tweets) {
			//console.log(stateName + ": " + candidateName);
			if (err) {
					return handleError(err);
			}else if(tweets.length == 0){
				callback(null);
				//console.log("No Tweets");
			}else {
				callback(tweets);
			}
		});	

}

function handleSentimentScore(tweets) {
	var positiveAvgScore = 0,
		negativeAvgScore = 0,
		amount,
		positiveAmount = 0,
		negativeAmount = 0;
	amount = tweets.length;
	for(var tweetNum = 0; tweetNum < tweets.length; tweetNum ++) {
		if(tweets[tweetNum].sentiment.score > 0) {
			positiveAvgScore += tweets[tweetNum].sentiment.score;
			positiveAmount ++;
		}else if(tweets[tweetNum].sentiment.score < 0) {
			negativeAvgScore += tweets[tweetNum].sentiment.score;
			negativeAmount ++;
		}
	} 

	if(negativeAmount == 0) {
		negativeAvgScore = 0;
	}else {
		negativeAvgScore /= negativeAmount;
	}
	if(positiveAmount == 0) {
		positiveAvgScore = 0;
	}else {
		positiveAvgScore /= positiveAmount;
	}
	if(positiveAmount + negativeAmount != amount) {
		console.log(tweets[0].state+ tweets[0].candidates);
		console.log("The computation is wrong");
	}else {
		SentimentResult.findOne({state : tweets[0].state, candidates : tweets[0].candidates},
			function(err, result) {
				if (err) {
					return handleError(err);
				}else if(result == null) {
					var sentimentResult = new SentimentResult({
							state: tweets[0].state,
							candidates: tweets[0].candidates,
							positiveAvgScore: positiveAvgScore,
							negativeAvgScore: negativeAvgScore,
							amount: amount,
							positivePercent: positiveAmount / amount, 
							negativePercent: negativeAmount / amount
					});
					
					sentimentResult.save(function(err, sentimentResult) {
						if (err) return handleError(err);
					});
					//console.log(sentimentResult);
				}else {
					result.positiveAvgScore = positiveAvgScore;
					result.negativeAvgScore = negativeAvgScore;
					result.amount = amount;
					result.positivePercent = positiveAmount / amount;
					result.negativePercent = negativeAmount / amount;
					result.save(function(err) {
						if (err) return handleError(err);
					});
				}
			});

	}
}


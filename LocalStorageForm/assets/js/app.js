//variables
const tweetList = document.querySelector('#tweet-list');

//event listeners
eventListeners();

function eventListeners() {
    //form submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    //remove the tweet from the list
    tweetList.addEventListener('click', removeTweet)

    document.addEventListener('DOMContentLoaded', localStorageOnLoad)
}

//functions

function newTweet(e) {
    e.preventDefault();

    //read the textarea value
    const tweet = document.querySelector('#tweet').value;

    //create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    //create an <li> element
    const li = document.createElement('li');
    li.textContent = tweet;

    // add the remove button to each tweet
    li.appendChild(removeBtn);

    tweetList.appendChild(li);

    addTweetLocalStorage(tweet)

    this.reset();
}

//removes the tweets from the DOM
function removeTweet(e) {
    e.preventDefault()

    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove()
    }

    //remove from storage
    removeTweetLocalStorage(e.target.parentElement.textContent)
}

// adds the tweets into the local storage

function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    //add the tweet into the array
    tweets.push(tweet)

    //convert tweet array into string
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLs = localStorage.getItem('tweets')
    //Get the values, if null is returned then we create an empty array
    if (tweetsLs === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLs);
    }
    return tweets;
}

//prints local storage tweets on load
function localStorageOnLoad() {

    let tweets = getTweetsFromStorage();

    //loop throught storage and then print the values
    tweets.forEach(tweet => {
        //create the remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //create an <li> element
        const li = document.createElement('li');
        li.textContent = tweet;

        // add the remove button to each tweet
        li.appendChild(removeBtn);
        tweetList.appendChild(li);

    });
}

//removes the tweet fom local storage
function removeTweetLocalStorage(tweet){
    //get tweets from storage
    let tweets = getTweetsFromStorage();

    //remove the X from the tweet
    const tweetDelete = tweet.substring(0, tweet.length -1);

    tweets.forEach(function(tweetLs,index) {
        if(tweetDelete === tweetLs){
            tweets.splice(index,1)
        }
    });

    //save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
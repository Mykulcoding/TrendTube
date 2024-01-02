// js code for the search function

function performSearch(query) {
    // clear previous results
    clearResults();
    // fetch news articles
    fetchNews(query);
    // fetch YouTube videos
    fetchYTubeVids(query);
  }
  
  // fetch and display news articles
  function fetchNews(query) {
    const newsApiKey = '8bbbb4dff0cf402f943785ac4e909f52';
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`;
  
    fetch(newsApiUrl)
      .then(response => response.json())
      .then(data => {
        // Display news articles on the left
        displayNews(data.articles);
      })
      .catch(error => {
        console.error('Error fetching news articles:', error);
      });
  }
  
  // display news articles on the left side
  function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
  
    articles.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article');
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = article.title;
  
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = article.description;
  
      articleDiv.appendChild(titleElement);
      articleDiv.appendChild(descriptionElement);
  
      newsContainer.appendChild(articleDiv);
    });
  }
  
  // fetch and display YouTube videos
function fetchYouTubeVideos(query) {
    const youtubeApiKey = 'AIzaSyC_tKRza1ww4mQ7638dISKGj6MpGPz2LkA';
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=5&key=${youtubeApiKey}`;
  
    fetch(youtubeApiUrl)
      .then(response => response.json())
      .then(data => {
        // Display YouTube videos on the right side
        displayYouTubeVideos(data.items);
      })
      .catch(error => {
        console.error('Error fetching YouTube videos:', error);
      });
  }
  
  
  // display YouTube videos on the right side
  function displayYouTubeVideos(videos) {
    const videoContainer = document.getElementById('video-container');
  
    videos.forEach(video => {
      const videoDiv = document.createElement('div');
      videoDiv.classList.add('video');
  
      const iframeElement = document.createElement('iframe');
      iframeElement.src = `https://www.youtube.com/embed/${video.id.videoId}`;
      iframeElement.title = video.snippet.title;
  
      videoDiv.appendChild(iframeElement);
      videoContainer.appendChild(videoDiv);
    });
  }
  
  // clear previous results
  function clearResults() {
    const newsContainer = document.getElementById('news-container');
    const videoContainer = document.getElementById('video-container');
  
    // this is to clear the news articles
    while (newsContainer.firstChild) {
      newsContainer.removeChild(newsContainer.firstChild);
    }
  
    // this clears the YouTube videos
    while (videoContainer.firstChild) {
      videoContainer.removeChild(videoContainer.firstChild);
    }
  }
  
  // Event listener for the search form
  document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // prevents the form from submitting + refreshing the page
  
    const searchTerm = document.getElementById('search-input').value;
    performSearch(searchTerm);
  });
  

$(document).ready(function () {
    // Load and display search history on page load
    loadSearchHistory();
  
    $('#searchForm').submit(function (event) {
      event.preventDefault();
      const searchTerm = $('input[type="search"]').val().trim();
      if (searchTerm !== '') {
        console.log('Searching for:', searchTerm);
       fetchNews(searchTerm);
        fetchYouTubeVideo(searchTerm);
        saveSearchToLocalStorage(searchTerm); // Save search term to local storage
        loadSearchHistory(); // Reload and display updated search history
      } else {
        alert('Please enter a search term!');
      }
    });
  
  
   // Function to save recent searches in local storage
   function saveSearchToLocalStorage(searchTerm) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.unshift(searchTerm);
    searches = searches.slice(0, 5); // Limit to 5 recent searches
    localStorage.setItem('searches', JSON.stringify(searches));
  }
  
  // Function to load and display recent searches from local storage
  function loadSearchHistory() {
    const searchHistory = $('#searchHistory');
    searchHistory.empty();
    
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(function(search) {
      searchHistory.append(`<li><a class="dropdown-item" href="#">${search}</a></li>`);
    });
  }
  
    function fetchNews(searchTerm) {
      const newsApiKey = '8bbbb4dff0cf402f943785ac4e909f52';
      const newsApiUrl = `https://newsapi.org/v2/everything?language=en&pageSize=6&q=${searchTerm}&apiKey=${newsApiKey}`;
    
      $.ajax({
        url: newsApiUrl,
        method: 'GET',
        success: function (response) {
          console.log('News API response:', response);
          displayNews(response.articles); // Call the displayNews function with the actual data
        },
        error: function (xhr, status, error) {
          console.error('Error fetching news:', error);
        }
      });
      console.log('Fetching news articles for:', searchTerm);
    }
    
  
  
    function displayNews(articles) {
      const card1 = $('#card1');
      const card2 = $('#card2');
      card1.empty();
      card2.empty();
    
      console.log('Received articles:', articles); // Log received articles
    
      articles.forEach(function (article, index) {
        const articleElement = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
              <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
            </div>
          </div>
        `;
    
        console.log('Creating article element:', articleElement); // Log generated article HTML
    
        if (index % 2 === 0) {
          card1.append(articleElement);
        } else {
          card2.append(articleElement);
        }
      });
    
      console.log('Displaying news articles:', articles); // Log displayed articles
    }
    
  
  
    function fetchYouTubeVideo(searchTerm) {
      const youtubeApiKey = 'AIzaSyC_tKRza1ww4mQ7638dISKGj6MpGPz2LkA';
      const maxResults = 2;
  
      $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${youtubeApiKey}&part=snippet&type=video&maxResults=${maxResults}`,
        method: 'GET',
        success: function (response) {
          console.log('YouTube API response:', response);
          if (response.items.length > 0) {
            const videoId1 = response.items[0].id.videoId;
            const videoUrl1 = `https://www.youtube.com/embed/${videoId1}`;
            const videoElement1 = `<iframe width="560" height="315" src="${videoUrl1}" frameborder="0" allowfullscreen></iframe>`;
            $('#card3VideoPlaceholder').html(videoElement1);
            console.log('Video URL 1:', videoUrl1);
  
            if (response.items.length > 1) {
              const videoId2 = response.items[1].id.videoId;
              const videoUrl2 = `https://www.youtube.com/embed/${videoId2}`;
              const videoElement2 = `<iframe width="560" height="315" src="${videoUrl2}" frameborder="0" allowfullscreen></iframe>`;
              $('#card4VideoPlaceholder').html(videoElement2);
              console.log('Video URL 2:', videoUrl2);
            } else {
              $('#card4VideoPlaceholder').html('No second video found');
              console.log('No second video found for:', searchTerm);
            }
          } else {
            $('#card3VideoPlaceholder').html('No videos found');
            console.log('No videos found for:', searchTerm);
          }
        },
        error: function (xhr, status, error) {
          console.error('Error fetching YouTube videos:', error);
          $('#card3VideoPlaceholder').html('Error fetching videos');
          console.log('Error fetching videos for:', searchTerm);
        }
      });
      console.log('Fetching YouTube videos for:', searchTerm);
    }
  });
  
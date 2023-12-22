const newsApiKey = '8bbbb4dff0cf402f943785ac4e909f52';
const youtubeApiKey = 'AIzaSyC_tKRza1ww4mQ7638dISKGj6MpGPz2LkA';
let newsPage = 1;
let youtubePage = 1;

$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        const searchTerm = $('input[type="search"]').val().trim();
        if (searchTerm !== '') {
            fetchNews(searchTerm);
            fetchYouTubeVideos(searchTerm);
            updateSearchHistory(searchTerm);
        } else {
            alert('Please enter a search term!');
        }
    });

    $('#loadMoreNewsBtn').click(function() {
        const searchTerm = $('input[type="search"]').val().trim();
        fetchNews(searchTerm);
    });

    $('#loadMoreYouTubeBtn').click(function() {
        const searchTerm = $('input[type="search"]').val().trim();
        fetchYouTubeVideos(searchTerm);
    });

    function fetchNews(searchTerm) {
        $.ajax({
            url: `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${newsApiKey}&pageSize=2&page=${newsPage}`,
            method: 'GET',
            success: function(newsData) {
                displayNews(newsData.articles);
            },
            error: function() {
                console.error('Error fetching news');
            }
        });
    }

    function displayNews(articles) {
        const newsSection = $('#newsSection');
        if (newsPage === 1) {
            newsSection.empty();
        }
        articles.forEach(function(article) {
            const articleElement = `
                <div>
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `;
            newsSection.append(articleElement);
        });
        newsPage++;
    }

    function fetchYouTubeVideos(searchTerm) {
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${youtubeApiKey}&part=snippet&type=video&maxResults=2&pageToken=${youtubePage}`,
            method: 'GET',
            success: function(videoData) {
                displayYouTubeVideos(videoData.items);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching YouTube videos:', error);
            }
        });
    }

    function displayYouTubeVideos(videos) {
        const youtubeSection = $('#youtubeSection');
        if (youtubePage === 1) {
            youtubeSection.empty();
        }
        videos.forEach(function(video) {
            const videoElement = `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
            `;
            youtubeSection.append(videoElement);
        });
        youtubePage++;
    }

    function updateSearchHistory(term) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.unshift(term);
        if (searchHistory.length > 5) {
            searchHistory = searchHistory.slice(0, 5);
        }
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        updateSearchHistoryDisplay(searchHistory);
    }

    function updateSearchHistoryDisplay(searchHistory) {
        const dropdownMenu = $('.dropdown-menu');
        dropdownMenu.empty();
        searchHistory.forEach(function(historyItem) {
            dropdownMenu.append(`<li><a class="dropdown-item" href="#">${historyItem}</a></li>`);
        });
    }
});

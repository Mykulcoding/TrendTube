function theNews() {
    // fetch top news headlines from the News API to display on mainpage
    fetch('https://newsapi.org/v2/top-headlines?country=gb&apiKey=8bbbb4dff0cf402f943785ac4e909f52')
        .then(response => response.json()) // this converts the response into a easier to read JS object

                // this is to access the articles array in the response data
                const articles = data.articles;
        
                // this will refference the HTML elements where you want to display the headlines
                const newsContainer = document.getElementById('news-container');
        
                // this lops through each article and create HTML elements to display them
                for (let i = 0; i < articles.length; i++) {
                    // this part here will Create a div element for each article
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');
        
                    // Create HTML elements for article details (title, image, description)
                    const titleElement = document.createElement('h2');
                    titleElement.textContent = articles[i].title;
        
                    const imageElement = document.createElement('img');
                    imageElement.src = articles[i].urlToImage;
                    imageElement.alt = articles[i].title;
        
                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = articles[i].description;
        
                    // appends the created elements to the article div
                    articleDiv.appendChild(titleElement);
                    articleDiv.appendChild(imageElement);
                    articleDiv.appendChild(descriptionElement);
        
                    // append the article div to the news contianer
                    newsContainer.appendChild(articleDiv);
                }
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
        }
        
        // Call the function to fetch and display news when the page loads
        document.addEventListener('DOMContentLoaded', theNews);

        /// YOUTUBE API ////


// Function to fetch and display top news videos from YouTube API for the United Kingdom
function youtubeTopNews() {
    const apiKey = 'AIzaSyC_tKRza1ww4mQ7638dISKGj6MpGPz2LkA';
    const apiUrl = 'https://www.googleapis.com/youtube/v3/search';

    // the parameters for the API request
    const params = {
        part: 'snippet',
        chart: 'mostPopular',
        regionCode: 'GB',
        videoCategoryId: '25', // the video category ID for News & Politics. ref of the catagory numbers : https://stackoverflow.com/a/35877512
        maxResults: 5, // this retrieves a max of 5 vids
        key: apiKey,
      };

    // the URL with query parameters
    const url = `${apiUrl}?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`;

    // this is to fetch data from YouTube API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // accesses the items array in the response data
            const videos = data.items;

            // Looping through each video to log the title and description to the console
            videos.forEach(video => {
                console.log('Video Title:', video.snippet.title);
                console.log('Video Description:', video.snippet.description);
                console.log('-------------------------');

                // Creates a div element for each video
                const videoDiv = document.createElement('div');
                videoDiv.classList.add('video');

                // this is to create an iframe element for embedding the video
                const iframeElement = document.createElement('iframe');
                iframeElement.src = `https://www.youtube.com/embed/${video.id.videoId}`;
                iframeElement.title = video.snippet.title;

                // appends the iframe element to the video div (I might have to chnage this an the videoDiv later)
                videoDiv.appendChild(iframeElement);

                // this appends the video div to the video container in the HTML
                document.getElementById('video-container').appendChild(videoDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching and displaying YouTube videos:', error);
        });
}

// Calls the function to fetch and display YouTube top news videos when the page loads
document.addEventListener('DOMContentLoaded', youtubeTopNews);


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
        

        
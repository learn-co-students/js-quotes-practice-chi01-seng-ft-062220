// http://localhost:3000/quotes
// http://localhost:3000/likes

const quotesUrl = 'http://localhost:3000/quotes?_embed=likes'

function main(){
    fetchQuotes()
    addSubmitListener()
}

function addSubmitListener(){
    const quoteForm = document.getElementById('new-quote-form')
    quoteForm.addEventListener('submit', function(event){
        event.preventDefault()
        // console.log(event.target)
        const newQuote = {
            quote: event.target[0].value,
            author: event.target[1].value
        }
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newQuote)
        }

        fetch('http://localhost:3000/quotes', reqObj)
        .then(resp => resp.json())
        .then(quote => {
            const list = document.getElementById('quote-list')
        list.innerHTML += `<li data-id=${quote.id} class='quote-card'>
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button data-id=${quote.id} class='btn-success'>Likes: <span data-id=${quote.id}>XXXXX</span></button>
          <button data-id=${quote.id} class='btn-danger'>Delete</button>
        </blockquote>
      </li>`
        })

        //scrape data
        //package it into an object
        //  create reqObj
        //  make post request
        // once it comes back, render new data on front page
    })


    // grab the form
    // bind an event listener for submit click
    // make a post request
    // render the new quote on the front page 
}

function fetchQuotes(){
    fetch(quotesUrl)
        .then(response => response.json())
        .then(quotes => {
            renderQuotes(quotes)
        })
    

    //get quote information
    // when it comes back
    //  run quotes through json
    //      each quote, we want to render on the page
}

function renderQuotes(quotes){
    quotes.forEach(function(quote){
        const list = document.getElementById('quote-list')
        list.innerHTML += `<li data-id=${quote.id} class='quote-card'>
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button data-id=${quote.id} class='btn-success'>Likes: <span data-id=${quote.id}>${quote.likes.length}</span></button>
          <button data-id=${quote.id} class='btn-danger'>Delete</button>
        </blockquote>
      </li>`
      
    })
}

main()
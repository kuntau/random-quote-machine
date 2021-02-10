import './App.css';
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [ quoteList, setQuoteList ] = useState([])
  const [ quote, setQuote ] = useState(quotesList[0].quote)
  const [ author, setAuthor ] = useState(quotesList[0].author)
  const [ color, setColor ] = useState(colors[0])

  const QUOTES_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

  const getNewQuote = () => {
    const randomQuote = getRandomFromArray(quoteList)

    setQuote(randomQuote.quote)
    setAuthor(randomQuote.author)
    setColor(getRandomFromArray(colors))
  }

  const getRandomFromArray = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber]
  }

  const getQuoteList = async () => {
    try {
      const list = await fetch(QUOTES_URL)
      const res = await list.json()
      const quotes = await res.quotes
      setQuoteList(quotes)
    console.log("async", quotes);
    } catch (e) {
      console.error("Error in getQuoteList", e)
    }
  }

  const getQuoteListAlt = () => {
    fetch(QUOTES_URL, { headers: { 'Accept': 'application/json', } })
      .then(res => res.json())
      .then(result => {
        setQuoteList(result.quotes)
      })
      .then(() => getNewQuote())
      .then(() => console.log(quoteList))
      .catch(e => console.error(e))
  }

  useEffect( () => {

    getQuoteList()

  }, [])

  return (
    <div className="App" style={{ 'backgroundColor': color }}>
      <div id="quote-box" className="m-10 p-5 rounded-md bg-white shadow-xl max-w-xl">
        <ShowQuote quote={quote} author={author} color={color}/>
        <Footer getNewQuote={getNewQuote} color={color} />
      </div>
    </div>
  );
}

const ShowQuote = ({author, quote, color}) => {
  return (
    <blockquote className="blockquote relative" style={{ color: color }}>
      <p id="text" className="quote">{ quote }</p>
      <cite id="author" className="text-right text-2xl float-right">{ author }</cite>
    </blockquote>
  )
}

const Footer = ({ getNewQuote, color }) => {
  return (
    <div id="footer" className="flex justify-between clear-both border-t pt-5" style={{ color, borderColor: color + "30" }}>
      <div className="">
        <a
          href="https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer"
          id="tweet-quote"
          target="_blank"
          rel="noreferrer"
          className="text-5xl shadow-sm focus:outline-none focus:border-transparent"
          style={{ color: color }}
        >
          <FontAwesomeIcon icon={ faFacebookSquare } />
        </a>
        <a
          href="https://twitter.com/intent/tweet"
          id="tweet-quote"
          target="_blank"
          rel="noreferrer"
          className="text-5xl shadow-sm ml-2 focus:outline-none focus:border-transparent"
          style={{ color: color }}
        >
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
      </div>
      <button
        id="new-quote"
        className="rounded-md px-4 text-xl shadow-sm text-white z-10 focus:outline-none focus:border-transparent"
        style={{ backgroundColor: color }}
        onClick={() => getNewQuote()}
      >
        New Quote
      </button>
    </div>
  )
}

const quotesList = [
  {
    quote: 'Just do it now, fill in the blanks along the way.',
    author: 'Nizam Man',
    color: '#26c6da'
  },
  {
    quote: 'If you want to live a happy life, tie it to a goal, not to people or things.',
    author: 'Albert Einstein',
    color: '#e35183'
  },
  {
    quote: 'Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.',
    author: 'Steve Jobs',
    color: '#0095a8'
  },
  {
    quote: 'Money and success don’t change people; they merely amplify what is already there.',
    author: 'Will Smith',
    color: '#ad1457'
  },
  {
    quote: 'Imperfect progress is always better than no progress at all',
    author: 'Nizam Man',
    color: '#43a047'
  }
]

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
]
export default App;

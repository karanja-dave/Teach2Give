import './jokes.css'

type Joke={
    joke:string;
    rating:number;
}

type JokesProps = {
    joke:Joke
}



export const Jokes = ({joke}:JokesProps) => {
    // distructuring 
    const {joke:JokeName,rating} =joke
  return (
    <div>

        <h1 className="jokeName">{JokeName}</h1>
        <p className="jokeRating">Rating: {rating}</p>

    </div>
  )
}


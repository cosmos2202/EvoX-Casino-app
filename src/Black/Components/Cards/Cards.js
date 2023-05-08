import './Cards.css';
import Card from './Card/Card';

const Cards = (props) => {

  return (
    <div className="Cards">
      <header className="Cards-header">
        {props.cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
            ></Card>
          )
        })}
      </header>
    </div>
  );
}

export default Cards;
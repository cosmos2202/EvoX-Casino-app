import './Card.css';

const Card = (props) => {
  return (
    <div className="Card">
      <img src={require(`../../../Assets/PlayingCards/${props.card.name}.png`)} height="125" alt=''></img>
    </div>
  )
}

export default Card;
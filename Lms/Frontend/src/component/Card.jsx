
const Card = ({thumbnail, title,category, price, id}) => {
    return (
        <div>
            Card --------------

            <div className=" p-16 border border-green-400">
                <img className=" h-40 w-40" src={thumbnail} alt="" />
                <div>
                    <h2>{title}</h2>
                    <p>{category}</p>
                    <p>{price} Tk</p>
                </div>

            </div>
        </div>
    );
};

export default Card;
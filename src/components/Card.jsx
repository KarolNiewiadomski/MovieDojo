const Card = ({ children, bg = "bg-gray-200" }) => {
  return (
    <div className={`${bg} p-6 rounded-lg drop-shadow-md`}>{children}</div>
  );
};

export default Card;

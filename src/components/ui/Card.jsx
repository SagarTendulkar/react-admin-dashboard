const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white border border-gray-100 dark:bg-slate-800 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md  transition-shadow  duration-200 p-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

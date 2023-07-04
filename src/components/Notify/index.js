import Icon from "../Icon";

const Notify = ({ className, iconCheck, iconDelete, children }) => (
  <div className={`flex items-center p-4 rounded-2xl bg-n-7 text-n-1 md:-mb-5 ${className}`}>
    {iconCheck && (
      <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-primary-2">
        <Icon className="fill-n-7" name="check-thin" />
      </div>
    )}
    {iconDelete && (
      <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-accent-1">
        <Icon className="fill-n-1" name="trash" />
      </div>
    )}
    {children}
  </div>
);

export default Notify;

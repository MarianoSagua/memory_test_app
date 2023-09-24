export const AuthLayout = ({ children, title }) => {
  return (
    <div className="authLayout animate__animated animate__slideInUp animate__fast">
      <h1 className="authLayout__title">{title}</h1>

      {children}
    </div>
  );
};

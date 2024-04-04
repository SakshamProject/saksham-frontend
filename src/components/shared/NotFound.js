import pageNotFound from "../../assets/pageNotFound.png";

const NotFound = () => {
  return (
    <img
      src={pageNotFound}
      style={{ width: "100%", height: "99vh" }}
      alt="page not found"
    />
  );
};

export default NotFound;

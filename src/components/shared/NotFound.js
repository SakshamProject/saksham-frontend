import { FourNotFour, NotFoundContainer, NotFoundMessage } from "../../styles";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <FourNotFour>404</FourNotFour>
      <NotFoundMessage>Oops! Something is wrong...</NotFoundMessage>
    </NotFoundContainer>
  );
};

export default NotFound;

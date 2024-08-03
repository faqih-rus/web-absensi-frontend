import { Container } from "react-bootstrap";

const Home = ({ title }) => {
  return (
    <>
      <Container>
        <h1>{title}</h1>
        <p>Selamat datang di halaman Home</p>
      </Container>
      <container>
        {/*    */}
        <a href="/login">
          <button>Login</button>
        </a>
      </container>
    </>
  );
};



export default Home;

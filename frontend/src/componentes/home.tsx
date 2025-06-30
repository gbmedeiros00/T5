import { Container, Card } from 'react-bootstrap';

export default function Home() {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Bem-vindo ao PetLovers!</Card.Title>
          <Card.Text>
            O <strong>PetLovers</strong> é um sistema dedicado ao gerenciamento de clientes, pets, produtos e serviços para pet shops e clínicas veterinárias.
            <br /><br />
            Aqui você pode cadastrar clientes, controlar o consumo de produtos, registrar pets e gerar relatórios completos para facilitar o dia a dia do seu negócio.
            <br /><br />
            Comece agora mesmo a cuidar melhor dos seus clientes e seus pets com o PetLovers!
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
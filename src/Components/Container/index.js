import styled from 'styled-components';

// criando um novo componente e o exportando ao mesmo tempo
 const Container = styled.div` 
  max-width: 700px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #57606f;

  svg {
    margin-right: 10px;
    }
  }
 `;

export default Container;
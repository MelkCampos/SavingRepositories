import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
    color: #57606f;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400;
  }

  /* botão de "Back to repositories" */
  a {
    color: #fff;
    font-size: 15px;
    padding: 1.7%;
    text-decoration: none;
    background: #7159c1;
    font-weight: bold;
    border-radius: 3px;
  }

  a:hover {
    background: #7168c0;
  }

`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  

  /* bloco dos usuários */
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 3px;
    
    & + li {
      margin-top: 10px;

  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid #778beb;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;
    }

    a {
      text-decoration: none;
      color: #333;

      &:hover {
        color: #7168c0;
      }

    }

    span {
      background: #eee;
      color: #333;
      border-radius: 2px;
      font-size: 12px;
      font-weight: bold;
      height: 20px;
      padding: 3px 4px;
      margin-left: 10px;
    }
  }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }

    }
    
`; 

export const IssuesFilter = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  align-items: center;
  font-size: 12px;
  
    button {
      transition: opacity 0.25s ease-out;
      border-radius: 3px;
      outline: 0;
      border: 0;
      margin: 3px;
      width: 80px;
      padding: 8px;
      color: #fff;
      background:  #7159c1;

      &:hover {
        background: #7168c0;
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    }

`;

export const PageActions = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  
  span {
      color:#808e9b;
    }

  button {
    transition: opacity 0.25s ease-out;
    border-radius: 3px;
    outline: 0;
    border: 0;
    width: 80px;
    padding: 8px;
    background: #7159c1;
    color: #fff;


    &:hover {
        background: #7168c0;
      }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
  }
`;
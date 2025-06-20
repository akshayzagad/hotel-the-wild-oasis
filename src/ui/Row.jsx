import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizantal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "verticle" &&
    css`
     flex-direction: column;
        gap: 1.5rem;
    `}
`;

Row.defaultProps = {
    type:"verticle"
}

export default Row;
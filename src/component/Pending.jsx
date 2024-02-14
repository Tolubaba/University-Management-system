import React from "react";
import styled from "styled-components";

const Pending = () => {
  return (
    <Wrapper>
      <h2>Wait for the admin to approve your status</h2>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);

  h2 {
    font-size: 30px;
  }
`;

export default Pending;

import styled from "styled-components";

export default styled.input`
  color: ${(props) => props.color || "black"};
  font-family: ${(props) => props.fontFamily || "sans-serif"};
  font-size: ${(props) => props.fontSize || "13px"};
  padding: ${(props) => props.padding || "4px"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  border: none;
  border-outline: none;
  background-color: ${(props) => props.backgroundColor || "#f7fbff"};
  width: ${(props) => props.width || "100%"};
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px inset,
    rgba(0, 0, 0, 0.1) 0px 1px 2px 0px inset;
  @media screen and (max-width: 660px) {
    width: ${(props) => props.mobileWidth || props.width || "100%"};
  }
`;

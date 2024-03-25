import styled from "styled-components";

export default styled.button`
  padding: ${(props) => props.padding || "8px"};
  margin: ${(props) => props.margin || "8px"};
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.fontSize || "16px"};
  border: ${(props) => props.border || "1px solid ghostwhite"};
  background-color: ${(props) => props.backgroundColor || "purple"};
  border-radius: ${(props) => props.borderRadius || 0};
  cursor: pointer;
  font-style: ${(props) => props.fontStyle || "normal"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  min-width: ${(props) => props.minWidth || "160px"};
  transition: all 0.2s linear;
  &:hover {
    box-shadow: rgba(0, 123, 255, 0.2) 0px 6px 6px 0px,
      rgba(0, 125, 255, 0.25) 0px 8px 10px 0px;
  }
  @media screen and (max-width: 660px) {
    min-width: ${(props) => props.minWidth || "100px"};
    padding: ${(props) => props.mobilePadding || props.padding || "8px"};
    margin: ${(props) => props.mobileMargin || props.margin || "8px"};
    font-size: ${(props) => props.mobileFontSize || props.fontSize || "14px"};
  }
`;

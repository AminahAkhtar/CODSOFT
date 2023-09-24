import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
`;

export const Filters = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const FilterDropdown = styled.select`
  padding: 8px;
`;

export const Select = styled.select`
  padding: 8px;
  margin-right: 16px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;


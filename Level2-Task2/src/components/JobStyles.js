import styled from 'styled-components';

export  const JobCard = styled.li`
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  margin:2rem;
  list-style:none;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  text-transform: uppercase;
`;

export const Description = styled.p`
  color: #555555;
  font-size: 0.875rem;
  margin: 8px 0;
  text-transform: uppercase;
`;

export const Info = styled.p`
  font-size: 0.875rem;
  margin: 4px 0;
  text-transform: capatalise;
`;

export const ApplyButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;
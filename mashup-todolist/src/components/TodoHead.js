import React from 'react';
import styled, { css } from 'styled-components';
import { useTodoDispatch, useTodoState } from '../TodoContext';
import { MdDone } from 'react-icons/md';

const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-info {
    display: flex;
    align-items: center;
    margin-top: 40px;
    
    > * ~ * {
      margin-left: 15px;
    }
    
    > .tasks-left {
      color: #20c997;
      font-size: 18px;
      font-weight: bold;
    }
  }

`;

const CheckCircle = styled.div`
  width: 17px;
  height: 17px;
  border: 1px solid #ced4da;
  border-radius: 16px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
  props.done &&
  css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

function TodoHead() {
  const todos = useTodoState();
  const undoneTasks = todos.filter(todo => !todo.done);
  const isAllDoneTasks = undoneTasks.every(task => task.done);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long'
  });

  const dispatch = useTodoDispatch();
  const onAllToggle = () => dispatch({
    type: 'ALL_TOGGLE'
  });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className='tasks-info'>
        <span className="tasks-left">할 일 {undoneTasks.length}개 남음</span>
        <CheckCircle done={isAllDoneTasks} onClick={onAllToggle}>
          {isAllDoneTasks && <MdDone />}
        </CheckCircle>
      </div>

    </TodoHeadBlock>
  )
}

export default TodoHead;
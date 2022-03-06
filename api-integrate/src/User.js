import React from "react";
import axios from "axios";
import { useAsync } from 'react-async';

async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  const {data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id
  });

  /*
    useAsync 를 사용 할 때 watch 값에 특정 값을 넣어주면
    이 값이 바뀔 때마다 promiseFn 에 넣은 함수를 다시 호출해준다.
   */

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;